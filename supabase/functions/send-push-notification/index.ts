// =========================================================================
// NAMMUDE NAADU (നമ്മുടെ നാട്) - SUPABASE EDGE FUNCTION
// FCM HTTP v1 High-Priority Background Push Notification Engine
// Supports Database Webhooks (messages, blood, services) + Direct API calls
// Zero npm heavy dependencies - uses native Web Crypto API & standard fetch
// =========================================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// In-memory cache for Google OAuth2 access token (refreshed every ~50 minutes)
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

// Helper: Convert PEM private key to binary ArrayBuffer for Web Crypto
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const cleanPem = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/-----BEGIN RSA PRIVATE KEY-----/g, "")
    .replace(/-----END RSA PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");

  const binaryString = atob(cleanPem);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Helper: Base64URL encode string or bytes
function base64UrlEncode(data: string | Uint8Array): string {
  let base64 = "";
  if (typeof data === "string") {
    base64 = btoa(unescape(encodeURIComponent(data)));
  } else {
    let binary = "";
    for (let i = 0; i < data.byteLength; i++) {
      binary += String.fromCharCode(data[i]);
    }
    base64 = btoa(binary);
  }
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Generate Google OAuth2 Access Token for FCM HTTP v1 via Service Account JWT
async function getGoogleAccessToken(
  clientEmail: string,
  privateKeyPem: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // Return cached token if valid for at least 5 more minutes
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 300) {
    return cachedAccessToken.token;
  }

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const payload = {
    iss: clientEmail,
    sub: clientEmail,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600, // 1 hour
    scope: "https://www.googleapis.com/auth/firebase.messaging",
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  // Import RSA Private Key using native Web Crypto API
  const binaryDer = pemToArrayBuffer(privateKeyPem);
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  // Sign with RS256
  const signatureBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const encodedSignature = base64UrlEncode(new Uint8Array(signatureBuffer));
  const jwt = `${signingInput}.${encodedSignature}`;

  // Exchange JWT for OAuth2 Access Token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Google OAuth2 Token exchange failed: ${tokenResponse.status} ${errorText}`);
  }

  const tokenData = await tokenResponse.json();
  cachedAccessToken = {
    token: tokenData.access_token,
    expiresAt: now + (tokenData.expires_in || 3600),
  };

  return cachedAccessToken.token;
}

// Dispatch FCM HTTP v1 Push Notification to Android Device
async function sendFcmMessage(
  projectId: string,
  accessToken: string,
  targetFcmToken: string,
  title: string,
  body: string,
  channelId: string,
  dataMap: Record<string, any>
): Promise<{ success: boolean; messageId?: string; error?: string; unregistered?: boolean }> {
  // FCM HTTP v1 requires all data keys and values to be strings
  const stringifiedData: Record<string, string> = {};
  for (const [key, val] of Object.entries(dataMap || {})) {
    stringifiedData[key] = typeof val === "string" ? val : JSON.stringify(val);
  }

  const payload = {
    message: {
      token: targetFcmToken,
      notification: {
        title: title,
        body: body,
      },
      data: stringifiedData,
      android: {
        priority: "HIGH",
        notification: {
          channel_id: channelId || "nammude_naadu_messages",
          sound: "notification_sound",
          default_vibrate_timings: true,
          default_light_settings: true,
          visibility: "PUBLIC",
          icon: "ic_launcher",
        },
      },
    },
  };

  const fcmUrl = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;
  const response = await fetch(fcmUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json; UTF-8",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const resData = await response.json();
    return { success: true, messageId: resData.name };
  } else {
    const errorText = await response.text();
    const isUnregistered =
      response.status === 404 ||
      errorText.includes("UNREGISTERED") ||
      errorText.includes("NOT_FOUND") ||
      errorText.includes("registration-token-not-registered");

    return {
      success: false,
      error: `FCM HTTP ${response.status}: ${errorText}`,
      unregistered: isUnregistered,
    };
  }
}

// Main Edge Function Handler
serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const FIREBASE_PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID");
    const FIREBASE_CLIENT_EMAIL = Deno.env.get("FIREBASE_CLIENT_EMAIL");
    const RAW_PRIVATE_KEY = Deno.env.get("FIREBASE_PRIVATE_KEY");
    const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase configuration in environment" }),
        { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !RAW_PRIVATE_KEY) {
      return new Response(
        JSON.stringify({
          error: "Missing Firebase Service Account credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in Supabase Secrets.",
        }),
        { status: 503, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    // Standardize newline characters in private key
    const FIREBASE_PRIVATE_KEY = RAW_PRIVATE_KEY.replace(/\\n/g, "\n");

    // Initialize Supabase Admin Client with Service Role
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Parse incoming request payload
    let payload: any = {};
    try {
      payload = await req.json();
    } catch (_) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Optional Webhook Secret authentication
    if (WEBHOOK_SECRET) {
      const incomingSecret =
        req.headers.get("x-webhook-secret") ||
        req.headers.get("authorization")?.replace("Bearer ", "");
      if (incomingSecret !== WEBHOOK_SECRET && incomingSecret !== SUPABASE_SERVICE_ROLE_KEY) {
        return new Response(JSON.stringify({ error: "Unauthorized webhook request" }), {
          status: 401,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
    }

    // Acquire Google FCM OAuth2 access token
    const accessToken = await getGoogleAccessToken(FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY);

    // List of notification jobs to process
    interface PushJob {
      recipientId?: string;
      recipientPhone?: string;
      fcmToken?: string;
      title: string;
      body: string;
      channelId: string;
      type: string;
      data: Record<string, any>;
      idempotencyKey?: string;
    }
    const jobs: PushJob[] = [];

    // =========================================================================
    // CASE 1: DATABASE WEBHOOK ON "public.messages" (New Chat Message)
    // =========================================================================
    if (payload.table === "messages" && payload.type === "INSERT" && payload.record) {
      const msg = payload.record;
      const cleanPhone = msg.recipient_phone ? String(msg.recipient_phone).replace(/\D/g, "").slice(-10) : "";

      // Lookup recipient user profile in Supabase
      let recipientProfile: any = null;
      if (msg.recipient_id) {
        const { data } = await supabaseAdmin
          .from("profiles")
          .select("id, name, phone, fcm_token, notifications_enabled")
          .eq("id", msg.recipient_id)
          .maybeSingle();
        recipientProfile = data;
      }
      if (!recipientProfile && cleanPhone) {
        const { data } = await supabaseAdmin
          .from("profiles")
          .select("id, name, phone, fcm_token, notifications_enabled")
          .ilike("phone", `%${cleanPhone}%`)
          .limit(1);
        if (data && data.length > 0) recipientProfile = data[0];
      }

      // Check if recipient has a valid FCM token and hasn't disabled notifications
      if (recipientProfile && recipientProfile.fcm_token && recipientProfile.notifications_enabled !== false) {
        // Prevent sending notification to self
        const senderPhone = msg.sender_phone ? String(msg.sender_phone).replace(/\D/g, "").slice(-10) : "";
        const isSelf = (msg.sender_id && msg.sender_id === recipientProfile.id) || (senderPhone && senderPhone === cleanPhone);

        if (!isSelf) {
          jobs.push({
            recipientId: recipientProfile.id,
            recipientPhone: recipientProfile.phone,
            fcmToken: recipientProfile.fcm_token,
            title: msg.sender_name ? `${msg.sender_name} (സന്ദേശം)` : "പുതിയ സന്ദേശം",
            body: msg.text || "നിങ്ങൾക്ക് ഒരു പുതിയ സന്ദേശം വന്നിട്ടുണ്ട്",
            channelId: "nammude_naadu_messages",
            type: "chat",
            data: {
              type: "chat",
              chatKey: msg.chat_key,
              senderId: msg.sender_id || "",
              senderName: msg.sender_name || "",
              senderPhone: msg.sender_phone || "",
              messageId: msg.id || "",
            },
            idempotencyKey: `msg_${msg.id}_${recipientProfile.id}`,
          });
        }
      }
    }

    // =========================================================================
    // CASE 2: DATABASE WEBHOOK ON "public.blood_requests" (Urgent Blood Alert)
    // =========================================================================
    else if (payload.table === "blood_requests" && payload.type === "INSERT" && payload.record) {
      const req = payload.record;
      const bloodGroup = req.blood_group;

      // Find registered donors with matching blood group and active FCM tokens
      let query = supabaseAdmin
        .from("profiles")
        .select("id, phone, fcm_token")
        .eq("is_donor", true)
        .eq("blood_group", bloodGroup)
        .not("fcm_token", "is", null);

      if (req.district) {
        query = query.ilike("place", `%${req.district}%`);
      }

      const { data: donors } = await query.limit(50);

      if (donors && donors.length > 0) {
        const cleanReqPhone = req.contact_phone ? String(req.contact_phone).replace(/\D/g, "").slice(-10) : "";

        for (const donor of donors) {
          const cleanDonorPhone = donor.phone ? String(donor.phone).replace(/\D/g, "").slice(-10) : "";
          if (cleanDonorPhone && cleanDonorPhone === cleanReqPhone) continue; // Skip requester

          jobs.push({
            recipientId: donor.id,
            recipientPhone: donor.phone,
            fcmToken: donor.fcm_token,
            title: `🚨 രക്തദാനം ആവശ്യം (${bloodGroup})`,
            body: `${req.hospital}-ൽ ${req.patient_name}-ന് ${bloodGroup} രക്തം (${req.units || "1 Unit"}) ആവശ്യമുണ്ട്.`,
            channelId: "nammude_naadu_alerts",
            type: "blood",
            data: {
              type: "blood",
              bloodRequestId: req.id,
              bloodGroup: bloodGroup,
              hospital: req.hospital,
              contactPhone: req.contact_phone,
            },
            idempotencyKey: `blood_${req.id}_${donor.id}`,
          });
        }
      }
    }

    // =========================================================================
    // CASE 3: DATABASE WEBHOOK ON "public.service_requests" (Worker Enquiries)
    // =========================================================================
    else if (payload.table === "service_requests" && payload.record) {
      const sreq = payload.record;

      // When a customer requests a service: notify matching service provider
      if (payload.type === "INSERT") {
        let providerQuery = supabaseAdmin
          .from("profiles")
          .select("id, phone, fcm_token")
          .not("fcm_token", "is", null);

        if (sreq.provider_phone) {
          const cleanProvPhone = String(sreq.provider_phone).replace(/\D/g, "").slice(-10);
          providerQuery = providerQuery.ilike("phone", `%${cleanProvPhone}%`);
        }

        const { data: providers } = await providerQuery.limit(5);
        if (providers) {
          for (const prov of providers) {
            jobs.push({
              recipientId: prov.id,
              recipientPhone: prov.phone,
              fcmToken: prov.fcm_token,
              title: `🛠️ പുതിയ സർവീസ് ആവശ്യം (${sreq.trade || "സേവനം"})`,
              body: `${sreq.title} - ${sreq.location || "നിങ്ങളുടെ പ്രദേശത്ത്"}`,
              channelId: "nammude_naadu_alerts",
              type: "service",
              data: {
                type: "service_request",
                requestId: sreq.id,
                trade: sreq.trade || "",
              },
              idempotencyKey: `sreq_${sreq.id}_${prov.id}`,
            });
          }
        }
      }
      // When provider updates request status: notify requester
      else if (payload.type === "UPDATE" && sreq.status) {
        let requesterProfile: any = null;
        if (sreq.user_id) {
          const { data } = await supabaseAdmin
            .from("profiles")
            .select("id, phone, fcm_token")
            .eq("id", sreq.user_id)
            .maybeSingle();
          requesterProfile = data;
        }
        if (!requesterProfile && sreq.phone) {
          const cleanPhone = String(sreq.phone).replace(/\D/g, "").slice(-10);
          const { data } = await supabaseAdmin
            .from("profiles")
            .select("id, phone, fcm_token")
            .ilike("phone", `%${cleanPhone}%`)
            .limit(1);
          if (data && data.length > 0) requesterProfile = data[0];
        }

        if (requesterProfile && requesterProfile.fcm_token) {
          jobs.push({
            recipientId: requesterProfile.id,
            recipientPhone: requesterProfile.phone,
            fcmToken: requesterProfile.fcm_token,
            title: `സർവീസ് അപ്‌ഡേറ്റ്: ${sreq.title}`,
            body: `നിങ്ങളുടെ റിക്വസ്റ്റ് സ്റ്റാറ്റസ്: ${sreq.status}`,
            channelId: "nammude_naadu_alerts",
            type: "service",
            data: {
              type: "service_request",
              requestId: sreq.id,
              status: sreq.status,
            },
            idempotencyKey: `sreq_update_${sreq.id}_${sreq.status}`,
          });
        }
      }
    }

    // =========================================================================
    // CASE 4: DIRECT CLIENT OR ADMIN INVOCATION
    // =========================================================================
    else if (payload.fcmToken || payload.recipientId || payload.recipientPhone) {
      let targetToken = payload.fcmToken;
      let targetUser = payload.recipientId;

      if (!targetToken && (payload.recipientId || payload.recipientPhone)) {
        let profileQuery = supabaseAdmin.from("profiles").select("id, phone, fcm_token");
        if (payload.recipientId) {
          profileQuery = profileQuery.eq("id", payload.recipientId);
        } else {
          const clean = String(payload.recipientPhone).replace(/\D/g, "").slice(-10);
          profileQuery = profileQuery.ilike("phone", `%${clean}%`);
        }
        const { data: prof } = await profileQuery.maybeSingle();
        if (prof && prof.fcm_token) {
          targetToken = prof.fcm_token;
          targetUser = prof.id;
        }
      }

      if (targetToken) {
        jobs.push({
          recipientId: targetUser,
          recipientPhone: payload.recipientPhone,
          fcmToken: targetToken,
          title: payload.title || "നമ്മുടെ നാട് അറിയിപ്പ്",
          body: payload.body || "നിങ്ങൾക്ക് ഒരു പുതിയ സന്ദേശം വന്നിട്ടുണ്ട്",
          channelId: payload.channelId || "nammude_naadu_messages",
          type: payload.type || "general",
          data: payload.data || {},
          idempotencyKey: payload.messageId ? `direct_${payload.messageId}` : undefined,
        });
      }
    }

    // Execute jobs
    const results = [];
    for (const job of jobs) {
      // Check deduplication in notifications table if idempotencyKey is set
      if (job.idempotencyKey) {
        const { data: existing } = await supabaseAdmin
          .from("notifications")
          .select("id")
          .eq("id", job.idempotencyKey)
          .maybeSingle();
        if (existing) {
          results.push({ job: job.idempotencyKey, status: "skipped_duplicate" });
          continue;
        }
      }

      const fcmRes = await sendFcmMessage(
        FIREBASE_PROJECT_ID,
        accessToken,
        job.fcmToken!,
        job.title,
        job.body,
        job.channelId,
        job.data
      );

      // Handle dead or unregistered tokens by purging from Supabase profiles
      if (fcmRes.unregistered) {
        console.warn(`🗑️ [Edge FCM] Dead token detected. Purging from profiles: ${job.fcmToken?.substring(0, 15)}...`);
        await supabaseAdmin
          .from("profiles")
          .update({ fcm_token: null, fcm_updated_at: new Date().toISOString() })
          .eq("fcm_token", job.fcmToken);
      }

      // Record audit and history log in public.notifications table
      try {
        await supabaseAdmin.from("notifications").insert({
          id: job.idempotencyKey || `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          user_id: job.recipientId || null,
          recipient_phone: job.recipientPhone || null,
          title: job.title,
          body: job.body,
          type: job.type || "general",
          data: job.data || {},
          fcm_status: fcmRes.success ? "sent" : (fcmRes.unregistered ? "expired" : "failed"),
          error_message: fcmRes.error || null,
        });
      } catch (logErr) {
        console.warn("Notification history log note:", (logErr as any).message);
      }

      results.push({
        recipient: job.recipientId || job.recipientPhone,
        success: fcmRes.success,
        messageId: fcmRes.messageId,
        error: fcmRes.error,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        jobsProcessed: jobs.length,
        results: results,
      }),
      { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("❌ [Edge Function] Error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});
