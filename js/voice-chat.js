/**
 * ==============================================================
 * VOICE CHAT & AUDIO NOTE MANAGER (തത്സമയ വോയ്സ് ചാറ്റ് & നോട്ട്)
 * ==============================================================
 * Provides WhatsApp-style voice message recording and playback
 * for In-App 1-on-1 Chat and Quick Service Requests.
 */
(function (window, document) {
  'use strict';

  let mediaRecorder = null;
  let audioChunks = [];
  let recordTimerInterval = null;
  let recordStartTime = 0;
  let currentPlayingAudio = null;
  let currentPlayingBtn = null;
  let currentAnimFrame = null;
  let targetVoiceContext = 'chat'; // 'chat' or 'quick-service'
  let quickServiceVoiceData = null;

  const VoiceChat = {
    isRecording: false,

    // Check if device supports audio recording
    isSupported: function () {
      return !!(
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia &&
        window.MediaRecorder
      );
    },

    // Start voice recording
    startRecording: async function (context = 'chat') {
      targetVoiceContext = context;

      if (!this.isSupported()) {
        showToast('⚠️ ഈ ഉപകരണത്തിൽ വോയ്സ് റെക്കോർഡിംഗ് ലഭ്യമല്ല');
        return false;
      }

      try {
        // Request microphone permission from user / Android OS
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });

        // Determine best supported mime type
        let mimeType = '';
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
          mimeType = 'audio/ogg';
        }

        mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = function (e) {
          if (e.data && e.data.size > 0) {
            audioChunks.push(e.data);
          }
        };

        mediaRecorder.onstart = () => {
          this.isRecording = true;
          recordStartTime = Date.now();
          this.showRecordingUI(true);
          this.startTimer();
          // Vibrate slightly if available
          if (navigator.vibrate) navigator.vibrate(50);
        };

        mediaRecorder.onstop = () => {
          this.isRecording = false;
          this.stopTimer();
          this.showRecordingUI(false);

          // Stop all audio tracks to release microphone hardware immediately
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start(200); // 200ms chunk slices
        return true;
      } catch (err) {
        console.warn('Microphone error:', err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          showToast('⚠️ മൈക്രോഫോൺ അനുമതി നൽകുക (Settings -> Permissions)');
        } else {
          showToast('⚠️ റെക്കോർഡിംഗ് ആരംഭിക്കാൻ സാധിച്ചില്ല: ' + (err.message || 'Error'));
        }
        return false;
      }
    },

    // Stop and send recording
    stopAndSend: function () {
      if (!mediaRecorder || mediaRecorder.state === 'inactive') return;

      const elapsedSec = Math.max(1, Math.round((Date.now() - recordStartTime) / 1000));

      mediaRecorder.onstop = async () => {
        this.isRecording = false;
        this.stopTimer();
        this.showRecordingUI(false);

        if (audioChunks.length === 0) return;

        const blobType = mediaRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunks, { type: blobType });

        // Minimum threshold: 0.5 sec to prevent accidental 0s taps
        if (elapsedSec < 1 && audioBlob.size < 500) {
          showToast('ℹ️ വോയ്സ് റെക്കോർഡ് ചെയ്യാൻ ബട്ടൺ അമർത്തിപ്പിടിക്കുക');
          return;
        }

        const durationText = this.formatDuration(elapsedSec);

        // Convert to Base64 Data URL for instant delivery
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64Audio = reader.result;

          if (targetVoiceContext === 'chat') {
            if (typeof window.sendVoiceChatMessage === 'function') {
              window.sendVoiceChatMessage(base64Audio, durationText, elapsedSec);
            }
          } else if (targetVoiceContext === 'quick-service') {
            quickServiceVoiceData = { audioUrl: base64Audio, duration: durationText };
            if (typeof window.onQuickServiceVoiceRecorded === 'function') {
              window.onQuickServiceVoiceRecorded(quickServiceVoiceData);
            }
          }
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.stop();
    },

    // Cancel current recording (discard)
    cancelRecording: function () {
      if (!mediaRecorder || mediaRecorder.state === 'inactive') return;

      mediaRecorder.onstop = () => {
        this.isRecording = false;
        this.stopTimer();
        this.showRecordingUI(false);
        audioChunks = [];
        showToast('🗑️ വോയ്സ് റെക്കോർഡിംഗ് ഒഴിവാക്കി');
      };

      mediaRecorder.stop();
    },

    // Toggle recording on chat mic button tap
    toggleRecording: function () {
      if (this.isRecording) {
        this.stopAndSend();
      } else {
        this.startRecording('chat');
      }
    },

    // UI Updates
    showRecordingUI: function (isRec) {
      const recBar = document.getElementById('chatRecordingBar');
      const inputBar = document.getElementById('chatInputBar');
      if (recBar && inputBar) {
        if (isRec) {
          recBar.style.display = 'flex';
          inputBar.style.opacity = '0.3';
          inputBar.style.pointerEvents = 'none';
        } else {
          recBar.style.display = 'none';
          inputBar.style.opacity = '1';
          inputBar.style.pointerEvents = 'auto';
        }
      }
    },

    startTimer: function () {
      const timerEl = document.getElementById('recTimerText');
      if (timerEl) timerEl.textContent = '00:00';

      clearInterval(recordTimerInterval);
      recordTimerInterval = setInterval(() => {
        const sec = Math.floor((Date.now() - recordStartTime) / 1000);
        if (timerEl) {
          const m = String(Math.floor(sec / 60)).padStart(2, '0');
          const s = String(sec % 60).padStart(2, '0');
          timerEl.textContent = `${m}:${s}`;
        }

        // Auto-stop at 2 minutes
        if (sec >= 120) {
          this.stopAndSend();
        }
      }, 500);
    },

    stopTimer: function () {
      clearInterval(recordTimerInterval);
    },

    formatDuration: function (sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    },

    // Playback of voice notes
    playVoiceNote: function (btnEl, audioUrl) {
      if (!audioUrl) return;

      const bubbleEl = btnEl.closest('.chat-voice-bubble');
      const playIcon = btnEl.querySelector('.play-icon') || btnEl;
      const progressFill = bubbleEl ? bubbleEl.querySelector('.voice-progress-fill') : null;
      const durationEl = bubbleEl ? bubbleEl.querySelector('.voice-duration') : null;

      // If already playing this same audio, toggle pause
      if (currentPlayingAudio && currentPlayingBtn === btnEl) {
        if (!currentPlayingAudio.paused) {
          currentPlayingAudio.pause();
          playIcon.textContent = '▶';
          if (bubbleEl) bubbleEl.classList.remove('playing');
          return;
        } else {
          currentPlayingAudio.play();
          playIcon.textContent = '⏸';
          if (bubbleEl) bubbleEl.classList.add('playing');
          return;
        }
      }

      // Stop any other currently playing voice note
      if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        if (currentPlayingBtn) {
          const prevIcon = currentPlayingBtn.querySelector('.play-icon') || currentPlayingBtn;
          prevIcon.textContent = '▶';
          const prevBubble = currentPlayingBtn.closest('.chat-voice-bubble');
          if (prevBubble) prevBubble.classList.remove('playing');
        }
        currentPlayingAudio = null;
      }

      const audio = new Audio(audioUrl);
      currentPlayingAudio = audio;
      currentPlayingBtn = btnEl;

      audio.onplay = () => {
        playIcon.textContent = '⏸';
        if (bubbleEl) bubbleEl.classList.add('playing');
      };

      audio.ontimeupdate = () => {
        if (audio.duration && progressFill) {
          const pct = (audio.currentTime / audio.duration) * 100;
          progressFill.style.width = pct + '%';
        }
        if (durationEl && audio.duration) {
          const remaining = Math.max(0, Math.round(audio.duration - audio.currentTime));
          durationEl.textContent = this.formatDuration(remaining);
        }
      };

      audio.onended = () => {
        playIcon.textContent = '▶';
        if (bubbleEl) bubbleEl.classList.remove('playing');
        if (progressFill) progressFill.style.width = '0%';
        if (durationEl && audio.duration) {
          durationEl.textContent = this.formatDuration(Math.round(audio.duration));
        }
        currentPlayingAudio = null;
        currentPlayingBtn = null;
      };

      audio.onerror = () => {
        playIcon.textContent = '▶';
        if (bubbleEl) bubbleEl.classList.remove('playing');
        showToast('⚠️ ഓഡിയോ പ്ലേ ചെയ്യാൻ സാധിച്ചില്ല');
        currentPlayingAudio = null;
        currentPlayingBtn = null;
      };

      audio.play().catch((err) => {
        console.warn('Audio play error:', err);
        playIcon.textContent = '▶';
      });
    }
  };

  // Expose global functions for onclick handlers
  window.VoiceChatManager = VoiceChat;
  window.toggleVoiceRecording = () => VoiceChat.toggleRecording();
  window.cancelVoiceRecording = () => VoiceChat.cancelRecording();
  window.stopAndSendVoiceRecording = () => VoiceChat.stopAndSend();
  window.togglePlayVoice = (btn, url) => VoiceChat.playVoiceNote(btn, url);

  // Helper toast fallback
  function showToast(msg) {
    if (typeof window.showNotificationToast === 'function') {
      window.showNotificationToast(msg);
    } else {
      console.info(msg);
    }
  }
})(window, document);
