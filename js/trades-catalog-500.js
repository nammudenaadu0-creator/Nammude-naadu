// ==============================================================
// 2,050 COMPREHENSIVE LOCAL TRADES & SERVICES CATALOG FOR KERALA
// 100% Pure Bilingual Support (Malayalam & English)
// ==============================================================
(function() {
  const isEn = (typeof localStorage !== 'undefined' && localStorage.getItem('nn_app_language') === 'en');
  const catalog = [
  {
    "id": "tr_1",
    "name": "വീട് കൺസീൽഡ് വയറിംഗ്",
    "en": "Home Concealed Wiring",
    "ml": "വീട് കൺസീൽഡ് വയറിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Home Concealed Wiring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_2",
    "name": "സ്വിച്ച്ബോർഡ് റിപ്പയർ & ഫിറ്റിംഗ്",
    "en": "Switchboard Repair & Replacement",
    "ml": "സ്വിച്ച്ബോർഡ് റിപ്പയർ & ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Switchboard Repair & Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_3",
    "name": "എം.സി.ബി ട്രിപ്പ് & ഡിസ്ട്രിബ്യൂഷൻ ബോർഡ്",
    "en": "MCB Trip & Distribution Board",
    "ml": "എം.സി.ബി ട്രിപ്പ് & ഡിസ്ട്രിബ്യൂഷൻ ബോർഡ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "MCB Trip & Distribution Board Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_4",
    "name": "മെയിൻ ഫേസ് ലൈൻ കണക്ഷൻ",
    "en": "Main Phase Line Connection",
    "ml": "മെയിൻ ഫേസ് ലൈൻ കണക്ഷൻ",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Main Phase Line Connection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_5",
    "name": "എർത്തിങ് പിറ്റ് & ഇലക്ട്രോഡ് വർക്ക്",
    "en": "Earthing Pit & Electrode Setup",
    "ml": "എർത്തിങ് പിറ്റ് & ഇലക്ട്രോഡ് വർക്ക്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Earthing Pit & Electrode Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_6",
    "name": "എൽഇഡി സീലിംഗ് ലൈറ്റുകൾ",
    "en": "LED Concealed Ceiling Lights",
    "ml": "എൽഇഡി സീലിംഗ് ലൈറ്റുകൾ",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "LED Concealed Ceiling Lights Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_7",
    "name": "ഷാൻഡിലിയർ & പെൻഡന്റ് ലൈറ്റ്",
    "en": "Chandelier & Pendant Light",
    "ml": "ഷാൻഡിലിയർ & പെൻഡന്റ് ലൈറ്റ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Chandelier & Pendant Light Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_8",
    "name": "എക്സ്ഹോസ്റ്റ് ഫാൻ ഫിറ്റിംഗ്",
    "en": "Exhaust Fan Installation",
    "ml": "എക്സ്ഹോസ്റ്റ് ഫാൻ ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Exhaust Fan Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_9",
    "name": "സീലിംഗ് ഫാൻ റീവൈൻഡിങ് & റിപ്പയർ",
    "en": "Ceiling Fan Rewinding & Repair",
    "ml": "സീലിംഗ് ഫാൻ റീവൈൻഡിങ് & റിപ്പയർ",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Ceiling Fan Rewinding & Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_10",
    "name": "ഇൻവെർട്ടർ ബാറ്ററി ഫിറ്റിംഗ്",
    "en": "Inverter Battery Setup",
    "ml": "ഇൻവെർട്ടർ ബാറ്ററി ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Inverter Battery Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_11",
    "name": "യുപിഎസ് ബാക്കപ്പ് സിസ്റ്റം വയറിംഗ്",
    "en": "UPS Backup System Wiring",
    "ml": "യുപിഎസ് ബാക്കപ്പ് സിസ്റ്റം വയറിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "UPS Backup System Wiring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_12",
    "name": "ഓട്ടോമാറ്റിക് വാട്ടർ ലെവൽ കൺട്രോളർ",
    "en": "Automatic Water Level Controller",
    "ml": "ഓട്ടോമാറ്റിക് വാട്ടർ ലെവൽ കൺട്രോളർ",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Automatic Water Level Controller Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_13",
    "name": "സ്റ്റെബിലൈസർ വോൾട്ടേജ് റിപ്പയർ",
    "en": "Stablizer Voltage Repair",
    "ml": "സ്റ്റെബിലൈസർ വോൾട്ടേജ് റിപ്പയർ",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Stablizer Voltage Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_14",
    "name": "ഷോർട്ട് സർക്യൂട്ട് ഫോൾട്ട് ഫൈൻഡിങ്",
    "en": "Short Circuit Fault Finding",
    "ml": "ഷോർട്ട് സർക്യൂട്ട് ഫോൾട്ട് ഫൈൻഡിങ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Short Circuit Fault Finding Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_15",
    "name": "ഗീസർ ഇലക്ട്രിക്കൽ പോയിന്റ് ഫിറ്റിംഗ്",
    "en": "Geyser Electrical Point Fitting",
    "ml": "ഗീസർ ഇലക്ട്രിക്കൽ പോയിന്റ് ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Geyser Electrical Point Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_16",
    "name": "AC Heavy Power Point വയറിംഗ്",
    "en": "AC Heavy Power Point Wiring",
    "ml": "AC Heavy Power Point വയറിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "AC Heavy Power Point Wiring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_17",
    "name": "Staircase 2-Way Light വയറിംഗ്",
    "en": "Staircase 2-Way Light Wiring",
    "ml": "Staircase 2-Way Light വയറിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Staircase 2-Way Light Wiring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_18",
    "name": "ഇലക്ട്രിക്കൽ - Outdoor Garden Waterproof Light",
    "en": "Outdoor Garden Waterproof Light",
    "ml": "ഇലക്ട്രിക്കൽ - Outdoor Garden Waterproof Light",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Outdoor Garden Waterproof Light Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_19",
    "name": "Compound Wall Gate Lamp ഫിറ്റിംഗ്",
    "en": "Compound Wall Gate Lamp Fitting",
    "ml": "Compound Wall Gate Lamp ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Compound Wall Gate Lamp Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_20",
    "name": "ഇലക്ട്രിക്കൽ - Tubelight to LED Batten Retrofit",
    "en": "Tubelight to LED Batten Retrofit",
    "ml": "ഇലക്ട്രിക്കൽ - Tubelight to LED Batten Retrofit",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Tubelight to LED Batten Retrofit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_21",
    "name": "ഇലക്ട്രിക്കൽ - 3-Phase Motor Control Panel",
    "en": "3-Phase Motor Control Panel",
    "ml": "ഇലക്ട്രിക്കൽ - 3-Phase Motor Control Panel",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "3-Phase Motor Control Panel Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_22",
    "name": "ഇലക്ട്രിക്കൽ - Industrial Cable Tray Laying",
    "en": "Industrial Cable Tray Laying",
    "ml": "ഇലക്ട്രിക്കൽ - Industrial Cable Tray Laying",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Industrial Cable Tray Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_23",
    "name": "ഇലക്ട്രിക്കൽ - Substation Transformer Testing",
    "en": "Substation Transformer Testing",
    "ml": "ഇലക്ട്രിക്കൽ - Substation Transformer Testing",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Substation Transformer Testing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_24",
    "name": "ഇലക്ട്രിക്കൽ - Diesel Generator Auto Changeover",
    "en": "Diesel Generator Auto Changeover",
    "ml": "ഇലക്ട്രിക്കൽ - Diesel Generator Auto Changeover",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Diesel Generator Auto Changeover Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_25",
    "name": "ഇലക്ട്രിക്കൽ - Power Factor Capacitor Bank",
    "en": "Power Factor Capacitor Bank",
    "ml": "ഇലക്ട്രിക്കൽ - Power Factor Capacitor Bank",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Power Factor Capacitor Bank Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_26",
    "name": "Busbar Trunking ഫിറ്റിംഗ്",
    "en": "Busbar Trunking Installation",
    "ml": "Busbar Trunking ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Busbar Trunking Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_27",
    "name": "ഇലക്ട്രിക്കൽ - Lightning Arrester Protection",
    "en": "Lightning Arrester Protection",
    "ml": "ഇലക്ട്രിക്കൽ - Lightning Arrester Protection",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Lightning Arrester Protection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_28",
    "name": "ഇലക്ട്രിക്കൽ - Factory High Bay Lighting",
    "en": "Factory High Bay Lighting",
    "ml": "ഇലക്ട്രിക്കൽ - Factory High Bay Lighting",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Factory High Bay Lighting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_29",
    "name": "ഇലക്ട്രിക്കൽ - Electrical Safety Energy Audit",
    "en": "Electrical Safety Energy Audit",
    "ml": "ഇലക്ട്രിക്കൽ - Electrical Safety Energy Audit",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Electrical Safety Energy Audit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_30",
    "name": "ഇലക്ട്രിക്കൽ - HT/LT Underground Cable Joint",
    "en": "HT/LT Underground Cable Joint",
    "ml": "ഇലക്ട്രിക്കൽ - HT/LT Underground Cable Joint",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "HT/LT Underground Cable Joint Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_31",
    "name": "ഇലക്ട്രിക്കൽ - Phase Sequence Correction",
    "en": "Phase Sequence Correction",
    "ml": "ഇലക്ട്രിക്കൽ - Phase Sequence Correction",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Phase Sequence Correction Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_32",
    "name": "ഇലക്ട്രിക്കൽ - VFD Variable Frequency Drive",
    "en": "VFD Variable Frequency Drive",
    "ml": "ഇലക്ട്രിക്കൽ - VFD Variable Frequency Drive",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "VFD Variable Frequency Drive Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_33",
    "name": "ഇലക്ട്രിക്കൽ - Warehouse Flood Lighting",
    "en": "Warehouse Flood Lighting",
    "ml": "ഇലക്ട്രിക്കൽ - Warehouse Flood Lighting",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Warehouse Flood Lighting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_34",
    "name": "Heavy Machinery Power വയറിംഗ്",
    "en": "Heavy Machinery Power Wiring",
    "ml": "Heavy Machinery Power വയറിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Heavy Machinery Power Wiring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_35",
    "name": "ഇലക്ട്രിക്കൽ - Server Room Dual Power Line",
    "en": "Server Room Dual Power Line",
    "ml": "ഇലക്ട്രിക്കൽ - Server Room Dual Power Line",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Server Room Dual Power Line Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_36",
    "name": "ഇലക്ട്രിക്കൽ - Emergency Lighting Battery Backup",
    "en": "Emergency Lighting Battery Backup",
    "ml": "ഇലക്ട്രിക്കൽ - Emergency Lighting Battery Backup",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Emergency Lighting Battery Backup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_37",
    "name": "Smart Touch Switch ഫിറ്റിംഗ്",
    "en": "Smart Touch Switch Installation",
    "ml": "Smart Touch Switch ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Smart Touch Switch Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_38",
    "name": "ഇലക്ട്രിക്കൽ - WiFi Smart Bulb Controller",
    "en": "WiFi Smart Bulb Controller",
    "ml": "ഇലക്ട്രിക്കൽ - WiFi Smart Bulb Controller",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "WiFi Smart Bulb Controller Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_39",
    "name": "Motion Sensor Lighting ഫിറ്റിംഗ്",
    "en": "Motion Sensor Lighting Fitting",
    "ml": "Motion Sensor Lighting ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Motion Sensor Lighting Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_40",
    "name": "Automated Curtains Motor സെറ്റപ്പ്",
    "en": "Automated Curtains Motor Setup",
    "ml": "Automated Curtains Motor സെറ്റപ്പ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Automated Curtains Motor Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_41",
    "name": "Smart Thermostat ഫിറ്റിംഗ്",
    "en": "Smart Thermostat Installation",
    "ml": "Smart Thermostat ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Smart Thermostat Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_42",
    "name": "ഇലക്ട്രിക്കൽ - Voice Assistant Home Linkage",
    "en": "Voice Assistant Home Linkage",
    "ml": "ഇലക്ട്രിക്കൽ - Voice Assistant Home Linkage",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Voice Assistant Home Linkage Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_43",
    "name": "Smart Video Door Phone വയറിംഗ്",
    "en": "Smart Video Door Phone Wiring",
    "ml": "Smart Video Door Phone വയറിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Smart Video Door Phone Wiring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_44",
    "name": "Smart Lock Power Line സെറ്റപ്പ്",
    "en": "Smart Lock Power Line Setup",
    "ml": "Smart Lock Power Line സെറ്റപ്പ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Smart Lock Power Line Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_45",
    "name": "ഇലക്ട്രിക്കൽ - Automated Water Sump Controller",
    "en": "Automated Water Sump Controller",
    "ml": "ഇലക്ട്രിക്കൽ - Automated Water Sump Controller",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Automated Water Sump Controller Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_46",
    "name": "Solar Inverter Smart App സെറ്റപ്പ്",
    "en": "Solar Inverter Smart App Setup",
    "ml": "Solar Inverter Smart App സെറ്റപ്പ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Solar Inverter Smart App Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_47",
    "name": "ഇലക്ട്രിക്കൽ - Dimmer Switch Mood Lighting",
    "en": "Dimmer Switch Mood Lighting",
    "ml": "ഇലക്ട്രിക്കൽ - Dimmer Switch Mood Lighting",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Dimmer Switch Mood Lighting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_48",
    "name": "RGB Strip Light Profile ഫിറ്റിംഗ്",
    "en": "RGB Strip Light Profile Fitting",
    "ml": "RGB Strip Light Profile ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "RGB Strip Light Profile Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_49",
    "name": "Home EV 3.3kW Charger ഫിറ്റിംഗ്",
    "en": "Home EV 3.3kW Charger Fitting",
    "ml": "Home EV 3.3kW Charger ഫിറ്റിംഗ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Home EV 3.3kW Charger Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_50",
    "name": "Fast EV 7.4kW Wallbox സെറ്റപ്പ്",
    "en": "Fast EV 7.4kW Wallbox Setup",
    "ml": "Fast EV 7.4kW Wallbox സെറ്റപ്പ്",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Fast EV 7.4kW Wallbox Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_51",
    "name": "ഇലക്ട്രിക്കൽ - Commercial EV Charging Station",
    "en": "Commercial EV Charging Station",
    "ml": "ഇലക്ട്രിക്കൽ - Commercial EV Charging Station",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Commercial EV Charging Station Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_52",
    "name": "പ്ലംബിംഗ് - PVC Overhead Pipeline Laying",
    "en": "PVC Overhead Pipeline Laying",
    "ml": "പ്ലംബിംഗ് - PVC Overhead Pipeline Laying",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "PVC Overhead Pipeline Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_53",
    "name": "CPVC കൺസീൽഡ് Hot Water Piping",
    "en": "CPVC Concealed Hot Water Piping",
    "ml": "CPVC കൺസീൽഡ് Hot Water Piping",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "CPVC Concealed Hot Water Piping Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_54",
    "name": "പ്ലംബിംഗ് - UPVC Cold Water Plumbing",
    "en": "UPVC Cold Water Plumbing",
    "ml": "പ്ലംബിംഗ് - UPVC Cold Water Plumbing",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "UPVC Cold Water Plumbing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_55",
    "name": "PEX Flexible Pipe ഫിറ്റിംഗ്",
    "en": "PEX Flexible Pipe Installation",
    "ml": "PEX Flexible Pipe ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "PEX Flexible Pipe Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_56",
    "name": "Overhead വാട്ടർ ടാങ്ക് ഫിറ്റിംഗ് (500L-2000L)",
    "en": "Overhead Water Tank Fitting (500L-2000L)",
    "ml": "Overhead വാട്ടർ ടാങ്ക് ഫിറ്റിംഗ് (500L-2000L)",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Overhead Water Tank Fitting (500L-2000L) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_57",
    "name": "വാട്ടർ ടാങ്ക് Automatic Float Valve",
    "en": "Water Tank Automatic Float Valve",
    "ml": "വാട്ടർ ടാങ്ക് Automatic Float Valve",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Water Tank Automatic Float Valve Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_58",
    "name": "പ്ലംബിംഗ് - Water Pressure Booster Pump",
    "en": "Water Pressure Booster Pump",
    "ml": "പ്ലംബിംഗ് - Water Pressure Booster Pump",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Water Pressure Booster Pump Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_59",
    "name": "Water Meter ഫിറ്റിംഗ് & Check",
    "en": "Water Meter Installation & Check",
    "ml": "Water Meter ഫിറ്റിംഗ് & Check",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Water Meter Installation & Check Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_60",
    "name": "പ്ലംബിംഗ് - Borewell to Tank Pipeline Connection",
    "en": "Borewell to Tank Pipeline Connection",
    "ml": "പ്ലംബിംഗ് - Borewell to Tank Pipeline Connection",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Borewell to Tank Pipeline Connection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_61",
    "name": "പ്ലംബിംഗ് - Rainwater Harvesting Filter Piping",
    "en": "Rainwater Harvesting Filter Piping",
    "ml": "പ്ലംബിംഗ് - Rainwater Harvesting Filter Piping",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Rainwater Harvesting Filter Piping Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_62",
    "name": "പ്ലംബിംഗ് - Underground Sump Pipeline Laying",
    "en": "Underground Sump Pipeline Laying",
    "ml": "പ്ലംബിംഗ് - Underground Sump Pipeline Laying",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Underground Sump Pipeline Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_63",
    "name": "പ്ലംബിംഗ് - Municipal Water Pipe Tapping",
    "en": "Municipal Water Pipe Tapping",
    "ml": "പ്ലംബിംഗ് - Municipal Water Pipe Tapping",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Municipal Water Pipe Tapping Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_64",
    "name": "പ്ലംബിംഗ് - Plumbing Air Lock Removal",
    "en": "Plumbing Air Lock Removal",
    "ml": "പ്ലംബിംഗ് - Plumbing Air Lock Removal",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Plumbing Air Lock Removal Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_65",
    "name": "Water Pipeline കൺസീൽഡ് Leak Detection",
    "en": "Water Pipeline Concealed Leak Detection",
    "ml": "Water Pipeline കൺസീൽഡ് Leak Detection",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Water Pipeline Concealed Leak Detection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_66",
    "name": "Non-Return Check Valve ഫിറ്റിംഗ്",
    "en": "Non-Return Check Valve Fitting",
    "ml": "Non-Return Check Valve ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Non-Return Check Valve Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_67",
    "name": "പ്ലംബിംഗ് - Water Pressure Regulator Valve",
    "en": "Water Pressure Regulator Valve",
    "ml": "പ്ലംബിംഗ് - Water Pressure Regulator Valve",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Water Pressure Regulator Valve Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_68",
    "name": "പ്ലംബിംഗ് - Garden Drip Irrigation Pipeline",
    "en": "Garden Drip Irrigation Pipeline",
    "ml": "പ്ലംബിംഗ് - Garden Drip Irrigation Pipeline",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Garden Drip Irrigation Pipeline Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_69",
    "name": "പ്ലംബിംഗ് - Kitchen RO Purifier Inlet Pipeline",
    "en": "Kitchen RO Purifier Inlet Pipeline",
    "ml": "പ്ലംബിംഗ് - Kitchen RO Purifier Inlet Pipeline",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kitchen RO Purifier Inlet Pipeline Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_70",
    "name": "വാഷിംഗ് മെഷീൻ Inlet Drain ഫിറ്റിംഗ്",
    "en": "Washing Machine Inlet Drain Fitting",
    "ml": "വാഷിംഗ് മെഷീൻ Inlet Drain ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Washing Machine Inlet Drain Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_71",
    "name": "പ്ലംബിംഗ് - Water Softener Unit Connection",
    "en": "Water Softener Unit Connection",
    "ml": "പ്ലംബിംഗ് - Water Softener Unit Connection",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Water Softener Unit Connection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_72",
    "name": "Wall-Hung Commode ഫിറ്റിംഗ്",
    "en": "Wall-Hung Commode Installation",
    "ml": "Wall-Hung Commode ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Wall-Hung Commode Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_73",
    "name": "കൺസീൽഡ് Cistern Flush Tank റിപ്പയർ",
    "en": "Concealed Cistern Flush Tank Repair",
    "ml": "കൺസീൽഡ് Cistern Flush Tank റിപ്പയർ",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Concealed Cistern Flush Tank Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_74",
    "name": "European Water Closet ഫിറ്റിംഗ്",
    "en": "European Water Closet Fitting",
    "ml": "European Water Closet ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "European Water Closet Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_75",
    "name": "Indian Squatting Pan ഫിറ്റിംഗ്",
    "en": "Indian Squatting Pan Installation",
    "ml": "Indian Squatting Pan ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Indian Squatting Pan Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_76",
    "name": "Single Lever Diverter Valve റിപ്പയർ",
    "en": "Single Lever Diverter Valve Repair",
    "ml": "Single Lever Diverter Valve റിപ്പയർ",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Single Lever Diverter Valve Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_77",
    "name": "Thermostatic Shower Mixer ഫിറ്റിംഗ്",
    "en": "Thermostatic Shower Mixer Fitting",
    "ml": "Thermostatic Shower Mixer ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Thermostatic Shower Mixer Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_78",
    "name": "Overhead Rain Shower ഫിറ്റിംഗ്",
    "en": "Overhead Rain Shower Installation",
    "ml": "Overhead Rain Shower ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Overhead Rain Shower Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_79",
    "name": "Hand Jet Spray മാറ്റൽ",
    "en": "Hand Jet Spray Replacement",
    "ml": "Hand Jet Spray മാറ്റൽ",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Hand Jet Spray Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_80",
    "name": "Countertop Wash Basin ഫിറ്റിംഗ്",
    "en": "Countertop Wash Basin Fitting",
    "ml": "Countertop Wash Basin ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Countertop Wash Basin Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_81",
    "name": "Under-Counter Basin ഫിറ്റിംഗ്",
    "en": "Under-Counter Basin Installation",
    "ml": "Under-Counter Basin ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Under-Counter Basin Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_82",
    "name": "Half Pedestal Basin ഫിറ്റിംഗ്",
    "en": "Half Pedestal Basin Fitting",
    "ml": "Half Pedestal Basin ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Half Pedestal Basin Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_83",
    "name": "പ്ലംബിംഗ് - Hot & Cold Water Basin Mixer",
    "en": "Hot & Cold Water Basin Mixer",
    "ml": "പ്ലംബിംഗ് - Hot & Cold Water Basin Mixer",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Hot & Cold Water Basin Mixer Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_84",
    "name": "Bathroom Floor Drain Trap ക്ലീനിംഗ്",
    "en": "Bathroom Floor Drain Trap Cleaning",
    "ml": "Bathroom Floor Drain Trap ക്ലീനിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Bathroom Floor Drain Trap Cleaning Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_85",
    "name": "Bathtub Plumbing & ഫിറ്റിംഗ്",
    "en": "Bathtub Plumbing & Installation",
    "ml": "Bathtub Plumbing & ഫിറ്റിംഗ്",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Bathtub Plumbing & Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_86",
    "name": "പ്ലംബിംഗ് - Jacuzzi Water Jet Plumbing",
    "en": "Jacuzzi Water Jet Plumbing",
    "ml": "പ്ലംബിംഗ് - Jacuzzi Water Jet Plumbing",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Jacuzzi Water Jet Plumbing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_87",
    "name": "പ്ലംബിംഗ് - Glass Partition Shower Enclosure",
    "en": "Glass Partition Shower Enclosure",
    "ml": "പ്ലംബിംഗ് - Glass Partition Shower Enclosure",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Glass Partition Shower Enclosure Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_88",
    "name": "പ്ലംബിംഗ് - Kitchen Sink Drain Unclogging",
    "en": "Kitchen Sink Drain Unclogging",
    "ml": "പ്ലംബിംഗ് - Kitchen Sink Drain Unclogging",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kitchen Sink Drain Unclogging Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_89",
    "name": "പ്ലംബിംഗ് - Heavy Sewer Line Rodding Work",
    "en": "Heavy Sewer Line Rodding Work",
    "ml": "പ്ലംബിംഗ് - Heavy Sewer Line Rodding Work",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Heavy Sewer Line Rodding Work Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_90",
    "name": "പ്ലംബിംഗ് - Septic Tank Inlet Outlet Connection",
    "en": "Septic Tank Inlet Outlet Connection",
    "ml": "പ്ലംബിംഗ് - Septic Tank Inlet Outlet Connection",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Septic Tank Inlet Outlet Connection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_91",
    "name": "Gully Trap & പരിശോധന Chamber",
    "en": "Gully Trap & Inspection Chamber",
    "ml": "Gully Trap & പരിശോധന Chamber",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Gully Trap & Inspection Chamber Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_92",
    "name": "Manhole Cover മാറ്റൽ",
    "en": "Manhole Cover Replacement",
    "ml": "Manhole Cover മാറ്റൽ",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Manhole Cover Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_93",
    "name": "Grease Trap ക്ലീനിംഗ് & Pipe Flush",
    "en": "Grease Trap Cleaning & Pipe Flush",
    "ml": "Grease Trap ക്ലീനിംഗ് & Pipe Flush",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Grease Trap Cleaning & Pipe Flush Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_94",
    "name": "Storage Geyser ഫിറ്റിംഗ് (10L-25L)",
    "en": "Storage Geyser Installation (10L-25L)",
    "ml": "Storage Geyser ഫിറ്റിംഗ് (10L-25L)",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Storage Geyser Installation (10L-25L) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_95",
    "name": "Instant Water Geyser ഫിറ്റിംഗ് (3L)",
    "en": "Instant Water Geyser Fitting (3L)",
    "ml": "Instant Water Geyser ഫിറ്റിംഗ് (3L)",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Instant Water Geyser Fitting (3L) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_96",
    "name": "Solar വാട്ടർ ഹീറ്റർ Roof Plumbing",
    "en": "Solar Water Heater Roof Plumbing",
    "ml": "Solar വാട്ടർ ഹീറ്റർ Roof Plumbing",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Solar Water Heater Roof Plumbing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_97",
    "name": "പ്ലംബിംഗ് - Central Water Filtration Sand Filter",
    "en": "Central Water Filtration Sand Filter",
    "ml": "പ്ലംബിംഗ് - Central Water Filtration Sand Filter",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Central Water Filtration Sand Filter Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_98",
    "name": "പ്ലംബിംഗ് - Iron Removal Filter for Borewell",
    "en": "Iron Removal Filter for Borewell",
    "ml": "പ്ലംബിംഗ് - Iron Removal Filter for Borewell",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Iron Removal Filter for Borewell Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_99",
    "name": "പ്ലംബിംഗ് - RO Membrane Flush & Filter Change",
    "en": "RO Membrane Flush & Filter Change",
    "ml": "പ്ലംബിംഗ് - RO Membrane Flush & Filter Change",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "RO Membrane Flush & Filter Change Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_100",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Full Chemical Foam Wash",
    "en": "Split AC Full Chemical Foam Wash",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Full Chemical Foam Wash",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Full Chemical Foam Wash Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_101",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Jet Pump Water Servicing",
    "en": "Split AC Jet Pump Water Servicing",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Jet Pump Water Servicing",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Jet Pump Water Servicing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_102",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Copper Piping & Concealing",
    "en": "Split AC Copper Piping & Concealing",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Copper Piping & Concealing",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Copper Piping & Concealing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_103",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Uninstallation & Shifting",
    "en": "Split AC Uninstallation & Shifting",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Uninstallation & Shifting",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Uninstallation & Shifting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_104",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Wall Bracket Mounting",
    "en": "Split AC Wall Bracket Mounting",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Wall Bracket Mounting",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Wall Bracket Mounting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_105",
    "name": "Split AC Outdoor Unit Stand ഫിറ്റിംഗ്",
    "en": "Split AC Outdoor Unit Stand Fitting",
    "ml": "Split AC Outdoor Unit Stand ഫിറ്റിംഗ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Outdoor Unit Stand Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_106",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Indoor Drain Pipe Clean",
    "en": "Split AC Indoor Drain Pipe Clean",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Indoor Drain Pipe Clean",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Indoor Drain Pipe Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_107",
    "name": "Split AC Blower Motor റിപ്പയർ",
    "en": "Split AC Blower Motor Repair",
    "ml": "Split AC Blower Motor റിപ്പയർ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Blower Motor Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_108",
    "name": "Split AC Swing Motor മാറ്റൽ",
    "en": "Split AC Swing Motor Replacement",
    "ml": "Split AC Swing Motor മാറ്റൽ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Swing Motor Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_109",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Remote Sensor PCB Fix",
    "en": "Split AC Remote Sensor PCB Fix",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Remote Sensor PCB Fix",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Remote Sensor PCB Fix Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_110",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Compressor Capacitor Change",
    "en": "Split AC Compressor Capacitor Change",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Compressor Capacitor Change",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Compressor Capacitor Change Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_111",
    "name": "Split AC Expansion Valve റിപ്പയർ",
    "en": "Split AC Expansion Valve Repair",
    "ml": "Split AC Expansion Valve റിപ്പയർ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Expansion Valve Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_112",
    "name": "Split AC Filter ക്ലീനിംഗ് & Disinfect",
    "en": "Split AC Filter Cleaning & Disinfect",
    "ml": "Split AC Filter ക്ലീനിംഗ് & Disinfect",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Filter Cleaning & Disinfect Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_113",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Anti-Rust Coil Spray",
    "en": "Split AC Anti-Rust Coil Spray",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Anti-Rust Coil Spray",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Anti-Rust Coil Spray Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_114",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC Thermal Insulation Wrap",
    "en": "Split AC Thermal Insulation Wrap",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC Thermal Insulation Wrap",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC Thermal Insulation Wrap Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_115",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC R32 Refrigerant Top Up",
    "en": "Split AC R32 Refrigerant Top Up",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC R32 Refrigerant Top Up",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC R32 Refrigerant Top Up Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_116",
    "name": "എസി & ഫ്രിഡ്ജ് - Split AC R410A Eco Gas Full Charge",
    "en": "Split AC R410A Eco Gas Full Charge",
    "ml": "എസി & ഫ്രിഡ്ജ് - Split AC R410A Eco Gas Full Charge",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Split AC R410A Eco Gas Full Charge Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_117",
    "name": "എസി & ഫ്രിഡ്ജ് - R22 Refrigerant Gas Refilling",
    "en": "R22 Refrigerant Gas Refilling",
    "ml": "എസി & ഫ്രിഡ്ജ് - R22 Refrigerant Gas Refilling",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "R22 Refrigerant Gas Refilling Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_118",
    "name": "എസി & ഫ്രിഡ്ജ് - AC Flare Nut Nitrogen Leak Test",
    "en": "AC Flare Nut Nitrogen Leak Test",
    "ml": "എസി & ഫ്രിഡ്ജ് - AC Flare Nut Nitrogen Leak Test",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "AC Flare Nut Nitrogen Leak Test Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_119",
    "name": "എസി & ഫ്രിഡ്ജ് - AC Aluminum Condenser Pin Hole Fix",
    "en": "AC Aluminum Condenser Pin Hole Fix",
    "ml": "എസി & ഫ്രിഡ്ജ് - AC Aluminum Condenser Pin Hole Fix",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "AC Aluminum Condenser Pin Hole Fix Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_120",
    "name": "എസി & ഫ്രിഡ്ജ് - AC Copper Coil Brazing & Welding",
    "en": "AC Copper Coil Brazing & Welding",
    "ml": "എസി & ഫ്രിഡ്ജ് - AC Copper Coil Brazing & Welding",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "AC Copper Coil Brazing & Welding Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_121",
    "name": "AC Vacuum Pump Evacuation സർവീസ്",
    "en": "AC Vacuum Pump Evacuation Service",
    "ml": "AC Vacuum Pump Evacuation സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "AC Vacuum Pump Evacuation Service Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_122",
    "name": "എസി & ഫ്രിഡ്ജ് - AC Suction Pipe Frosting Fix",
    "en": "AC Suction Pipe Frosting Fix",
    "ml": "എസി & ഫ്രിഡ്ജ് - AC Suction Pipe Frosting Fix",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "AC Suction Pipe Frosting Fix Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_123",
    "name": "എസി & ഫ്രിഡ്ജ് - AC Low Cooling Diagnostic Check",
    "en": "AC Low Cooling Diagnostic Check",
    "ml": "എസി & ഫ്രിഡ്ജ് - AC Low Cooling Diagnostic Check",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "AC Low Cooling Diagnostic Check Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_124",
    "name": "Inverter AC Dual Inverter PCB റിപ്പയർ",
    "en": "Inverter AC Dual Inverter PCB Repair",
    "ml": "Inverter AC Dual Inverter PCB റിപ്പയർ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Inverter AC Dual Inverter PCB Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_125",
    "name": "എസി & ഫ്രിഡ്ജ് - Inverter AC Outdoor Motherboard",
    "en": "Inverter AC Outdoor Motherboard",
    "ml": "എസി & ഫ്രിഡ്ജ് - Inverter AC Outdoor Motherboard",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Inverter AC Outdoor Motherboard Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_126",
    "name": "Cassette AC Ceiling ഫിറ്റിംഗ്",
    "en": "Cassette AC Ceiling Installation",
    "ml": "Cassette AC Ceiling ഫിറ്റിംഗ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Cassette AC Ceiling Installation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_127",
    "name": "എസി & ഫ്രിഡ്ജ് - Cassette AC Filter Wash & Clean",
    "en": "Cassette AC Filter Wash & Clean",
    "ml": "എസി & ഫ്രിഡ്ജ് - Cassette AC Filter Wash & Clean",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Cassette AC Filter Wash & Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_128",
    "name": "എസി & ഫ്രിഡ്ജ് - Tower AC Maintenance for Halls",
    "en": "Tower AC Maintenance for Halls",
    "ml": "എസി & ഫ്രിഡ്ജ് - Tower AC Maintenance for Halls",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Tower AC Maintenance for Halls Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_129",
    "name": "Ductable AC Duct ക്ലീനിംഗ് & Sanitizing",
    "en": "Ductable AC Duct Cleaning & Sanitizing",
    "ml": "Ductable AC Duct ക്ലീനിംഗ് & Sanitizing",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Ductable AC Duct Cleaning & Sanitizing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_130",
    "name": "എസി & ഫ്രിഡ്ജ് - Single Door Fridge Gas Charging",
    "en": "Single Door Fridge Gas Charging",
    "ml": "എസി & ഫ്രിഡ്ജ് - Single Door Fridge Gas Charging",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Single Door Fridge Gas Charging Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_131",
    "name": "Double Door Frost Free Fridge സർവീസ്",
    "en": "Double Door Frost Free Fridge Service",
    "ml": "Double Door Frost Free Fridge സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Double Door Frost Free Fridge Service Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_132",
    "name": "Side-by-Side Inverter Fridge റിപ്പയർ",
    "en": "Side-by-Side Inverter Fridge Repair",
    "ml": "Side-by-Side Inverter Fridge റിപ്പയർ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Side-by-Side Inverter Fridge Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_133",
    "name": "ഫ്രിഡ്ജ് Defrost Timer മാറ്റൽ",
    "en": "Refrigerator Defrost Timer Replacement",
    "ml": "ഫ്രിഡ്ജ് Defrost Timer മാറ്റൽ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Refrigerator Defrost Timer Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_134",
    "name": "ഫ്രിഡ്ജ് Bi-Metal Sensor Fix",
    "en": "Refrigerator Bi-Metal Sensor Fix",
    "ml": "ഫ്രിഡ്ജ് Bi-Metal Sensor Fix",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Refrigerator Bi-Metal Sensor Fix Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_135",
    "name": "ഫ്രിഡ്ജ് Thermostat Control റിപ്പയർ",
    "en": "Refrigerator Thermostat Control Repair",
    "ml": "ഫ്രിഡ്ജ് Thermostat Control റിപ്പയർ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Refrigerator Thermostat Control Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_136",
    "name": "എസി & ഫ്രിഡ്ജ് - Fridge Door Rubber Gasket Change",
    "en": "Fridge Door Rubber Gasket Change",
    "ml": "എസി & ഫ്രിഡ്ജ് - Fridge Door Rubber Gasket Change",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Fridge Door Rubber Gasket Change Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_137",
    "name": "Deep Freezer Commercial സർവീസ്",
    "en": "Deep Freezer Commercial Service",
    "ml": "Deep Freezer Commercial സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Deep Freezer Commercial Service Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_138",
    "name": "Ice Cream Display Freezer റിപ്പയർ",
    "en": "Ice Cream Display Freezer Repair",
    "ml": "Ice Cream Display Freezer റിപ്പയർ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Ice Cream Display Freezer Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_139",
    "name": "എസി & ഫ്രിഡ്ജ് - Under-Counter Chiller Maintenance",
    "en": "Under-Counter Chiller Maintenance",
    "ml": "എസി & ഫ്രിഡ്ജ് - Under-Counter Chiller Maintenance",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Under-Counter Chiller Maintenance Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_140",
    "name": "Bottle Cooler Compressor റിപ്പയർ",
    "en": "Bottle Cooler Compressor Repair",
    "ml": "Bottle Cooler Compressor റിപ്പയർ",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Bottle Cooler Compressor Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_141",
    "name": "Commercial Water Cooler സർവീസ്",
    "en": "Commercial Water Cooler Service",
    "ml": "Commercial Water Cooler സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Commercial Water Cooler Service Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_142",
    "name": "തടിപ്പണി - Modular Kitchen Marine Ply Design",
    "en": "Modular Kitchen Marine Ply Design",
    "ml": "തടിപ്പണി - Modular Kitchen Marine Ply Design",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Modular Kitchen Marine Ply Design Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_143",
    "name": "തടിപ്പണി - Acrylic Finish Kitchen Shutters",
    "en": "Acrylic Finish Kitchen Shutters",
    "ml": "തടിപ്പണി - Acrylic Finish Kitchen Shutters",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Acrylic Finish Kitchen Shutters Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_144",
    "name": "തടിപ്പണി - Laminate Finish Modular Cabinets",
    "en": "Laminate Finish Modular Cabinets",
    "ml": "തടിപ്പണി - Laminate Finish Modular Cabinets",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Laminate Finish Modular Cabinets Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_145",
    "name": "Soft-Close Tandem Drawer ഫിറ്റിംഗ്",
    "en": "Soft-Close Tandem Drawer Fitting",
    "ml": "Soft-Close Tandem Drawer ഫിറ്റിംഗ്",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Soft-Close Tandem Drawer Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_146",
    "name": "തടിപ്പണി - Stainless Steel Kitchen Basket Pullout",
    "en": "Stainless Steel Kitchen Basket Pullout",
    "ml": "തടിപ്പണി - Stainless Steel Kitchen Basket Pullout",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Stainless Steel Kitchen Basket Pullout Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_147",
    "name": "Kitchen Corner Carousel ഫിറ്റിംഗ്",
    "en": "Kitchen Corner Carousel Fitting",
    "ml": "Kitchen Corner Carousel ഫിറ്റിംഗ്",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kitchen Corner Carousel Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_148",
    "name": "തടിപ്പണി - Overhead Wall Cabinet Mounting",
    "en": "Overhead Wall Cabinet Mounting",
    "ml": "തടിപ്പണി - Overhead Wall Cabinet Mounting",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Overhead Wall Cabinet Mounting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_149",
    "name": "തടിപ്പണി - Kitchen Chimney Wooden Box Cover",
    "en": "Kitchen Chimney Wooden Box Cover",
    "ml": "തടിപ്പണി - Kitchen Chimney Wooden Box Cover",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kitchen Chimney Wooden Box Cover Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_150",
    "name": "തടിപ്പണി - Tall Grocery Pantry Unit Making",
    "en": "Tall Grocery Pantry Unit Making",
    "ml": "തടിപ്പണി - Tall Grocery Pantry Unit Making",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Tall Grocery Pantry Unit Making Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_151",
    "name": "തടിപ്പണി - Breakfast Counter Wooden Top",
    "en": "Breakfast Counter Wooden Top",
    "ml": "തടിപ്പണി - Breakfast Counter Wooden Top",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Breakfast Counter Wooden Top Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_152",
    "name": "തടിപ്പണി - Cutlery Tray & Utensil Organizers",
    "en": "Cutlery Tray & Utensil Organizers",
    "ml": "തടിപ്പണി - Cutlery Tray & Utensil Organizers",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Cutlery Tray & Utensil Organizers Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_153",
    "name": "Hettich Soft Hinges സെറ്റപ്പ്",
    "en": "Hettich Soft Hinges Setup",
    "ml": "Hettich Soft Hinges സെറ്റപ്പ്",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Hettich Soft Hinges Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_154",
    "name": "തടിപ്പണി - Teak Wood Main Door Carving & Fit",
    "en": "Teak Wood Main Door Carving & Fit",
    "ml": "തടിപ്പണി - Teak Wood Main Door Carving & Fit",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Teak Wood Main Door Carving & Fit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_155",
    "name": "Anjili Mahagony Door Frame ഫിറ്റിംഗ്",
    "en": "Anjili Mahagony Door Frame Fitting",
    "ml": "Anjili Mahagony Door Frame ഫിറ്റിംഗ്",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Anjili Mahagony Door Frame Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_156",
    "name": "Flush Door ഫിറ്റിംഗ് & Planing",
    "en": "Flush Door Installation & Planing",
    "ml": "Flush Door ഫിറ്റിംഗ് & Planing",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Flush Door Installation & Planing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_157",
    "name": "തടിപ്പണി - Waterproof PVC Bathroom Door",
    "en": "Waterproof PVC Bathroom Door",
    "ml": "തടിപ്പണി - Waterproof PVC Bathroom Door",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Waterproof PVC Bathroom Door Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_158",
    "name": "തടിപ്പണി - Fibre Molded Interior Room Door",
    "en": "Fibre Molded Interior Room Door",
    "ml": "തടിപ്പണി - Fibre Molded Interior Room Door",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Fibre Molded Interior Room Door Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_159",
    "name": "Sliding Pocket തടി വാതിൽ നിർമ്മാണം ഫിറ്റിംഗ്",
    "en": "Sliding Pocket Wooden Door Fitting",
    "ml": "Sliding Pocket തടി വാതിൽ നിർമ്മാണം ഫിറ്റിംഗ്",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Sliding Pocket Wooden Door Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_160",
    "name": "തടിപ്പണി - Traditional Kerala Wooden Window",
    "en": "Traditional Kerala Wooden Window",
    "ml": "തടിപ്പണി - Traditional Kerala Wooden Window",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Traditional Kerala Wooden Window Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_161",
    "name": "തടിപ്പണി - Glass Inset Wooden French Door",
    "en": "Glass Inset Wooden French Door",
    "ml": "തടിപ്പണി - Glass Inset Wooden French Door",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Glass Inset Wooden French Door Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_162",
    "name": "Godrej Yale Main Door Lock ഫിറ്റിംഗ്",
    "en": "Godrej Yale Main Door Lock Fitting",
    "ml": "Godrej Yale Main Door Lock ഫിറ്റിംഗ്",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Godrej Yale Main Door Lock Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_163",
    "name": "തടിപ്പണി - King Size Teak Wood Bed with Storage",
    "en": "King Size Teak Wood Bed with Storage",
    "ml": "തടിപ്പണി - King Size Teak Wood Bed with Storage",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "King Size Teak Wood Bed with Storage Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_164",
    "name": "തടിപ്പണി - Queen Size Hydraulic Bed Making",
    "en": "Queen Size Hydraulic Bed Making",
    "ml": "തടിപ്പണി - Queen Size Hydraulic Bed Making",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Queen Size Hydraulic Bed Making Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_165",
    "name": "Custom 6-Door Bedroom വാർഡ്രോബ് വർക്ക്",
    "en": "Custom 6-Door Bedroom Wardrobe",
    "ml": "Custom 6-Door Bedroom വാർഡ്രോബ് വർക്ക്",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Custom 6-Door Bedroom Wardrobe Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_166",
    "name": "തടിപ്പണി - Walk-in Closet Shelving & Drawers",
    "en": "Walk-in Closet Shelving & Drawers",
    "ml": "തടിപ്പണി - Walk-in Closet Shelving & Drawers",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Walk-in Closet Shelving & Drawers Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_167",
    "name": "തടിപ്പണി - Dining Table 6-Seater Solid Wood",
    "en": "Dining Table 6-Seater Solid Wood",
    "ml": "തടിപ്പണി - Dining Table 6-Seater Solid Wood",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Dining Table 6-Seater Solid Wood Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_168",
    "name": "തടിപ്പണി - Custom Wooden Sofa Settee Making",
    "en": "Custom Wooden Sofa Settee Making",
    "ml": "തടിപ്പണി - Custom Wooden Sofa Settee Making",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Custom Wooden Sofa Settee Making Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_169",
    "name": "തടിപ്പണി - Living Room TV Entertainment Unit",
    "en": "Living Room TV Entertainment Unit",
    "ml": "തടിപ്പണി - Living Room TV Entertainment Unit",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Living Room TV Entertainment Unit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_170",
    "name": "തടിപ്പണി - Crockery Display Glass Cabinet",
    "en": "Crockery Display Glass Cabinet",
    "ml": "തടിപ്പണി - Crockery Display Glass Cabinet",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Crockery Display Glass Cabinet Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_171",
    "name": "തടിപ്പണി - Home Study Table & Bookshelf",
    "en": "Home Study Table & Bookshelf",
    "ml": "തടിപ്പണി - Home Study Table & Bookshelf",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Home Study Table & Bookshelf Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_172",
    "name": "Shoe Rack with Louvered തടി വാതിൽ നിർമ്മാണംs",
    "en": "Shoe Rack with Louvered Wooden Doors",
    "ml": "Shoe Rack with Louvered തടി വാതിൽ നിർമ്മാണംs",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Shoe Rack with Louvered Wooden Doors Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_173",
    "name": "തടിപ്പണി - Dressing Table with Vanity Mirror",
    "en": "Dressing Table with Vanity Mirror",
    "ml": "തടിപ്പണി - Dressing Table with Vanity Mirror",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Dressing Table with Vanity Mirror Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_174",
    "name": "തടിപ്പണി - Pooja Mandapam Teak Wood Carved",
    "en": "Pooja Mandapam Teak Wood Carved",
    "ml": "തടിപ്പണി - Pooja Mandapam Teak Wood Carved",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Pooja Mandapam Teak Wood Carved Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_175",
    "name": "തടിപ്പണി - Old Teak Furniture PU Wood Polish",
    "en": "Old Teak Furniture PU Wood Polish",
    "ml": "തടിപ്പണി - Old Teak Furniture PU Wood Polish",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Old Teak Furniture PU Wood Polish Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_176",
    "name": "തടിപ്പണി - French Spirit Polish Traditional Hand",
    "en": "French Spirit Polish Traditional Hand",
    "ml": "തടിപ്പണി - French Spirit Polish Traditional Hand",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "French Spirit Polish Traditional Hand Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_177",
    "name": "തടിപ്പണി - Melamine Clear Matte Finish Polish",
    "en": "Melamine Clear Matte Finish Polish",
    "ml": "തടിപ്പണി - Melamine Clear Matte Finish Polish",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Melamine Clear Matte Finish Polish Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_178",
    "name": "Wooden Floor Scratch പോളിഷിംഗ്",
    "en": "Wooden Floor Scratch Polishing",
    "ml": "Wooden Floor Scratch പോളിഷിംഗ്",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Wooden Floor Scratch Polishing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_179",
    "name": "Termite Damaged Plywood മാറ്റൽ",
    "en": "Termite Damaged Plywood Replacement",
    "ml": "Termite Damaged Plywood മാറ്റൽ",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Termite Damaged Plywood Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_180",
    "name": "Loose Hinges & Channel Screws റിപ്പയർ",
    "en": "Loose Hinges & Channel Screws Repair",
    "ml": "Loose Hinges & Channel Screws റിപ്പയർ",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Loose Hinges & Channel Screws Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_181",
    "name": "Interior Acrylic വാൾ പുട്ടി വർക്ക് (2 Coats)",
    "en": "Interior Acrylic Wall Putty (2 Coats)",
    "ml": "Interior Acrylic വാൾ പുട്ടി വർക്ക് (2 Coats)",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Interior Acrylic Wall Putty (2 Coats) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_182",
    "name": "Interior Primer Water-Based കോട്ടിംഗ്",
    "en": "Interior Primer Water-Based Coating",
    "ml": "Interior Primer Water-Based കോട്ടിംഗ്",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Interior Primer Water-Based Coating Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_183",
    "name": "പെയിന്റിംഗ് - Premium Interior Emulsion Paint",
    "en": "Premium Interior Emulsion Paint",
    "ml": "പെയിന്റിംഗ് - Premium Interior Emulsion Paint",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Premium Interior Emulsion Paint Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_184",
    "name": "പെയിന്റിംഗ് - Royal Luxury Silk Interior Emulsion",
    "en": "Royal Luxury Silk Interior Emulsion",
    "ml": "പെയിന്റിംഗ് - Royal Luxury Silk Interior Emulsion",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Royal Luxury Silk Interior Emulsion Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_185",
    "name": "പെയിന്റിംഗ് - Anti-Bacterial Interior Wall Paint",
    "en": "Anti-Bacterial Interior Wall Paint",
    "ml": "പെയിന്റിംഗ് - Anti-Bacterial Interior Wall Paint",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Anti-Bacterial Interior Wall Paint Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_186",
    "name": "പെയിന്റിംഗ് - Ceiling Distemper White Painting",
    "en": "Ceiling Distemper White Painting",
    "ml": "പെയിന്റിംഗ് - Ceiling Distemper White Painting",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Ceiling Distemper White Painting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_187",
    "name": "പെയിന്റിംഗ് - Living Room Accent Wall Color",
    "en": "Living Room Accent Wall Color",
    "ml": "പെയിന്റിംഗ് - Living Room Accent Wall Color",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Living Room Accent Wall Color Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_188",
    "name": "പെയിന്റിംഗ് - Geometric Wall Painting Stencil",
    "en": "Geometric Wall Painting Stencil",
    "ml": "പെയിന്റിംഗ് - Geometric Wall Painting Stencil",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Geometric Wall Painting Stencil Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_189",
    "name": "പെയിന്റിംഗ് - Kids Room Cartoon Mural Painting",
    "en": "Kids Room Cartoon Mural Painting",
    "ml": "പെയിന്റിംഗ് - Kids Room Cartoon Mural Painting",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kids Room Cartoon Mural Painting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_190",
    "name": "പെയിന്റിംഗ് - Metallic Paint Velvet Finish Wall",
    "en": "Metallic Paint Velvet Finish Wall",
    "ml": "പെയിന്റിംഗ് - Metallic Paint Velvet Finish Wall",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Metallic Paint Velvet Finish Wall Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_191",
    "name": "പെയിന്റിംഗ് - Kitchen Washable Oil Emulsion",
    "en": "Kitchen Washable Oil Emulsion",
    "ml": "പെയിന്റിംഗ് - Kitchen Washable Oil Emulsion",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kitchen Washable Oil Emulsion Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_192",
    "name": "Exterior വാൾ പുട്ടി വർക്ക് Application",
    "en": "Exterior Wall Putty Application",
    "ml": "Exterior വാൾ പുട്ടി വർക്ക് Application",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Exterior Wall Putty Application Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_193",
    "name": "പെയിന്റിംഗ് - Weatherproof Exterior Emulsion 7-Yr",
    "en": "Weatherproof Exterior Emulsion 7-Yr",
    "ml": "പെയിന്റിംഗ് - Weatherproof Exterior Emulsion 7-Yr",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Weatherproof Exterior Emulsion 7-Yr Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_194",
    "name": "പെയിന്റിംഗ് - Extreme Rain Guard Silicon Paint",
    "en": "Extreme Rain Guard Silicon Paint",
    "ml": "പെയിന്റിംഗ് - Extreme Rain Guard Silicon Paint",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Extreme Rain Guard Silicon Paint Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_195",
    "name": "Apex Ultima Dust Repellent കോട്ടിംഗ്",
    "en": "Apex Ultima Dust Repellent Coating",
    "ml": "Apex Ultima Dust Repellent കോട്ടിംഗ്",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Apex Ultima Dust Repellent Coating Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_196",
    "name": "പെയിന്റിംഗ് - Exterior Tile & Cladding Clear Coat",
    "en": "Exterior Tile & Cladding Clear Coat",
    "ml": "പെയിന്റിംഗ് - Exterior Tile & Cladding Clear Coat",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Exterior Tile & Cladding Clear Coat Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_197",
    "name": "പെയിന്റിംഗ് - Boundary Wall Exterior Whitewash",
    "en": "Boundary Wall Exterior Whitewash",
    "ml": "പെയിന്റിംഗ് - Boundary Wall Exterior Whitewash",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Boundary Wall Exterior Whitewash Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_198",
    "name": "പെയിന്റിംഗ് - Exterior Crack Bridging Flexible Coat",
    "en": "Exterior Crack Bridging Flexible Coat",
    "ml": "പെയിന്റിംഗ് - Exterior Crack Bridging Flexible Coat",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Exterior Crack Bridging Flexible Coat Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_199",
    "name": "Terrace Roof Waterproof കോട്ടിംഗ്",
    "en": "Terrace Roof Waterproof Coating",
    "ml": "Terrace Roof Waterproof കോട്ടിംഗ്",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Terrace Roof Waterproof Coating Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_200",
    "name": "പെയിന്റിംഗ് - Cool Roof Heat Reflective Paint",
    "en": "Cool Roof Heat Reflective Paint",
    "ml": "പെയിന്റിംഗ് - Cool Roof Heat Reflective Paint",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Cool Roof Heat Reflective Paint Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_201",
    "name": "പെയിന്റിംഗ് - Parapet Wall Crack Sealing Compound",
    "en": "Parapet Wall Crack Sealing Compound",
    "ml": "പെയിന്റിംഗ് - Parapet Wall Crack Sealing Compound",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Parapet Wall Crack Sealing Compound Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_202",
    "name": "പെയിന്റിംഗ് - Rising Dampness Chemical Injection",
    "en": "Rising Dampness Chemical Injection",
    "ml": "പെയിന്റിംഗ് - Rising Dampness Chemical Injection",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Rising Dampness Chemical Injection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_203",
    "name": "പെയിന്റിംഗ് - Basement Wall Crystalline Water Proof",
    "en": "Basement Wall Crystalline Water Proof",
    "ml": "പെയിന്റിംഗ് - Basement Wall Crystalline Water Proof",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Basement Wall Crystalline Water Proof Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_204",
    "name": "പെയിന്റിംഗ് - Bathroom Grouting Waterproof Seal",
    "en": "Bathroom Grouting Waterproof Seal",
    "ml": "പെയിന്റിംഗ് - Bathroom Grouting Waterproof Seal",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Bathroom Grouting Waterproof Seal Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_205",
    "name": "പെയിന്റിംഗ് - Metal Window Grill Enamel Spray",
    "en": "Metal Window Grill Enamel Spray",
    "ml": "പെയിന്റിംഗ് - Metal Window Grill Enamel Spray",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Metal Window Grill Enamel Spray Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_206",
    "name": "പെയിന്റിംഗ് - Compound Wall Gate Gloss Enamel",
    "en": "Compound Wall Gate Gloss Enamel",
    "ml": "പെയിന്റിംഗ് - Compound Wall Gate Gloss Enamel",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Compound Wall Gate Gloss Enamel Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_207",
    "name": "പെയിന്റിംഗ് - Italian Marble Texture Wall Finish",
    "en": "Italian Marble Texture Wall Finish",
    "ml": "പെയിന്റിംഗ് - Italian Marble Texture Wall Finish",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Italian Marble Texture Wall Finish Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_208",
    "name": "പെയിന്റിംഗ് - Wood Polish PU Exterior Gloss",
    "en": "Wood Polish PU Exterior Gloss",
    "ml": "പെയിന്റിംഗ് - Wood Polish PU Exterior Gloss",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Wood Polish PU Exterior Gloss Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_209",
    "name": "പെയിന്റിംഗ് - Wood Melamine Interior Matte",
    "en": "Wood Melamine Interior Matte",
    "ml": "പെയിന്റിംഗ് - Wood Melamine Interior Matte",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Wood Melamine Interior Matte Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_210",
    "name": "Pressure Jet Wash for Moss ക്ലീനിംഗ്",
    "en": "Pressure Jet Wash for Moss Cleaning",
    "ml": "Pressure Jet Wash for Moss ക്ലീനിംഗ്",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Pressure Jet Wash for Moss Cleaning Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_211",
    "name": "മേസൺ വർക്ക് - Laterite Stone Wall Construction",
    "en": "Laterite Stone Wall Construction",
    "ml": "മേസൺ വർക്ക് - Laterite Stone Wall Construction",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Laterite Stone Wall Construction Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_212",
    "name": "മേസൺ വർക്ക് - Red Clay Wire-Cut Brick Masonry",
    "en": "Red Clay Wire-Cut Brick Masonry",
    "ml": "മേസൺ വർക്ക് - Red Clay Wire-Cut Brick Masonry",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Red Clay Wire-Cut Brick Masonry Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_213",
    "name": "മേസൺ വർക്ക് - Solid Concrete Block Wall Building",
    "en": "Solid Concrete Block Wall Building",
    "ml": "മേസൺ വർക്ക് - Solid Concrete Block Wall Building",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Solid Concrete Block Wall Building Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_214",
    "name": "മേസൺ വർക്ക് - Hollow Concrete Block Masonry",
    "en": "Hollow Concrete Block Masonry",
    "ml": "മേസൺ വർക്ക് - Hollow Concrete Block Masonry",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Hollow Concrete Block Masonry Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_215",
    "name": "മേസൺ വർക്ക് - Rubble Stone Basement Foundation",
    "en": "Rubble Stone Basement Foundation",
    "ml": "മേസൺ വർക്ക് - Rubble Stone Basement Foundation",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Rubble Stone Basement Foundation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_216",
    "name": "മേസൺ വർക്ക് - Granite Stone Retaining Wall",
    "en": "Granite Stone Retaining Wall",
    "ml": "മേസൺ വർക്ക് - Granite Stone Retaining Wall",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Granite Stone Retaining Wall Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_217",
    "name": "മേസൺ വർക്ക് - Single Coat Exterior Rough Plaster",
    "en": "Single Coat Exterior Rough Plaster",
    "ml": "മേസൺ വർക്ക് - Single Coat Exterior Rough Plaster",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Single Coat Exterior Rough Plaster Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_218",
    "name": "മേസൺ വർക്ക് - Smooth Float Interior Cement Plaster",
    "en": "Smooth Float Interior Cement Plaster",
    "ml": "മേസൺ വർക്ക് - Smooth Float Interior Cement Plaster",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Smooth Float Interior Cement Plaster Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_219",
    "name": "മേസൺ വർക്ക് - Ceiling Concrete Plastering 1:3",
    "en": "Ceiling Concrete Plastering 1:3",
    "ml": "മേസൺ വർക്ക് - Ceiling Concrete Plastering 1:3",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Ceiling Concrete Plastering 1:3 Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_220",
    "name": "മേസൺ വർക്ക് - RCC Roof Slab Shuttering & Casting",
    "en": "RCC Roof Slab Shuttering & Casting",
    "ml": "മേസൺ വർക്ക് - RCC Roof Slab Shuttering & Casting",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "RCC Roof Slab Shuttering & Casting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_221",
    "name": "മേസൺ വർക്ക് - Concrete Column & Plinth Beam",
    "en": "Concrete Column & Plinth Beam",
    "ml": "മേസൺ വർക്ക് - Concrete Column & Plinth Beam",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Concrete Column & Plinth Beam Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_222",
    "name": "മേസൺ വർക്ക് - Lintel Beam & Sunshade Casting",
    "en": "Lintel Beam & Sunshade Casting",
    "ml": "മേസൺ വർക്ക് - Lintel Beam & Sunshade Casting",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Lintel Beam & Sunshade Casting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_223",
    "name": "മേസൺ വർക്ക് - Concrete Staircase Formwork & Pour",
    "en": "Concrete Staircase Formwork & Pour",
    "ml": "മേസൺ വർക്ക് - Concrete Staircase Formwork & Pour",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Concrete Staircase Formwork & Pour Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_224",
    "name": "മേസൺ വർക്ക് - Compound Wall Coping Concrete Cap",
    "en": "Compound Wall Coping Concrete Cap",
    "ml": "മേസൺ വർക്ക് - Compound Wall Coping Concrete Cap",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Compound Wall Coping Concrete Cap Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_225",
    "name": "മേസൺ വർക്ക് - Screed Concrete Slope for Terrace",
    "en": "Screed Concrete Slope for Terrace",
    "ml": "മേസൺ വർക്ക് - Screed Concrete Slope for Terrace",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Screed Concrete Slope for Terrace Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_226",
    "name": "മേസൺ വർക്ക് - Vitrified Tile Flooring (4x2 / 2x2)",
    "en": "Vitrified Tile Flooring (4x2 / 2x2)",
    "ml": "മേസൺ വർക്ക് - Vitrified Tile Flooring (4x2 / 2x2)",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Vitrified Tile Flooring (4x2 / 2x2) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_227",
    "name": "മേസൺ വർക്ക് - Ceramic Bathroom Wall Tile Laying",
    "en": "Ceramic Bathroom Wall Tile Laying",
    "ml": "മേസൺ വർക്ക് - Ceramic Bathroom Wall Tile Laying",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Ceramic Bathroom Wall Tile Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_228",
    "name": "മേസൺ വർക്ക് - Anti-Skid Bathroom Floor Tiles",
    "en": "Anti-Skid Bathroom Floor Tiles",
    "ml": "മേസൺ വർക്ക് - Anti-Skid Bathroom Floor Tiles",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Anti-Skid Bathroom Floor Tiles Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_229",
    "name": "മേസൺ വർക്ക് - Kitchen Counter Granite Slab Laying",
    "en": "Kitchen Counter Granite Slab Laying",
    "ml": "മേസൺ വർക്ക് - Kitchen Counter Granite Slab Laying",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kitchen Counter Granite Slab Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_230",
    "name": "മേസൺ വർക്ക് - Italian Marble Flooring & Polish",
    "en": "Italian Marble Flooring & Polish",
    "ml": "മേസൺ വർക്ക് - Italian Marble Flooring & Polish",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Italian Marble Flooring & Polish Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_231",
    "name": "മേസൺ വർക്ക് - Granite Stone Steps & Riser Fit",
    "en": "Granite Stone Steps & Riser Fit",
    "ml": "മേസൺ വർക്ക് - Granite Stone Steps & Riser Fit",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Granite Stone Steps & Riser Fit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_232",
    "name": "മേസൺ വർക്ക് - Terrace Weatherproof Cooling Tiles",
    "en": "Terrace Weatherproof Cooling Tiles",
    "ml": "മേസൺ വർക്ക് - Terrace Weatherproof Cooling Tiles",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Terrace Weatherproof Cooling Tiles Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_233",
    "name": "മേസൺ വർക്ക് - Interlock Paver Block Driveway Laying",
    "en": "Interlock Paver Block Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Interlock Paver Block Driveway Laying",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Interlock Paver Block Driveway Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_234",
    "name": "മേസൺ വർക്ക് - Cobblestone Garden Pathway Laying",
    "en": "Cobblestone Garden Pathway Laying",
    "ml": "മേസൺ വർക്ക് - Cobblestone Garden Pathway Laying",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Cobblestone Garden Pathway Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_235",
    "name": "മേസൺ വർക്ക് - RCC Concrete Core Cutting (2\"-6\")",
    "en": "RCC Concrete Core Cutting (2\"-6\")",
    "ml": "മേസൺ വർക്ക് - RCC Concrete Core Cutting (2\"-6\")",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "RCC Concrete Core Cutting (2\"-6\") Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_236",
    "name": "മേസൺ വർക്ക് - Non-Structural Wall Demolition Work",
    "en": "Non-Structural Wall Demolition Work",
    "ml": "മേസൺ വർക്ക് - Non-Structural Wall Demolition Work",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Non-Structural Wall Demolition Work Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_237",
    "name": "മേസൺ വർക്ക് - Old Plaster Chipping & Removal",
    "en": "Old Plaster Chipping & Removal",
    "ml": "മേസൺ വർക്ക് - Old Plaster Chipping & Removal",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Old Plaster Chipping & Removal Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_238",
    "name": "മേസൺ വർക്ക് - RCC Column Jacketing Reinforcement",
    "en": "RCC Column Jacketing Reinforcement",
    "ml": "മേസൺ വർക്ക് - RCC Column Jacketing Reinforcement",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "RCC Column Jacketing Reinforcement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_239",
    "name": "Cracked Beam Polymer Mortar റിപ്പയർ",
    "en": "Cracked Beam Polymer Mortar Repair",
    "ml": "Cracked Beam Polymer Mortar റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Cracked Beam Polymer Mortar Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_240",
    "name": "മേസൺ വർക്ക് - Floor Tile Chipping & Re-leveling",
    "en": "Floor Tile Chipping & Re-leveling",
    "ml": "മേസൺ വർക്ക് - Floor Tile Chipping & Re-leveling",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Floor Tile Chipping & Re-leveling Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_241",
    "name": "വെൽഡിങ് വർക്ക് - Steel Tube Truss Roofing for Terrace",
    "en": "Steel Tube Truss Roofing for Terrace",
    "ml": "വെൽഡിങ് വർക്ക് - Steel Tube Truss Roofing for Terrace",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Steel Tube Truss Roofing for Terrace Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_242",
    "name": "വെൽഡിങ് വർക്ക് - GI Corrugated Sheet Roof Erection",
    "en": "GI Corrugated Sheet Roof Erection",
    "ml": "വെൽഡിങ് വർക്ക് - GI Corrugated Sheet Roof Erection",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "GI Corrugated Sheet Roof Erection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_243",
    "name": "വെൽഡിങ് വർക്ക് - Polycarbonate Transparent Sunshade",
    "en": "Polycarbonate Transparent Sunshade",
    "ml": "വെൽഡിങ് വർക്ക് - Polycarbonate Transparent Sunshade",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Polycarbonate Transparent Sunshade Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_244",
    "name": "വെൽഡിങ് വർക്ക് - Multiwall Polycarbonate Car Porch",
    "en": "Multiwall Polycarbonate Car Porch",
    "ml": "വെൽഡിങ് വർക്ക് - Multiwall Polycarbonate Car Porch",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Multiwall Polycarbonate Car Porch Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_245",
    "name": "വെൽഡിങ് വർക്ക് - Terrace Pergola Steel Framework",
    "en": "Terrace Pergola Steel Framework",
    "ml": "വെൽഡിങ് വർക്ക് - Terrace Pergola Steel Framework",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Terrace Pergola Steel Framework Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_246",
    "name": "വെൽഡിങ് വർക്ക് - Industrial Factory PEB Steel Shed",
    "en": "Industrial Factory PEB Steel Shed",
    "ml": "വെൽഡിങ് വർക്ക് - Industrial Factory PEB Steel Shed",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Industrial Factory PEB Steel Shed Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_247",
    "name": "വെൽഡിങ് വർക്ക് - Mezzanine Steel Floor Fabrication",
    "en": "Mezzanine Steel Floor Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Mezzanine Steel Floor Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Mezzanine Steel Floor Fabrication Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_248",
    "name": "വെൽഡിങ് വർക്ക് - Main Gate Steel Laser Cut Modern",
    "en": "Main Gate Steel Laser Cut Modern",
    "ml": "വെൽഡിങ് വർക്ക് - Main Gate Steel Laser Cut Modern",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Main Gate Steel Laser Cut Modern Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_249",
    "name": "വെൽഡിങ് വർക്ക് - Wrought Iron Classical Gate Making",
    "en": "Wrought Iron Classical Gate Making",
    "ml": "വെൽഡിങ് വർക്ക് - Wrought Iron Classical Gate Making",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Wrought Iron Classical Gate Making Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_250",
    "name": "വെൽഡിങ് വർക്ക് - Automatic Sliding Gate Steel Frame",
    "en": "Automatic Sliding Gate Steel Frame",
    "ml": "വെൽഡിങ് വർക്ക് - Automatic Sliding Gate Steel Frame",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Automatic Sliding Gate Steel Frame Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_251",
    "name": "വെൽഡിങ് വർക്ക് - Stainless Steel (SS 304) Balcony Railing",
    "en": "Stainless Steel (SS 304) Balcony Railing",
    "ml": "വെൽഡിങ് വർക്ക് - Stainless Steel (SS 304) Balcony Railing",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Stainless Steel (SS 304) Balcony Railing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_252",
    "name": "വെൽഡിങ് വർക്ക് - Toughened Glass SS Spigot Railing",
    "en": "Toughened Glass SS Spigot Railing",
    "ml": "വെൽഡിങ് വർക്ക് - Toughened Glass SS Spigot Railing",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Toughened Glass SS Spigot Railing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_253",
    "name": "വെൽഡിങ് വർക്ക് - MS Window Safety Grill Fabrication",
    "en": "MS Window Safety Grill Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - MS Window Safety Grill Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "MS Window Safety Grill Fabrication Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_254",
    "name": "വെൽഡിങ് വർക്ക് - Cast Iron Decorative Stair Handrail",
    "en": "Cast Iron Decorative Stair Handrail",
    "ml": "വെൽഡിങ് വർക്ക് - Cast Iron Decorative Stair Handrail",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Cast Iron Decorative Stair Handrail Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_255",
    "name": "വെൽഡിങ് വർക്ക് - Spiral Iron Metal Staircase Making",
    "en": "Spiral Iron Metal Staircase Making",
    "ml": "വെൽഡിങ് വർക്ക് - Spiral Iron Metal Staircase Making",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Spiral Iron Metal Staircase Making Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_256",
    "name": "വെൽഡിങ് വർക്ക് - Compound Wall Razor Wire Spike",
    "en": "Compound Wall Razor Wire Spike",
    "ml": "വെൽഡിങ് വർക്ക് - Compound Wall Razor Wire Spike",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Compound Wall Razor Wire Spike Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_257",
    "name": "വെൽഡിങ് വർക്ക് - Rolling Shutter Hand Motorized Gate",
    "en": "Rolling Shutter Hand Motorized Gate",
    "ml": "വെൽഡിങ് വർക്ക് - Rolling Shutter Hand Motorized Gate",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Rolling Shutter Hand Motorized Gate Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_258",
    "name": "വെൽഡിങ് വർക്ക് - Collapsible Accordion Iron Gate",
    "en": "Collapsible Accordion Iron Gate",
    "ml": "വെൽഡിങ് വർക്ക് - Collapsible Accordion Iron Gate",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Collapsible Accordion Iron Gate Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_259",
    "name": "വെൽഡിങ് വർക്ക് - Aluminium Powder-Coated Sliding Door",
    "en": "Aluminium Powder-Coated Sliding Door",
    "ml": "വെൽഡിങ് വർക്ക് - Aluminium Powder-Coated Sliding Door",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Aluminium Powder-Coated Sliding Door Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_260",
    "name": "വെൽഡിങ് വർക്ക് - UPVC Soundproof Casement Window",
    "en": "UPVC Soundproof Casement Window",
    "ml": "വെൽഡിങ് വർക്ക് - UPVC Soundproof Casement Window",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "UPVC Soundproof Casement Window Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_261",
    "name": "വെൽഡിങ് വർക്ക് - Aluminium Office Cabin Partitions",
    "en": "Aluminium Office Cabin Partitions",
    "ml": "വെൽഡിങ് വർക്ക് - Aluminium Office Cabin Partitions",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Aluminium Office Cabin Partitions Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_262",
    "name": "വെൽഡിങ് വർക്ക് - Structural Glazing Glass Facade",
    "en": "Structural Glazing Glass Facade",
    "ml": "വെൽഡിങ് വർക്ക് - Structural Glazing Glass Facade",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Structural Glazing Glass Facade Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_263",
    "name": "വെൽഡിങ് വർക്ക് - Bathroom Aluminium Louver Window",
    "en": "Bathroom Aluminium Louver Window",
    "ml": "വെൽഡിങ് വർക്ക് - Bathroom Aluminium Louver Window",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Bathroom Aluminium Louver Window Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_264",
    "name": "വെൽഡിങ് വർക്ക് - Mosquito Net SS Mesh Slider Window",
    "en": "Mosquito Net SS Mesh Slider Window",
    "ml": "വെൽഡിങ് വർക്ക് - Mosquito Net SS Mesh Slider Window",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Mosquito Net SS Mesh Slider Window Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_265",
    "name": "വർക്ക്‌ഷോപ്പ് - Car Full Periodic Maintenance (Engine Oil & Filters)",
    "en": "Car Full Periodic Maintenance (Engine Oil & Filters)",
    "ml": "വർക്ക്‌ഷോപ്പ് - Car Full Periodic Maintenance (Engine Oil & Filters)",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car Full Periodic Maintenance (Engine Oil & Filters) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_266",
    "name": "ബ്രേക്ക് പാഡ് മാറ്റൽ മാറ്റൽ & Disc Skimming",
    "en": "Brake Pad Replacement & Disc Skimming",
    "ml": "ബ്രേക്ക് പാഡ് മാറ്റൽ മാറ്റൽ & Disc Skimming",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Brake Pad Replacement & Disc Skimming Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_267",
    "name": "Clutch Plate & Pressure Plate ഓവർഹോൾ",
    "en": "Clutch Plate & Pressure Plate Overhaul",
    "ml": "Clutch Plate & Pressure Plate ഓവർഹോൾ",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Clutch Plate & Pressure Plate Overhaul Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_268",
    "name": "വർക്ക്‌ഷോപ്പ് - Car Shock Absorber & Suspension Strut",
    "en": "Car Shock Absorber & Suspension Strut",
    "ml": "വർക്ക്‌ഷോപ്പ് - Car Shock Absorber & Suspension Strut",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car Shock Absorber & Suspension Strut Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_269",
    "name": "Timing Belt Chain മാറ്റൽ",
    "en": "Timing Belt Chain Replacement",
    "ml": "Timing Belt Chain മാറ്റൽ",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Timing Belt Chain Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_270",
    "name": "വർക്ക്‌ഷോപ്പ് - Engine Coolant Flush & Radiator Clean",
    "en": "Engine Coolant Flush & Radiator Clean",
    "ml": "വർക്ക്‌ഷോപ്പ് - Engine Coolant Flush & Radiator Clean",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Engine Coolant Flush & Radiator Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_271",
    "name": "Spark Plug മാറ്റൽ & Ignition Check",
    "en": "Spark Plug Replacement & Ignition Check",
    "ml": "Spark Plug മാറ്റൽ & Ignition Check",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Spark Plug Replacement & Ignition Check Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_272",
    "name": "വർക്ക്‌ഷോപ്പ് - Diesel Fuel Injector Ultrasonic Clean",
    "en": "Diesel Fuel Injector Ultrasonic Clean",
    "ml": "വർക്ക്‌ഷോപ്പ് - Diesel Fuel Injector Ultrasonic Clean",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Diesel Fuel Injector Ultrasonic Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_273",
    "name": "Steering Rack & Tie Rod End റിപ്പയർ",
    "en": "Steering Rack & Tie Rod End Repair",
    "ml": "Steering Rack & Tie Rod End റിപ്പയർ",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Steering Rack & Tie Rod End Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_274",
    "name": "Engine Head Gasket മാറ്റൽ",
    "en": "Engine Head Gasket Replacement",
    "ml": "Engine Head Gasket മാറ്റൽ",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Engine Head Gasket Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_275",
    "name": "വർക്ക്‌ഷോപ്പ് - Car Foam Pressure Wash & Underbody Clean",
    "en": "Car Foam Pressure Wash & Underbody Clean",
    "ml": "വർക്ക്‌ഷോപ്പ് - Car Foam Pressure Wash & Underbody Clean",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car Foam Pressure Wash & Underbody Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_276",
    "name": "Car Ceramic കോട്ടിംഗ് (9H Multi-Layer)",
    "en": "Car Ceramic Coating (9H Multi-Layer)",
    "ml": "Car Ceramic കോട്ടിംഗ് (9H Multi-Layer)",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car Ceramic Coating (9H Multi-Layer) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_277",
    "name": "വർക്ക്‌ഷോപ്പ് - Car Interior Deep Steam Shampoo Clean",
    "en": "Car Interior Deep Steam Shampoo Clean",
    "ml": "വർക്ക്‌ഷോപ്പ് - Car Interior Deep Steam Shampoo Clean",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car Interior Deep Steam Shampoo Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_278",
    "name": "വർക്ക്‌ഷോപ്പ് - Teflon Paint Sealant Protection",
    "en": "Teflon Paint Sealant Protection",
    "ml": "വർക്ക്‌ഷോപ്പ് - Teflon Paint Sealant Protection",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Teflon Paint Sealant Protection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_279",
    "name": "വർക്ക്‌ഷോപ്പ് - Headlight Restoration Yellow Removal",
    "en": "Headlight Restoration Yellow Removal",
    "ml": "വർക്ക്‌ഷോപ്പ് - Headlight Restoration Yellow Removal",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Headlight Restoration Yellow Removal Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_280",
    "name": "Car AC Cooling Coil ക്ലീനിംഗ്",
    "en": "Car AC Cooling Coil Cleaning",
    "ml": "Car AC Cooling Coil ക്ലീനിംഗ്",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car AC Cooling Coil Cleaning Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_281",
    "name": "വർക്ക്‌ഷോപ്പ് - Car AC Compressor Gas Refill",
    "en": "Car AC Compressor Gas Refill",
    "ml": "വർക്ക്‌ഷോപ്പ് - Car AC Compressor Gas Refill",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car AC Compressor Gas Refill Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_282",
    "name": "വർക്ക്‌ഷോപ്പ് - Car Battery Jumpstart & Replace",
    "en": "Car Battery Jumpstart & Replace",
    "ml": "വർക്ക്‌ഷോപ്പ് - Car Battery Jumpstart & Replace",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car Battery Jumpstart & Replace Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_283",
    "name": "Car Audio System & Subwoofer സെറ്റപ്പ്",
    "en": "Car Audio System & Subwoofer Setup",
    "ml": "Car Audio System & Subwoofer സെറ്റപ്പ്",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Car Audio System & Subwoofer Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_284",
    "name": "വർക്ക്‌ഷോപ്പ് - Reverse Parking Camera & Sensor Fit",
    "en": "Reverse Parking Camera & Sensor Fit",
    "ml": "വർക്ക്‌ഷോപ്പ് - Reverse Parking Camera & Sensor Fit",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Reverse Parking Camera & Sensor Fit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_285",
    "name": "വർക്ക്‌ഷോപ്പ് - Denting Removal Machine Paintless",
    "en": "Denting Removal Machine Paintless",
    "ml": "വർക്ക്‌ഷോപ്പ് - Denting Removal Machine Paintless",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Denting Removal Machine Paintless Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_286",
    "name": "വർക്ക്‌ഷോപ്പ് - Accidental Body Frame Straightening",
    "en": "Accidental Body Frame Straightening",
    "ml": "വർക്ക്‌ഷോപ്പ് - Accidental Body Frame Straightening",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Accidental Body Frame Straightening Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_287",
    "name": "വർക്ക്‌ഷോപ്പ് - Baked Oven Booth Spray Painting",
    "en": "Baked Oven Booth Spray Painting",
    "ml": "വർക്ക്‌ഷോപ്പ് - Baked Oven Booth Spray Painting",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Baked Oven Booth Spray Painting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_288",
    "name": "വർക്ക്‌ഷോപ്പ് - Bike Engine Oil & Filter Change",
    "en": "Bike Engine Oil & Filter Change",
    "ml": "വർക്ക്‌ഷോപ്പ് - Bike Engine Oil & Filter Change",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Bike Engine Oil & Filter Change Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_289",
    "name": "വർക്ക്‌ഷോപ്പ് - Motorcycle Carburetor FI Tuning",
    "en": "Motorcycle Carburetor FI Tuning",
    "ml": "വർക്ക്‌ഷോപ്പ് - Motorcycle Carburetor FI Tuning",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Motorcycle Carburetor FI Tuning Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_290",
    "name": "വർക്ക്‌ഷോപ്പ് - Bike Disc Brake Bleeding & Pad Fit",
    "en": "Bike Disc Brake Bleeding & Pad Fit",
    "ml": "വർക്ക്‌ഷോപ്പ് - Bike Disc Brake Bleeding & Pad Fit",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Bike Disc Brake Bleeding & Pad Fit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_291",
    "name": "വർക്ക്‌ഷോപ്പ് - Two-Wheeler Chain & Sprocket Set",
    "en": "Two-Wheeler Chain & Sprocket Set",
    "ml": "വർക്ക്‌ഷോപ്പ് - Two-Wheeler Chain & Sprocket Set",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Two-Wheeler Chain & Sprocket Set Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_292",
    "name": "വർക്ക്‌ഷോപ്പ് - Scooter V-Belt & Roller Weights",
    "en": "Scooter V-Belt & Roller Weights",
    "ml": "വർക്ക്‌ഷോപ്പ് - Scooter V-Belt & Roller Weights",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Scooter V-Belt & Roller Weights Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_293",
    "name": "Bike Front Fork Oil Seal ഓവർഹോൾ",
    "en": "Bike Front Fork Oil Seal Overhaul",
    "ml": "Bike Front Fork Oil Seal ഓവർഹോൾ",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Bike Front Fork Oil Seal Overhaul Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_294",
    "name": "വർക്ക്‌ഷോപ്പ് - Tubeless Tyre Puncture Quick Fix",
    "en": "Tubeless Tyre Puncture Quick Fix",
    "ml": "വർക്ക്‌ഷോപ്പ് - Tubeless Tyre Puncture Quick Fix",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Tubeless Tyre Puncture Quick Fix Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_295",
    "name": "വർക്ക്‌ഷോപ്പ് - Royal Enfield Tappet & Valve Tune",
    "en": "Royal Enfield Tappet & Valve Tune",
    "ml": "വർക്ക്‌ഷോപ്പ് - Royal Enfield Tappet & Valve Tune",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Royal Enfield Tappet & Valve Tune Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_296",
    "name": "Scooter Starter Motor Self റിപ്പയർ",
    "en": "Scooter Starter Motor Self Repair",
    "ml": "Scooter Starter Motor Self റിപ്പയർ",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Scooter Starter Motor Self Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_297",
    "name": "വാഹന സർവീസ് - Airport Pickup Sedan Taxi (Swift Dzire/Etios)",
    "en": "Airport Pickup Sedan Taxi (Swift Dzire/Etios)",
    "ml": "വാഹന സർവീസ് - Airport Pickup Sedan Taxi (Swift Dzire/Etios)",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Airport Pickup Sedan Taxi (Swift Dzire/Etios) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_298",
    "name": "വാഹന സർവീസ് - Family 7-Seater Outstation SUV (Innova/Ertiga)",
    "en": "Family 7-Seater Outstation SUV (Innova/Ertiga)",
    "ml": "വാഹന സർവീസ് - Family 7-Seater Outstation SUV (Innova/Ertiga)",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Family 7-Seater Outstation SUV (Innova/Ertiga) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_299",
    "name": "വാഹന സർവീസ് - Hourly Call Driver for Personal Car",
    "en": "Hourly Call Driver for Personal Car",
    "ml": "വാഹന സർവീസ് - Hourly Call Driver for Personal Car",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Hourly Call Driver for Personal Car Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_300",
    "name": "വാഹന സർവീസ് - Daily Driver for Family Commute",
    "en": "Daily Driver for Family Commute",
    "ml": "വാഹന സർവീസ് - Daily Driver for Family Commute",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Daily Driver for Family Commute Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_301",
    "name": "വാഹന സർവീസ് - Night Return Driver on Demand",
    "en": "Night Return Driver on Demand",
    "ml": "വാഹന സർവീസ് - Night Return Driver on Demand",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Night Return Driver on Demand Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_302",
    "name": "വാഹന സർവീസ് - Kerala Tourism Sightseeing Car",
    "en": "Kerala Tourism Sightseeing Car",
    "ml": "വാഹന സർവീസ് - Kerala Tourism Sightseeing Car",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kerala Tourism Sightseeing Car Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_303",
    "name": "AC ഓട്ടോറിക്ഷ സർവീസ് Local Trip",
    "en": "AC Auto Rickshaw Local Trip",
    "ml": "AC ഓട്ടോറിക്ഷ സർവീസ് Local Trip",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "AC Auto Rickshaw Local Trip Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_304",
    "name": "Regular ഓട്ടോറിക്ഷ സർവീസ് Stand Pickup",
    "en": "Regular Auto Rickshaw Stand Pickup",
    "ml": "Regular ഓട്ടോറിക്ഷ സർവീസ് Stand Pickup",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Regular Auto Rickshaw Stand Pickup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_305",
    "name": "വാഹന സർവീസ് - Tempo Traveller 12-Seater Rental",
    "en": "Tempo Traveller 12-Seater Rental",
    "ml": "വാഹന സർവീസ് - Tempo Traveller 12-Seater Rental",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Tempo Traveller 12-Seater Rental Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_306",
    "name": "വാഹന സർവീസ് - Tempo Traveller 17-Seater Pushback",
    "en": "Tempo Traveller 17-Seater Pushback",
    "ml": "വാഹന സർവീസ് - Tempo Traveller 17-Seater Pushback",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Tempo Traveller 17-Seater Pushback Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_307",
    "name": "വാഹന സർവീസ് - Tourist Luxury 26-Seater Mini Bus",
    "en": "Tourist Luxury 26-Seater Mini Bus",
    "ml": "വാഹന സർവീസ് - Tourist Luxury 26-Seater Mini Bus",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Tourist Luxury 26-Seater Mini Bus Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_308",
    "name": "വാഹന സർവീസ് - Luxury AC Air Bus 49-Seater Tour",
    "en": "Luxury AC Air Bus 49-Seater Tour",
    "ml": "വാഹന സർവീസ് - Luxury AC Air Bus 49-Seater Tour",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Luxury AC Air Bus 49-Seater Tour Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_309",
    "name": "വാഹന സർവീസ് - Tata Ace Mini Truck for Local Shifting",
    "en": "Tata Ace Mini Truck for Local Shifting",
    "ml": "വാഹന സർവീസ് - Tata Ace Mini Truck for Local Shifting",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Tata Ace Mini Truck for Local Shifting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_310",
    "name": "വാഹന സർവീസ് - Mahindra Bolero Pickup Goods Transport",
    "en": "Mahindra Bolero Pickup Goods Transport",
    "ml": "വാഹന സർവീസ് - Mahindra Bolero Pickup Goods Transport",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Mahindra Bolero Pickup Goods Transport Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_311",
    "name": "വാഹന സർവീസ് - Three-Wheeler Goods Auto Carriage",
    "en": "Three-Wheeler Goods Auto Carriage",
    "ml": "വാഹന സർവീസ് - Three-Wheeler Goods Auto Carriage",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Three-Wheeler Goods Auto Carriage Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_312",
    "name": "വാഹന സർവീസ് - Eicher 14ft Closed Container Truck",
    "en": "Eicher 14ft Closed Container Truck",
    "ml": "വാഹന സർവീസ് - Eicher 14ft Closed Container Truck",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Eicher 14ft Closed Container Truck Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_313",
    "name": "വാഹന സർവീസ് - 10-Wheel Heavy Lorry for Transport",
    "en": "10-Wheel Heavy Lorry for Transport",
    "ml": "വാഹന സർവീസ് - 10-Wheel Heavy Lorry for Transport",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "10-Wheel Heavy Lorry for Transport Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_314",
    "name": "വാഹന സർവീസ് - Tipper Lorry for Sand & Granite",
    "en": "Tipper Lorry for Sand & Granite",
    "ml": "വാഹന സർവീസ് - Tipper Lorry for Sand & Granite",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Tipper Lorry for Sand & Granite Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_315",
    "name": "വാഹന സർവീസ് - JCB 3DX Excavator Backhoe on Hire",
    "en": "JCB 3DX Excavator Backhoe on Hire",
    "ml": "വാഹന സർവീസ് - JCB 3DX Excavator Backhoe on Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "JCB 3DX Excavator Backhoe on Hire Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_316",
    "name": "വാഹന സർവീസ് - Hitachi Excavator Rock Breaker Poclain",
    "en": "Hitachi Excavator Rock Breaker Poclain",
    "ml": "വാഹന സർവീസ് - Hitachi Excavator Rock Breaker Poclain",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Hitachi Excavator Rock Breaker Poclain Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_317",
    "name": "വാഹന സർവീസ് - Hydraulic Mobile Crane 14-25 Ton",
    "en": "Hydraulic Mobile Crane 14-25 Ton",
    "ml": "വാഹന സർവീസ് - Hydraulic Mobile Crane 14-25 Ton",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Hydraulic Mobile Crane 14-25 Ton Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_318",
    "name": "വാഹന സർവീസ് - Flatbed Towing Truck for Car Breakdown",
    "en": "Flatbed Towing Truck for Car Breakdown",
    "ml": "വാഹന സർവീസ് - Flatbed Towing Truck for Car Breakdown",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Flatbed Towing Truck for Car Breakdown Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_319",
    "name": "വാഹന സർവീസ് - Tractor with Rotary Tiller for Field",
    "en": "Tractor with Rotary Tiller for Field",
    "ml": "വാഹന സർവീസ് - Tractor with Rotary Tiller for Field",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Tractor with Rotary Tiller for Field Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_320",
    "name": "Occupied House Full Deep ക്ലീനിംഗ്",
    "en": "Occupied House Full Deep Cleaning",
    "ml": "Occupied House Full Deep ക്ലീനിംഗ്",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Occupied House Full Deep Cleaning Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_321",
    "name": "ക്ലീനിംഗ് - Vacant House Move-in Move-out Clean",
    "en": "Vacant House Move-in Move-out Clean",
    "ml": "ക്ലീനിംഗ് - Vacant House Move-in Move-out Clean",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Vacant House Move-in Move-out Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_322",
    "name": "ക്ലീനിംഗ് - Post-Construction Chemical Deep Clean",
    "en": "Post-Construction Chemical Deep Clean",
    "ml": "ക്ലീനിംഗ് - Post-Construction Chemical Deep Clean",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Post-Construction Chemical Deep Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_323",
    "name": "ക്ലീനിംഗ് - Kitchen Degreasing & Oil Stains Scrub",
    "en": "Kitchen Degreasing & Oil Stains Scrub",
    "ml": "ക്ലീനിംഗ് - Kitchen Degreasing & Oil Stains Scrub",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kitchen Degreasing & Oil Stains Scrub Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_324",
    "name": "ക്ലീനിംഗ് - Bathroom Tile Acid Clean & Descaling",
    "en": "Bathroom Tile Acid Clean & Descaling",
    "ml": "ക്ലീനിംഗ് - Bathroom Tile Acid Clean & Descaling",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Bathroom Tile Acid Clean & Descaling Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_325",
    "name": "ക്ലീനിംഗ് - Sofa Fabric Wet Shampoo Injection",
    "en": "Sofa Fabric Wet Shampoo Injection",
    "ml": "ക്ലീനിംഗ് - Sofa Fabric Wet Shampoo Injection",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Sofa Fabric Wet Shampoo Injection Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_326",
    "name": "ക്ലീനിംഗ് - Carpet High-Power Vacuum & Shampoo",
    "en": "Carpet High-Power Vacuum & Shampoo",
    "ml": "ക്ലീനിംഗ് - Carpet High-Power Vacuum & Shampoo",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Carpet High-Power Vacuum & Shampoo Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_327",
    "name": "ക്ലീനിംഗ് - Mattress Dust Mite Deep Sanitization",
    "en": "Mattress Dust Mite Deep Sanitization",
    "ml": "ക്ലീനിംഗ് - Mattress Dust Mite Deep Sanitization",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Mattress Dust Mite Deep Sanitization Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_328",
    "name": "ക്ലീനിംഗ് - Balcony Floor Scrubbing & Moss Wash",
    "en": "Balcony Floor Scrubbing & Moss Wash",
    "ml": "ക്ലീനിംഗ് - Balcony Floor Scrubbing & Moss Wash",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Balcony Floor Scrubbing & Moss Wash Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_329",
    "name": "Curtain Steam ക്ലീനിംഗ് On-Site",
    "en": "Curtain Steam Cleaning On-Site",
    "ml": "Curtain Steam ക്ലീനിംഗ് On-Site",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Curtain Steam Cleaning On-Site Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_330",
    "name": "ക്ലീനിംഗ് - Window Glass Both Sides Clean",
    "en": "Window Glass Both Sides Clean",
    "ml": "ക്ലീനിംഗ് - Window Glass Both Sides Clean",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Window Glass Both Sides Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_331",
    "name": "Overhead Sintex വാട്ടർ ടാങ്ക് Deep Clean",
    "en": "Overhead Sintex Water Tank Deep Clean",
    "ml": "Overhead Sintex വാട്ടർ ടാങ്ക് Deep Clean",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Overhead Sintex Water Tank Deep Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_332",
    "name": "Concrete Overhead വാട്ടർ ടാങ്ക് Scrubbing",
    "en": "Concrete Overhead Water Tank Scrubbing",
    "ml": "Concrete Overhead വാട്ടർ ടാങ്ക് Scrubbing",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Concrete Overhead Water Tank Scrubbing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_333",
    "name": "ക്ലീനിംഗ് - Underground RCC Sump High Pressure Clean",
    "en": "Underground RCC Sump High Pressure Clean",
    "ml": "ക്ലീനിംഗ് - Underground RCC Sump High Pressure Clean",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Underground RCC Sump High Pressure Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_334",
    "name": "ക്ലീനിംഗ് - Septic Tank Vacuum Suction Tanker (3000L)",
    "en": "Septic Tank Vacuum Suction Tanker (3000L)",
    "ml": "ക്ലീനിംഗ് - Septic Tank Vacuum Suction Tanker (3000L)",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Septic Tank Vacuum Suction Tanker (3000L) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_335",
    "name": "ക്ലീനിംഗ് - Heavy Septic Tank Waste Sludge Clear (6000L)",
    "en": "Heavy Septic Tank Waste Sludge Clear (6000L)",
    "ml": "ക്ലീനിംഗ് - Heavy Septic Tank Waste Sludge Clear (6000L)",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Heavy Septic Tank Waste Sludge Clear (6000L) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_336",
    "name": "ക്ലീനിംഗ് - Sewage Pipeline High Pressure Jet Flush",
    "en": "Sewage Pipeline High Pressure Jet Flush",
    "ml": "ക്ലീനിംഗ് - Sewage Pipeline High Pressure Jet Flush",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Sewage Pipeline High Pressure Jet Flush Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_337",
    "name": "ക്ലീനിംഗ് - Termite Drill-Fill-Seal Anti-Treatment",
    "en": "Termite Drill-Fill-Seal Anti-Treatment",
    "ml": "ക്ലീനിംഗ് - Termite Drill-Fill-Seal Anti-Treatment",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Termite Drill-Fill-Seal Anti-Treatment Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_338",
    "name": "ക്ലീനിംഗ് - Kitchen Cockroach Herbal Gel Paste",
    "en": "Kitchen Cockroach Herbal Gel Paste",
    "ml": "ക്ലീനിംഗ് - Kitchen Cockroach Herbal Gel Paste",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kitchen Cockroach Herbal Gel Paste Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_339",
    "name": "ക്ലീനിംഗ് - Bedbug 2-Round Chemical Spray",
    "en": "Bedbug 2-Round Chemical Spray",
    "ml": "ക്ലീനിംഗ് - Bedbug 2-Round Chemical Spray",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Bedbug 2-Round Chemical Spray Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_340",
    "name": "Rodent Bait Box & Glue Board സർവീസ്",
    "en": "Rodent Bait Box & Glue Board Service",
    "ml": "Rodent Bait Box & Glue Board സർവീസ്",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Rodent Bait Box & Glue Board Service Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_341",
    "name": "ക്ലീനിംഗ് - Mosquito Thermal Fogging Outdoor",
    "en": "Mosquito Thermal Fogging Outdoor",
    "ml": "ക്ലീനിംഗ് - Mosquito Thermal Fogging Outdoor",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Mosquito Thermal Fogging Outdoor Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_342",
    "name": "ക്ലീനിംഗ് - Balcony Pigeon Bird Netting High-Rise",
    "en": "Balcony Pigeon Bird Netting High-Rise",
    "ml": "ക്ലീനിംഗ് - Balcony Pigeon Bird Netting High-Rise",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Balcony Pigeon Bird Netting High-Rise Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_343",
    "name": "ക്ലീനിംഗ് - Honey Bee & Wasp Nest Safe Removal",
    "en": "Honey Bee & Wasp Nest Safe Removal",
    "ml": "ക്ലീനിംഗ് - Honey Bee & Wasp Nest Safe Removal",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Honey Bee & Wasp Nest Safe Removal Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_344",
    "name": "Skilled തെങ്ങ് കയറ്റം Climbing & Plucking",
    "en": "Skilled Coconut Tree Climbing & Plucking",
    "ml": "Skilled തെങ്ങ് കയറ്റം Climbing & Plucking",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Skilled Coconut Tree Climbing & Plucking Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_345",
    "name": "തെങ്ങ് കയറ്റം Crown ക്ലീനിംഗ് & Salt/Ash",
    "en": "Coconut Tree Crown Cleaning & Salt/Ash",
    "ml": "തെങ്ങ് കയറ്റം Crown ക്ലീനിംഗ് & Salt/Ash",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Coconut Tree Crown Cleaning & Salt/Ash Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_346",
    "name": "തെങ്ങ് കയറ്റം Rhinoceros Beetle Treatment",
    "en": "Coconut Tree Rhinoceros Beetle Treatment",
    "ml": "തെങ്ങ് കയറ്റം Rhinoceros Beetle Treatment",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Coconut Tree Rhinoceros Beetle Treatment Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_347",
    "name": "തോട്ടം & കൃഷി - Dangerous Tree Branch Trimming High-Tension",
    "en": "Dangerous Tree Branch Trimming High-Tension",
    "ml": "തോട്ടം & കൃഷി - Dangerous Tree Branch Trimming High-Tension",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Dangerous Tree Branch Trimming High-Tension Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_348",
    "name": "തോട്ടം & കൃഷി - Large Wood Tree Felling with Crane & Winch",
    "en": "Large Wood Tree Felling with Crane & Winch",
    "ml": "തോട്ടം & കൃഷി - Large Wood Tree Felling with Crane & Winch",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Large Wood Tree Felling with Crane & Winch Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_349",
    "name": "തോട്ടം & കൃഷി - Chainsaw Machine Wood Cutting on Site",
    "en": "Chainsaw Machine Wood Cutting on Site",
    "ml": "തോട്ടം & കൃഷി - Chainsaw Machine Wood Cutting on Site",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Chainsaw Machine Wood Cutting on Site Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_350",
    "name": "തോട്ടം & കൃഷി - Tree Stump Grinding & Root Removal",
    "en": "Tree Stump Grinding & Root Removal",
    "ml": "തോട്ടം & കൃഷി - Tree Stump Grinding & Root Removal",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Tree Stump Grinding & Root Removal Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_351",
    "name": "തോട്ടം & കൃഷി - Arecanut Betel Nut Tree Harvesting",
    "en": "Arecanut Betel Nut Tree Harvesting",
    "ml": "തോട്ടം & കൃഷി - Arecanut Betel Nut Tree Harvesting",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Arecanut Betel Nut Tree Harvesting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_352",
    "name": "തോട്ടം & കൃഷി - Rubber Tree Tapping Skilled Daily",
    "en": "Rubber Tree Tapping Skilled Daily",
    "ml": "തോട്ടം & കൃഷി - Rubber Tree Tapping Skilled Daily",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Rubber Tree Tapping Skilled Daily Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_353",
    "name": "തോട്ടം & കൃഷി - Lawn Grass Laying (Bermuda / Buffalo / Korean)",
    "en": "Lawn Grass Laying (Bermuda / Buffalo / Korean)",
    "ml": "തോട്ടം & കൃഷി - Lawn Grass Laying (Bermuda / Buffalo / Korean)",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Lawn Grass Laying (Bermuda / Buffalo / Korean) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_354",
    "name": "തോട്ടം & കൃഷി - Motorized Brush Cutter Grass Trimming",
    "en": "Motorized Brush Cutter Grass Trimming",
    "ml": "തോട്ടം & കൃഷി - Motorized Brush Cutter Grass Trimming",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Motorized Brush Cutter Grass Trimming Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_355",
    "name": "തോട്ടം & കൃഷി - Lawn Mower Machine Cutting & Edge Clean",
    "en": "Lawn Mower Machine Cutting & Edge Clean",
    "ml": "തോട്ടം & കൃഷി - Lawn Mower Machine Cutting & Edge Clean",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Lawn Mower Machine Cutting & Edge Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_356",
    "name": "തോട്ടം & കൃഷി - Hedge Trimming & Topiary Shaping",
    "en": "Hedge Trimming & Topiary Shaping",
    "ml": "തോട്ടം & കൃഷി - Hedge Trimming & Topiary Shaping",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Hedge Trimming & Topiary Shaping Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_357",
    "name": "തോട്ടം & കൃഷി - Decorative Garden Landscaping Design",
    "en": "Decorative Garden Landscaping Design",
    "ml": "തോട്ടം & കൃഷി - Decorative Garden Landscaping Design",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Decorative Garden Landscaping Design Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_358",
    "name": "തോട്ടം & കൃഷി - Garden Soil Mixing (Red Soil / Cow Dung / Coir)",
    "en": "Garden Soil Mixing (Red Soil / Cow Dung / Coir)",
    "ml": "തോട്ടം & കൃഷി - Garden Soil Mixing (Red Soil / Cow Dung / Coir)",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Garden Soil Mixing (Red Soil / Cow Dung / Coir) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_359",
    "name": "തോട്ടം & കൃഷി - Drip Irrigation Automatic Garden Timer",
    "en": "Drip Irrigation Automatic Garden Timer",
    "ml": "തോട്ടം & കൃഷി - Drip Irrigation Automatic Garden Timer",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Drip Irrigation Automatic Garden Timer Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_360",
    "name": "Vertical Garden Living Green Wall സെറ്റപ്പ്",
    "en": "Vertical Garden Living Green Wall Setup",
    "ml": "Vertical Garden Living Green Wall സെറ്റപ്പ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Vertical Garden Living Green Wall Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_361",
    "name": "തോട്ടം & കൃഷി - Outdoor Planter Pot Shifting & Repotting",
    "en": "Outdoor Planter Pot Shifting & Repotting",
    "ml": "തോട്ടം & കൃഷി - Outdoor Planter Pot Shifting & Repotting",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Outdoor Planter Pot Shifting & Repotting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_362",
    "name": "തോട്ടം & കൃഷി - Organic Plant Pesticide Neem Spray",
    "en": "Organic Plant Pesticide Neem Spray",
    "ml": "തോട്ടം & കൃഷി - Organic Plant Pesticide Neem Spray",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Organic Plant Pesticide Neem Spray Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_363",
    "name": "തോട്ടം & കൃഷി - Power Tiller Machine Soil Plowing",
    "en": "Power Tiller Machine Soil Plowing",
    "ml": "തോട്ടം & കൃഷി - Power Tiller Machine Soil Plowing",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Power Tiller Machine Soil Plowing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_364",
    "name": "കാറ്ററിംഗ് - Kerala Traditional Wedding Sadhya (28 Items)",
    "en": "Kerala Traditional Wedding Sadhya (28 Items)",
    "ml": "കാറ്ററിംഗ് - Kerala Traditional Wedding Sadhya (28 Items)",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kerala Traditional Wedding Sadhya (28 Items) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_365",
    "name": "കാറ്ററിംഗ് - Onam Special Feast Sadhya on Plantain Leaf",
    "en": "Onam Special Feast Sadhya on Plantain Leaf",
    "ml": "കാറ്ററിംഗ് - Onam Special Feast Sadhya on Plantain Leaf",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Onam Special Feast Sadhya on Plantain Leaf Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_366",
    "name": "കാറ്ററിംഗ് - Thalassery Dum Biriyani (Chicken / Mutton / Beef)",
    "en": "Thalassery Dum Biriyani (Chicken / Mutton / Beef)",
    "ml": "കാറ്ററിംഗ് - Thalassery Dum Biriyani (Chicken / Mutton / Beef)",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Thalassery Dum Biriyani (Chicken / Mutton / Beef) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_367",
    "name": "കാറ്ററിംഗ് - Malabar Kozhi Porichathu & Ghee Rice",
    "en": "Malabar Kozhi Porichathu & Ghee Rice",
    "ml": "കാറ്ററിംഗ് - Malabar Kozhi Porichathu & Ghee Rice",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Malabar Kozhi Porichathu & Ghee Rice Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_368",
    "name": "കാറ്ററിംഗ് - Kerala Fish Curry Meals Traditional Style",
    "en": "Kerala Fish Curry Meals Traditional Style",
    "ml": "കാറ്ററിംഗ് - Kerala Fish Curry Meals Traditional Style",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kerala Fish Curry Meals Traditional Style Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_369",
    "name": "കാറ്ററിംഗ് - Kuttanad Duck Roast & Karimeen Pollichathu",
    "en": "Kuttanad Duck Roast & Karimeen Pollichathu",
    "ml": "കാറ്ററിംഗ് - Kuttanad Duck Roast & Karimeen Pollichathu",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kuttanad Duck Roast & Karimeen Pollichathu Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_370",
    "name": "കാറ്ററിംഗ് - Evening Kerala Snacks (Parippuvada / Pazhampori / Samosa)",
    "en": "Evening Kerala Snacks (Parippuvada / Pazhampori / Samosa)",
    "ml": "കാറ്ററിംഗ് - Evening Kerala Snacks (Parippuvada / Pazhampori / Samosa)",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Evening Kerala Snacks (Parippuvada / Pazhampori / Samosa) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_371",
    "name": "കാറ്ററിംഗ് - Live Appam & Stew / Egg Roast Counter",
    "en": "Live Appam & Stew / Egg Roast Counter",
    "ml": "കാറ്ററിംഗ് - Live Appam & Stew / Egg Roast Counter",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Live Appam & Stew / Egg Roast Counter Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_372",
    "name": "കാറ്ററിംഗ് - Live Kerala Dosa & Chutney Varieties",
    "en": "Live Kerala Dosa & Chutney Varieties",
    "ml": "കാറ്ററിംഗ് - Live Kerala Dosa & Chutney Varieties",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Live Kerala Dosa & Chutney Varieties Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_373",
    "name": "കാറ്ററിംഗ് - Payasam Varieties (Palada / Parippu / Ada Pradhaman)",
    "en": "Payasam Varieties (Palada / Parippu / Ada Pradhaman)",
    "ml": "കാറ്ററിംഗ് - Payasam Varieties (Palada / Parippu / Ada Pradhaman)",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Payasam Varieties (Palada / Parippu / Ada Pradhaman) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_374",
    "name": "കാറ്ററിംഗ് - Continental & Chinese Buffet Dinner",
    "en": "Continental & Chinese Buffet Dinner",
    "ml": "കാറ്ററിംഗ് - Continental & Chinese Buffet Dinner",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Continental & Chinese Buffet Dinner Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_375",
    "name": "കാറ്ററിംഗ് - Arabic Chicken Mandi & Alfahm Grill",
    "en": "Arabic Chicken Mandi & Alfahm Grill",
    "ml": "കാറ്ററിംഗ് - Arabic Chicken Mandi & Alfahm Grill",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Arabic Chicken Mandi & Alfahm Grill Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_376",
    "name": "കാറ്ററിംഗ് - Live Barbecue BBQ Chicken Skewers",
    "en": "Live Barbecue BBQ Chicken Skewers",
    "ml": "കാറ്ററിംഗ് - Live Barbecue BBQ Chicken Skewers",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Live Barbecue BBQ Chicken Skewers Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_377",
    "name": "കാറ്ററിംഗ് - Welcome Mocktail Drinks & Fruit Punch",
    "en": "Welcome Mocktail Drinks & Fruit Punch",
    "ml": "കാറ്ററിംഗ് - Welcome Mocktail Drinks & Fruit Punch",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Welcome Mocktail Drinks & Fruit Punch Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_378",
    "name": "കാറ്ററിംഗ് - Ice Cream Parlour & Live Waffle Counter",
    "en": "Ice Cream Parlour & Live Waffle Counter",
    "ml": "കാറ്ററിംഗ് - Ice Cream Parlour & Live Waffle Counter",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Ice Cream Parlour & Live Waffle Counter Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_379",
    "name": "കാറ്ററിംഗ് - Corporate Box Lunch & Executive Thali",
    "en": "Corporate Box Lunch & Executive Thali",
    "ml": "കാറ്ററിംഗ് - Corporate Box Lunch & Executive Thali",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Corporate Box Lunch & Executive Thali Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_380",
    "name": "കാറ്ററിംഗ് - Custom Theme Designer Birthday Cakes",
    "en": "Custom Theme Designer Birthday Cakes",
    "ml": "കാറ്ററിംഗ് - Custom Theme Designer Birthday Cakes",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Custom Theme Designer Birthday Cakes Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_381",
    "name": "കാറ്ററിംഗ് - Big Aluminum Biriyani Chembu Hire",
    "en": "Big Aluminum Biriyani Chembu Hire",
    "ml": "കാറ്ററിംഗ് - Big Aluminum Biriyani Chembu Hire",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Big Aluminum Biriyani Chembu Hire Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_382",
    "name": "Experienced Uniformed സർവീസ് Waiters",
    "en": "Experienced Uniformed Service Waiters",
    "ml": "Experienced Uniformed സർവീസ് Waiters",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Experienced Uniformed Service Waiters Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_383",
    "name": "ഫോട്ടോഗ്രാഫി - Wedding Candid Photography Coverage",
    "en": "Wedding Candid Photography Coverage",
    "ml": "ഫോട്ടോഗ്രാഫി - Wedding Candid Photography Coverage",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Wedding Candid Photography Coverage Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_384",
    "name": "ഫോട്ടോഗ്രാഫി - Traditional Stage Photography & Posed",
    "en": "Traditional Stage Photography & Posed",
    "ml": "ഫോട്ടോഗ്രാഫി - Traditional Stage Photography & Posed",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Traditional Stage Photography & Posed Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_385",
    "name": "ഫോട്ടോഗ്രാഫി - Cinematic Wedding Teaser & Film (4K)",
    "en": "Cinematic Wedding Teaser & Film (4K)",
    "ml": "ഫോട്ടോഗ്രാഫി - Cinematic Wedding Teaser & Film (4K)",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Cinematic Wedding Teaser & Film (4K) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_386",
    "name": "ഫോട്ടോഗ്രാഫി - 4K Drone Aerial Videography & Shoot",
    "en": "4K Drone Aerial Videography & Shoot",
    "ml": "ഫോട്ടോഗ്രാഫി - 4K Drone Aerial Videography & Shoot",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "4K Drone Aerial Videography & Shoot Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_387",
    "name": "ഫോട്ടോഗ്രാഫി - Pre-Wedding Outdoor Love Story Shoot",
    "en": "Pre-Wedding Outdoor Love Story Shoot",
    "ml": "ഫോട്ടോഗ്രാഫി - Pre-Wedding Outdoor Love Story Shoot",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Pre-Wedding Outdoor Love Story Shoot Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_388",
    "name": "ഫോട്ടോഗ്രാഫി - Post-Wedding Sunset Beach Couple Shoot",
    "en": "Post-Wedding Sunset Beach Couple Shoot",
    "ml": "ഫോട്ടോഗ്രാഫി - Post-Wedding Sunset Beach Couple Shoot",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Post-Wedding Sunset Beach Couple Shoot Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_389",
    "name": "ഫോട്ടോഗ്രാഫി - Save the Date Creative Reel & Video",
    "en": "Save the Date Creative Reel & Video",
    "ml": "ഫോട്ടോഗ്രാഫി - Save the Date Creative Reel & Video",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Save the Date Creative Reel & Video Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_390",
    "name": "Haldi & മെഹന്തി ഡിസൈൻ Colorful Function Shoot",
    "en": "Haldi & Mehendi Colorful Function Shoot",
    "ml": "Haldi & മെഹന്തി ഡിസൈൻ Colorful Function Shoot",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Haldi & Mehendi Colorful Function Shoot Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_391",
    "name": "ഫോട്ടോഗ്രാഫി - Bridal Dressing & Getting Ready Portrait",
    "en": "Bridal Dressing & Getting Ready Portrait",
    "ml": "ഫോട്ടോഗ്രാഫി - Bridal Dressing & Getting Ready Portrait",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Bridal Dressing & Getting Ready Portrait Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_392",
    "name": "ഫോട്ടോഗ്രാഫി - Maternity Outdoor / Indoor Photo Shoot",
    "en": "Maternity Outdoor / Indoor Photo Shoot",
    "ml": "ഫോട്ടോഗ്രാഫി - Maternity Outdoor / Indoor Photo Shoot",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Maternity Outdoor / Indoor Photo Shoot Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_393",
    "name": "ഫോട്ടോഗ്രാഫി - Newborn Baby Themed Costume Photography",
    "en": "Newborn Baby Themed Costume Photography",
    "ml": "ഫോട്ടോഗ്രാഫി - Newborn Baby Themed Costume Photography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Newborn Baby Themed Costume Photography Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_394",
    "name": "ഫോട്ടോഗ്രാഫി - Kids 1st Birthday Party Photo & Video",
    "en": "Kids 1st Birthday Party Photo & Video",
    "ml": "ഫോട്ടോഗ്രാഫി - Kids 1st Birthday Party Photo & Video",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kids 1st Birthday Party Photo & Video Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_395",
    "name": "ഫോട്ടോഗ്രാഫി - Housewarming & Gruhapravesam Coverage",
    "en": "Housewarming & Gruhapravesam Coverage",
    "ml": "ഫോട്ടോഗ്രാഫി - Housewarming & Gruhapravesam Coverage",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Housewarming & Gruhapravesam Coverage Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_396",
    "name": "ഫോട്ടോഗ്രാഫി - Baptism & Holy Communion Photography",
    "en": "Baptism & Holy Communion Photography",
    "ml": "ഫോട്ടോഗ്രാഫി - Baptism & Holy Communion Photography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Baptism & Holy Communion Photography Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_397",
    "name": "ഫോട്ടോഗ്രാഫി - Corporate Seminar & Conference Coverage",
    "en": "Corporate Seminar & Conference Coverage",
    "ml": "ഫോട്ടോഗ്രാഫി - Corporate Seminar & Conference Coverage",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Corporate Seminar & Conference Coverage Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_398",
    "name": "ഫോട്ടോഗ്രാഫി - Model Fashion Portfolio & Lookbook",
    "en": "Model Fashion Portfolio & Lookbook",
    "ml": "ഫോട്ടോഗ്രാഫി - Model Fashion Portfolio & Lookbook",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Model Fashion Portfolio & Lookbook Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_399",
    "name": "ഫോട്ടോഗ്രാഫി - Product Commercial Photo Shoot for Amazon",
    "en": "Product Commercial Photo Shoot for Amazon",
    "ml": "ഫോട്ടോഗ്രാഫി - Product Commercial Photo Shoot for Amazon",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Product Commercial Photo Shoot for Amazon Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_400",
    "name": "ഫോട്ടോഗ്രാഫി - Premium Leather Photo Album Binding",
    "en": "Premium Leather Photo Album Binding",
    "ml": "ഫോട്ടോഗ്രാഫി - Premium Leather Photo Album Binding",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Premium Leather Photo Album Binding Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_401",
    "name": "ഇവന്റ്സ് - Wedding Stage Floral Decoration (Fresh Flowers)",
    "en": "Wedding Stage Floral Decoration (Fresh Flowers)",
    "ml": "ഇവന്റ്സ് - Wedding Stage Floral Decoration (Fresh Flowers)",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Wedding Stage Floral Decoration (Fresh Flowers) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_402",
    "name": "ഇവന്റ്സ് - Engagement Theme Backdrop & Ring Light",
    "en": "Engagement Theme Backdrop & Ring Light",
    "ml": "ഇവന്റ്സ് - Engagement Theme Backdrop & Ring Light",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Engagement Theme Backdrop & Ring Light Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_403",
    "name": "ഇവന്റ്സ് - Entrance Arch Floral Gate Designing",
    "en": "Entrance Arch Floral Gate Designing",
    "ml": "ഇവന്റ്സ് - Entrance Arch Floral Gate Designing",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Entrance Arch Floral Gate Designing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_404",
    "name": "ഇവന്റ്സ് - Traditional Brass Lamp & Floral Rangoli",
    "en": "Traditional Brass Lamp & Floral Rangoli",
    "ml": "ഇവന്റ്സ് - Traditional Brass Lamp & Floral Rangoli",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Traditional Brass Lamp & Floral Rangoli Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_405",
    "name": "ഇവന്റ്സ് - Balloon Theme Arch & Character Cutouts",
    "en": "Balloon Theme Arch & Character Cutouts",
    "ml": "ഇവന്റ്സ് - Balloon Theme Arch & Character Cutouts",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Balloon Theme Arch & Character Cutouts Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_406",
    "name": "ഇവന്റ്സ് - Fabric Draping Stage Backdrop Decoration",
    "en": "Fabric Draping Stage Backdrop Decoration",
    "ml": "ഇവന്റ്സ് - Fabric Draping Stage Backdrop Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Fabric Draping Stage Backdrop Decoration Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_407",
    "name": "ഇവന്റ്സ് - VIP Sofa & Stage Furniture Arrangement",
    "en": "VIP Sofa & Stage Furniture Arrangement",
    "ml": "ഇവന്റ്സ് - VIP Sofa & Stage Furniture Arrangement",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "VIP Sofa & Stage Furniture Arrangement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_408",
    "name": "ഇവന്റ്സ് - Red Carpet Aisle Runner Laying",
    "en": "Red Carpet Aisle Runner Laying",
    "ml": "ഇവന്റ്സ് - Red Carpet Aisle Runner Laying",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Red Carpet Aisle Runner Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_409",
    "name": "ഇവന്റ്സ് - DJ Sound System Line Array Speakers",
    "en": "DJ Sound System Line Array Speakers",
    "ml": "ഇവന്റ്സ് - DJ Sound System Line Array Speakers",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "DJ Sound System Line Array Speakers Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_410",
    "name": "ഇവന്റ്സ് - Party Dance Floor with Moving Head Lights",
    "en": "Party Dance Floor with Moving Head Lights",
    "ml": "ഇവന്റ്സ് - Party Dance Floor with Moving Head Lights",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Party Dance Floor with Moving Head Lights Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_411",
    "name": "ഇവന്റ്സ് - Stage Sharpy Beam Spot Lights",
    "en": "Stage Sharpy Beam Spot Lights",
    "ml": "ഇവന്റ്സ് - Stage Sharpy Beam Spot Lights",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Stage Sharpy Beam Spot Lights Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_412",
    "name": "ഇവന്റ്സ് - LED Par Cans Ambience Color Wash",
    "en": "LED Par Cans Ambience Color Wash",
    "ml": "ഇവന്റ്സ് - LED Par Cans Ambience Color Wash",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "LED Par Cans Ambience Color Wash Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_413",
    "name": "ഇവന്റ്സ് - Cold Pyro Safe Sparkular Machine",
    "en": "Cold Pyro Safe Sparkular Machine",
    "ml": "ഇവന്റ്സ് - Cold Pyro Safe Sparkular Machine",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Cold Pyro Safe Sparkular Machine Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_414",
    "name": "ഇവന്റ്സ് - Heavy Smoke & Fog Cloud Machine",
    "en": "Heavy Smoke & Fog Cloud Machine",
    "ml": "ഇവന്റ്സ് - Heavy Smoke & Fog Cloud Machine",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Heavy Smoke & Fog Cloud Machine Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_415",
    "name": "ഇവന്റ്സ് - LED Video Wall (P3 High Resolution)",
    "en": "LED Video Wall (P3 High Resolution)",
    "ml": "ഇവന്റ്സ് - LED Video Wall (P3 High Resolution)",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "LED Video Wall (P3 High Resolution) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_416",
    "name": "ഇവന്റ്സ് - Stage Generator Silent Power Backup (25-62 kVA)",
    "en": "Stage Generator Silent Power Backup (25-62 kVA)",
    "ml": "ഇവന്റ്സ് - Stage Generator Silent Power Backup (25-62 kVA)",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Stage Generator Silent Power Backup (25-62 kVA) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_417",
    "name": "ഇവന്റ്സ് - Traditional Chenda Melam Team",
    "en": "Traditional Chenda Melam Team",
    "ml": "ഇവന്റ്സ് - Traditional Chenda Melam Team",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Traditional Chenda Melam Team Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_418",
    "name": "ഇവന്റ്സ് - Shinkari Melam Team for Events",
    "en": "Shinkari Melam Team for Events",
    "ml": "ഇവന്റ്സ് - Shinkari Melam Team for Events",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Shinkari Melam Team for Events Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_419",
    "name": "ഇവന്റ്സ് - Nadaswaram Instrumental Melam Artists",
    "en": "Nadaswaram Instrumental Melam Artists",
    "ml": "ഇവന്റ്സ് - Nadaswaram Instrumental Melam Artists",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Nadaswaram Instrumental Melam Artists Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_420",
    "name": "ഇവന്റ്സ് - Master of Ceremonies (Emcee / Anchor on Stage)",
    "en": "Master of Ceremonies (Emcee / Anchor on Stage)",
    "ml": "ഇവന്റ്സ് - Master of Ceremonies (Emcee / Anchor on Stage)",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Master of Ceremonies (Emcee / Anchor on Stage) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_421",
    "name": "ഇവന്റ്സ് - Children Birthday Magic Show & Games",
    "en": "Children Birthday Magic Show & Games",
    "ml": "ഇവന്റ്സ് - Children Birthday Magic Show & Games",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Children Birthday Magic Show & Games Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_422",
    "name": "നഴ്സിംഗ് കെയർ - 24-Hour Residential Trained Home Nurse",
    "en": "24-Hour Residential Trained Home Nurse",
    "ml": "നഴ്സിംഗ് കെയർ - 24-Hour Residential Trained Home Nurse",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "24-Hour Residential Trained Home Nurse Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_423",
    "name": "നഴ്സിംഗ് കെയർ - 12-Hour Day / Night Patient Caretaker",
    "en": "12-Hour Day / Night Patient Caretaker",
    "ml": "നഴ്സിംഗ് കെയർ - 12-Hour Day / Night Patient Caretaker",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "12-Hour Day / Night Patient Caretaker Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_424",
    "name": "നഴ്സിംഗ് കെയർ - Elderly Bedridden Assisted Living Nurse",
    "en": "Elderly Bedridden Assisted Living Nurse",
    "ml": "നഴ്സിംഗ് കെയർ - Elderly Bedridden Assisted Living Nurse",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Elderly Bedridden Assisted Living Nurse Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_425",
    "name": "നഴ്സിംഗ് കെയർ - Post-Operative Surgery Recovery Caretaker",
    "en": "Post-Operative Surgery Recovery Caretaker",
    "ml": "നഴ്സിംഗ് കെയർ - Post-Operative Surgery Recovery Caretaker",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Post-Operative Surgery Recovery Caretaker Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_426",
    "name": "നഴ്സിംഗ് കെയർ - Paralysis Stroke Rehabilitation Attendant",
    "en": "Paralysis Stroke Rehabilitation Attendant",
    "ml": "നഴ്സിംഗ് കെയർ - Paralysis Stroke Rehabilitation Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Paralysis Stroke Rehabilitation Attendant Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_427",
    "name": "നഴ്സിംഗ് കെയർ - Dementia & Alzheimer Patient Nurse",
    "en": "Dementia & Alzheimer Patient Nurse",
    "ml": "നഴ്സിംഗ് കെയർ - Dementia & Alzheimer Patient Nurse",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Dementia & Alzheimer Patient Nurse Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_428",
    "name": "നഴ്സിംഗ് കെയർ - Newborn Baby & Post-Natal Mother Care",
    "en": "Newborn Baby & Post-Natal Mother Care",
    "ml": "നഴ്സിംഗ് കെയർ - Newborn Baby & Post-Natal Mother Care",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Newborn Baby & Post-Natal Mother Care Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_429",
    "name": "നഴ്സിംഗ് കെയർ - Ryles Tube Nasogastric Feeding Nurse",
    "en": "Ryles Tube Nasogastric Feeding Nurse",
    "ml": "നഴ്സിംഗ് കെയർ - Ryles Tube Nasogastric Feeding Nurse",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Ryles Tube Nasogastric Feeding Nurse Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_430",
    "name": "നഴ്സിംഗ് കെയർ - Foley Urinary Catheter Care & Flush",
    "en": "Foley Urinary Catheter Care & Flush",
    "ml": "നഴ്സിംഗ് കെയർ - Foley Urinary Catheter Care & Flush",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Foley Urinary Catheter Care & Flush Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_431",
    "name": "നഴ്സിംഗ് കെയർ - Bed Sore Wound Dressing & Sterile Care",
    "en": "Bed Sore Wound Dressing & Sterile Care",
    "ml": "നഴ്സിംഗ് കെയർ - Bed Sore Wound Dressing & Sterile Care",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Bed Sore Wound Dressing & Sterile Care Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_432",
    "name": "നഴ്സിംഗ് കെയർ - Tracheostomy Tube Suction Care Nurse",
    "en": "Tracheostomy Tube Suction Care Nurse",
    "ml": "നഴ്സിംഗ് കെയർ - Tracheostomy Tube Suction Care Nurse",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Tracheostomy Tube Suction Care Nurse Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_433",
    "name": "നഴ്സിംഗ് കെയർ - Insulin & Intramuscular Injection at Home",
    "en": "Insulin & Intramuscular Injection at Home",
    "ml": "നഴ്സിംഗ് കെയർ - Insulin & Intramuscular Injection at Home",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Insulin & Intramuscular Injection at Home Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_434",
    "name": "നഴ്സിംഗ് കെയർ - Oxygen Concentrator Machine on Rental (5L-10L)",
    "en": "Oxygen Concentrator Machine on Rental (5L-10L)",
    "ml": "നഴ്സിംഗ് കെയർ - Oxygen Concentrator Machine on Rental (5L-10L)",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Oxygen Concentrator Machine on Rental (5L-10L) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_435",
    "name": "നഴ്സിംഗ് കെയർ - Medical ICU Electric Hospital Bed Hire",
    "en": "Medical ICU Electric Hospital Bed Hire",
    "ml": "നഴ്സിംഗ് കെയർ - Medical ICU Electric Hospital Bed Hire",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Medical ICU Electric Hospital Bed Hire Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_436",
    "name": "നഴ്സിംഗ് കെയർ - Anti-Decubitus Air Mattress for Bed Sores",
    "en": "Anti-Decubitus Air Mattress for Bed Sores",
    "ml": "നഴ്സിംഗ് കെയർ - Anti-Decubitus Air Mattress for Bed Sores",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Anti-Decubitus Air Mattress for Bed Sores Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_437",
    "name": "നഴ്സിംഗ് കെയർ - Foldable Lightweight Wheelchair on Rent",
    "en": "Foldable Lightweight Wheelchair on Rent",
    "ml": "നഴ്സിംഗ് കെയർ - Foldable Lightweight Wheelchair on Rent",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Foldable Lightweight Wheelchair on Rent Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_438",
    "name": "നഴ്സിംഗ് കെയർ - Home Blood Sample Collection (Lab Test)",
    "en": "Home Blood Sample Collection (Lab Test)",
    "ml": "നഴ്സിംഗ് കെയർ - Home Blood Sample Collection (Lab Test)",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Home Blood Sample Collection (Lab Test) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_439",
    "name": "നഴ്സിംഗ് കെയർ - Home 12-Lead ECG Test with Cardiologist Report",
    "en": "Home 12-Lead ECG Test with Cardiologist Report",
    "ml": "നഴ്സിംഗ് കെയർ - Home 12-Lead ECG Test with Cardiologist Report",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Home 12-Lead ECG Test with Cardiologist Report Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_440",
    "name": "നഴ്സിംഗ് കെയർ - Doctor Home Visit for Geriatric Patients",
    "en": "Doctor Home Visit for Geriatric Patients",
    "ml": "നഴ്സിംഗ് കെയർ - Doctor Home Visit for Geriatric Patients",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Doctor Home Visit for Geriatric Patients Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_441",
    "name": "Qualified ഫിസിയോതെറാപ്പി Home Rehabilitation",
    "en": "Qualified Physiotherapy Home Rehabilitation",
    "ml": "Qualified ഫിസിയോതെറാപ്പി Home Rehabilitation",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Qualified Physiotherapy Home Rehabilitation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_442",
    "name": "നഴ്സിംഗ് കെയർ - Ayurvedic Medicated Oil Massage at Home",
    "en": "Ayurvedic Medicated Oil Massage at Home",
    "ml": "നഴ്സിംഗ് കെയർ - Ayurvedic Medicated Oil Massage at Home",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Ayurvedic Medicated Oil Massage at Home Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_443",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 10 CBSE Mathematics Personal Tutor",
    "en": "Class 10 CBSE Mathematics Personal Tutor",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 10 CBSE Mathematics Personal Tutor",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Class 10 CBSE Mathematics Personal Tutor Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_444",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 10 CBSE Science (Phy/Chem/Bio)",
    "en": "Class 10 CBSE Science (Phy/Chem/Bio)",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 10 CBSE Science (Phy/Chem/Bio)",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Class 10 CBSE Science (Phy/Chem/Bio) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_445",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 12 CBSE Physics Home / Online Tutor",
    "en": "Class 12 CBSE Physics Home / Online Tutor",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 12 CBSE Physics Home / Online Tutor",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Class 12 CBSE Physics Home / Online Tutor Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_446",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 12 CBSE Chemistry Entrance Oriented",
    "en": "Class 12 CBSE Chemistry Entrance Oriented",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 12 CBSE Chemistry Entrance Oriented",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Class 12 CBSE Chemistry Entrance Oriented Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_447",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 12 CBSE Mathematics Advanced",
    "en": "Class 12 CBSE Mathematics Advanced",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 12 CBSE Mathematics Advanced",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Class 12 CBSE Mathematics Advanced Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_448",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 12 CBSE Biology NEET Foundation",
    "en": "Class 12 CBSE Biology NEET Foundation",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Class 12 CBSE Biology NEET Foundation",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Class 12 CBSE Biology NEET Foundation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_449",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Kerala State Syllabus 10th SSLC All Subjects",
    "en": "Kerala State Syllabus 10th SSLC All Subjects",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Kerala State Syllabus 10th SSLC All Subjects",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kerala State Syllabus 10th SSLC All Subjects Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_450",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Kerala State Plus Two Commerce (Accountancy)",
    "en": "Kerala State Plus Two Commerce (Accountancy)",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Kerala State Plus Two Commerce (Accountancy)",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kerala State Plus Two Commerce (Accountancy) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_451",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - ICSE Class 9 & 10 Mathematics & Physics",
    "en": "ICSE Class 9 & 10 Mathematics & Physics",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - ICSE Class 9 & 10 Mathematics & Physics",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "ICSE Class 9 & 10 Mathematics & Physics Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_452",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - IELTS Academic & General Band 8 Trainer",
    "en": "IELTS Academic & General Band 8 Trainer",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - IELTS Academic & General Band 8 Trainer",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "IELTS Academic & General Band 8 Trainer Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_453",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - OET Nursing English Speaking & Writing",
    "en": "OET Nursing English Speaking & Writing",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - OET Nursing English Speaking & Writing",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "OET Nursing English Speaking & Writing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_454",
    "name": "സ്പോക്കൺ ഇംഗ്ലീഷ് Fluent Communication Class",
    "en": "Spoken English Fluent Communication Class",
    "ml": "സ്പോക്കൺ ഇംഗ്ലീഷ് Fluent Communication Class",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Spoken English Fluent Communication Class Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_455",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Malayalam Reading, Writing & Speaking Tutor",
    "en": "Malayalam Reading, Writing & Speaking Tutor",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Malayalam Reading, Writing & Speaking Tutor",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Malayalam Reading, Writing & Speaking Tutor Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_456",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Hindi Prachar Sabha Exam Preparation",
    "en": "Hindi Prachar Sabha Exam Preparation",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Hindi Prachar Sabha Exam Preparation",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Hindi Prachar Sabha Exam Preparation Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_457",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - German Language A1/A2 Certificate Coach",
    "en": "German Language A1/A2 Certificate Coach",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - German Language A1/A2 Certificate Coach",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "German Language A1/A2 Certificate Coach Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_458",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - French Beginner Level Personal Tutor",
    "en": "French Beginner Level Personal Tutor",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - French Beginner Level Personal Tutor",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "French Beginner Level Personal Tutor Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_459",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - KEAM / NEET Engineering Medical Entrance Coaching",
    "en": "KEAM / NEET Engineering Medical Entrance Coaching",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - KEAM / NEET Engineering Medical Entrance Coaching",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "KEAM / NEET Engineering Medical Entrance Coaching Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_460",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Kerala PSC Degree Level Preliminary Coaching",
    "en": "Kerala PSC Degree Level Preliminary Coaching",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Kerala PSC Degree Level Preliminary Coaching",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kerala PSC Degree Level Preliminary Coaching Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_461",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Carnatic Classical Vocal Music Tutor",
    "en": "Carnatic Classical Vocal Music Tutor",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Carnatic Classical Vocal Music Tutor",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Carnatic Classical Vocal Music Tutor Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_462",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Western Keyboard & Synthesizer Teacher",
    "en": "Western Keyboard & Synthesizer Teacher",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Western Keyboard & Synthesizer Teacher",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Western Keyboard & Synthesizer Teacher Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_463",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Acoustic Guitar Chords & Fingerstyle Tutor",
    "en": "Acoustic Guitar Chords & Fingerstyle Tutor",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Acoustic Guitar Chords & Fingerstyle Tutor",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Acoustic Guitar Chords & Fingerstyle Tutor Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_464",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Bharatanatyam Classical Dance Teacher",
    "en": "Bharatanatyam Classical Dance Teacher",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Bharatanatyam Classical Dance Teacher",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Bharatanatyam Classical Dance Teacher Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_465",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Karate & Self Defense Martial Arts Coach",
    "en": "Karate & Self Defense Martial Arts Coach",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Karate & Self Defense Martial Arts Coach",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Karate & Self Defense Martial Arts Coach Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_466",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Drawing, Sketching & Watercolor Painting",
    "en": "Drawing, Sketching & Watercolor Painting",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Drawing, Sketching & Watercolor Painting",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Drawing, Sketching & Watercolor Painting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_467",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Python Coding for School Kids (Scratch/Python)",
    "en": "Python Coding for School Kids (Scratch/Python)",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Python Coding for School Kids (Scratch/Python)",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Python Coding for School Kids (Scratch/Python) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_468",
    "name": "ട്യൂഷൻ & കോച്ചിംഗ് - Swimming Personal Coach for Beginners",
    "en": "Swimming Personal Coach for Beginners",
    "ml": "ട്യൂഷൻ & കോച്ചിംഗ് - Swimming Personal Coach for Beginners",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Swimming Personal Coach for Beginners Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_469",
    "name": "IP High-Definition 5MP Camera സെറ്റപ്പ്",
    "en": "IP High-Definition 5MP Camera Setup",
    "ml": "IP High-Definition 5MP Camera സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "IP High-Definition 5MP Camera Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_470",
    "name": "സിസിടിവി - HD Analog ColorVu Night Vision Camera",
    "en": "HD Analog ColorVu Night Vision Camera",
    "ml": "സിസിടിവി - HD Analog ColorVu Night Vision Camera",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "HD Analog ColorVu Night Vision Camera Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_471",
    "name": "സിസിടിവി - WiFi PTZ 360-Degree Wireless Camera",
    "en": "WiFi PTZ 360-Degree Wireless Camera",
    "ml": "സിസിടിവി - WiFi PTZ 360-Degree Wireless Camera",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "WiFi PTZ 360-Degree Wireless Camera Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_472",
    "name": "CCTV 4/8/16 Channel DVR & NVR സെറ്റപ്പ്",
    "en": "CCTV 4/8/16 Channel DVR & NVR Setup",
    "ml": "CCTV 4/8/16 Channel DVR & NVR സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "CCTV 4/8/16 Channel DVR & NVR Setup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_473",
    "name": "സിസിടിവി - Hard Disk Storage Surveillance Drive Fit",
    "en": "Hard Disk Storage Surveillance Drive Fit",
    "ml": "സിസിടിവി - Hard Disk Storage Surveillance Drive Fit",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Hard Disk Storage Surveillance Drive Fit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_474",
    "name": "സിസിടിവി - Mobile App Remote Live Camera Viewing",
    "en": "Mobile App Remote Live Camera Viewing",
    "ml": "സിസിടിവി - Mobile App Remote Live Camera Viewing",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Mobile App Remote Live Camera Viewing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_475",
    "name": "സിസിടിവി - CCTV Cat6 Cable Conduit Pipe Laying",
    "en": "CCTV Cat6 Cable Conduit Pipe Laying",
    "ml": "സിസിടിവി - CCTV Cat6 Cable Conduit Pipe Laying",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "CCTV Cat6 Cable Conduit Pipe Laying Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_476",
    "name": "സിസിടിവി - Video Door Phone with Two-Way Intercom",
    "en": "Video Door Phone with Two-Way Intercom",
    "ml": "സിസിടിവി - Video Door Phone with Two-Way Intercom",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Video Door Phone with Two-Way Intercom Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_477",
    "name": "Biometric Fingerprint Door Lock ഫിറ്റിംഗ്",
    "en": "Biometric Fingerprint Door Lock Fitting",
    "ml": "Biometric Fingerprint Door Lock ഫിറ്റിംഗ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Biometric Fingerprint Door Lock Fitting Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_478",
    "name": "സിസിടിവി - RFID Card Reader Office Access Control",
    "en": "RFID Card Reader Office Access Control",
    "ml": "സിസിടിവി - RFID Card Reader Office Access Control",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "RFID Card Reader Office Access Control Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_479",
    "name": "സിസിടിവി - Intercom EPABX System for Multi-Floor",
    "en": "Intercom EPABX System for Multi-Floor",
    "ml": "സിസിടിവി - Intercom EPABX System for Multi-Floor",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Intercom EPABX System for Multi-Floor Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_480",
    "name": "സിസിടിവി - Burglar Anti-Theft Siren Intrusion Alarm",
    "en": "Burglar Anti-Theft Siren Intrusion Alarm",
    "ml": "സിസിടിവി - Burglar Anti-Theft Siren Intrusion Alarm",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Burglar Anti-Theft Siren Intrusion Alarm Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_481",
    "name": "സിസിടിവി - Fire Smoke & Heat Detector System",
    "en": "Fire Smoke & Heat Detector System",
    "ml": "സിസിടിവി - Fire Smoke & Heat Detector System",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Fire Smoke & Heat Detector System Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_482",
    "name": "സിസിടിവി - Automatic Motorized Sliding Gate Kit",
    "en": "Automatic Motorized Sliding Gate Kit",
    "ml": "സിസിടിവി - Automatic Motorized Sliding Gate Kit",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Automatic Motorized Sliding Gate Kit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_483",
    "name": "സിസിടിവി - Network Server Rack 6U/9U Cable Dressing",
    "en": "Network Server Rack 6U/9U Cable Dressing",
    "ml": "സിസിടിവി - Network Server Rack 6U/9U Cable Dressing",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Network Server Rack 6U/9U Cable Dressing Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_484",
    "name": "തയ്യൽ - Designer Blouse with Princess Cut & Piping",
    "en": "Designer Blouse with Princess Cut & Piping",
    "ml": "തയ്യൽ - Designer Blouse with Princess Cut & Piping",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Designer Blouse with Princess Cut & Piping Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_485",
    "name": "തയ്യൽ - Aari Work & Maggam Hand Embroidery Blouse",
    "en": "Aari Work & Maggam Hand Embroidery Blouse",
    "ml": "തയ്യൽ - Aari Work & Maggam Hand Embroidery Blouse",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Aari Work & Maggam Hand Embroidery Blouse Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_486",
    "name": "തയ്യൽ - Churidar, Salwar & Kurti Custom Tailoring",
    "en": "Churidar, Salwar & Kurti Custom Tailoring",
    "ml": "തയ്യൽ - Churidar, Salwar & Kurti Custom Tailoring",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Churidar, Salwar & Kurti Custom Tailoring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_487",
    "name": "തയ്യൽ - Anarkali Suit & Floor-Length Gown Making",
    "en": "Anarkali Suit & Floor-Length Gown Making",
    "ml": "തയ്യൽ - Anarkali Suit & Floor-Length Gown Making",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Anarkali Suit & Floor-Length Gown Making Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_488",
    "name": "തയ്യൽ - Saree Kuchu Tassel Traditional Hand Work",
    "en": "Saree Kuchu Tassel Traditional Hand Work",
    "ml": "തയ്യൽ - Saree Kuchu Tassel Traditional Hand Work",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Saree Kuchu Tassel Traditional Hand Work Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_489",
    "name": "തയ്യൽ - Saree Fall & Zig-Zag Pico Hemming",
    "en": "Saree Fall & Zig-Zag Pico Hemming",
    "ml": "തയ്യൽ - Saree Fall & Zig-Zag Pico Hemming",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Saree Fall & Zig-Zag Pico Hemming Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_490",
    "name": "തയ്യൽ - Ladies Western Dress & Pants Tailoring",
    "en": "Ladies Western Dress & Pants Tailoring",
    "ml": "തയ്യൽ - Ladies Western Dress & Pants Tailoring",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Ladies Western Dress & Pants Tailoring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_491",
    "name": "തയ്യൽ - Men Custom Fit Formal Shirt Stitching",
    "en": "Men Custom Fit Formal Shirt Stitching",
    "ml": "തയ്യൽ - Men Custom Fit Formal Shirt Stitching",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Men Custom Fit Formal Shirt Stitching Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_492",
    "name": "തയ്യൽ - Men Formal Trouser Pant Tailoring",
    "en": "Men Formal Trouser Pant Tailoring",
    "ml": "തയ്യൽ - Men Formal Trouser Pant Tailoring",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Men Formal Trouser Pant Tailoring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_493",
    "name": "തയ്യൽ - Two-Piece & Three-Piece Suit Blazer Stitching",
    "en": "Two-Piece & Three-Piece Suit Blazer Stitching",
    "ml": "തയ്യൽ - Two-Piece & Three-Piece Suit Blazer Stitching",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Two-Piece & Three-Piece Suit Blazer Stitching Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_494",
    "name": "തയ്യൽ - Traditional Kurta Pyjama Tailoring",
    "en": "Traditional Kurta Pyjama Tailoring",
    "ml": "തയ്യൽ - Traditional Kurta Pyjama Tailoring",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Traditional Kurta Pyjama Tailoring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_495",
    "name": "തയ്യൽ - Curtain Eyelet Ring Stitching for Home",
    "en": "Curtain Eyelet Ring Stitching for Home",
    "ml": "തയ്യൽ - Curtain Eyelet Ring Stitching for Home",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Curtain Eyelet Ring Stitching for Home Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_496",
    "name": "തയ്യൽ - Sofa Cushion Cover & Pillow Making",
    "en": "Sofa Cushion Cover & Pillow Making",
    "ml": "തയ്യൽ - Sofa Cushion Cover & Pillow Making",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Sofa Cushion Cover & Pillow Making Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_497",
    "name": "തയ്യൽ - School & College Uniform Bulk Stitching",
    "en": "School & College Uniform Bulk Stitching",
    "ml": "തയ്യൽ - School & College Uniform Bulk Stitching",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "School & College Uniform Bulk Stitching Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_498",
    "name": "ബ്യൂട്ടി കെയർ - Bridal HD Makeup for Wedding Function",
    "en": "Bridal HD Makeup for Wedding Function",
    "ml": "ബ്യൂട്ടി കെയർ - Bridal HD Makeup for Wedding Function",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Bridal HD Makeup for Wedding Function Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_499",
    "name": "Airbrush Waterproof ബ്രൈഡൽ മേക്കപ്പ്",
    "en": "Airbrush Waterproof Bridal Makeup",
    "ml": "Airbrush Waterproof ബ്രൈഡൽ മേക്കപ്പ്",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Airbrush Waterproof Bridal Makeup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_500",
    "name": "Reception Glam Makeup & ഹെയർ സ്റ്റൈലിംഗ്",
    "en": "Reception Glam Makeup & Hair Styling",
    "ml": "Reception Glam Makeup & ഹെയർ സ്റ്റൈലിംഗ്",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Reception Glam Makeup & Hair Styling Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_501",
    "name": "Bridal Saree Draping Perfection സർവീസ്",
    "en": "Bridal Saree Draping Perfection Service",
    "ml": "Bridal Saree Draping Perfection സർവീസ്",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Bridal Saree Draping Perfection Service Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_502",
    "name": "Bridal മെഹന്തി ഡിസൈൻ Full Hand Arabic & Indian",
    "en": "Bridal Mehendi Full Hand Arabic & Indian",
    "ml": "Bridal മെഹന്തി ഡിസൈൻ Full Hand Arabic & Indian",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Bridal Mehendi Full Hand Arabic & Indian Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_503",
    "name": "ബ്യൂട്ടി കെയർ - Engagement Subtle Soft Glow Makeup",
    "en": "Engagement Subtle Soft Glow Makeup",
    "ml": "ബ്യൂട്ടി കെയർ - Engagement Subtle Soft Glow Makeup",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Engagement Subtle Soft Glow Makeup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_504",
    "name": "ബ്യൂട്ടി കെയർ - Ladies Haircut (Layer / Feather / Bob / U-Cut)",
    "en": "Ladies Haircut (Layer / Feather / Bob / U-Cut)",
    "ml": "ബ്യൂട്ടി കെയർ - Ladies Haircut (Layer / Feather / Bob / U-Cut)",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Ladies Haircut (Layer / Feather / Bob / U-Cut) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_505",
    "name": "ബ്യൂട്ടി കെയർ - Hair Keratin Protein Treatment for Frizz",
    "en": "Hair Keratin Protein Treatment for Frizz",
    "ml": "ബ്യൂട്ടി കെയർ - Hair Keratin Protein Treatment for Frizz",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Hair Keratin Protein Treatment for Frizz Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_506",
    "name": "ബ്യൂട്ടി കെയർ - Hair Smoothening & Chemical Straightening",
    "en": "Hair Smoothening & Chemical Straightening",
    "ml": "ബ്യൂട്ടി കെയർ - Hair Smoothening & Chemical Straightening",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Hair Smoothening & Chemical Straightening Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_507",
    "name": "ബ്യൂട്ടി കെയർ - Hair Global Color & Highlights / Balayage",
    "en": "Hair Global Color & Highlights / Balayage",
    "ml": "ബ്യൂട്ടി കെയർ - Hair Global Color & Highlights / Balayage",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Hair Global Color & Highlights / Balayage Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_508",
    "name": "ബ്യൂട്ടി കെയർ - Herbal & Gold Facial for Glowing Skin",
    "en": "Herbal & Gold Facial for Glowing Skin",
    "ml": "ബ്യൂട്ടി കെയർ - Herbal & Gold Facial for Glowing Skin",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Herbal & Gold Facial for Glowing Skin Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_509",
    "name": "ബ്യൂട്ടി കെയർ - Deep Pore Clean-up with Blackhead Removal",
    "en": "Deep Pore Clean-up with Blackhead Removal",
    "ml": "ബ്യൂട്ടി കെയർ - Deep Pore Clean-up with Blackhead Removal",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Deep Pore Clean-up with Blackhead Removal Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_510",
    "name": "ബ്യൂട്ടി കെയർ - Full Body Waxing (Rica / Honey Wax)",
    "en": "Full Body Waxing (Rica / Honey Wax)",
    "ml": "ബ്യൂട്ടി കെയർ - Full Body Waxing (Rica / Honey Wax)",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Full Body Waxing (Rica / Honey Wax) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_511",
    "name": "ബ്യൂട്ടി കെയർ - Eyebrow Threading & Upper Lip Clean",
    "en": "Eyebrow Threading & Upper Lip Clean",
    "ml": "ബ്യൂട്ടി കെയർ - Eyebrow Threading & Upper Lip Clean",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Eyebrow Threading & Upper Lip Clean Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_512",
    "name": "ബ്യൂട്ടി കെയർ - Deluxe Pedicure & Foot Crack Treatment",
    "en": "Deluxe Pedicure & Foot Crack Treatment",
    "ml": "ബ്യൂട്ടി കെയർ - Deluxe Pedicure & Foot Crack Treatment",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Deluxe Pedicure & Foot Crack Treatment Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_513",
    "name": "സോളാർ - On-Grid Solar 3kW System for Home",
    "en": "On-Grid Solar 3kW System for Home",
    "ml": "സോളാർ - On-Grid Solar 3kW System for Home",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "On-Grid Solar 3kW System for Home Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_514",
    "name": "സോളാർ - On-Grid Solar 5kW High Efficiency Monocrystalline",
    "en": "On-Grid Solar 5kW High Efficiency Monocrystalline",
    "ml": "സോളാർ - On-Grid Solar 5kW High Efficiency Monocrystalline",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "On-Grid Solar 5kW High Efficiency Monocrystalline Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_515",
    "name": "സോളാർ - Off-Grid 3kW Solar with Lithium Battery",
    "en": "Off-Grid 3kW Solar with Lithium Battery",
    "ml": "സോളാർ - Off-Grid 3kW Solar with Lithium Battery",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Off-Grid 3kW Solar with Lithium Battery Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_516",
    "name": "സോളാർ - Hybrid Solar 5kW System with Grid Backup",
    "en": "Hybrid Solar 5kW System with Grid Backup",
    "ml": "സോളാർ - Hybrid Solar 5kW System with Grid Backup",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Hybrid Solar 5kW System with Grid Backup Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_517",
    "name": "സോളാർ - Solar Net Metering KSEB Feasibility Study",
    "en": "Solar Net Metering KSEB Feasibility Study",
    "ml": "സോളാർ - Solar Net Metering KSEB Feasibility Study",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Solar Net Metering KSEB Feasibility Study Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_518",
    "name": "സോളാർ - Galvanized GI Solar Mounting Structure",
    "en": "Galvanized GI Solar Mounting Structure",
    "ml": "സോളാർ - Galvanized GI Solar Mounting Structure",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Galvanized GI Solar Mounting Structure Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_519",
    "name": "Solar DCDB & ACDB Protection Box വയറിംഗ്",
    "en": "Solar DCDB & ACDB Protection Box Wiring",
    "ml": "Solar DCDB & ACDB Protection Box വയറിംഗ്",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Solar DCDB & ACDB Protection Box Wiring Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_520",
    "name": "Solar Panel High-Pressure Water Jet ക്ലീനിംഗ്",
    "en": "Solar Panel High-Pressure Water Jet Cleaning",
    "ml": "Solar Panel High-Pressure Water Jet ക്ലീനിംഗ്",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Solar Panel High-Pressure Water Jet Cleaning Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_521",
    "name": "Solar വാട്ടർ ഹീറ്റർ 100 Litres (FPC Glass)",
    "en": "Solar Water Heater 100 Litres (FPC Glass)",
    "ml": "Solar വാട്ടർ ഹീറ്റർ 100 Litres (FPC Glass)",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Solar Water Heater 100 Litres (FPC Glass) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_522",
    "name": "Solar വാട്ടർ ഹീറ്റർ 200 Litres (ETC Tube)",
    "en": "Solar Water Heater 200 Litres (ETC Tube)",
    "ml": "Solar വാട്ടർ ഹീറ്റർ 200 Litres (ETC Tube)",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Solar Water Heater 200 Litres (ETC Tube) Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_523",
    "name": "Solar വാട്ടർ ഹീറ്റർ Descaling & Tank സർവീസ്",
    "en": "Solar Water Heater Descaling & Tank Service",
    "ml": "Solar വാട്ടർ ഹീറ്റർ Descaling & Tank സർവീസ്",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Solar Water Heater Descaling & Tank Service Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_524",
    "name": "സോളാർ - Solar Automatic Street Light",
    "en": "Solar Automatic Street Light",
    "ml": "സോളാർ - Solar Automatic Street Light",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Solar Automatic Street Light Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_525",
    "name": "LED Smart TV Screen മാറ്റൽ (32\"-65\")",
    "en": "LED Smart TV Screen Replacement (32\"-65\")",
    "ml": "LED Smart TV Screen മാറ്റൽ (32\"-65\")",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "LED Smart TV Screen Replacement (32\"-65\") Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_526",
    "name": "LED TV Backlight Strip മാറ്റൽ",
    "en": "LED TV Backlight Strip Replacement",
    "ml": "LED TV Backlight Strip മാറ്റൽ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "LED TV Backlight Strip Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_527",
    "name": "Smart TV Android Motherboard റിപ്പയർ",
    "en": "Smart TV Android Motherboard Repair",
    "ml": "Smart TV Android Motherboard റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Smart TV Android Motherboard Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_528",
    "name": "ഇലക്ട്രോണിക്സ് - TV Power Supply Board (SMPS) Capacitor Fix",
    "en": "TV Power Supply Board (SMPS) Capacitor Fix",
    "ml": "ഇലക്ട്രോണിക്സ് - TV Power Supply Board (SMPS) Capacitor Fix",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "TV Power Supply Board (SMPS) Capacitor Fix Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_529",
    "name": "Home Theatre 5.1 Amplifier Speaker റിപ്പയർ",
    "en": "Home Theatre 5.1 Amplifier Speaker Repair",
    "ml": "Home Theatre 5.1 Amplifier Speaker റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Home Theatre 5.1 Amplifier Speaker Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_530",
    "name": "Microwave Oven Magnetron & Fuse റിപ്പയർ",
    "en": "Microwave Oven Magnetron & Fuse Repair",
    "ml": "Microwave Oven Magnetron & Fuse റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Microwave Oven Magnetron & Fuse Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_531",
    "name": "Induction Cooktop Glass Top & Coil റിപ്പയർ",
    "en": "Induction Cooktop Glass Top & Coil Repair",
    "ml": "Induction Cooktop Glass Top & Coil റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Induction Cooktop Glass Top & Coil Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_532",
    "name": "ഇലക്ട്രോണിക്സ് - Mixer Grinder Motor Rewinding & Blade Bush",
    "en": "Mixer Grinder Motor Rewinding & Blade Bush",
    "ml": "ഇലക്ട്രോണിക്സ് - Mixer Grinder Motor Rewinding & Blade Bush",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Mixer Grinder Motor Rewinding & Blade Bush Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_533",
    "name": "Kitchen Exhaust Chimney Motor റിപ്പയർ",
    "en": "Kitchen Exhaust Chimney Motor Repair",
    "ml": "Kitchen Exhaust Chimney Motor റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kitchen Exhaust Chimney Motor Repair Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_534",
    "name": "Laptop Broken Screen മാറ്റൽ (14\"-15.6\")",
    "en": "Laptop Broken Screen Replacement (14\"-15.6\")",
    "ml": "Laptop Broken Screen മാറ്റൽ (14\"-15.6\")",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Laptop Broken Screen Replacement (14\"-15.6\") Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_535",
    "name": "Laptop Keyboard Keys മാറ്റൽ",
    "en": "Laptop Keyboard Keys Replacement",
    "ml": "Laptop Keyboard Keys മാറ്റൽ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Laptop Keyboard Keys Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_536",
    "name": "Laptop Battery മാറ്റൽ & Calibration",
    "en": "Laptop Battery Replacement & Calibration",
    "ml": "Laptop Battery മാറ്റൽ & Calibration",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Laptop Battery Replacement & Calibration Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_537",
    "name": "Desktop PC SMPS Power Supply മാറ്റൽ",
    "en": "Desktop PC SMPS Power Supply Replacement",
    "ml": "Desktop PC SMPS Power Supply മാറ്റൽ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Desktop PC SMPS Power Supply Replacement Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_538",
    "name": "ഇലക്ട്രോണിക്സ് - SSD Storage Upgrade & Windows OS Install",
    "en": "SSD Storage Upgrade & Windows OS Install",
    "ml": "ഇലക്ട്രോണിക്സ് - SSD Storage Upgrade & Windows OS Install",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "SSD Storage Upgrade & Windows OS Install Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_539",
    "name": "Hard Disk Lost Data Recovery സർവീസ്",
    "en": "Hard Disk Lost Data Recovery Service",
    "ml": "Hard Disk Lost Data Recovery സർവീസ്",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Hard Disk Lost Data Recovery Service Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_540",
    "name": "ഇലക്ട്രോണിക്സ് - Smartphone Cracked Glass / Touch Display Fit",
    "en": "Smartphone Cracked Glass / Touch Display Fit",
    "ml": "ഇലക്ട്രോണിക്സ് - Smartphone Cracked Glass / Touch Display Fit",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Smartphone Cracked Glass / Touch Display Fit Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_541",
    "name": "Mobile Phone Battery മാറ്റൽ Original",
    "en": "Mobile Phone Battery Replacement Original",
    "ml": "Mobile Phone Battery മാറ്റൽ Original",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Mobile Phone Battery Replacement Original Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_542",
    "name": "ഇലക്ട്രോണിക്സ് - Smartphone Charging Port Type-C Soldering",
    "en": "Smartphone Charging Port Type-C Soldering",
    "ml": "ഇലക്ട്രോണിക്സ് - Smartphone Charging Port Type-C Soldering",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Smartphone Charging Port Type-C Soldering Professional Work",
      "Experienced Certified Technician",
      "Quality Hardware & Genuine Parts",
      "Transparent Rates & Quick Service"
    ]
  },
  {
    "id": "tr_543",
    "name": "ഇലക്ട്രിക്കൽ - Kottayam Electrician & Power Maintenance",
    "en": "Kottayam Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kottayam Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_544",
    "name": "പ്ലംബിംഗ് - Kottayam Emergency Plumbing & Water Solution",
    "en": "Kottayam Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kottayam Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_545",
    "name": "Kottayam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kottayam AC Installation & Cool Care Service",
    "ml": "Kottayam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_546",
    "name": "തടിപ്പണി - Kottayam Custom Carpentry & Furniture Restoring",
    "en": "Kottayam Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kottayam Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_547",
    "name": "പെയിന്റിംഗ് - Kottayam Weatherproof Wall Painting & Damp Proofing",
    "en": "Kottayam Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kottayam Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_548",
    "name": "Kottayam Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kottayam Civil Masonry & Concrete Repair",
    "ml": "Kottayam Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_549",
    "name": "വെൽഡിങ് വർക്ക് - Kottayam Truss Roofing & Structural Steel Fabrication",
    "en": "Kottayam Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kottayam Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_550",
    "name": "വർക്ക്‌ഷോപ്പ് - Kottayam On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kottayam On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kottayam On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_551",
    "name": "വാഹന സർവീസ് - Kottayam Professional Driver & Taxi Ride Hire",
    "en": "Kottayam Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kottayam Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_552",
    "name": "Kottayam Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kottayam Home Deep Cleaning & Waste Management",
    "ml": "Kottayam Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_553",
    "name": "Kottayam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kottayam Coconut Tree & Farm Care Service",
    "ml": "Kottayam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_554",
    "name": "കാറ്ററിംഗ് - Kottayam Catering & Traditional Feast Cooking",
    "en": "Kottayam Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kottayam Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_555",
    "name": "Kottayam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kottayam Wedding Photography & Drone Cinematography",
    "ml": "Kottayam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_556",
    "name": "ഇവന്റ്സ് - Kottayam Stage Sound System & Light Decoration",
    "en": "Kottayam Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kottayam Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_557",
    "name": "Kottayam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kottayam Home Nursing & Elderly Patient Attendant",
    "ml": "Kottayam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_558",
    "name": "Kottayam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kottayam Academic Home Tuition & Skill Training",
    "ml": "Kottayam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_559",
    "name": "Kottayam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kottayam CCTV Security Camera & Automation Setup",
    "ml": "Kottayam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_560",
    "name": "Kottayam Designer Tailoring & Stitching സർവീസ്",
    "en": "Kottayam Designer Tailoring & Stitching Service",
    "ml": "Kottayam Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_561",
    "name": "ബ്യൂട്ടി കെയർ - Kottayam Bridal Beauty Makeup & Personal Care",
    "en": "Kottayam Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kottayam Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_562",
    "name": "സോളാർ - Kottayam Solar Rooftop & Inverter Power System",
    "en": "Kottayam Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kottayam Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_563",
    "name": "Kottayam TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kottayam TV, Computer & Home Appliance Repair",
    "ml": "Kottayam TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_564",
    "name": "Kottayam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kottayam Open Well Digging & Mud Deep Cleaning",
    "ml": "Kottayam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_565",
    "name": "മേസൺ വർക്ക് - Kottayam Interlock Paver Block & Driveway Laying",
    "en": "Kottayam Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kottayam Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_566",
    "name": "ക്ലീനിംഗ് - Kottayam Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kottayam Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kottayam Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_567",
    "name": "വെൽഡിങ് വർക്ക് - Kottayam Aluminium Glass Sliding & Cabin Partition",
    "en": "Kottayam Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kottayam Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_568",
    "name": "വാഹന സർവീസ് - Kottayam Household Packing & Moving Shifting Assist",
    "en": "Kottayam Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kottayam Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_569",
    "name": "Kottayam Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kottayam Gas Stove & Commercial Burner Repair",
    "ml": "Kottayam Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_570",
    "name": "ക്ലീനിംഗ് - Kottayam Anti-Termite & Mosquito Pest Extermination",
    "en": "Kottayam Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kottayam Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kottayam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_571",
    "name": "ഇലക്ട്രിക്കൽ - Kochi Electrician & Power Maintenance",
    "en": "Kochi Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kochi Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_572",
    "name": "പ്ലംബിംഗ് - Kochi Emergency Plumbing & Water Solution",
    "en": "Kochi Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kochi Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_573",
    "name": "Kochi AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kochi AC Installation & Cool Care Service",
    "ml": "Kochi AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_574",
    "name": "തടിപ്പണി - Kochi Custom Carpentry & Furniture Restoring",
    "en": "Kochi Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kochi Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_575",
    "name": "പെയിന്റിംഗ് - Kochi Weatherproof Wall Painting & Damp Proofing",
    "en": "Kochi Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kochi Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_576",
    "name": "Kochi Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kochi Civil Masonry & Concrete Repair",
    "ml": "Kochi Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_577",
    "name": "വെൽഡിങ് വർക്ക് - Kochi Truss Roofing & Structural Steel Fabrication",
    "en": "Kochi Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kochi Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_578",
    "name": "വർക്ക്‌ഷോപ്പ് - Kochi On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kochi On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kochi On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_579",
    "name": "വാഹന സർവീസ് - Kochi Professional Driver & Taxi Ride Hire",
    "en": "Kochi Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kochi Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_580",
    "name": "Kochi Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kochi Home Deep Cleaning & Waste Management",
    "ml": "Kochi Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_581",
    "name": "Kochi തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kochi Coconut Tree & Farm Care Service",
    "ml": "Kochi തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_582",
    "name": "കാറ്ററിംഗ് - Kochi Catering & Traditional Feast Cooking",
    "en": "Kochi Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kochi Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_583",
    "name": "Kochi വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kochi Wedding Photography & Drone Cinematography",
    "ml": "Kochi വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_584",
    "name": "ഇവന്റ്സ് - Kochi Stage Sound System & Light Decoration",
    "en": "Kochi Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kochi Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_585",
    "name": "Kochi ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kochi Home Nursing & Elderly Patient Attendant",
    "ml": "Kochi ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_586",
    "name": "Kochi Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kochi Academic Home Tuition & Skill Training",
    "ml": "Kochi Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_587",
    "name": "Kochi CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kochi CCTV Security Camera & Automation Setup",
    "ml": "Kochi CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_588",
    "name": "Kochi Designer Tailoring & Stitching സർവീസ്",
    "en": "Kochi Designer Tailoring & Stitching Service",
    "ml": "Kochi Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_589",
    "name": "ബ്യൂട്ടി കെയർ - Kochi Bridal Beauty Makeup & Personal Care",
    "en": "Kochi Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kochi Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_590",
    "name": "സോളാർ - Kochi Solar Rooftop & Inverter Power System",
    "en": "Kochi Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kochi Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_591",
    "name": "Kochi TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kochi TV, Computer & Home Appliance Repair",
    "ml": "Kochi TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_592",
    "name": "Kochi Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kochi Open Well Digging & Mud Deep Cleaning",
    "ml": "Kochi Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_593",
    "name": "മേസൺ വർക്ക് - Kochi Interlock Paver Block & Driveway Laying",
    "en": "Kochi Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kochi Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_594",
    "name": "ക്ലീനിംഗ് - Kochi Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kochi Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kochi Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_595",
    "name": "വെൽഡിങ് വർക്ക് - Kochi Aluminium Glass Sliding & Cabin Partition",
    "en": "Kochi Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kochi Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_596",
    "name": "വാഹന സർവീസ് - Kochi Household Packing & Moving Shifting Assist",
    "en": "Kochi Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kochi Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_597",
    "name": "Kochi Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kochi Gas Stove & Commercial Burner Repair",
    "ml": "Kochi Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_598",
    "name": "ക്ലീനിംഗ് - Kochi Anti-Termite & Mosquito Pest Extermination",
    "en": "Kochi Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kochi Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kochi Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_599",
    "name": "ഇലക്ട്രിക്കൽ - Thiruvananthapuram Electrician & Power Maintenance",
    "en": "Thiruvananthapuram Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Thiruvananthapuram Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_600",
    "name": "പ്ലംബിംഗ് - Thiruvananthapuram Emergency Plumbing & Water Solution",
    "en": "Thiruvananthapuram Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Thiruvananthapuram Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_601",
    "name": "Thiruvananthapuram AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Thiruvananthapuram AC Installation & Cool Care Service",
    "ml": "Thiruvananthapuram AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_602",
    "name": "തടിപ്പണി - Thiruvananthapuram Custom Carpentry & Furniture Restoring",
    "en": "Thiruvananthapuram Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Thiruvananthapuram Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_603",
    "name": "പെയിന്റിംഗ് - Thiruvananthapuram Weatherproof Wall Painting & Damp Proofing",
    "en": "Thiruvananthapuram Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Thiruvananthapuram Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_604",
    "name": "Thiruvananthapuram Civil Masonry & Concrete റിപ്പയർ",
    "en": "Thiruvananthapuram Civil Masonry & Concrete Repair",
    "ml": "Thiruvananthapuram Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_605",
    "name": "വെൽഡിങ് വർക്ക് - Thiruvananthapuram Truss Roofing & Structural Steel Fabrication",
    "en": "Thiruvananthapuram Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Thiruvananthapuram Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_606",
    "name": "വർക്ക്‌ഷോപ്പ് - Thiruvananthapuram On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Thiruvananthapuram On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Thiruvananthapuram On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_607",
    "name": "വാഹന സർവീസ് - Thiruvananthapuram Professional Driver & Taxi Ride Hire",
    "en": "Thiruvananthapuram Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Thiruvananthapuram Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_608",
    "name": "Thiruvananthapuram Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Thiruvananthapuram Home Deep Cleaning & Waste Management",
    "ml": "Thiruvananthapuram Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_609",
    "name": "Thiruvananthapuram തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Thiruvananthapuram Coconut Tree & Farm Care Service",
    "ml": "Thiruvananthapuram തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_610",
    "name": "കാറ്ററിംഗ് - Thiruvananthapuram Catering & Traditional Feast Cooking",
    "en": "Thiruvananthapuram Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Thiruvananthapuram Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_611",
    "name": "Thiruvananthapuram വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Thiruvananthapuram Wedding Photography & Drone Cinematography",
    "ml": "Thiruvananthapuram വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_612",
    "name": "ഇവന്റ്സ് - Thiruvananthapuram Stage Sound System & Light Decoration",
    "en": "Thiruvananthapuram Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Thiruvananthapuram Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_613",
    "name": "Thiruvananthapuram ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Thiruvananthapuram Home Nursing & Elderly Patient Attendant",
    "ml": "Thiruvananthapuram ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_614",
    "name": "Thiruvananthapuram Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Thiruvananthapuram Academic Home Tuition & Skill Training",
    "ml": "Thiruvananthapuram Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_615",
    "name": "Thiruvananthapuram CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Thiruvananthapuram CCTV Security Camera & Automation Setup",
    "ml": "Thiruvananthapuram CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_616",
    "name": "Thiruvananthapuram Designer Tailoring & Stitching സർവീസ്",
    "en": "Thiruvananthapuram Designer Tailoring & Stitching Service",
    "ml": "Thiruvananthapuram Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_617",
    "name": "ബ്യൂട്ടി കെയർ - Thiruvananthapuram Bridal Beauty Makeup & Personal Care",
    "en": "Thiruvananthapuram Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Thiruvananthapuram Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_618",
    "name": "സോളാർ - Thiruvananthapuram Solar Rooftop & Inverter Power System",
    "en": "Thiruvananthapuram Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Thiruvananthapuram Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_619",
    "name": "Thiruvananthapuram TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Thiruvananthapuram TV, Computer & Home Appliance Repair",
    "ml": "Thiruvananthapuram TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_620",
    "name": "Thiruvananthapuram Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Thiruvananthapuram Open Well Digging & Mud Deep Cleaning",
    "ml": "Thiruvananthapuram Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_621",
    "name": "മേസൺ വർക്ക് - Thiruvananthapuram Interlock Paver Block & Driveway Laying",
    "en": "Thiruvananthapuram Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Thiruvananthapuram Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_622",
    "name": "ക്ലീനിംഗ് - Thiruvananthapuram Septic Tank Vacuum Suction & Waste Flush",
    "en": "Thiruvananthapuram Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Thiruvananthapuram Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_623",
    "name": "വെൽഡിങ് വർക്ക് - Thiruvananthapuram Aluminium Glass Sliding & Cabin Partition",
    "en": "Thiruvananthapuram Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Thiruvananthapuram Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_624",
    "name": "വാഹന സർവീസ് - Thiruvananthapuram Household Packing & Moving Shifting Assist",
    "en": "Thiruvananthapuram Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Thiruvananthapuram Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_625",
    "name": "Thiruvananthapuram Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Thiruvananthapuram Gas Stove & Commercial Burner Repair",
    "ml": "Thiruvananthapuram Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_626",
    "name": "ക്ലീനിംഗ് - Thiruvananthapuram Anti-Termite & Mosquito Pest Extermination",
    "en": "Thiruvananthapuram Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Thiruvananthapuram Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Thiruvananthapuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_627",
    "name": "ഇലക്ട്രിക്കൽ - Kozhikode Electrician & Power Maintenance",
    "en": "Kozhikode Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kozhikode Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_628",
    "name": "പ്ലംബിംഗ് - Kozhikode Emergency Plumbing & Water Solution",
    "en": "Kozhikode Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kozhikode Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_629",
    "name": "Kozhikode AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kozhikode AC Installation & Cool Care Service",
    "ml": "Kozhikode AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_630",
    "name": "തടിപ്പണി - Kozhikode Custom Carpentry & Furniture Restoring",
    "en": "Kozhikode Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kozhikode Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_631",
    "name": "പെയിന്റിംഗ് - Kozhikode Weatherproof Wall Painting & Damp Proofing",
    "en": "Kozhikode Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kozhikode Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_632",
    "name": "Kozhikode Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kozhikode Civil Masonry & Concrete Repair",
    "ml": "Kozhikode Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_633",
    "name": "വെൽഡിങ് വർക്ക് - Kozhikode Truss Roofing & Structural Steel Fabrication",
    "en": "Kozhikode Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kozhikode Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_634",
    "name": "വർക്ക്‌ഷോപ്പ് - Kozhikode On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kozhikode On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kozhikode On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_635",
    "name": "വാഹന സർവീസ് - Kozhikode Professional Driver & Taxi Ride Hire",
    "en": "Kozhikode Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kozhikode Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_636",
    "name": "Kozhikode Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kozhikode Home Deep Cleaning & Waste Management",
    "ml": "Kozhikode Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_637",
    "name": "Kozhikode തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kozhikode Coconut Tree & Farm Care Service",
    "ml": "Kozhikode തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_638",
    "name": "കാറ്ററിംഗ് - Kozhikode Catering & Traditional Feast Cooking",
    "en": "Kozhikode Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kozhikode Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_639",
    "name": "Kozhikode വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kozhikode Wedding Photography & Drone Cinematography",
    "ml": "Kozhikode വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_640",
    "name": "ഇവന്റ്സ് - Kozhikode Stage Sound System & Light Decoration",
    "en": "Kozhikode Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kozhikode Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_641",
    "name": "Kozhikode ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kozhikode Home Nursing & Elderly Patient Attendant",
    "ml": "Kozhikode ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_642",
    "name": "Kozhikode Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kozhikode Academic Home Tuition & Skill Training",
    "ml": "Kozhikode Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_643",
    "name": "Kozhikode CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kozhikode CCTV Security Camera & Automation Setup",
    "ml": "Kozhikode CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_644",
    "name": "Kozhikode Designer Tailoring & Stitching സർവീസ്",
    "en": "Kozhikode Designer Tailoring & Stitching Service",
    "ml": "Kozhikode Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_645",
    "name": "ബ്യൂട്ടി കെയർ - Kozhikode Bridal Beauty Makeup & Personal Care",
    "en": "Kozhikode Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kozhikode Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_646",
    "name": "സോളാർ - Kozhikode Solar Rooftop & Inverter Power System",
    "en": "Kozhikode Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kozhikode Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_647",
    "name": "Kozhikode TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kozhikode TV, Computer & Home Appliance Repair",
    "ml": "Kozhikode TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_648",
    "name": "Kozhikode Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kozhikode Open Well Digging & Mud Deep Cleaning",
    "ml": "Kozhikode Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_649",
    "name": "മേസൺ വർക്ക് - Kozhikode Interlock Paver Block & Driveway Laying",
    "en": "Kozhikode Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kozhikode Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_650",
    "name": "ക്ലീനിംഗ് - Kozhikode Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kozhikode Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kozhikode Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_651",
    "name": "വെൽഡിങ് വർക്ക് - Kozhikode Aluminium Glass Sliding & Cabin Partition",
    "en": "Kozhikode Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kozhikode Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_652",
    "name": "വാഹന സർവീസ് - Kozhikode Household Packing & Moving Shifting Assist",
    "en": "Kozhikode Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kozhikode Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_653",
    "name": "Kozhikode Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kozhikode Gas Stove & Commercial Burner Repair",
    "ml": "Kozhikode Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_654",
    "name": "ക്ലീനിംഗ് - Kozhikode Anti-Termite & Mosquito Pest Extermination",
    "en": "Kozhikode Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kozhikode Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kozhikode Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_655",
    "name": "ഇലക്ട്രിക്കൽ - Thrissur Electrician & Power Maintenance",
    "en": "Thrissur Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Thrissur Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_656",
    "name": "പ്ലംബിംഗ് - Thrissur Emergency Plumbing & Water Solution",
    "en": "Thrissur Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Thrissur Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_657",
    "name": "Thrissur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Thrissur AC Installation & Cool Care Service",
    "ml": "Thrissur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_658",
    "name": "തടിപ്പണി - Thrissur Custom Carpentry & Furniture Restoring",
    "en": "Thrissur Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Thrissur Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_659",
    "name": "പെയിന്റിംഗ് - Thrissur Weatherproof Wall Painting & Damp Proofing",
    "en": "Thrissur Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Thrissur Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_660",
    "name": "Thrissur Civil Masonry & Concrete റിപ്പയർ",
    "en": "Thrissur Civil Masonry & Concrete Repair",
    "ml": "Thrissur Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_661",
    "name": "വെൽഡിങ് വർക്ക് - Thrissur Truss Roofing & Structural Steel Fabrication",
    "en": "Thrissur Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Thrissur Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_662",
    "name": "വർക്ക്‌ഷോപ്പ് - Thrissur On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Thrissur On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Thrissur On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_663",
    "name": "വാഹന സർവീസ് - Thrissur Professional Driver & Taxi Ride Hire",
    "en": "Thrissur Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Thrissur Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_664",
    "name": "Thrissur Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Thrissur Home Deep Cleaning & Waste Management",
    "ml": "Thrissur Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_665",
    "name": "Thrissur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Thrissur Coconut Tree & Farm Care Service",
    "ml": "Thrissur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_666",
    "name": "കാറ്ററിംഗ് - Thrissur Catering & Traditional Feast Cooking",
    "en": "Thrissur Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Thrissur Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_667",
    "name": "Thrissur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Thrissur Wedding Photography & Drone Cinematography",
    "ml": "Thrissur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_668",
    "name": "ഇവന്റ്സ് - Thrissur Stage Sound System & Light Decoration",
    "en": "Thrissur Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Thrissur Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_669",
    "name": "Thrissur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Thrissur Home Nursing & Elderly Patient Attendant",
    "ml": "Thrissur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_670",
    "name": "Thrissur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Thrissur Academic Home Tuition & Skill Training",
    "ml": "Thrissur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_671",
    "name": "Thrissur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Thrissur CCTV Security Camera & Automation Setup",
    "ml": "Thrissur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_672",
    "name": "Thrissur Designer Tailoring & Stitching സർവീസ്",
    "en": "Thrissur Designer Tailoring & Stitching Service",
    "ml": "Thrissur Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_673",
    "name": "ബ്യൂട്ടി കെയർ - Thrissur Bridal Beauty Makeup & Personal Care",
    "en": "Thrissur Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Thrissur Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_674",
    "name": "സോളാർ - Thrissur Solar Rooftop & Inverter Power System",
    "en": "Thrissur Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Thrissur Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_675",
    "name": "Thrissur TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Thrissur TV, Computer & Home Appliance Repair",
    "ml": "Thrissur TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_676",
    "name": "Thrissur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Thrissur Open Well Digging & Mud Deep Cleaning",
    "ml": "Thrissur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_677",
    "name": "മേസൺ വർക്ക് - Thrissur Interlock Paver Block & Driveway Laying",
    "en": "Thrissur Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Thrissur Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_678",
    "name": "ക്ലീനിംഗ് - Thrissur Septic Tank Vacuum Suction & Waste Flush",
    "en": "Thrissur Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Thrissur Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_679",
    "name": "വെൽഡിങ് വർക്ക് - Thrissur Aluminium Glass Sliding & Cabin Partition",
    "en": "Thrissur Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Thrissur Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_680",
    "name": "വാഹന സർവീസ് - Thrissur Household Packing & Moving Shifting Assist",
    "en": "Thrissur Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Thrissur Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_681",
    "name": "Thrissur Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Thrissur Gas Stove & Commercial Burner Repair",
    "ml": "Thrissur Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_682",
    "name": "ക്ലീനിംഗ് - Thrissur Anti-Termite & Mosquito Pest Extermination",
    "en": "Thrissur Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Thrissur Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Thrissur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_683",
    "name": "ഇലക്ട്രിക്കൽ - Kollam Electrician & Power Maintenance",
    "en": "Kollam Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kollam Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_684",
    "name": "പ്ലംബിംഗ് - Kollam Emergency Plumbing & Water Solution",
    "en": "Kollam Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kollam Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_685",
    "name": "Kollam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kollam AC Installation & Cool Care Service",
    "ml": "Kollam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_686",
    "name": "തടിപ്പണി - Kollam Custom Carpentry & Furniture Restoring",
    "en": "Kollam Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kollam Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_687",
    "name": "പെയിന്റിംഗ് - Kollam Weatherproof Wall Painting & Damp Proofing",
    "en": "Kollam Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kollam Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_688",
    "name": "Kollam Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kollam Civil Masonry & Concrete Repair",
    "ml": "Kollam Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_689",
    "name": "വെൽഡിങ് വർക്ക് - Kollam Truss Roofing & Structural Steel Fabrication",
    "en": "Kollam Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kollam Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_690",
    "name": "വർക്ക്‌ഷോപ്പ് - Kollam On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kollam On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kollam On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_691",
    "name": "വാഹന സർവീസ് - Kollam Professional Driver & Taxi Ride Hire",
    "en": "Kollam Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kollam Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_692",
    "name": "Kollam Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kollam Home Deep Cleaning & Waste Management",
    "ml": "Kollam Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_693",
    "name": "Kollam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kollam Coconut Tree & Farm Care Service",
    "ml": "Kollam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_694",
    "name": "കാറ്ററിംഗ് - Kollam Catering & Traditional Feast Cooking",
    "en": "Kollam Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kollam Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_695",
    "name": "Kollam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kollam Wedding Photography & Drone Cinematography",
    "ml": "Kollam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_696",
    "name": "ഇവന്റ്സ് - Kollam Stage Sound System & Light Decoration",
    "en": "Kollam Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kollam Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_697",
    "name": "Kollam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kollam Home Nursing & Elderly Patient Attendant",
    "ml": "Kollam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_698",
    "name": "Kollam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kollam Academic Home Tuition & Skill Training",
    "ml": "Kollam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_699",
    "name": "Kollam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kollam CCTV Security Camera & Automation Setup",
    "ml": "Kollam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_700",
    "name": "Kollam Designer Tailoring & Stitching സർവീസ്",
    "en": "Kollam Designer Tailoring & Stitching Service",
    "ml": "Kollam Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_701",
    "name": "ബ്യൂട്ടി കെയർ - Kollam Bridal Beauty Makeup & Personal Care",
    "en": "Kollam Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kollam Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_702",
    "name": "സോളാർ - Kollam Solar Rooftop & Inverter Power System",
    "en": "Kollam Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kollam Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_703",
    "name": "Kollam TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kollam TV, Computer & Home Appliance Repair",
    "ml": "Kollam TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_704",
    "name": "Kollam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kollam Open Well Digging & Mud Deep Cleaning",
    "ml": "Kollam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_705",
    "name": "മേസൺ വർക്ക് - Kollam Interlock Paver Block & Driveway Laying",
    "en": "Kollam Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kollam Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_706",
    "name": "ക്ലീനിംഗ് - Kollam Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kollam Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kollam Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_707",
    "name": "വെൽഡിങ് വർക്ക് - Kollam Aluminium Glass Sliding & Cabin Partition",
    "en": "Kollam Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kollam Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_708",
    "name": "വാഹന സർവീസ് - Kollam Household Packing & Moving Shifting Assist",
    "en": "Kollam Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kollam Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_709",
    "name": "Kollam Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kollam Gas Stove & Commercial Burner Repair",
    "ml": "Kollam Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_710",
    "name": "ക്ലീനിംഗ് - Kollam Anti-Termite & Mosquito Pest Extermination",
    "en": "Kollam Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kollam Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kollam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_711",
    "name": "ഇലക്ട്രിക്കൽ - Alappuzha Electrician & Power Maintenance",
    "en": "Alappuzha Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Alappuzha Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_712",
    "name": "പ്ലംബിംഗ് - Alappuzha Emergency Plumbing & Water Solution",
    "en": "Alappuzha Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Alappuzha Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_713",
    "name": "Alappuzha AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Alappuzha AC Installation & Cool Care Service",
    "ml": "Alappuzha AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_714",
    "name": "തടിപ്പണി - Alappuzha Custom Carpentry & Furniture Restoring",
    "en": "Alappuzha Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Alappuzha Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_715",
    "name": "പെയിന്റിംഗ് - Alappuzha Weatherproof Wall Painting & Damp Proofing",
    "en": "Alappuzha Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Alappuzha Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_716",
    "name": "Alappuzha Civil Masonry & Concrete റിപ്പയർ",
    "en": "Alappuzha Civil Masonry & Concrete Repair",
    "ml": "Alappuzha Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_717",
    "name": "വെൽഡിങ് വർക്ക് - Alappuzha Truss Roofing & Structural Steel Fabrication",
    "en": "Alappuzha Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Alappuzha Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_718",
    "name": "വർക്ക്‌ഷോപ്പ് - Alappuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Alappuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Alappuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_719",
    "name": "വാഹന സർവീസ് - Alappuzha Professional Driver & Taxi Ride Hire",
    "en": "Alappuzha Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Alappuzha Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_720",
    "name": "Alappuzha Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Alappuzha Home Deep Cleaning & Waste Management",
    "ml": "Alappuzha Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_721",
    "name": "Alappuzha തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Alappuzha Coconut Tree & Farm Care Service",
    "ml": "Alappuzha തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_722",
    "name": "കാറ്ററിംഗ് - Alappuzha Catering & Traditional Feast Cooking",
    "en": "Alappuzha Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Alappuzha Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_723",
    "name": "Alappuzha വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Alappuzha Wedding Photography & Drone Cinematography",
    "ml": "Alappuzha വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_724",
    "name": "ഇവന്റ്സ് - Alappuzha Stage Sound System & Light Decoration",
    "en": "Alappuzha Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Alappuzha Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_725",
    "name": "Alappuzha ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Alappuzha Home Nursing & Elderly Patient Attendant",
    "ml": "Alappuzha ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_726",
    "name": "Alappuzha Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Alappuzha Academic Home Tuition & Skill Training",
    "ml": "Alappuzha Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_727",
    "name": "Alappuzha CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Alappuzha CCTV Security Camera & Automation Setup",
    "ml": "Alappuzha CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_728",
    "name": "Alappuzha Designer Tailoring & Stitching സർവീസ്",
    "en": "Alappuzha Designer Tailoring & Stitching Service",
    "ml": "Alappuzha Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_729",
    "name": "ബ്യൂട്ടി കെയർ - Alappuzha Bridal Beauty Makeup & Personal Care",
    "en": "Alappuzha Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Alappuzha Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_730",
    "name": "സോളാർ - Alappuzha Solar Rooftop & Inverter Power System",
    "en": "Alappuzha Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Alappuzha Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_731",
    "name": "Alappuzha TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Alappuzha TV, Computer & Home Appliance Repair",
    "ml": "Alappuzha TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_732",
    "name": "Alappuzha Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Alappuzha Open Well Digging & Mud Deep Cleaning",
    "ml": "Alappuzha Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_733",
    "name": "മേസൺ വർക്ക് - Alappuzha Interlock Paver Block & Driveway Laying",
    "en": "Alappuzha Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Alappuzha Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_734",
    "name": "ക്ലീനിംഗ് - Alappuzha Septic Tank Vacuum Suction & Waste Flush",
    "en": "Alappuzha Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Alappuzha Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_735",
    "name": "വെൽഡിങ് വർക്ക് - Alappuzha Aluminium Glass Sliding & Cabin Partition",
    "en": "Alappuzha Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Alappuzha Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_736",
    "name": "വാഹന സർവീസ് - Alappuzha Household Packing & Moving Shifting Assist",
    "en": "Alappuzha Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Alappuzha Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_737",
    "name": "Alappuzha Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Alappuzha Gas Stove & Commercial Burner Repair",
    "ml": "Alappuzha Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_738",
    "name": "ക്ലീനിംഗ് - Alappuzha Anti-Termite & Mosquito Pest Extermination",
    "en": "Alappuzha Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Alappuzha Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Alappuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_739",
    "name": "ഇലക്ട്രിക്കൽ - Palakkad Electrician & Power Maintenance",
    "en": "Palakkad Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Palakkad Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_740",
    "name": "പ്ലംബിംഗ് - Palakkad Emergency Plumbing & Water Solution",
    "en": "Palakkad Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Palakkad Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_741",
    "name": "Palakkad AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Palakkad AC Installation & Cool Care Service",
    "ml": "Palakkad AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_742",
    "name": "തടിപ്പണി - Palakkad Custom Carpentry & Furniture Restoring",
    "en": "Palakkad Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Palakkad Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_743",
    "name": "പെയിന്റിംഗ് - Palakkad Weatherproof Wall Painting & Damp Proofing",
    "en": "Palakkad Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Palakkad Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_744",
    "name": "Palakkad Civil Masonry & Concrete റിപ്പയർ",
    "en": "Palakkad Civil Masonry & Concrete Repair",
    "ml": "Palakkad Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_745",
    "name": "വെൽഡിങ് വർക്ക് - Palakkad Truss Roofing & Structural Steel Fabrication",
    "en": "Palakkad Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Palakkad Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_746",
    "name": "വർക്ക്‌ഷോപ്പ് - Palakkad On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Palakkad On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Palakkad On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_747",
    "name": "വാഹന സർവീസ് - Palakkad Professional Driver & Taxi Ride Hire",
    "en": "Palakkad Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Palakkad Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_748",
    "name": "Palakkad Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Palakkad Home Deep Cleaning & Waste Management",
    "ml": "Palakkad Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_749",
    "name": "Palakkad തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Palakkad Coconut Tree & Farm Care Service",
    "ml": "Palakkad തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_750",
    "name": "കാറ്ററിംഗ് - Palakkad Catering & Traditional Feast Cooking",
    "en": "Palakkad Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Palakkad Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_751",
    "name": "Palakkad വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Palakkad Wedding Photography & Drone Cinematography",
    "ml": "Palakkad വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_752",
    "name": "ഇവന്റ്സ് - Palakkad Stage Sound System & Light Decoration",
    "en": "Palakkad Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Palakkad Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_753",
    "name": "Palakkad ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Palakkad Home Nursing & Elderly Patient Attendant",
    "ml": "Palakkad ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_754",
    "name": "Palakkad Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Palakkad Academic Home Tuition & Skill Training",
    "ml": "Palakkad Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_755",
    "name": "Palakkad CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Palakkad CCTV Security Camera & Automation Setup",
    "ml": "Palakkad CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_756",
    "name": "Palakkad Designer Tailoring & Stitching സർവീസ്",
    "en": "Palakkad Designer Tailoring & Stitching Service",
    "ml": "Palakkad Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_757",
    "name": "ബ്യൂട്ടി കെയർ - Palakkad Bridal Beauty Makeup & Personal Care",
    "en": "Palakkad Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Palakkad Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_758",
    "name": "സോളാർ - Palakkad Solar Rooftop & Inverter Power System",
    "en": "Palakkad Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Palakkad Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_759",
    "name": "Palakkad TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Palakkad TV, Computer & Home Appliance Repair",
    "ml": "Palakkad TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_760",
    "name": "Palakkad Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Palakkad Open Well Digging & Mud Deep Cleaning",
    "ml": "Palakkad Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_761",
    "name": "മേസൺ വർക്ക് - Palakkad Interlock Paver Block & Driveway Laying",
    "en": "Palakkad Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Palakkad Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_762",
    "name": "ക്ലീനിംഗ് - Palakkad Septic Tank Vacuum Suction & Waste Flush",
    "en": "Palakkad Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Palakkad Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_763",
    "name": "വെൽഡിങ് വർക്ക് - Palakkad Aluminium Glass Sliding & Cabin Partition",
    "en": "Palakkad Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Palakkad Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_764",
    "name": "വാഹന സർവീസ് - Palakkad Household Packing & Moving Shifting Assist",
    "en": "Palakkad Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Palakkad Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_765",
    "name": "Palakkad Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Palakkad Gas Stove & Commercial Burner Repair",
    "ml": "Palakkad Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_766",
    "name": "ക്ലീനിംഗ് - Palakkad Anti-Termite & Mosquito Pest Extermination",
    "en": "Palakkad Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Palakkad Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Palakkad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_767",
    "name": "ഇലക്ട്രിക്കൽ - Malappuram Electrician & Power Maintenance",
    "en": "Malappuram Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Malappuram Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_768",
    "name": "പ്ലംബിംഗ് - Malappuram Emergency Plumbing & Water Solution",
    "en": "Malappuram Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Malappuram Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_769",
    "name": "Malappuram AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Malappuram AC Installation & Cool Care Service",
    "ml": "Malappuram AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_770",
    "name": "തടിപ്പണി - Malappuram Custom Carpentry & Furniture Restoring",
    "en": "Malappuram Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Malappuram Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_771",
    "name": "പെയിന്റിംഗ് - Malappuram Weatherproof Wall Painting & Damp Proofing",
    "en": "Malappuram Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Malappuram Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_772",
    "name": "Malappuram Civil Masonry & Concrete റിപ്പയർ",
    "en": "Malappuram Civil Masonry & Concrete Repair",
    "ml": "Malappuram Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_773",
    "name": "വെൽഡിങ് വർക്ക് - Malappuram Truss Roofing & Structural Steel Fabrication",
    "en": "Malappuram Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Malappuram Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_774",
    "name": "വർക്ക്‌ഷോപ്പ് - Malappuram On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Malappuram On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Malappuram On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_775",
    "name": "വാഹന സർവീസ് - Malappuram Professional Driver & Taxi Ride Hire",
    "en": "Malappuram Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Malappuram Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_776",
    "name": "Malappuram Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Malappuram Home Deep Cleaning & Waste Management",
    "ml": "Malappuram Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_777",
    "name": "Malappuram തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Malappuram Coconut Tree & Farm Care Service",
    "ml": "Malappuram തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_778",
    "name": "കാറ്ററിംഗ് - Malappuram Catering & Traditional Feast Cooking",
    "en": "Malappuram Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Malappuram Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_779",
    "name": "Malappuram വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Malappuram Wedding Photography & Drone Cinematography",
    "ml": "Malappuram വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_780",
    "name": "ഇവന്റ്സ് - Malappuram Stage Sound System & Light Decoration",
    "en": "Malappuram Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Malappuram Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_781",
    "name": "Malappuram ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Malappuram Home Nursing & Elderly Patient Attendant",
    "ml": "Malappuram ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_782",
    "name": "Malappuram Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Malappuram Academic Home Tuition & Skill Training",
    "ml": "Malappuram Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_783",
    "name": "Malappuram CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Malappuram CCTV Security Camera & Automation Setup",
    "ml": "Malappuram CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_784",
    "name": "Malappuram Designer Tailoring & Stitching സർവീസ്",
    "en": "Malappuram Designer Tailoring & Stitching Service",
    "ml": "Malappuram Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_785",
    "name": "ബ്യൂട്ടി കെയർ - Malappuram Bridal Beauty Makeup & Personal Care",
    "en": "Malappuram Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Malappuram Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_786",
    "name": "സോളാർ - Malappuram Solar Rooftop & Inverter Power System",
    "en": "Malappuram Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Malappuram Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_787",
    "name": "Malappuram TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Malappuram TV, Computer & Home Appliance Repair",
    "ml": "Malappuram TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_788",
    "name": "Malappuram Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Malappuram Open Well Digging & Mud Deep Cleaning",
    "ml": "Malappuram Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_789",
    "name": "മേസൺ വർക്ക് - Malappuram Interlock Paver Block & Driveway Laying",
    "en": "Malappuram Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Malappuram Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_790",
    "name": "ക്ലീനിംഗ് - Malappuram Septic Tank Vacuum Suction & Waste Flush",
    "en": "Malappuram Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Malappuram Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_791",
    "name": "വെൽഡിങ് വർക്ക് - Malappuram Aluminium Glass Sliding & Cabin Partition",
    "en": "Malappuram Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Malappuram Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_792",
    "name": "വാഹന സർവീസ് - Malappuram Household Packing & Moving Shifting Assist",
    "en": "Malappuram Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Malappuram Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_793",
    "name": "Malappuram Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Malappuram Gas Stove & Commercial Burner Repair",
    "ml": "Malappuram Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_794",
    "name": "ക്ലീനിംഗ് - Malappuram Anti-Termite & Mosquito Pest Extermination",
    "en": "Malappuram Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Malappuram Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Malappuram Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_795",
    "name": "ഇലക്ട്രിക്കൽ - Kannur Electrician & Power Maintenance",
    "en": "Kannur Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kannur Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_796",
    "name": "പ്ലംബിംഗ് - Kannur Emergency Plumbing & Water Solution",
    "en": "Kannur Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kannur Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_797",
    "name": "Kannur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kannur AC Installation & Cool Care Service",
    "ml": "Kannur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_798",
    "name": "തടിപ്പണി - Kannur Custom Carpentry & Furniture Restoring",
    "en": "Kannur Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kannur Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_799",
    "name": "പെയിന്റിംഗ് - Kannur Weatherproof Wall Painting & Damp Proofing",
    "en": "Kannur Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kannur Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_800",
    "name": "Kannur Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kannur Civil Masonry & Concrete Repair",
    "ml": "Kannur Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_801",
    "name": "വെൽഡിങ് വർക്ക് - Kannur Truss Roofing & Structural Steel Fabrication",
    "en": "Kannur Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kannur Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_802",
    "name": "വർക്ക്‌ഷോപ്പ് - Kannur On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kannur On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kannur On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_803",
    "name": "വാഹന സർവീസ് - Kannur Professional Driver & Taxi Ride Hire",
    "en": "Kannur Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kannur Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_804",
    "name": "Kannur Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kannur Home Deep Cleaning & Waste Management",
    "ml": "Kannur Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_805",
    "name": "Kannur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kannur Coconut Tree & Farm Care Service",
    "ml": "Kannur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_806",
    "name": "കാറ്ററിംഗ് - Kannur Catering & Traditional Feast Cooking",
    "en": "Kannur Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kannur Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_807",
    "name": "Kannur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kannur Wedding Photography & Drone Cinematography",
    "ml": "Kannur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_808",
    "name": "ഇവന്റ്സ് - Kannur Stage Sound System & Light Decoration",
    "en": "Kannur Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kannur Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_809",
    "name": "Kannur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kannur Home Nursing & Elderly Patient Attendant",
    "ml": "Kannur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_810",
    "name": "Kannur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kannur Academic Home Tuition & Skill Training",
    "ml": "Kannur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_811",
    "name": "Kannur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kannur CCTV Security Camera & Automation Setup",
    "ml": "Kannur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_812",
    "name": "Kannur Designer Tailoring & Stitching സർവീസ്",
    "en": "Kannur Designer Tailoring & Stitching Service",
    "ml": "Kannur Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_813",
    "name": "ബ്യൂട്ടി കെയർ - Kannur Bridal Beauty Makeup & Personal Care",
    "en": "Kannur Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kannur Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_814",
    "name": "സോളാർ - Kannur Solar Rooftop & Inverter Power System",
    "en": "Kannur Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kannur Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_815",
    "name": "Kannur TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kannur TV, Computer & Home Appliance Repair",
    "ml": "Kannur TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_816",
    "name": "Kannur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kannur Open Well Digging & Mud Deep Cleaning",
    "ml": "Kannur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_817",
    "name": "മേസൺ വർക്ക് - Kannur Interlock Paver Block & Driveway Laying",
    "en": "Kannur Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kannur Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_818",
    "name": "ക്ലീനിംഗ് - Kannur Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kannur Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kannur Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_819",
    "name": "വെൽഡിങ് വർക്ക് - Kannur Aluminium Glass Sliding & Cabin Partition",
    "en": "Kannur Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kannur Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_820",
    "name": "വാഹന സർവീസ് - Kannur Household Packing & Moving Shifting Assist",
    "en": "Kannur Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kannur Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_821",
    "name": "Kannur Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kannur Gas Stove & Commercial Burner Repair",
    "ml": "Kannur Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_822",
    "name": "ക്ലീനിംഗ് - Kannur Anti-Termite & Mosquito Pest Extermination",
    "en": "Kannur Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kannur Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kannur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_823",
    "name": "ഇലക്ട്രിക്കൽ - Kasaragod Electrician & Power Maintenance",
    "en": "Kasaragod Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kasaragod Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_824",
    "name": "പ്ലംബിംഗ് - Kasaragod Emergency Plumbing & Water Solution",
    "en": "Kasaragod Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kasaragod Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_825",
    "name": "Kasaragod AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kasaragod AC Installation & Cool Care Service",
    "ml": "Kasaragod AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_826",
    "name": "തടിപ്പണി - Kasaragod Custom Carpentry & Furniture Restoring",
    "en": "Kasaragod Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kasaragod Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_827",
    "name": "പെയിന്റിംഗ് - Kasaragod Weatherproof Wall Painting & Damp Proofing",
    "en": "Kasaragod Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kasaragod Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_828",
    "name": "Kasaragod Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kasaragod Civil Masonry & Concrete Repair",
    "ml": "Kasaragod Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_829",
    "name": "വെൽഡിങ് വർക്ക് - Kasaragod Truss Roofing & Structural Steel Fabrication",
    "en": "Kasaragod Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kasaragod Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_830",
    "name": "വർക്ക്‌ഷോപ്പ് - Kasaragod On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kasaragod On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kasaragod On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_831",
    "name": "വാഹന സർവീസ് - Kasaragod Professional Driver & Taxi Ride Hire",
    "en": "Kasaragod Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kasaragod Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_832",
    "name": "Kasaragod Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kasaragod Home Deep Cleaning & Waste Management",
    "ml": "Kasaragod Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_833",
    "name": "Kasaragod തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kasaragod Coconut Tree & Farm Care Service",
    "ml": "Kasaragod തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_834",
    "name": "കാറ്ററിംഗ് - Kasaragod Catering & Traditional Feast Cooking",
    "en": "Kasaragod Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kasaragod Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_835",
    "name": "Kasaragod വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kasaragod Wedding Photography & Drone Cinematography",
    "ml": "Kasaragod വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_836",
    "name": "ഇവന്റ്സ് - Kasaragod Stage Sound System & Light Decoration",
    "en": "Kasaragod Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kasaragod Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_837",
    "name": "Kasaragod ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kasaragod Home Nursing & Elderly Patient Attendant",
    "ml": "Kasaragod ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_838",
    "name": "Kasaragod Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kasaragod Academic Home Tuition & Skill Training",
    "ml": "Kasaragod Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_839",
    "name": "Kasaragod CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kasaragod CCTV Security Camera & Automation Setup",
    "ml": "Kasaragod CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_840",
    "name": "Kasaragod Designer Tailoring & Stitching സർവീസ്",
    "en": "Kasaragod Designer Tailoring & Stitching Service",
    "ml": "Kasaragod Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_841",
    "name": "ബ്യൂട്ടി കെയർ - Kasaragod Bridal Beauty Makeup & Personal Care",
    "en": "Kasaragod Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kasaragod Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_842",
    "name": "സോളാർ - Kasaragod Solar Rooftop & Inverter Power System",
    "en": "Kasaragod Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kasaragod Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_843",
    "name": "Kasaragod TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kasaragod TV, Computer & Home Appliance Repair",
    "ml": "Kasaragod TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_844",
    "name": "Kasaragod Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kasaragod Open Well Digging & Mud Deep Cleaning",
    "ml": "Kasaragod Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_845",
    "name": "മേസൺ വർക്ക് - Kasaragod Interlock Paver Block & Driveway Laying",
    "en": "Kasaragod Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kasaragod Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_846",
    "name": "ക്ലീനിംഗ് - Kasaragod Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kasaragod Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kasaragod Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_847",
    "name": "വെൽഡിങ് വർക്ക് - Kasaragod Aluminium Glass Sliding & Cabin Partition",
    "en": "Kasaragod Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kasaragod Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_848",
    "name": "വാഹന സർവീസ് - Kasaragod Household Packing & Moving Shifting Assist",
    "en": "Kasaragod Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kasaragod Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_849",
    "name": "Kasaragod Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kasaragod Gas Stove & Commercial Burner Repair",
    "ml": "Kasaragod Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_850",
    "name": "ക്ലീനിംഗ് - Kasaragod Anti-Termite & Mosquito Pest Extermination",
    "en": "Kasaragod Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kasaragod Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kasaragod Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_851",
    "name": "ഇലക്ട്രിക്കൽ - Idukki Electrician & Power Maintenance",
    "en": "Idukki Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Idukki Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_852",
    "name": "പ്ലംബിംഗ് - Idukki Emergency Plumbing & Water Solution",
    "en": "Idukki Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Idukki Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_853",
    "name": "Idukki AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Idukki AC Installation & Cool Care Service",
    "ml": "Idukki AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_854",
    "name": "തടിപ്പണി - Idukki Custom Carpentry & Furniture Restoring",
    "en": "Idukki Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Idukki Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_855",
    "name": "പെയിന്റിംഗ് - Idukki Weatherproof Wall Painting & Damp Proofing",
    "en": "Idukki Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Idukki Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_856",
    "name": "Idukki Civil Masonry & Concrete റിപ്പയർ",
    "en": "Idukki Civil Masonry & Concrete Repair",
    "ml": "Idukki Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_857",
    "name": "വെൽഡിങ് വർക്ക് - Idukki Truss Roofing & Structural Steel Fabrication",
    "en": "Idukki Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Idukki Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_858",
    "name": "വർക്ക്‌ഷോപ്പ് - Idukki On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Idukki On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Idukki On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_859",
    "name": "വാഹന സർവീസ് - Idukki Professional Driver & Taxi Ride Hire",
    "en": "Idukki Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Idukki Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_860",
    "name": "Idukki Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Idukki Home Deep Cleaning & Waste Management",
    "ml": "Idukki Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_861",
    "name": "Idukki തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Idukki Coconut Tree & Farm Care Service",
    "ml": "Idukki തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_862",
    "name": "കാറ്ററിംഗ് - Idukki Catering & Traditional Feast Cooking",
    "en": "Idukki Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Idukki Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_863",
    "name": "Idukki വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Idukki Wedding Photography & Drone Cinematography",
    "ml": "Idukki വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_864",
    "name": "ഇവന്റ്സ് - Idukki Stage Sound System & Light Decoration",
    "en": "Idukki Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Idukki Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_865",
    "name": "Idukki ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Idukki Home Nursing & Elderly Patient Attendant",
    "ml": "Idukki ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_866",
    "name": "Idukki Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Idukki Academic Home Tuition & Skill Training",
    "ml": "Idukki Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_867",
    "name": "Idukki CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Idukki CCTV Security Camera & Automation Setup",
    "ml": "Idukki CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_868",
    "name": "Idukki Designer Tailoring & Stitching സർവീസ്",
    "en": "Idukki Designer Tailoring & Stitching Service",
    "ml": "Idukki Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_869",
    "name": "ബ്യൂട്ടി കെയർ - Idukki Bridal Beauty Makeup & Personal Care",
    "en": "Idukki Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Idukki Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_870",
    "name": "സോളാർ - Idukki Solar Rooftop & Inverter Power System",
    "en": "Idukki Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Idukki Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_871",
    "name": "Idukki TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Idukki TV, Computer & Home Appliance Repair",
    "ml": "Idukki TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_872",
    "name": "Idukki Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Idukki Open Well Digging & Mud Deep Cleaning",
    "ml": "Idukki Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_873",
    "name": "മേസൺ വർക്ക് - Idukki Interlock Paver Block & Driveway Laying",
    "en": "Idukki Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Idukki Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_874",
    "name": "ക്ലീനിംഗ് - Idukki Septic Tank Vacuum Suction & Waste Flush",
    "en": "Idukki Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Idukki Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_875",
    "name": "വെൽഡിങ് വർക്ക് - Idukki Aluminium Glass Sliding & Cabin Partition",
    "en": "Idukki Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Idukki Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_876",
    "name": "വാഹന സർവീസ് - Idukki Household Packing & Moving Shifting Assist",
    "en": "Idukki Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Idukki Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_877",
    "name": "Idukki Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Idukki Gas Stove & Commercial Burner Repair",
    "ml": "Idukki Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_878",
    "name": "ക്ലീനിംഗ് - Idukki Anti-Termite & Mosquito Pest Extermination",
    "en": "Idukki Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Idukki Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Idukki Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_879",
    "name": "ഇലക്ട്രിക്കൽ - Wayanad Electrician & Power Maintenance",
    "en": "Wayanad Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Wayanad Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_880",
    "name": "പ്ലംബിംഗ് - Wayanad Emergency Plumbing & Water Solution",
    "en": "Wayanad Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Wayanad Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_881",
    "name": "Wayanad AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Wayanad AC Installation & Cool Care Service",
    "ml": "Wayanad AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_882",
    "name": "തടിപ്പണി - Wayanad Custom Carpentry & Furniture Restoring",
    "en": "Wayanad Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Wayanad Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_883",
    "name": "പെയിന്റിംഗ് - Wayanad Weatherproof Wall Painting & Damp Proofing",
    "en": "Wayanad Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Wayanad Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_884",
    "name": "Wayanad Civil Masonry & Concrete റിപ്പയർ",
    "en": "Wayanad Civil Masonry & Concrete Repair",
    "ml": "Wayanad Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_885",
    "name": "വെൽഡിങ് വർക്ക് - Wayanad Truss Roofing & Structural Steel Fabrication",
    "en": "Wayanad Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Wayanad Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_886",
    "name": "വർക്ക്‌ഷോപ്പ് - Wayanad On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Wayanad On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Wayanad On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_887",
    "name": "വാഹന സർവീസ് - Wayanad Professional Driver & Taxi Ride Hire",
    "en": "Wayanad Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Wayanad Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_888",
    "name": "Wayanad Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Wayanad Home Deep Cleaning & Waste Management",
    "ml": "Wayanad Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_889",
    "name": "Wayanad തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Wayanad Coconut Tree & Farm Care Service",
    "ml": "Wayanad തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_890",
    "name": "കാറ്ററിംഗ് - Wayanad Catering & Traditional Feast Cooking",
    "en": "Wayanad Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Wayanad Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_891",
    "name": "Wayanad വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Wayanad Wedding Photography & Drone Cinematography",
    "ml": "Wayanad വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_892",
    "name": "ഇവന്റ്സ് - Wayanad Stage Sound System & Light Decoration",
    "en": "Wayanad Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Wayanad Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_893",
    "name": "Wayanad ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Wayanad Home Nursing & Elderly Patient Attendant",
    "ml": "Wayanad ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_894",
    "name": "Wayanad Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Wayanad Academic Home Tuition & Skill Training",
    "ml": "Wayanad Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_895",
    "name": "Wayanad CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Wayanad CCTV Security Camera & Automation Setup",
    "ml": "Wayanad CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_896",
    "name": "Wayanad Designer Tailoring & Stitching സർവീസ്",
    "en": "Wayanad Designer Tailoring & Stitching Service",
    "ml": "Wayanad Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_897",
    "name": "ബ്യൂട്ടി കെയർ - Wayanad Bridal Beauty Makeup & Personal Care",
    "en": "Wayanad Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Wayanad Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_898",
    "name": "സോളാർ - Wayanad Solar Rooftop & Inverter Power System",
    "en": "Wayanad Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Wayanad Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_899",
    "name": "Wayanad TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Wayanad TV, Computer & Home Appliance Repair",
    "ml": "Wayanad TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_900",
    "name": "Wayanad Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Wayanad Open Well Digging & Mud Deep Cleaning",
    "ml": "Wayanad Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_901",
    "name": "മേസൺ വർക്ക് - Wayanad Interlock Paver Block & Driveway Laying",
    "en": "Wayanad Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Wayanad Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_902",
    "name": "ക്ലീനിംഗ് - Wayanad Septic Tank Vacuum Suction & Waste Flush",
    "en": "Wayanad Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Wayanad Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_903",
    "name": "വെൽഡിങ് വർക്ക് - Wayanad Aluminium Glass Sliding & Cabin Partition",
    "en": "Wayanad Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Wayanad Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_904",
    "name": "വാഹന സർവീസ് - Wayanad Household Packing & Moving Shifting Assist",
    "en": "Wayanad Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Wayanad Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_905",
    "name": "Wayanad Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Wayanad Gas Stove & Commercial Burner Repair",
    "ml": "Wayanad Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_906",
    "name": "ക്ലീനിംഗ് - Wayanad Anti-Termite & Mosquito Pest Extermination",
    "en": "Wayanad Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Wayanad Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Wayanad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_907",
    "name": "ഇലക്ട്രിക്കൽ - Pathanamthitta Electrician & Power Maintenance",
    "en": "Pathanamthitta Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Pathanamthitta Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_908",
    "name": "പ്ലംബിംഗ് - Pathanamthitta Emergency Plumbing & Water Solution",
    "en": "Pathanamthitta Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Pathanamthitta Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_909",
    "name": "Pathanamthitta AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Pathanamthitta AC Installation & Cool Care Service",
    "ml": "Pathanamthitta AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_910",
    "name": "തടിപ്പണി - Pathanamthitta Custom Carpentry & Furniture Restoring",
    "en": "Pathanamthitta Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Pathanamthitta Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_911",
    "name": "പെയിന്റിംഗ് - Pathanamthitta Weatherproof Wall Painting & Damp Proofing",
    "en": "Pathanamthitta Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Pathanamthitta Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_912",
    "name": "Pathanamthitta Civil Masonry & Concrete റിപ്പയർ",
    "en": "Pathanamthitta Civil Masonry & Concrete Repair",
    "ml": "Pathanamthitta Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_913",
    "name": "വെൽഡിങ് വർക്ക് - Pathanamthitta Truss Roofing & Structural Steel Fabrication",
    "en": "Pathanamthitta Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Pathanamthitta Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_914",
    "name": "വർക്ക്‌ഷോപ്പ് - Pathanamthitta On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Pathanamthitta On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Pathanamthitta On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_915",
    "name": "വാഹന സർവീസ് - Pathanamthitta Professional Driver & Taxi Ride Hire",
    "en": "Pathanamthitta Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Pathanamthitta Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_916",
    "name": "Pathanamthitta Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Pathanamthitta Home Deep Cleaning & Waste Management",
    "ml": "Pathanamthitta Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_917",
    "name": "Pathanamthitta തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Pathanamthitta Coconut Tree & Farm Care Service",
    "ml": "Pathanamthitta തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_918",
    "name": "കാറ്ററിംഗ് - Pathanamthitta Catering & Traditional Feast Cooking",
    "en": "Pathanamthitta Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Pathanamthitta Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_919",
    "name": "Pathanamthitta വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Pathanamthitta Wedding Photography & Drone Cinematography",
    "ml": "Pathanamthitta വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_920",
    "name": "ഇവന്റ്സ് - Pathanamthitta Stage Sound System & Light Decoration",
    "en": "Pathanamthitta Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Pathanamthitta Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_921",
    "name": "Pathanamthitta ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Pathanamthitta Home Nursing & Elderly Patient Attendant",
    "ml": "Pathanamthitta ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_922",
    "name": "Pathanamthitta Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Pathanamthitta Academic Home Tuition & Skill Training",
    "ml": "Pathanamthitta Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_923",
    "name": "Pathanamthitta CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Pathanamthitta CCTV Security Camera & Automation Setup",
    "ml": "Pathanamthitta CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_924",
    "name": "Pathanamthitta Designer Tailoring & Stitching സർവീസ്",
    "en": "Pathanamthitta Designer Tailoring & Stitching Service",
    "ml": "Pathanamthitta Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_925",
    "name": "ബ്യൂട്ടി കെയർ - Pathanamthitta Bridal Beauty Makeup & Personal Care",
    "en": "Pathanamthitta Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Pathanamthitta Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_926",
    "name": "സോളാർ - Pathanamthitta Solar Rooftop & Inverter Power System",
    "en": "Pathanamthitta Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Pathanamthitta Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_927",
    "name": "Pathanamthitta TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Pathanamthitta TV, Computer & Home Appliance Repair",
    "ml": "Pathanamthitta TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_928",
    "name": "Pathanamthitta Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Pathanamthitta Open Well Digging & Mud Deep Cleaning",
    "ml": "Pathanamthitta Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_929",
    "name": "മേസൺ വർക്ക് - Pathanamthitta Interlock Paver Block & Driveway Laying",
    "en": "Pathanamthitta Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Pathanamthitta Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_930",
    "name": "ക്ലീനിംഗ് - Pathanamthitta Septic Tank Vacuum Suction & Waste Flush",
    "en": "Pathanamthitta Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Pathanamthitta Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_931",
    "name": "വെൽഡിങ് വർക്ക് - Pathanamthitta Aluminium Glass Sliding & Cabin Partition",
    "en": "Pathanamthitta Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Pathanamthitta Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_932",
    "name": "വാഹന സർവീസ് - Pathanamthitta Household Packing & Moving Shifting Assist",
    "en": "Pathanamthitta Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Pathanamthitta Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_933",
    "name": "Pathanamthitta Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Pathanamthitta Gas Stove & Commercial Burner Repair",
    "ml": "Pathanamthitta Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_934",
    "name": "ക്ലീനിംഗ് - Pathanamthitta Anti-Termite & Mosquito Pest Extermination",
    "en": "Pathanamthitta Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Pathanamthitta Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Pathanamthitta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_935",
    "name": "ഇലക്ട്രിക്കൽ - Ernakulam Electrician & Power Maintenance",
    "en": "Ernakulam Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Ernakulam Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_936",
    "name": "പ്ലംബിംഗ് - Ernakulam Emergency Plumbing & Water Solution",
    "en": "Ernakulam Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Ernakulam Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_937",
    "name": "Ernakulam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Ernakulam AC Installation & Cool Care Service",
    "ml": "Ernakulam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_938",
    "name": "തടിപ്പണി - Ernakulam Custom Carpentry & Furniture Restoring",
    "en": "Ernakulam Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Ernakulam Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_939",
    "name": "പെയിന്റിംഗ് - Ernakulam Weatherproof Wall Painting & Damp Proofing",
    "en": "Ernakulam Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Ernakulam Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_940",
    "name": "Ernakulam Civil Masonry & Concrete റിപ്പയർ",
    "en": "Ernakulam Civil Masonry & Concrete Repair",
    "ml": "Ernakulam Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_941",
    "name": "വെൽഡിങ് വർക്ക് - Ernakulam Truss Roofing & Structural Steel Fabrication",
    "en": "Ernakulam Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Ernakulam Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_942",
    "name": "വർക്ക്‌ഷോപ്പ് - Ernakulam On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Ernakulam On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Ernakulam On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_943",
    "name": "വാഹന സർവീസ് - Ernakulam Professional Driver & Taxi Ride Hire",
    "en": "Ernakulam Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Ernakulam Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_944",
    "name": "Ernakulam Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Ernakulam Home Deep Cleaning & Waste Management",
    "ml": "Ernakulam Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_945",
    "name": "Ernakulam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Ernakulam Coconut Tree & Farm Care Service",
    "ml": "Ernakulam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_946",
    "name": "കാറ്ററിംഗ് - Ernakulam Catering & Traditional Feast Cooking",
    "en": "Ernakulam Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Ernakulam Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_947",
    "name": "Ernakulam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Ernakulam Wedding Photography & Drone Cinematography",
    "ml": "Ernakulam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_948",
    "name": "ഇവന്റ്സ് - Ernakulam Stage Sound System & Light Decoration",
    "en": "Ernakulam Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Ernakulam Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_949",
    "name": "Ernakulam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Ernakulam Home Nursing & Elderly Patient Attendant",
    "ml": "Ernakulam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_950",
    "name": "Ernakulam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Ernakulam Academic Home Tuition & Skill Training",
    "ml": "Ernakulam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_951",
    "name": "Ernakulam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Ernakulam CCTV Security Camera & Automation Setup",
    "ml": "Ernakulam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_952",
    "name": "Ernakulam Designer Tailoring & Stitching സർവീസ്",
    "en": "Ernakulam Designer Tailoring & Stitching Service",
    "ml": "Ernakulam Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_953",
    "name": "ബ്യൂട്ടി കെയർ - Ernakulam Bridal Beauty Makeup & Personal Care",
    "en": "Ernakulam Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Ernakulam Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_954",
    "name": "സോളാർ - Ernakulam Solar Rooftop & Inverter Power System",
    "en": "Ernakulam Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Ernakulam Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_955",
    "name": "Ernakulam TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Ernakulam TV, Computer & Home Appliance Repair",
    "ml": "Ernakulam TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_956",
    "name": "Ernakulam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Ernakulam Open Well Digging & Mud Deep Cleaning",
    "ml": "Ernakulam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_957",
    "name": "മേസൺ വർക്ക് - Ernakulam Interlock Paver Block & Driveway Laying",
    "en": "Ernakulam Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Ernakulam Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_958",
    "name": "ക്ലീനിംഗ് - Ernakulam Septic Tank Vacuum Suction & Waste Flush",
    "en": "Ernakulam Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Ernakulam Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_959",
    "name": "വെൽഡിങ് വർക്ക് - Ernakulam Aluminium Glass Sliding & Cabin Partition",
    "en": "Ernakulam Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Ernakulam Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_960",
    "name": "വാഹന സർവീസ് - Ernakulam Household Packing & Moving Shifting Assist",
    "en": "Ernakulam Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Ernakulam Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_961",
    "name": "Ernakulam Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Ernakulam Gas Stove & Commercial Burner Repair",
    "ml": "Ernakulam Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_962",
    "name": "ക്ലീനിംഗ് - Ernakulam Anti-Termite & Mosquito Pest Extermination",
    "en": "Ernakulam Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Ernakulam Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Ernakulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_963",
    "name": "ഇലക്ട്രിക്കൽ - Changanassery Electrician & Power Maintenance",
    "en": "Changanassery Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Changanassery Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_964",
    "name": "പ്ലംബിംഗ് - Changanassery Emergency Plumbing & Water Solution",
    "en": "Changanassery Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Changanassery Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_965",
    "name": "Changanassery AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Changanassery AC Installation & Cool Care Service",
    "ml": "Changanassery AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_966",
    "name": "തടിപ്പണി - Changanassery Custom Carpentry & Furniture Restoring",
    "en": "Changanassery Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Changanassery Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_967",
    "name": "പെയിന്റിംഗ് - Changanassery Weatherproof Wall Painting & Damp Proofing",
    "en": "Changanassery Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Changanassery Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_968",
    "name": "Changanassery Civil Masonry & Concrete റിപ്പയർ",
    "en": "Changanassery Civil Masonry & Concrete Repair",
    "ml": "Changanassery Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_969",
    "name": "വെൽഡിങ് വർക്ക് - Changanassery Truss Roofing & Structural Steel Fabrication",
    "en": "Changanassery Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Changanassery Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_970",
    "name": "വർക്ക്‌ഷോപ്പ് - Changanassery On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Changanassery On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Changanassery On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_971",
    "name": "വാഹന സർവീസ് - Changanassery Professional Driver & Taxi Ride Hire",
    "en": "Changanassery Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Changanassery Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_972",
    "name": "Changanassery Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Changanassery Home Deep Cleaning & Waste Management",
    "ml": "Changanassery Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_973",
    "name": "Changanassery തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Changanassery Coconut Tree & Farm Care Service",
    "ml": "Changanassery തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_974",
    "name": "കാറ്ററിംഗ് - Changanassery Catering & Traditional Feast Cooking",
    "en": "Changanassery Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Changanassery Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_975",
    "name": "Changanassery വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Changanassery Wedding Photography & Drone Cinematography",
    "ml": "Changanassery വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_976",
    "name": "ഇവന്റ്സ് - Changanassery Stage Sound System & Light Decoration",
    "en": "Changanassery Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Changanassery Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_977",
    "name": "Changanassery ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Changanassery Home Nursing & Elderly Patient Attendant",
    "ml": "Changanassery ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_978",
    "name": "Changanassery Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Changanassery Academic Home Tuition & Skill Training",
    "ml": "Changanassery Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_979",
    "name": "Changanassery CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Changanassery CCTV Security Camera & Automation Setup",
    "ml": "Changanassery CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_980",
    "name": "Changanassery Designer Tailoring & Stitching സർവീസ്",
    "en": "Changanassery Designer Tailoring & Stitching Service",
    "ml": "Changanassery Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_981",
    "name": "ബ്യൂട്ടി കെയർ - Changanassery Bridal Beauty Makeup & Personal Care",
    "en": "Changanassery Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Changanassery Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_982",
    "name": "സോളാർ - Changanassery Solar Rooftop & Inverter Power System",
    "en": "Changanassery Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Changanassery Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_983",
    "name": "Changanassery TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Changanassery TV, Computer & Home Appliance Repair",
    "ml": "Changanassery TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_984",
    "name": "Changanassery Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Changanassery Open Well Digging & Mud Deep Cleaning",
    "ml": "Changanassery Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_985",
    "name": "മേസൺ വർക്ക് - Changanassery Interlock Paver Block & Driveway Laying",
    "en": "Changanassery Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Changanassery Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_986",
    "name": "ക്ലീനിംഗ് - Changanassery Septic Tank Vacuum Suction & Waste Flush",
    "en": "Changanassery Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Changanassery Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_987",
    "name": "വെൽഡിങ് വർക്ക് - Changanassery Aluminium Glass Sliding & Cabin Partition",
    "en": "Changanassery Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Changanassery Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_988",
    "name": "വാഹന സർവീസ് - Changanassery Household Packing & Moving Shifting Assist",
    "en": "Changanassery Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Changanassery Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_989",
    "name": "Changanassery Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Changanassery Gas Stove & Commercial Burner Repair",
    "ml": "Changanassery Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_990",
    "name": "ക്ലീനിംഗ് - Changanassery Anti-Termite & Mosquito Pest Extermination",
    "en": "Changanassery Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Changanassery Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Changanassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_991",
    "name": "ഇലക്ട്രിക്കൽ - Thiruvalla Electrician & Power Maintenance",
    "en": "Thiruvalla Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Thiruvalla Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_992",
    "name": "പ്ലംബിംഗ് - Thiruvalla Emergency Plumbing & Water Solution",
    "en": "Thiruvalla Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Thiruvalla Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_993",
    "name": "Thiruvalla AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Thiruvalla AC Installation & Cool Care Service",
    "ml": "Thiruvalla AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_994",
    "name": "തടിപ്പണി - Thiruvalla Custom Carpentry & Furniture Restoring",
    "en": "Thiruvalla Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Thiruvalla Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_995",
    "name": "പെയിന്റിംഗ് - Thiruvalla Weatherproof Wall Painting & Damp Proofing",
    "en": "Thiruvalla Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Thiruvalla Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_996",
    "name": "Thiruvalla Civil Masonry & Concrete റിപ്പയർ",
    "en": "Thiruvalla Civil Masonry & Concrete Repair",
    "ml": "Thiruvalla Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_997",
    "name": "വെൽഡിങ് വർക്ക് - Thiruvalla Truss Roofing & Structural Steel Fabrication",
    "en": "Thiruvalla Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Thiruvalla Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_998",
    "name": "വർക്ക്‌ഷോപ്പ് - Thiruvalla On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Thiruvalla On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Thiruvalla On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_999",
    "name": "വാഹന സർവീസ് - Thiruvalla Professional Driver & Taxi Ride Hire",
    "en": "Thiruvalla Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Thiruvalla Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1000",
    "name": "Thiruvalla Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Thiruvalla Home Deep Cleaning & Waste Management",
    "ml": "Thiruvalla Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1001",
    "name": "Thiruvalla തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Thiruvalla Coconut Tree & Farm Care Service",
    "ml": "Thiruvalla തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1002",
    "name": "കാറ്ററിംഗ് - Thiruvalla Catering & Traditional Feast Cooking",
    "en": "Thiruvalla Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Thiruvalla Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1003",
    "name": "Thiruvalla വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Thiruvalla Wedding Photography & Drone Cinematography",
    "ml": "Thiruvalla വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1004",
    "name": "ഇവന്റ്സ് - Thiruvalla Stage Sound System & Light Decoration",
    "en": "Thiruvalla Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Thiruvalla Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1005",
    "name": "Thiruvalla ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Thiruvalla Home Nursing & Elderly Patient Attendant",
    "ml": "Thiruvalla ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1006",
    "name": "Thiruvalla Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Thiruvalla Academic Home Tuition & Skill Training",
    "ml": "Thiruvalla Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1007",
    "name": "Thiruvalla CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Thiruvalla CCTV Security Camera & Automation Setup",
    "ml": "Thiruvalla CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1008",
    "name": "Thiruvalla Designer Tailoring & Stitching സർവീസ്",
    "en": "Thiruvalla Designer Tailoring & Stitching Service",
    "ml": "Thiruvalla Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1009",
    "name": "ബ്യൂട്ടി കെയർ - Thiruvalla Bridal Beauty Makeup & Personal Care",
    "en": "Thiruvalla Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Thiruvalla Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1010",
    "name": "സോളാർ - Thiruvalla Solar Rooftop & Inverter Power System",
    "en": "Thiruvalla Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Thiruvalla Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1011",
    "name": "Thiruvalla TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Thiruvalla TV, Computer & Home Appliance Repair",
    "ml": "Thiruvalla TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1012",
    "name": "Thiruvalla Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Thiruvalla Open Well Digging & Mud Deep Cleaning",
    "ml": "Thiruvalla Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1013",
    "name": "മേസൺ വർക്ക് - Thiruvalla Interlock Paver Block & Driveway Laying",
    "en": "Thiruvalla Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Thiruvalla Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1014",
    "name": "ക്ലീനിംഗ് - Thiruvalla Septic Tank Vacuum Suction & Waste Flush",
    "en": "Thiruvalla Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Thiruvalla Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1015",
    "name": "വെൽഡിങ് വർക്ക് - Thiruvalla Aluminium Glass Sliding & Cabin Partition",
    "en": "Thiruvalla Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Thiruvalla Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1016",
    "name": "വാഹന സർവീസ് - Thiruvalla Household Packing & Moving Shifting Assist",
    "en": "Thiruvalla Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Thiruvalla Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1017",
    "name": "Thiruvalla Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Thiruvalla Gas Stove & Commercial Burner Repair",
    "ml": "Thiruvalla Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1018",
    "name": "ക്ലീനിംഗ് - Thiruvalla Anti-Termite & Mosquito Pest Extermination",
    "en": "Thiruvalla Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Thiruvalla Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Thiruvalla Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1019",
    "name": "ഇലക്ട്രിക്കൽ - Perumbavoor Electrician & Power Maintenance",
    "en": "Perumbavoor Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Perumbavoor Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1020",
    "name": "പ്ലംബിംഗ് - Perumbavoor Emergency Plumbing & Water Solution",
    "en": "Perumbavoor Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Perumbavoor Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1021",
    "name": "Perumbavoor AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Perumbavoor AC Installation & Cool Care Service",
    "ml": "Perumbavoor AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1022",
    "name": "തടിപ്പണി - Perumbavoor Custom Carpentry & Furniture Restoring",
    "en": "Perumbavoor Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Perumbavoor Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1023",
    "name": "പെയിന്റിംഗ് - Perumbavoor Weatherproof Wall Painting & Damp Proofing",
    "en": "Perumbavoor Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Perumbavoor Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1024",
    "name": "Perumbavoor Civil Masonry & Concrete റിപ്പയർ",
    "en": "Perumbavoor Civil Masonry & Concrete Repair",
    "ml": "Perumbavoor Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1025",
    "name": "വെൽഡിങ് വർക്ക് - Perumbavoor Truss Roofing & Structural Steel Fabrication",
    "en": "Perumbavoor Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Perumbavoor Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1026",
    "name": "വർക്ക്‌ഷോപ്പ് - Perumbavoor On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Perumbavoor On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Perumbavoor On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1027",
    "name": "വാഹന സർവീസ് - Perumbavoor Professional Driver & Taxi Ride Hire",
    "en": "Perumbavoor Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Perumbavoor Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1028",
    "name": "Perumbavoor Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Perumbavoor Home Deep Cleaning & Waste Management",
    "ml": "Perumbavoor Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1029",
    "name": "Perumbavoor തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Perumbavoor Coconut Tree & Farm Care Service",
    "ml": "Perumbavoor തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1030",
    "name": "കാറ്ററിംഗ് - Perumbavoor Catering & Traditional Feast Cooking",
    "en": "Perumbavoor Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Perumbavoor Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1031",
    "name": "Perumbavoor വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Perumbavoor Wedding Photography & Drone Cinematography",
    "ml": "Perumbavoor വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1032",
    "name": "ഇവന്റ്സ് - Perumbavoor Stage Sound System & Light Decoration",
    "en": "Perumbavoor Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Perumbavoor Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1033",
    "name": "Perumbavoor ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Perumbavoor Home Nursing & Elderly Patient Attendant",
    "ml": "Perumbavoor ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1034",
    "name": "Perumbavoor Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Perumbavoor Academic Home Tuition & Skill Training",
    "ml": "Perumbavoor Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1035",
    "name": "Perumbavoor CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Perumbavoor CCTV Security Camera & Automation Setup",
    "ml": "Perumbavoor CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1036",
    "name": "Perumbavoor Designer Tailoring & Stitching സർവീസ്",
    "en": "Perumbavoor Designer Tailoring & Stitching Service",
    "ml": "Perumbavoor Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1037",
    "name": "ബ്യൂട്ടി കെയർ - Perumbavoor Bridal Beauty Makeup & Personal Care",
    "en": "Perumbavoor Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Perumbavoor Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1038",
    "name": "സോളാർ - Perumbavoor Solar Rooftop & Inverter Power System",
    "en": "Perumbavoor Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Perumbavoor Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1039",
    "name": "Perumbavoor TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Perumbavoor TV, Computer & Home Appliance Repair",
    "ml": "Perumbavoor TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1040",
    "name": "Perumbavoor Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Perumbavoor Open Well Digging & Mud Deep Cleaning",
    "ml": "Perumbavoor Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1041",
    "name": "മേസൺ വർക്ക് - Perumbavoor Interlock Paver Block & Driveway Laying",
    "en": "Perumbavoor Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Perumbavoor Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1042",
    "name": "ക്ലീനിംഗ് - Perumbavoor Septic Tank Vacuum Suction & Waste Flush",
    "en": "Perumbavoor Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Perumbavoor Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1043",
    "name": "വെൽഡിങ് വർക്ക് - Perumbavoor Aluminium Glass Sliding & Cabin Partition",
    "en": "Perumbavoor Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Perumbavoor Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1044",
    "name": "വാഹന സർവീസ് - Perumbavoor Household Packing & Moving Shifting Assist",
    "en": "Perumbavoor Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Perumbavoor Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1045",
    "name": "Perumbavoor Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Perumbavoor Gas Stove & Commercial Burner Repair",
    "ml": "Perumbavoor Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1046",
    "name": "ക്ലീനിംഗ് - Perumbavoor Anti-Termite & Mosquito Pest Extermination",
    "en": "Perumbavoor Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Perumbavoor Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Perumbavoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1047",
    "name": "ഇലക്ട്രിക്കൽ - Angamaly Electrician & Power Maintenance",
    "en": "Angamaly Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Angamaly Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1048",
    "name": "പ്ലംബിംഗ് - Angamaly Emergency Plumbing & Water Solution",
    "en": "Angamaly Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Angamaly Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1049",
    "name": "Angamaly AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Angamaly AC Installation & Cool Care Service",
    "ml": "Angamaly AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1050",
    "name": "തടിപ്പണി - Angamaly Custom Carpentry & Furniture Restoring",
    "en": "Angamaly Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Angamaly Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1051",
    "name": "പെയിന്റിംഗ് - Angamaly Weatherproof Wall Painting & Damp Proofing",
    "en": "Angamaly Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Angamaly Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1052",
    "name": "Angamaly Civil Masonry & Concrete റിപ്പയർ",
    "en": "Angamaly Civil Masonry & Concrete Repair",
    "ml": "Angamaly Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1053",
    "name": "വെൽഡിങ് വർക്ക് - Angamaly Truss Roofing & Structural Steel Fabrication",
    "en": "Angamaly Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Angamaly Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1054",
    "name": "വർക്ക്‌ഷോപ്പ് - Angamaly On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Angamaly On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Angamaly On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1055",
    "name": "വാഹന സർവീസ് - Angamaly Professional Driver & Taxi Ride Hire",
    "en": "Angamaly Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Angamaly Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1056",
    "name": "Angamaly Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Angamaly Home Deep Cleaning & Waste Management",
    "ml": "Angamaly Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1057",
    "name": "Angamaly തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Angamaly Coconut Tree & Farm Care Service",
    "ml": "Angamaly തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1058",
    "name": "കാറ്ററിംഗ് - Angamaly Catering & Traditional Feast Cooking",
    "en": "Angamaly Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Angamaly Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1059",
    "name": "Angamaly വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Angamaly Wedding Photography & Drone Cinematography",
    "ml": "Angamaly വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1060",
    "name": "ഇവന്റ്സ് - Angamaly Stage Sound System & Light Decoration",
    "en": "Angamaly Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Angamaly Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1061",
    "name": "Angamaly ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Angamaly Home Nursing & Elderly Patient Attendant",
    "ml": "Angamaly ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1062",
    "name": "Angamaly Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Angamaly Academic Home Tuition & Skill Training",
    "ml": "Angamaly Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1063",
    "name": "Angamaly CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Angamaly CCTV Security Camera & Automation Setup",
    "ml": "Angamaly CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1064",
    "name": "Angamaly Designer Tailoring & Stitching സർവീസ്",
    "en": "Angamaly Designer Tailoring & Stitching Service",
    "ml": "Angamaly Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1065",
    "name": "ബ്യൂട്ടി കെയർ - Angamaly Bridal Beauty Makeup & Personal Care",
    "en": "Angamaly Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Angamaly Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1066",
    "name": "സോളാർ - Angamaly Solar Rooftop & Inverter Power System",
    "en": "Angamaly Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Angamaly Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1067",
    "name": "Angamaly TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Angamaly TV, Computer & Home Appliance Repair",
    "ml": "Angamaly TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1068",
    "name": "Angamaly Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Angamaly Open Well Digging & Mud Deep Cleaning",
    "ml": "Angamaly Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1069",
    "name": "മേസൺ വർക്ക് - Angamaly Interlock Paver Block & Driveway Laying",
    "en": "Angamaly Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Angamaly Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1070",
    "name": "ക്ലീനിംഗ് - Angamaly Septic Tank Vacuum Suction & Waste Flush",
    "en": "Angamaly Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Angamaly Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1071",
    "name": "വെൽഡിങ് വർക്ക് - Angamaly Aluminium Glass Sliding & Cabin Partition",
    "en": "Angamaly Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Angamaly Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1072",
    "name": "വാഹന സർവീസ് - Angamaly Household Packing & Moving Shifting Assist",
    "en": "Angamaly Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Angamaly Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1073",
    "name": "Angamaly Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Angamaly Gas Stove & Commercial Burner Repair",
    "ml": "Angamaly Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1074",
    "name": "ക്ലീനിംഗ് - Angamaly Anti-Termite & Mosquito Pest Extermination",
    "en": "Angamaly Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Angamaly Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Angamaly Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1075",
    "name": "ഇലക്ട്രിക്കൽ - Muvattupuzha Electrician & Power Maintenance",
    "en": "Muvattupuzha Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Muvattupuzha Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1076",
    "name": "പ്ലംബിംഗ് - Muvattupuzha Emergency Plumbing & Water Solution",
    "en": "Muvattupuzha Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Muvattupuzha Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1077",
    "name": "Muvattupuzha AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Muvattupuzha AC Installation & Cool Care Service",
    "ml": "Muvattupuzha AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1078",
    "name": "തടിപ്പണി - Muvattupuzha Custom Carpentry & Furniture Restoring",
    "en": "Muvattupuzha Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Muvattupuzha Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1079",
    "name": "പെയിന്റിംഗ് - Muvattupuzha Weatherproof Wall Painting & Damp Proofing",
    "en": "Muvattupuzha Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Muvattupuzha Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1080",
    "name": "Muvattupuzha Civil Masonry & Concrete റിപ്പയർ",
    "en": "Muvattupuzha Civil Masonry & Concrete Repair",
    "ml": "Muvattupuzha Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1081",
    "name": "വെൽഡിങ് വർക്ക് - Muvattupuzha Truss Roofing & Structural Steel Fabrication",
    "en": "Muvattupuzha Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Muvattupuzha Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1082",
    "name": "വർക്ക്‌ഷോപ്പ് - Muvattupuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Muvattupuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Muvattupuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1083",
    "name": "വാഹന സർവീസ് - Muvattupuzha Professional Driver & Taxi Ride Hire",
    "en": "Muvattupuzha Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Muvattupuzha Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1084",
    "name": "Muvattupuzha Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Muvattupuzha Home Deep Cleaning & Waste Management",
    "ml": "Muvattupuzha Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1085",
    "name": "Muvattupuzha തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Muvattupuzha Coconut Tree & Farm Care Service",
    "ml": "Muvattupuzha തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1086",
    "name": "കാറ്ററിംഗ് - Muvattupuzha Catering & Traditional Feast Cooking",
    "en": "Muvattupuzha Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Muvattupuzha Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1087",
    "name": "Muvattupuzha വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Muvattupuzha Wedding Photography & Drone Cinematography",
    "ml": "Muvattupuzha വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1088",
    "name": "ഇവന്റ്സ് - Muvattupuzha Stage Sound System & Light Decoration",
    "en": "Muvattupuzha Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Muvattupuzha Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1089",
    "name": "Muvattupuzha ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Muvattupuzha Home Nursing & Elderly Patient Attendant",
    "ml": "Muvattupuzha ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1090",
    "name": "Muvattupuzha Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Muvattupuzha Academic Home Tuition & Skill Training",
    "ml": "Muvattupuzha Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1091",
    "name": "Muvattupuzha CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Muvattupuzha CCTV Security Camera & Automation Setup",
    "ml": "Muvattupuzha CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1092",
    "name": "Muvattupuzha Designer Tailoring & Stitching സർവീസ്",
    "en": "Muvattupuzha Designer Tailoring & Stitching Service",
    "ml": "Muvattupuzha Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1093",
    "name": "ബ്യൂട്ടി കെയർ - Muvattupuzha Bridal Beauty Makeup & Personal Care",
    "en": "Muvattupuzha Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Muvattupuzha Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1094",
    "name": "സോളാർ - Muvattupuzha Solar Rooftop & Inverter Power System",
    "en": "Muvattupuzha Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Muvattupuzha Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1095",
    "name": "Muvattupuzha TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Muvattupuzha TV, Computer & Home Appliance Repair",
    "ml": "Muvattupuzha TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1096",
    "name": "Muvattupuzha Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Muvattupuzha Open Well Digging & Mud Deep Cleaning",
    "ml": "Muvattupuzha Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1097",
    "name": "മേസൺ വർക്ക് - Muvattupuzha Interlock Paver Block & Driveway Laying",
    "en": "Muvattupuzha Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Muvattupuzha Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1098",
    "name": "ക്ലീനിംഗ് - Muvattupuzha Septic Tank Vacuum Suction & Waste Flush",
    "en": "Muvattupuzha Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Muvattupuzha Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1099",
    "name": "വെൽഡിങ് വർക്ക് - Muvattupuzha Aluminium Glass Sliding & Cabin Partition",
    "en": "Muvattupuzha Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Muvattupuzha Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1100",
    "name": "വാഹന സർവീസ് - Muvattupuzha Household Packing & Moving Shifting Assist",
    "en": "Muvattupuzha Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Muvattupuzha Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1101",
    "name": "Muvattupuzha Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Muvattupuzha Gas Stove & Commercial Burner Repair",
    "ml": "Muvattupuzha Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1102",
    "name": "ക്ലീനിംഗ് - Muvattupuzha Anti-Termite & Mosquito Pest Extermination",
    "en": "Muvattupuzha Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Muvattupuzha Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Muvattupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1103",
    "name": "ഇലക്ട്രിക്കൽ - Kothamangalam Electrician & Power Maintenance",
    "en": "Kothamangalam Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kothamangalam Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1104",
    "name": "പ്ലംബിംഗ് - Kothamangalam Emergency Plumbing & Water Solution",
    "en": "Kothamangalam Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kothamangalam Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1105",
    "name": "Kothamangalam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kothamangalam AC Installation & Cool Care Service",
    "ml": "Kothamangalam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1106",
    "name": "തടിപ്പണി - Kothamangalam Custom Carpentry & Furniture Restoring",
    "en": "Kothamangalam Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kothamangalam Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1107",
    "name": "പെയിന്റിംഗ് - Kothamangalam Weatherproof Wall Painting & Damp Proofing",
    "en": "Kothamangalam Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kothamangalam Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1108",
    "name": "Kothamangalam Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kothamangalam Civil Masonry & Concrete Repair",
    "ml": "Kothamangalam Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1109",
    "name": "വെൽഡിങ് വർക്ക് - Kothamangalam Truss Roofing & Structural Steel Fabrication",
    "en": "Kothamangalam Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kothamangalam Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1110",
    "name": "വർക്ക്‌ഷോപ്പ് - Kothamangalam On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kothamangalam On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kothamangalam On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1111",
    "name": "വാഹന സർവീസ് - Kothamangalam Professional Driver & Taxi Ride Hire",
    "en": "Kothamangalam Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kothamangalam Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1112",
    "name": "Kothamangalam Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kothamangalam Home Deep Cleaning & Waste Management",
    "ml": "Kothamangalam Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1113",
    "name": "Kothamangalam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kothamangalam Coconut Tree & Farm Care Service",
    "ml": "Kothamangalam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1114",
    "name": "കാറ്ററിംഗ് - Kothamangalam Catering & Traditional Feast Cooking",
    "en": "Kothamangalam Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kothamangalam Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1115",
    "name": "Kothamangalam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kothamangalam Wedding Photography & Drone Cinematography",
    "ml": "Kothamangalam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1116",
    "name": "ഇവന്റ്സ് - Kothamangalam Stage Sound System & Light Decoration",
    "en": "Kothamangalam Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kothamangalam Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1117",
    "name": "Kothamangalam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kothamangalam Home Nursing & Elderly Patient Attendant",
    "ml": "Kothamangalam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1118",
    "name": "Kothamangalam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kothamangalam Academic Home Tuition & Skill Training",
    "ml": "Kothamangalam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1119",
    "name": "Kothamangalam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kothamangalam CCTV Security Camera & Automation Setup",
    "ml": "Kothamangalam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1120",
    "name": "Kothamangalam Designer Tailoring & Stitching സർവീസ്",
    "en": "Kothamangalam Designer Tailoring & Stitching Service",
    "ml": "Kothamangalam Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1121",
    "name": "ബ്യൂട്ടി കെയർ - Kothamangalam Bridal Beauty Makeup & Personal Care",
    "en": "Kothamangalam Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kothamangalam Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1122",
    "name": "സോളാർ - Kothamangalam Solar Rooftop & Inverter Power System",
    "en": "Kothamangalam Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kothamangalam Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1123",
    "name": "Kothamangalam TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kothamangalam TV, Computer & Home Appliance Repair",
    "ml": "Kothamangalam TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1124",
    "name": "Kothamangalam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kothamangalam Open Well Digging & Mud Deep Cleaning",
    "ml": "Kothamangalam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1125",
    "name": "മേസൺ വർക്ക് - Kothamangalam Interlock Paver Block & Driveway Laying",
    "en": "Kothamangalam Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kothamangalam Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1126",
    "name": "ക്ലീനിംഗ് - Kothamangalam Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kothamangalam Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kothamangalam Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1127",
    "name": "വെൽഡിങ് വർക്ക് - Kothamangalam Aluminium Glass Sliding & Cabin Partition",
    "en": "Kothamangalam Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kothamangalam Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1128",
    "name": "വാഹന സർവീസ് - Kothamangalam Household Packing & Moving Shifting Assist",
    "en": "Kothamangalam Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kothamangalam Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1129",
    "name": "Kothamangalam Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kothamangalam Gas Stove & Commercial Burner Repair",
    "ml": "Kothamangalam Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1130",
    "name": "ക്ലീനിംഗ് - Kothamangalam Anti-Termite & Mosquito Pest Extermination",
    "en": "Kothamangalam Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kothamangalam Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kothamangalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1131",
    "name": "ഇലക്ട്രിക്കൽ - Aluva Electrician & Power Maintenance",
    "en": "Aluva Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Aluva Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1132",
    "name": "പ്ലംബിംഗ് - Aluva Emergency Plumbing & Water Solution",
    "en": "Aluva Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Aluva Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1133",
    "name": "Aluva AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Aluva AC Installation & Cool Care Service",
    "ml": "Aluva AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1134",
    "name": "തടിപ്പണി - Aluva Custom Carpentry & Furniture Restoring",
    "en": "Aluva Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Aluva Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1135",
    "name": "പെയിന്റിംഗ് - Aluva Weatherproof Wall Painting & Damp Proofing",
    "en": "Aluva Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Aluva Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1136",
    "name": "Aluva Civil Masonry & Concrete റിപ്പയർ",
    "en": "Aluva Civil Masonry & Concrete Repair",
    "ml": "Aluva Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1137",
    "name": "വെൽഡിങ് വർക്ക് - Aluva Truss Roofing & Structural Steel Fabrication",
    "en": "Aluva Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Aluva Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1138",
    "name": "വർക്ക്‌ഷോപ്പ് - Aluva On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Aluva On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Aluva On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1139",
    "name": "വാഹന സർവീസ് - Aluva Professional Driver & Taxi Ride Hire",
    "en": "Aluva Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Aluva Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1140",
    "name": "Aluva Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Aluva Home Deep Cleaning & Waste Management",
    "ml": "Aluva Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1141",
    "name": "Aluva തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Aluva Coconut Tree & Farm Care Service",
    "ml": "Aluva തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1142",
    "name": "കാറ്ററിംഗ് - Aluva Catering & Traditional Feast Cooking",
    "en": "Aluva Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Aluva Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1143",
    "name": "Aluva വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Aluva Wedding Photography & Drone Cinematography",
    "ml": "Aluva വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1144",
    "name": "ഇവന്റ്സ് - Aluva Stage Sound System & Light Decoration",
    "en": "Aluva Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Aluva Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1145",
    "name": "Aluva ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Aluva Home Nursing & Elderly Patient Attendant",
    "ml": "Aluva ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1146",
    "name": "Aluva Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Aluva Academic Home Tuition & Skill Training",
    "ml": "Aluva Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1147",
    "name": "Aluva CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Aluva CCTV Security Camera & Automation Setup",
    "ml": "Aluva CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1148",
    "name": "Aluva Designer Tailoring & Stitching സർവീസ്",
    "en": "Aluva Designer Tailoring & Stitching Service",
    "ml": "Aluva Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1149",
    "name": "ബ്യൂട്ടി കെയർ - Aluva Bridal Beauty Makeup & Personal Care",
    "en": "Aluva Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Aluva Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1150",
    "name": "സോളാർ - Aluva Solar Rooftop & Inverter Power System",
    "en": "Aluva Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Aluva Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1151",
    "name": "Aluva TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Aluva TV, Computer & Home Appliance Repair",
    "ml": "Aluva TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1152",
    "name": "Aluva Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Aluva Open Well Digging & Mud Deep Cleaning",
    "ml": "Aluva Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1153",
    "name": "മേസൺ വർക്ക് - Aluva Interlock Paver Block & Driveway Laying",
    "en": "Aluva Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Aluva Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1154",
    "name": "ക്ലീനിംഗ് - Aluva Septic Tank Vacuum Suction & Waste Flush",
    "en": "Aluva Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Aluva Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1155",
    "name": "വെൽഡിങ് വർക്ക് - Aluva Aluminium Glass Sliding & Cabin Partition",
    "en": "Aluva Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Aluva Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1156",
    "name": "വാഹന സർവീസ് - Aluva Household Packing & Moving Shifting Assist",
    "en": "Aluva Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Aluva Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1157",
    "name": "Aluva Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Aluva Gas Stove & Commercial Burner Repair",
    "ml": "Aluva Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1158",
    "name": "ക്ലീനിംഗ് - Aluva Anti-Termite & Mosquito Pest Extermination",
    "en": "Aluva Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Aluva Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Aluva Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1159",
    "name": "ഇലക്ട്രിക്കൽ - Tripunithura Electrician & Power Maintenance",
    "en": "Tripunithura Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Tripunithura Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1160",
    "name": "പ്ലംബിംഗ് - Tripunithura Emergency Plumbing & Water Solution",
    "en": "Tripunithura Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Tripunithura Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1161",
    "name": "Tripunithura AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Tripunithura AC Installation & Cool Care Service",
    "ml": "Tripunithura AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1162",
    "name": "തടിപ്പണി - Tripunithura Custom Carpentry & Furniture Restoring",
    "en": "Tripunithura Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Tripunithura Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1163",
    "name": "പെയിന്റിംഗ് - Tripunithura Weatherproof Wall Painting & Damp Proofing",
    "en": "Tripunithura Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Tripunithura Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1164",
    "name": "Tripunithura Civil Masonry & Concrete റിപ്പയർ",
    "en": "Tripunithura Civil Masonry & Concrete Repair",
    "ml": "Tripunithura Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1165",
    "name": "വെൽഡിങ് വർക്ക് - Tripunithura Truss Roofing & Structural Steel Fabrication",
    "en": "Tripunithura Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Tripunithura Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1166",
    "name": "വർക്ക്‌ഷോപ്പ് - Tripunithura On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Tripunithura On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Tripunithura On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1167",
    "name": "വാഹന സർവീസ് - Tripunithura Professional Driver & Taxi Ride Hire",
    "en": "Tripunithura Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Tripunithura Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1168",
    "name": "Tripunithura Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Tripunithura Home Deep Cleaning & Waste Management",
    "ml": "Tripunithura Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1169",
    "name": "Tripunithura തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Tripunithura Coconut Tree & Farm Care Service",
    "ml": "Tripunithura തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1170",
    "name": "കാറ്ററിംഗ് - Tripunithura Catering & Traditional Feast Cooking",
    "en": "Tripunithura Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Tripunithura Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1171",
    "name": "Tripunithura വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Tripunithura Wedding Photography & Drone Cinematography",
    "ml": "Tripunithura വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1172",
    "name": "ഇവന്റ്സ് - Tripunithura Stage Sound System & Light Decoration",
    "en": "Tripunithura Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Tripunithura Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1173",
    "name": "Tripunithura ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Tripunithura Home Nursing & Elderly Patient Attendant",
    "ml": "Tripunithura ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1174",
    "name": "Tripunithura Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Tripunithura Academic Home Tuition & Skill Training",
    "ml": "Tripunithura Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1175",
    "name": "Tripunithura CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Tripunithura CCTV Security Camera & Automation Setup",
    "ml": "Tripunithura CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1176",
    "name": "Tripunithura Designer Tailoring & Stitching സർവീസ്",
    "en": "Tripunithura Designer Tailoring & Stitching Service",
    "ml": "Tripunithura Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1177",
    "name": "ബ്യൂട്ടി കെയർ - Tripunithura Bridal Beauty Makeup & Personal Care",
    "en": "Tripunithura Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Tripunithura Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1178",
    "name": "സോളാർ - Tripunithura Solar Rooftop & Inverter Power System",
    "en": "Tripunithura Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Tripunithura Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1179",
    "name": "Tripunithura TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Tripunithura TV, Computer & Home Appliance Repair",
    "ml": "Tripunithura TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1180",
    "name": "Tripunithura Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Tripunithura Open Well Digging & Mud Deep Cleaning",
    "ml": "Tripunithura Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1181",
    "name": "മേസൺ വർക്ക് - Tripunithura Interlock Paver Block & Driveway Laying",
    "en": "Tripunithura Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Tripunithura Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1182",
    "name": "ക്ലീനിംഗ് - Tripunithura Septic Tank Vacuum Suction & Waste Flush",
    "en": "Tripunithura Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Tripunithura Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1183",
    "name": "വെൽഡിങ് വർക്ക് - Tripunithura Aluminium Glass Sliding & Cabin Partition",
    "en": "Tripunithura Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Tripunithura Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1184",
    "name": "വാഹന സർവീസ് - Tripunithura Household Packing & Moving Shifting Assist",
    "en": "Tripunithura Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Tripunithura Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1185",
    "name": "Tripunithura Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Tripunithura Gas Stove & Commercial Burner Repair",
    "ml": "Tripunithura Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1186",
    "name": "ക്ലീനിംഗ് - Tripunithura Anti-Termite & Mosquito Pest Extermination",
    "en": "Tripunithura Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Tripunithura Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Tripunithura Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1187",
    "name": "ഇലക്ട്രിക്കൽ - Cherthala Electrician & Power Maintenance",
    "en": "Cherthala Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Cherthala Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1188",
    "name": "പ്ലംബിംഗ് - Cherthala Emergency Plumbing & Water Solution",
    "en": "Cherthala Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Cherthala Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1189",
    "name": "Cherthala AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Cherthala AC Installation & Cool Care Service",
    "ml": "Cherthala AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1190",
    "name": "തടിപ്പണി - Cherthala Custom Carpentry & Furniture Restoring",
    "en": "Cherthala Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Cherthala Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1191",
    "name": "പെയിന്റിംഗ് - Cherthala Weatherproof Wall Painting & Damp Proofing",
    "en": "Cherthala Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Cherthala Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1192",
    "name": "Cherthala Civil Masonry & Concrete റിപ്പയർ",
    "en": "Cherthala Civil Masonry & Concrete Repair",
    "ml": "Cherthala Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1193",
    "name": "വെൽഡിങ് വർക്ക് - Cherthala Truss Roofing & Structural Steel Fabrication",
    "en": "Cherthala Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Cherthala Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1194",
    "name": "വർക്ക്‌ഷോപ്പ് - Cherthala On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Cherthala On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Cherthala On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1195",
    "name": "വാഹന സർവീസ് - Cherthala Professional Driver & Taxi Ride Hire",
    "en": "Cherthala Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Cherthala Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1196",
    "name": "Cherthala Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Cherthala Home Deep Cleaning & Waste Management",
    "ml": "Cherthala Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1197",
    "name": "Cherthala തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Cherthala Coconut Tree & Farm Care Service",
    "ml": "Cherthala തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1198",
    "name": "കാറ്ററിംഗ് - Cherthala Catering & Traditional Feast Cooking",
    "en": "Cherthala Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Cherthala Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1199",
    "name": "Cherthala വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Cherthala Wedding Photography & Drone Cinematography",
    "ml": "Cherthala വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1200",
    "name": "ഇവന്റ്സ് - Cherthala Stage Sound System & Light Decoration",
    "en": "Cherthala Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Cherthala Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1201",
    "name": "Cherthala ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Cherthala Home Nursing & Elderly Patient Attendant",
    "ml": "Cherthala ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1202",
    "name": "Cherthala Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Cherthala Academic Home Tuition & Skill Training",
    "ml": "Cherthala Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1203",
    "name": "Cherthala CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Cherthala CCTV Security Camera & Automation Setup",
    "ml": "Cherthala CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1204",
    "name": "Cherthala Designer Tailoring & Stitching സർവീസ്",
    "en": "Cherthala Designer Tailoring & Stitching Service",
    "ml": "Cherthala Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1205",
    "name": "ബ്യൂട്ടി കെയർ - Cherthala Bridal Beauty Makeup & Personal Care",
    "en": "Cherthala Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Cherthala Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1206",
    "name": "സോളാർ - Cherthala Solar Rooftop & Inverter Power System",
    "en": "Cherthala Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Cherthala Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1207",
    "name": "Cherthala TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Cherthala TV, Computer & Home Appliance Repair",
    "ml": "Cherthala TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1208",
    "name": "Cherthala Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Cherthala Open Well Digging & Mud Deep Cleaning",
    "ml": "Cherthala Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1209",
    "name": "മേസൺ വർക്ക് - Cherthala Interlock Paver Block & Driveway Laying",
    "en": "Cherthala Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Cherthala Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1210",
    "name": "ക്ലീനിംഗ് - Cherthala Septic Tank Vacuum Suction & Waste Flush",
    "en": "Cherthala Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Cherthala Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1211",
    "name": "വെൽഡിങ് വർക്ക് - Cherthala Aluminium Glass Sliding & Cabin Partition",
    "en": "Cherthala Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Cherthala Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1212",
    "name": "വാഹന സർവീസ് - Cherthala Household Packing & Moving Shifting Assist",
    "en": "Cherthala Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Cherthala Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1213",
    "name": "Cherthala Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Cherthala Gas Stove & Commercial Burner Repair",
    "ml": "Cherthala Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1214",
    "name": "ക്ലീനിംഗ് - Cherthala Anti-Termite & Mosquito Pest Extermination",
    "en": "Cherthala Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Cherthala Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Cherthala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1215",
    "name": "ഇലക്ട്രിക്കൽ - Kayamkulam Electrician & Power Maintenance",
    "en": "Kayamkulam Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kayamkulam Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1216",
    "name": "പ്ലംബിംഗ് - Kayamkulam Emergency Plumbing & Water Solution",
    "en": "Kayamkulam Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kayamkulam Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1217",
    "name": "Kayamkulam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kayamkulam AC Installation & Cool Care Service",
    "ml": "Kayamkulam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1218",
    "name": "തടിപ്പണി - Kayamkulam Custom Carpentry & Furniture Restoring",
    "en": "Kayamkulam Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kayamkulam Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1219",
    "name": "പെയിന്റിംഗ് - Kayamkulam Weatherproof Wall Painting & Damp Proofing",
    "en": "Kayamkulam Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kayamkulam Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1220",
    "name": "Kayamkulam Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kayamkulam Civil Masonry & Concrete Repair",
    "ml": "Kayamkulam Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1221",
    "name": "വെൽഡിങ് വർക്ക് - Kayamkulam Truss Roofing & Structural Steel Fabrication",
    "en": "Kayamkulam Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kayamkulam Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1222",
    "name": "വർക്ക്‌ഷോപ്പ് - Kayamkulam On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kayamkulam On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kayamkulam On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1223",
    "name": "വാഹന സർവീസ് - Kayamkulam Professional Driver & Taxi Ride Hire",
    "en": "Kayamkulam Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kayamkulam Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1224",
    "name": "Kayamkulam Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kayamkulam Home Deep Cleaning & Waste Management",
    "ml": "Kayamkulam Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1225",
    "name": "Kayamkulam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kayamkulam Coconut Tree & Farm Care Service",
    "ml": "Kayamkulam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1226",
    "name": "കാറ്ററിംഗ് - Kayamkulam Catering & Traditional Feast Cooking",
    "en": "Kayamkulam Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kayamkulam Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1227",
    "name": "Kayamkulam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kayamkulam Wedding Photography & Drone Cinematography",
    "ml": "Kayamkulam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1228",
    "name": "ഇവന്റ്സ് - Kayamkulam Stage Sound System & Light Decoration",
    "en": "Kayamkulam Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kayamkulam Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1229",
    "name": "Kayamkulam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kayamkulam Home Nursing & Elderly Patient Attendant",
    "ml": "Kayamkulam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1230",
    "name": "Kayamkulam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kayamkulam Academic Home Tuition & Skill Training",
    "ml": "Kayamkulam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1231",
    "name": "Kayamkulam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kayamkulam CCTV Security Camera & Automation Setup",
    "ml": "Kayamkulam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1232",
    "name": "Kayamkulam Designer Tailoring & Stitching സർവീസ്",
    "en": "Kayamkulam Designer Tailoring & Stitching Service",
    "ml": "Kayamkulam Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1233",
    "name": "ബ്യൂട്ടി കെയർ - Kayamkulam Bridal Beauty Makeup & Personal Care",
    "en": "Kayamkulam Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kayamkulam Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1234",
    "name": "സോളാർ - Kayamkulam Solar Rooftop & Inverter Power System",
    "en": "Kayamkulam Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kayamkulam Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1235",
    "name": "Kayamkulam TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kayamkulam TV, Computer & Home Appliance Repair",
    "ml": "Kayamkulam TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1236",
    "name": "Kayamkulam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kayamkulam Open Well Digging & Mud Deep Cleaning",
    "ml": "Kayamkulam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1237",
    "name": "മേസൺ വർക്ക് - Kayamkulam Interlock Paver Block & Driveway Laying",
    "en": "Kayamkulam Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kayamkulam Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1238",
    "name": "ക്ലീനിംഗ് - Kayamkulam Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kayamkulam Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kayamkulam Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1239",
    "name": "വെൽഡിങ് വർക്ക് - Kayamkulam Aluminium Glass Sliding & Cabin Partition",
    "en": "Kayamkulam Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kayamkulam Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1240",
    "name": "വാഹന സർവീസ് - Kayamkulam Household Packing & Moving Shifting Assist",
    "en": "Kayamkulam Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kayamkulam Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1241",
    "name": "Kayamkulam Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kayamkulam Gas Stove & Commercial Burner Repair",
    "ml": "Kayamkulam Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1242",
    "name": "ക്ലീനിംഗ് - Kayamkulam Anti-Termite & Mosquito Pest Extermination",
    "en": "Kayamkulam Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kayamkulam Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kayamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1243",
    "name": "ഇലക്ട്രിക്കൽ - Adoor Electrician & Power Maintenance",
    "en": "Adoor Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Adoor Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1244",
    "name": "പ്ലംബിംഗ് - Adoor Emergency Plumbing & Water Solution",
    "en": "Adoor Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Adoor Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1245",
    "name": "Adoor AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Adoor AC Installation & Cool Care Service",
    "ml": "Adoor AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1246",
    "name": "തടിപ്പണി - Adoor Custom Carpentry & Furniture Restoring",
    "en": "Adoor Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Adoor Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1247",
    "name": "പെയിന്റിംഗ് - Adoor Weatherproof Wall Painting & Damp Proofing",
    "en": "Adoor Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Adoor Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1248",
    "name": "Adoor Civil Masonry & Concrete റിപ്പയർ",
    "en": "Adoor Civil Masonry & Concrete Repair",
    "ml": "Adoor Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1249",
    "name": "വെൽഡിങ് വർക്ക് - Adoor Truss Roofing & Structural Steel Fabrication",
    "en": "Adoor Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Adoor Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1250",
    "name": "വർക്ക്‌ഷോപ്പ് - Adoor On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Adoor On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Adoor On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1251",
    "name": "വാഹന സർവീസ് - Adoor Professional Driver & Taxi Ride Hire",
    "en": "Adoor Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Adoor Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1252",
    "name": "Adoor Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Adoor Home Deep Cleaning & Waste Management",
    "ml": "Adoor Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1253",
    "name": "Adoor തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Adoor Coconut Tree & Farm Care Service",
    "ml": "Adoor തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1254",
    "name": "കാറ്ററിംഗ് - Adoor Catering & Traditional Feast Cooking",
    "en": "Adoor Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Adoor Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1255",
    "name": "Adoor വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Adoor Wedding Photography & Drone Cinematography",
    "ml": "Adoor വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1256",
    "name": "ഇവന്റ്സ് - Adoor Stage Sound System & Light Decoration",
    "en": "Adoor Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Adoor Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1257",
    "name": "Adoor ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Adoor Home Nursing & Elderly Patient Attendant",
    "ml": "Adoor ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1258",
    "name": "Adoor Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Adoor Academic Home Tuition & Skill Training",
    "ml": "Adoor Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1259",
    "name": "Adoor CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Adoor CCTV Security Camera & Automation Setup",
    "ml": "Adoor CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1260",
    "name": "Adoor Designer Tailoring & Stitching സർവീസ്",
    "en": "Adoor Designer Tailoring & Stitching Service",
    "ml": "Adoor Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1261",
    "name": "ബ്യൂട്ടി കെയർ - Adoor Bridal Beauty Makeup & Personal Care",
    "en": "Adoor Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Adoor Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1262",
    "name": "സോളാർ - Adoor Solar Rooftop & Inverter Power System",
    "en": "Adoor Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Adoor Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1263",
    "name": "Adoor TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Adoor TV, Computer & Home Appliance Repair",
    "ml": "Adoor TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1264",
    "name": "Adoor Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Adoor Open Well Digging & Mud Deep Cleaning",
    "ml": "Adoor Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1265",
    "name": "മേസൺ വർക്ക് - Adoor Interlock Paver Block & Driveway Laying",
    "en": "Adoor Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Adoor Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1266",
    "name": "ക്ലീനിംഗ് - Adoor Septic Tank Vacuum Suction & Waste Flush",
    "en": "Adoor Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Adoor Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1267",
    "name": "വെൽഡിങ് വർക്ക് - Adoor Aluminium Glass Sliding & Cabin Partition",
    "en": "Adoor Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Adoor Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1268",
    "name": "വാഹന സർവീസ് - Adoor Household Packing & Moving Shifting Assist",
    "en": "Adoor Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Adoor Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1269",
    "name": "Adoor Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Adoor Gas Stove & Commercial Burner Repair",
    "ml": "Adoor Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1270",
    "name": "ക്ലീനിംഗ് - Adoor Anti-Termite & Mosquito Pest Extermination",
    "en": "Adoor Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Adoor Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Adoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1271",
    "name": "ഇലക്ട്രിക്കൽ - Attingal Electrician & Power Maintenance",
    "en": "Attingal Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Attingal Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1272",
    "name": "പ്ലംബിംഗ് - Attingal Emergency Plumbing & Water Solution",
    "en": "Attingal Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Attingal Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1273",
    "name": "Attingal AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Attingal AC Installation & Cool Care Service",
    "ml": "Attingal AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1274",
    "name": "തടിപ്പണി - Attingal Custom Carpentry & Furniture Restoring",
    "en": "Attingal Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Attingal Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1275",
    "name": "പെയിന്റിംഗ് - Attingal Weatherproof Wall Painting & Damp Proofing",
    "en": "Attingal Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Attingal Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1276",
    "name": "Attingal Civil Masonry & Concrete റിപ്പയർ",
    "en": "Attingal Civil Masonry & Concrete Repair",
    "ml": "Attingal Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1277",
    "name": "വെൽഡിങ് വർക്ക് - Attingal Truss Roofing & Structural Steel Fabrication",
    "en": "Attingal Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Attingal Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1278",
    "name": "വർക്ക്‌ഷോപ്പ് - Attingal On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Attingal On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Attingal On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1279",
    "name": "വാഹന സർവീസ് - Attingal Professional Driver & Taxi Ride Hire",
    "en": "Attingal Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Attingal Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1280",
    "name": "Attingal Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Attingal Home Deep Cleaning & Waste Management",
    "ml": "Attingal Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1281",
    "name": "Attingal തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Attingal Coconut Tree & Farm Care Service",
    "ml": "Attingal തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1282",
    "name": "കാറ്ററിംഗ് - Attingal Catering & Traditional Feast Cooking",
    "en": "Attingal Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Attingal Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1283",
    "name": "Attingal വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Attingal Wedding Photography & Drone Cinematography",
    "ml": "Attingal വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1284",
    "name": "ഇവന്റ്സ് - Attingal Stage Sound System & Light Decoration",
    "en": "Attingal Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Attingal Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1285",
    "name": "Attingal ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Attingal Home Nursing & Elderly Patient Attendant",
    "ml": "Attingal ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1286",
    "name": "Attingal Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Attingal Academic Home Tuition & Skill Training",
    "ml": "Attingal Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1287",
    "name": "Attingal CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Attingal CCTV Security Camera & Automation Setup",
    "ml": "Attingal CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1288",
    "name": "Attingal Designer Tailoring & Stitching സർവീസ്",
    "en": "Attingal Designer Tailoring & Stitching Service",
    "ml": "Attingal Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1289",
    "name": "ബ്യൂട്ടി കെയർ - Attingal Bridal Beauty Makeup & Personal Care",
    "en": "Attingal Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Attingal Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1290",
    "name": "സോളാർ - Attingal Solar Rooftop & Inverter Power System",
    "en": "Attingal Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Attingal Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1291",
    "name": "Attingal TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Attingal TV, Computer & Home Appliance Repair",
    "ml": "Attingal TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1292",
    "name": "Attingal Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Attingal Open Well Digging & Mud Deep Cleaning",
    "ml": "Attingal Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1293",
    "name": "മേസൺ വർക്ക് - Attingal Interlock Paver Block & Driveway Laying",
    "en": "Attingal Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Attingal Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1294",
    "name": "ക്ലീനിംഗ് - Attingal Septic Tank Vacuum Suction & Waste Flush",
    "en": "Attingal Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Attingal Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1295",
    "name": "വെൽഡിങ് വർക്ക് - Attingal Aluminium Glass Sliding & Cabin Partition",
    "en": "Attingal Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Attingal Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1296",
    "name": "വാഹന സർവീസ് - Attingal Household Packing & Moving Shifting Assist",
    "en": "Attingal Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Attingal Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1297",
    "name": "Attingal Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Attingal Gas Stove & Commercial Burner Repair",
    "ml": "Attingal Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1298",
    "name": "ക്ലീനിംഗ് - Attingal Anti-Termite & Mosquito Pest Extermination",
    "en": "Attingal Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Attingal Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Attingal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1299",
    "name": "ഇലക്ട്രിക്കൽ - Nedumangad Electrician & Power Maintenance",
    "en": "Nedumangad Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Nedumangad Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1300",
    "name": "പ്ലംബിംഗ് - Nedumangad Emergency Plumbing & Water Solution",
    "en": "Nedumangad Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Nedumangad Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1301",
    "name": "Nedumangad AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Nedumangad AC Installation & Cool Care Service",
    "ml": "Nedumangad AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1302",
    "name": "തടിപ്പണി - Nedumangad Custom Carpentry & Furniture Restoring",
    "en": "Nedumangad Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Nedumangad Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1303",
    "name": "പെയിന്റിംഗ് - Nedumangad Weatherproof Wall Painting & Damp Proofing",
    "en": "Nedumangad Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Nedumangad Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1304",
    "name": "Nedumangad Civil Masonry & Concrete റിപ്പയർ",
    "en": "Nedumangad Civil Masonry & Concrete Repair",
    "ml": "Nedumangad Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1305",
    "name": "വെൽഡിങ് വർക്ക് - Nedumangad Truss Roofing & Structural Steel Fabrication",
    "en": "Nedumangad Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Nedumangad Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1306",
    "name": "വർക്ക്‌ഷോപ്പ് - Nedumangad On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Nedumangad On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Nedumangad On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1307",
    "name": "വാഹന സർവീസ് - Nedumangad Professional Driver & Taxi Ride Hire",
    "en": "Nedumangad Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Nedumangad Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1308",
    "name": "Nedumangad Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Nedumangad Home Deep Cleaning & Waste Management",
    "ml": "Nedumangad Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1309",
    "name": "Nedumangad തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Nedumangad Coconut Tree & Farm Care Service",
    "ml": "Nedumangad തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1310",
    "name": "കാറ്ററിംഗ് - Nedumangad Catering & Traditional Feast Cooking",
    "en": "Nedumangad Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Nedumangad Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1311",
    "name": "Nedumangad വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Nedumangad Wedding Photography & Drone Cinematography",
    "ml": "Nedumangad വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1312",
    "name": "ഇവന്റ്സ് - Nedumangad Stage Sound System & Light Decoration",
    "en": "Nedumangad Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Nedumangad Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1313",
    "name": "Nedumangad ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Nedumangad Home Nursing & Elderly Patient Attendant",
    "ml": "Nedumangad ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1314",
    "name": "Nedumangad Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Nedumangad Academic Home Tuition & Skill Training",
    "ml": "Nedumangad Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1315",
    "name": "Nedumangad CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Nedumangad CCTV Security Camera & Automation Setup",
    "ml": "Nedumangad CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1316",
    "name": "Nedumangad Designer Tailoring & Stitching സർവീസ്",
    "en": "Nedumangad Designer Tailoring & Stitching Service",
    "ml": "Nedumangad Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1317",
    "name": "ബ്യൂട്ടി കെയർ - Nedumangad Bridal Beauty Makeup & Personal Care",
    "en": "Nedumangad Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Nedumangad Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1318",
    "name": "സോളാർ - Nedumangad Solar Rooftop & Inverter Power System",
    "en": "Nedumangad Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Nedumangad Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1319",
    "name": "Nedumangad TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Nedumangad TV, Computer & Home Appliance Repair",
    "ml": "Nedumangad TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1320",
    "name": "Nedumangad Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Nedumangad Open Well Digging & Mud Deep Cleaning",
    "ml": "Nedumangad Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1321",
    "name": "മേസൺ വർക്ക് - Nedumangad Interlock Paver Block & Driveway Laying",
    "en": "Nedumangad Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Nedumangad Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1322",
    "name": "ക്ലീനിംഗ് - Nedumangad Septic Tank Vacuum Suction & Waste Flush",
    "en": "Nedumangad Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Nedumangad Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1323",
    "name": "വെൽഡിങ് വർക്ക് - Nedumangad Aluminium Glass Sliding & Cabin Partition",
    "en": "Nedumangad Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Nedumangad Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1324",
    "name": "വാഹന സർവീസ് - Nedumangad Household Packing & Moving Shifting Assist",
    "en": "Nedumangad Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Nedumangad Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1325",
    "name": "Nedumangad Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Nedumangad Gas Stove & Commercial Burner Repair",
    "ml": "Nedumangad Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1326",
    "name": "ക്ലീനിംഗ് - Nedumangad Anti-Termite & Mosquito Pest Extermination",
    "en": "Nedumangad Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Nedumangad Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Nedumangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1327",
    "name": "ഇലക്ട്രിക്കൽ - Punalur Electrician & Power Maintenance",
    "en": "Punalur Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Punalur Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1328",
    "name": "പ്ലംബിംഗ് - Punalur Emergency Plumbing & Water Solution",
    "en": "Punalur Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Punalur Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1329",
    "name": "Punalur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Punalur AC Installation & Cool Care Service",
    "ml": "Punalur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1330",
    "name": "തടിപ്പണി - Punalur Custom Carpentry & Furniture Restoring",
    "en": "Punalur Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Punalur Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1331",
    "name": "പെയിന്റിംഗ് - Punalur Weatherproof Wall Painting & Damp Proofing",
    "en": "Punalur Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Punalur Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1332",
    "name": "Punalur Civil Masonry & Concrete റിപ്പയർ",
    "en": "Punalur Civil Masonry & Concrete Repair",
    "ml": "Punalur Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1333",
    "name": "വെൽഡിങ് വർക്ക് - Punalur Truss Roofing & Structural Steel Fabrication",
    "en": "Punalur Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Punalur Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1334",
    "name": "വർക്ക്‌ഷോപ്പ് - Punalur On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Punalur On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Punalur On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1335",
    "name": "വാഹന സർവീസ് - Punalur Professional Driver & Taxi Ride Hire",
    "en": "Punalur Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Punalur Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1336",
    "name": "Punalur Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Punalur Home Deep Cleaning & Waste Management",
    "ml": "Punalur Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1337",
    "name": "Punalur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Punalur Coconut Tree & Farm Care Service",
    "ml": "Punalur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1338",
    "name": "കാറ്ററിംഗ് - Punalur Catering & Traditional Feast Cooking",
    "en": "Punalur Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Punalur Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1339",
    "name": "Punalur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Punalur Wedding Photography & Drone Cinematography",
    "ml": "Punalur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1340",
    "name": "ഇവന്റ്സ് - Punalur Stage Sound System & Light Decoration",
    "en": "Punalur Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Punalur Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1341",
    "name": "Punalur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Punalur Home Nursing & Elderly Patient Attendant",
    "ml": "Punalur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1342",
    "name": "Punalur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Punalur Academic Home Tuition & Skill Training",
    "ml": "Punalur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1343",
    "name": "Punalur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Punalur CCTV Security Camera & Automation Setup",
    "ml": "Punalur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1344",
    "name": "Punalur Designer Tailoring & Stitching സർവീസ്",
    "en": "Punalur Designer Tailoring & Stitching Service",
    "ml": "Punalur Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1345",
    "name": "ബ്യൂട്ടി കെയർ - Punalur Bridal Beauty Makeup & Personal Care",
    "en": "Punalur Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Punalur Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1346",
    "name": "സോളാർ - Punalur Solar Rooftop & Inverter Power System",
    "en": "Punalur Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Punalur Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1347",
    "name": "Punalur TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Punalur TV, Computer & Home Appliance Repair",
    "ml": "Punalur TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1348",
    "name": "Punalur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Punalur Open Well Digging & Mud Deep Cleaning",
    "ml": "Punalur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1349",
    "name": "മേസൺ വർക്ക് - Punalur Interlock Paver Block & Driveway Laying",
    "en": "Punalur Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Punalur Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1350",
    "name": "ക്ലീനിംഗ് - Punalur Septic Tank Vacuum Suction & Waste Flush",
    "en": "Punalur Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Punalur Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1351",
    "name": "വെൽഡിങ് വർക്ക് - Punalur Aluminium Glass Sliding & Cabin Partition",
    "en": "Punalur Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Punalur Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1352",
    "name": "വാഹന സർവീസ് - Punalur Household Packing & Moving Shifting Assist",
    "en": "Punalur Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Punalur Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1353",
    "name": "Punalur Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Punalur Gas Stove & Commercial Burner Repair",
    "ml": "Punalur Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1354",
    "name": "ക്ലീനിംഗ് - Punalur Anti-Termite & Mosquito Pest Extermination",
    "en": "Punalur Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Punalur Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Punalur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1355",
    "name": "ഇലക്ട്രിക്കൽ - Kottarakkara Electrician & Power Maintenance",
    "en": "Kottarakkara Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kottarakkara Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1356",
    "name": "പ്ലംബിംഗ് - Kottarakkara Emergency Plumbing & Water Solution",
    "en": "Kottarakkara Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kottarakkara Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1357",
    "name": "Kottarakkara AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kottarakkara AC Installation & Cool Care Service",
    "ml": "Kottarakkara AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1358",
    "name": "തടിപ്പണി - Kottarakkara Custom Carpentry & Furniture Restoring",
    "en": "Kottarakkara Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kottarakkara Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1359",
    "name": "പെയിന്റിംഗ് - Kottarakkara Weatherproof Wall Painting & Damp Proofing",
    "en": "Kottarakkara Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kottarakkara Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1360",
    "name": "Kottarakkara Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kottarakkara Civil Masonry & Concrete Repair",
    "ml": "Kottarakkara Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1361",
    "name": "വെൽഡിങ് വർക്ക് - Kottarakkara Truss Roofing & Structural Steel Fabrication",
    "en": "Kottarakkara Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kottarakkara Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1362",
    "name": "വർക്ക്‌ഷോപ്പ് - Kottarakkara On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kottarakkara On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kottarakkara On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1363",
    "name": "വാഹന സർവീസ് - Kottarakkara Professional Driver & Taxi Ride Hire",
    "en": "Kottarakkara Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kottarakkara Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1364",
    "name": "Kottarakkara Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kottarakkara Home Deep Cleaning & Waste Management",
    "ml": "Kottarakkara Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1365",
    "name": "Kottarakkara തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kottarakkara Coconut Tree & Farm Care Service",
    "ml": "Kottarakkara തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1366",
    "name": "കാറ്ററിംഗ് - Kottarakkara Catering & Traditional Feast Cooking",
    "en": "Kottarakkara Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kottarakkara Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1367",
    "name": "Kottarakkara വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kottarakkara Wedding Photography & Drone Cinematography",
    "ml": "Kottarakkara വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1368",
    "name": "ഇവന്റ്സ് - Kottarakkara Stage Sound System & Light Decoration",
    "en": "Kottarakkara Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kottarakkara Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1369",
    "name": "Kottarakkara ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kottarakkara Home Nursing & Elderly Patient Attendant",
    "ml": "Kottarakkara ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1370",
    "name": "Kottarakkara Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kottarakkara Academic Home Tuition & Skill Training",
    "ml": "Kottarakkara Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1371",
    "name": "Kottarakkara CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kottarakkara CCTV Security Camera & Automation Setup",
    "ml": "Kottarakkara CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1372",
    "name": "Kottarakkara Designer Tailoring & Stitching സർവീസ്",
    "en": "Kottarakkara Designer Tailoring & Stitching Service",
    "ml": "Kottarakkara Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1373",
    "name": "ബ്യൂട്ടി കെയർ - Kottarakkara Bridal Beauty Makeup & Personal Care",
    "en": "Kottarakkara Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kottarakkara Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1374",
    "name": "സോളാർ - Kottarakkara Solar Rooftop & Inverter Power System",
    "en": "Kottarakkara Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kottarakkara Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1375",
    "name": "Kottarakkara TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kottarakkara TV, Computer & Home Appliance Repair",
    "ml": "Kottarakkara TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1376",
    "name": "Kottarakkara Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kottarakkara Open Well Digging & Mud Deep Cleaning",
    "ml": "Kottarakkara Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1377",
    "name": "മേസൺ വർക്ക് - Kottarakkara Interlock Paver Block & Driveway Laying",
    "en": "Kottarakkara Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kottarakkara Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1378",
    "name": "ക്ലീനിംഗ് - Kottarakkara Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kottarakkara Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kottarakkara Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1379",
    "name": "വെൽഡിങ് വർക്ക് - Kottarakkara Aluminium Glass Sliding & Cabin Partition",
    "en": "Kottarakkara Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kottarakkara Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1380",
    "name": "വാഹന സർവീസ് - Kottarakkara Household Packing & Moving Shifting Assist",
    "en": "Kottarakkara Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kottarakkara Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1381",
    "name": "Kottarakkara Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kottarakkara Gas Stove & Commercial Burner Repair",
    "ml": "Kottarakkara Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1382",
    "name": "ക്ലീനിംഗ് - Kottarakkara Anti-Termite & Mosquito Pest Extermination",
    "en": "Kottarakkara Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kottarakkara Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kottarakkara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1383",
    "name": "ഇലക്ട്രിക്കൽ - Chalakudy Electrician & Power Maintenance",
    "en": "Chalakudy Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Chalakudy Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1384",
    "name": "പ്ലംബിംഗ് - Chalakudy Emergency Plumbing & Water Solution",
    "en": "Chalakudy Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Chalakudy Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1385",
    "name": "Chalakudy AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Chalakudy AC Installation & Cool Care Service",
    "ml": "Chalakudy AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1386",
    "name": "തടിപ്പണി - Chalakudy Custom Carpentry & Furniture Restoring",
    "en": "Chalakudy Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Chalakudy Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1387",
    "name": "പെയിന്റിംഗ് - Chalakudy Weatherproof Wall Painting & Damp Proofing",
    "en": "Chalakudy Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Chalakudy Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1388",
    "name": "Chalakudy Civil Masonry & Concrete റിപ്പയർ",
    "en": "Chalakudy Civil Masonry & Concrete Repair",
    "ml": "Chalakudy Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1389",
    "name": "വെൽഡിങ് വർക്ക് - Chalakudy Truss Roofing & Structural Steel Fabrication",
    "en": "Chalakudy Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Chalakudy Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1390",
    "name": "വർക്ക്‌ഷോപ്പ് - Chalakudy On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Chalakudy On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Chalakudy On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1391",
    "name": "വാഹന സർവീസ് - Chalakudy Professional Driver & Taxi Ride Hire",
    "en": "Chalakudy Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Chalakudy Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1392",
    "name": "Chalakudy Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Chalakudy Home Deep Cleaning & Waste Management",
    "ml": "Chalakudy Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1393",
    "name": "Chalakudy തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Chalakudy Coconut Tree & Farm Care Service",
    "ml": "Chalakudy തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1394",
    "name": "കാറ്ററിംഗ് - Chalakudy Catering & Traditional Feast Cooking",
    "en": "Chalakudy Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Chalakudy Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1395",
    "name": "Chalakudy വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Chalakudy Wedding Photography & Drone Cinematography",
    "ml": "Chalakudy വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1396",
    "name": "ഇവന്റ്സ് - Chalakudy Stage Sound System & Light Decoration",
    "en": "Chalakudy Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Chalakudy Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1397",
    "name": "Chalakudy ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Chalakudy Home Nursing & Elderly Patient Attendant",
    "ml": "Chalakudy ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1398",
    "name": "Chalakudy Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Chalakudy Academic Home Tuition & Skill Training",
    "ml": "Chalakudy Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1399",
    "name": "Chalakudy CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Chalakudy CCTV Security Camera & Automation Setup",
    "ml": "Chalakudy CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1400",
    "name": "Chalakudy Designer Tailoring & Stitching സർവീസ്",
    "en": "Chalakudy Designer Tailoring & Stitching Service",
    "ml": "Chalakudy Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1401",
    "name": "ബ്യൂട്ടി കെയർ - Chalakudy Bridal Beauty Makeup & Personal Care",
    "en": "Chalakudy Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Chalakudy Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1402",
    "name": "സോളാർ - Chalakudy Solar Rooftop & Inverter Power System",
    "en": "Chalakudy Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Chalakudy Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1403",
    "name": "Chalakudy TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Chalakudy TV, Computer & Home Appliance Repair",
    "ml": "Chalakudy TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1404",
    "name": "Chalakudy Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Chalakudy Open Well Digging & Mud Deep Cleaning",
    "ml": "Chalakudy Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1405",
    "name": "മേസൺ വർക്ക് - Chalakudy Interlock Paver Block & Driveway Laying",
    "en": "Chalakudy Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Chalakudy Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1406",
    "name": "ക്ലീനിംഗ് - Chalakudy Septic Tank Vacuum Suction & Waste Flush",
    "en": "Chalakudy Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Chalakudy Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1407",
    "name": "വെൽഡിങ് വർക്ക് - Chalakudy Aluminium Glass Sliding & Cabin Partition",
    "en": "Chalakudy Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Chalakudy Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1408",
    "name": "വാഹന സർവീസ് - Chalakudy Household Packing & Moving Shifting Assist",
    "en": "Chalakudy Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Chalakudy Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1409",
    "name": "Chalakudy Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Chalakudy Gas Stove & Commercial Burner Repair",
    "ml": "Chalakudy Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1410",
    "name": "ക്ലീനിംഗ് - Chalakudy Anti-Termite & Mosquito Pest Extermination",
    "en": "Chalakudy Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Chalakudy Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Chalakudy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1411",
    "name": "ഇലക്ട്രിക്കൽ - Kodungallur Electrician & Power Maintenance",
    "en": "Kodungallur Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kodungallur Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1412",
    "name": "പ്ലംബിംഗ് - Kodungallur Emergency Plumbing & Water Solution",
    "en": "Kodungallur Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kodungallur Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1413",
    "name": "Kodungallur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kodungallur AC Installation & Cool Care Service",
    "ml": "Kodungallur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1414",
    "name": "തടിപ്പണി - Kodungallur Custom Carpentry & Furniture Restoring",
    "en": "Kodungallur Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kodungallur Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1415",
    "name": "പെയിന്റിംഗ് - Kodungallur Weatherproof Wall Painting & Damp Proofing",
    "en": "Kodungallur Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kodungallur Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1416",
    "name": "Kodungallur Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kodungallur Civil Masonry & Concrete Repair",
    "ml": "Kodungallur Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1417",
    "name": "വെൽഡിങ് വർക്ക് - Kodungallur Truss Roofing & Structural Steel Fabrication",
    "en": "Kodungallur Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kodungallur Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1418",
    "name": "വർക്ക്‌ഷോപ്പ് - Kodungallur On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kodungallur On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kodungallur On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1419",
    "name": "വാഹന സർവീസ് - Kodungallur Professional Driver & Taxi Ride Hire",
    "en": "Kodungallur Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kodungallur Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1420",
    "name": "Kodungallur Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kodungallur Home Deep Cleaning & Waste Management",
    "ml": "Kodungallur Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1421",
    "name": "Kodungallur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kodungallur Coconut Tree & Farm Care Service",
    "ml": "Kodungallur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1422",
    "name": "കാറ്ററിംഗ് - Kodungallur Catering & Traditional Feast Cooking",
    "en": "Kodungallur Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kodungallur Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1423",
    "name": "Kodungallur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kodungallur Wedding Photography & Drone Cinematography",
    "ml": "Kodungallur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1424",
    "name": "ഇവന്റ്സ് - Kodungallur Stage Sound System & Light Decoration",
    "en": "Kodungallur Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kodungallur Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1425",
    "name": "Kodungallur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kodungallur Home Nursing & Elderly Patient Attendant",
    "ml": "Kodungallur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1426",
    "name": "Kodungallur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kodungallur Academic Home Tuition & Skill Training",
    "ml": "Kodungallur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1427",
    "name": "Kodungallur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kodungallur CCTV Security Camera & Automation Setup",
    "ml": "Kodungallur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1428",
    "name": "Kodungallur Designer Tailoring & Stitching സർവീസ്",
    "en": "Kodungallur Designer Tailoring & Stitching Service",
    "ml": "Kodungallur Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1429",
    "name": "ബ്യൂട്ടി കെയർ - Kodungallur Bridal Beauty Makeup & Personal Care",
    "en": "Kodungallur Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kodungallur Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1430",
    "name": "സോളാർ - Kodungallur Solar Rooftop & Inverter Power System",
    "en": "Kodungallur Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kodungallur Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1431",
    "name": "Kodungallur TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kodungallur TV, Computer & Home Appliance Repair",
    "ml": "Kodungallur TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1432",
    "name": "Kodungallur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kodungallur Open Well Digging & Mud Deep Cleaning",
    "ml": "Kodungallur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1433",
    "name": "മേസൺ വർക്ക് - Kodungallur Interlock Paver Block & Driveway Laying",
    "en": "Kodungallur Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kodungallur Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1434",
    "name": "ക്ലീനിംഗ് - Kodungallur Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kodungallur Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kodungallur Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1435",
    "name": "വെൽഡിങ് വർക്ക് - Kodungallur Aluminium Glass Sliding & Cabin Partition",
    "en": "Kodungallur Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kodungallur Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1436",
    "name": "വാഹന സർവീസ് - Kodungallur Household Packing & Moving Shifting Assist",
    "en": "Kodungallur Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kodungallur Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1437",
    "name": "Kodungallur Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kodungallur Gas Stove & Commercial Burner Repair",
    "ml": "Kodungallur Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1438",
    "name": "ക്ലീനിംഗ് - Kodungallur Anti-Termite & Mosquito Pest Extermination",
    "en": "Kodungallur Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kodungallur Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kodungallur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1439",
    "name": "ഇലക്ട്രിക്കൽ - Irinjalakuda Electrician & Power Maintenance",
    "en": "Irinjalakuda Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Irinjalakuda Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1440",
    "name": "പ്ലംബിംഗ് - Irinjalakuda Emergency Plumbing & Water Solution",
    "en": "Irinjalakuda Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Irinjalakuda Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1441",
    "name": "Irinjalakuda AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Irinjalakuda AC Installation & Cool Care Service",
    "ml": "Irinjalakuda AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1442",
    "name": "തടിപ്പണി - Irinjalakuda Custom Carpentry & Furniture Restoring",
    "en": "Irinjalakuda Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Irinjalakuda Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1443",
    "name": "പെയിന്റിംഗ് - Irinjalakuda Weatherproof Wall Painting & Damp Proofing",
    "en": "Irinjalakuda Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Irinjalakuda Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1444",
    "name": "Irinjalakuda Civil Masonry & Concrete റിപ്പയർ",
    "en": "Irinjalakuda Civil Masonry & Concrete Repair",
    "ml": "Irinjalakuda Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1445",
    "name": "വെൽഡിങ് വർക്ക് - Irinjalakuda Truss Roofing & Structural Steel Fabrication",
    "en": "Irinjalakuda Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Irinjalakuda Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1446",
    "name": "വർക്ക്‌ഷോപ്പ് - Irinjalakuda On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Irinjalakuda On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Irinjalakuda On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1447",
    "name": "വാഹന സർവീസ് - Irinjalakuda Professional Driver & Taxi Ride Hire",
    "en": "Irinjalakuda Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Irinjalakuda Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1448",
    "name": "Irinjalakuda Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Irinjalakuda Home Deep Cleaning & Waste Management",
    "ml": "Irinjalakuda Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1449",
    "name": "Irinjalakuda തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Irinjalakuda Coconut Tree & Farm Care Service",
    "ml": "Irinjalakuda തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1450",
    "name": "കാറ്ററിംഗ് - Irinjalakuda Catering & Traditional Feast Cooking",
    "en": "Irinjalakuda Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Irinjalakuda Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1451",
    "name": "Irinjalakuda വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Irinjalakuda Wedding Photography & Drone Cinematography",
    "ml": "Irinjalakuda വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1452",
    "name": "ഇവന്റ്സ് - Irinjalakuda Stage Sound System & Light Decoration",
    "en": "Irinjalakuda Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Irinjalakuda Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1453",
    "name": "Irinjalakuda ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Irinjalakuda Home Nursing & Elderly Patient Attendant",
    "ml": "Irinjalakuda ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1454",
    "name": "Irinjalakuda Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Irinjalakuda Academic Home Tuition & Skill Training",
    "ml": "Irinjalakuda Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1455",
    "name": "Irinjalakuda CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Irinjalakuda CCTV Security Camera & Automation Setup",
    "ml": "Irinjalakuda CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1456",
    "name": "Irinjalakuda Designer Tailoring & Stitching സർവീസ്",
    "en": "Irinjalakuda Designer Tailoring & Stitching Service",
    "ml": "Irinjalakuda Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1457",
    "name": "ബ്യൂട്ടി കെയർ - Irinjalakuda Bridal Beauty Makeup & Personal Care",
    "en": "Irinjalakuda Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Irinjalakuda Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1458",
    "name": "സോളാർ - Irinjalakuda Solar Rooftop & Inverter Power System",
    "en": "Irinjalakuda Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Irinjalakuda Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1459",
    "name": "Irinjalakuda TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Irinjalakuda TV, Computer & Home Appliance Repair",
    "ml": "Irinjalakuda TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1460",
    "name": "Irinjalakuda Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Irinjalakuda Open Well Digging & Mud Deep Cleaning",
    "ml": "Irinjalakuda Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1461",
    "name": "മേസൺ വർക്ക് - Irinjalakuda Interlock Paver Block & Driveway Laying",
    "en": "Irinjalakuda Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Irinjalakuda Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1462",
    "name": "ക്ലീനിംഗ് - Irinjalakuda Septic Tank Vacuum Suction & Waste Flush",
    "en": "Irinjalakuda Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Irinjalakuda Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1463",
    "name": "വെൽഡിങ് വർക്ക് - Irinjalakuda Aluminium Glass Sliding & Cabin Partition",
    "en": "Irinjalakuda Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Irinjalakuda Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1464",
    "name": "വാഹന സർവീസ് - Irinjalakuda Household Packing & Moving Shifting Assist",
    "en": "Irinjalakuda Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Irinjalakuda Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1465",
    "name": "Irinjalakuda Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Irinjalakuda Gas Stove & Commercial Burner Repair",
    "ml": "Irinjalakuda Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1466",
    "name": "ക്ലീനിംഗ് - Irinjalakuda Anti-Termite & Mosquito Pest Extermination",
    "en": "Irinjalakuda Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Irinjalakuda Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Irinjalakuda Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1467",
    "name": "ഇലക്ട്രിക്കൽ - Guruvayur Electrician & Power Maintenance",
    "en": "Guruvayur Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Guruvayur Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1468",
    "name": "പ്ലംബിംഗ് - Guruvayur Emergency Plumbing & Water Solution",
    "en": "Guruvayur Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Guruvayur Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1469",
    "name": "Guruvayur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Guruvayur AC Installation & Cool Care Service",
    "ml": "Guruvayur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1470",
    "name": "തടിപ്പണി - Guruvayur Custom Carpentry & Furniture Restoring",
    "en": "Guruvayur Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Guruvayur Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1471",
    "name": "പെയിന്റിംഗ് - Guruvayur Weatherproof Wall Painting & Damp Proofing",
    "en": "Guruvayur Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Guruvayur Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1472",
    "name": "Guruvayur Civil Masonry & Concrete റിപ്പയർ",
    "en": "Guruvayur Civil Masonry & Concrete Repair",
    "ml": "Guruvayur Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1473",
    "name": "വെൽഡിങ് വർക്ക് - Guruvayur Truss Roofing & Structural Steel Fabrication",
    "en": "Guruvayur Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Guruvayur Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1474",
    "name": "വർക്ക്‌ഷോപ്പ് - Guruvayur On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Guruvayur On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Guruvayur On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1475",
    "name": "വാഹന സർവീസ് - Guruvayur Professional Driver & Taxi Ride Hire",
    "en": "Guruvayur Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Guruvayur Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1476",
    "name": "Guruvayur Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Guruvayur Home Deep Cleaning & Waste Management",
    "ml": "Guruvayur Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1477",
    "name": "Guruvayur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Guruvayur Coconut Tree & Farm Care Service",
    "ml": "Guruvayur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1478",
    "name": "കാറ്ററിംഗ് - Guruvayur Catering & Traditional Feast Cooking",
    "en": "Guruvayur Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Guruvayur Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1479",
    "name": "Guruvayur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Guruvayur Wedding Photography & Drone Cinematography",
    "ml": "Guruvayur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1480",
    "name": "ഇവന്റ്സ് - Guruvayur Stage Sound System & Light Decoration",
    "en": "Guruvayur Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Guruvayur Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1481",
    "name": "Guruvayur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Guruvayur Home Nursing & Elderly Patient Attendant",
    "ml": "Guruvayur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1482",
    "name": "Guruvayur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Guruvayur Academic Home Tuition & Skill Training",
    "ml": "Guruvayur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1483",
    "name": "Guruvayur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Guruvayur CCTV Security Camera & Automation Setup",
    "ml": "Guruvayur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1484",
    "name": "Guruvayur Designer Tailoring & Stitching സർവീസ്",
    "en": "Guruvayur Designer Tailoring & Stitching Service",
    "ml": "Guruvayur Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1485",
    "name": "ബ്യൂട്ടി കെയർ - Guruvayur Bridal Beauty Makeup & Personal Care",
    "en": "Guruvayur Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Guruvayur Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1486",
    "name": "സോളാർ - Guruvayur Solar Rooftop & Inverter Power System",
    "en": "Guruvayur Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Guruvayur Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1487",
    "name": "Guruvayur TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Guruvayur TV, Computer & Home Appliance Repair",
    "ml": "Guruvayur TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1488",
    "name": "Guruvayur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Guruvayur Open Well Digging & Mud Deep Cleaning",
    "ml": "Guruvayur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1489",
    "name": "മേസൺ വർക്ക് - Guruvayur Interlock Paver Block & Driveway Laying",
    "en": "Guruvayur Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Guruvayur Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1490",
    "name": "ക്ലീനിംഗ് - Guruvayur Septic Tank Vacuum Suction & Waste Flush",
    "en": "Guruvayur Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Guruvayur Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1491",
    "name": "വെൽഡിങ് വർക്ക് - Guruvayur Aluminium Glass Sliding & Cabin Partition",
    "en": "Guruvayur Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Guruvayur Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1492",
    "name": "വാഹന സർവീസ് - Guruvayur Household Packing & Moving Shifting Assist",
    "en": "Guruvayur Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Guruvayur Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1493",
    "name": "Guruvayur Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Guruvayur Gas Stove & Commercial Burner Repair",
    "ml": "Guruvayur Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1494",
    "name": "ക്ലീനിംഗ് - Guruvayur Anti-Termite & Mosquito Pest Extermination",
    "en": "Guruvayur Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Guruvayur Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Guruvayur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1495",
    "name": "ഇലക്ട്രിക്കൽ - Kunnamkulam Electrician & Power Maintenance",
    "en": "Kunnamkulam Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kunnamkulam Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1496",
    "name": "പ്ലംബിംഗ് - Kunnamkulam Emergency Plumbing & Water Solution",
    "en": "Kunnamkulam Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kunnamkulam Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1497",
    "name": "Kunnamkulam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kunnamkulam AC Installation & Cool Care Service",
    "ml": "Kunnamkulam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1498",
    "name": "തടിപ്പണി - Kunnamkulam Custom Carpentry & Furniture Restoring",
    "en": "Kunnamkulam Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kunnamkulam Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1499",
    "name": "പെയിന്റിംഗ് - Kunnamkulam Weatherproof Wall Painting & Damp Proofing",
    "en": "Kunnamkulam Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kunnamkulam Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1500",
    "name": "Kunnamkulam Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kunnamkulam Civil Masonry & Concrete Repair",
    "ml": "Kunnamkulam Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1501",
    "name": "വെൽഡിങ് വർക്ക് - Kunnamkulam Truss Roofing & Structural Steel Fabrication",
    "en": "Kunnamkulam Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kunnamkulam Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1502",
    "name": "വർക്ക്‌ഷോപ്പ് - Kunnamkulam On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kunnamkulam On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kunnamkulam On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1503",
    "name": "വാഹന സർവീസ് - Kunnamkulam Professional Driver & Taxi Ride Hire",
    "en": "Kunnamkulam Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kunnamkulam Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1504",
    "name": "Kunnamkulam Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kunnamkulam Home Deep Cleaning & Waste Management",
    "ml": "Kunnamkulam Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1505",
    "name": "Kunnamkulam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kunnamkulam Coconut Tree & Farm Care Service",
    "ml": "Kunnamkulam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1506",
    "name": "കാറ്ററിംഗ് - Kunnamkulam Catering & Traditional Feast Cooking",
    "en": "Kunnamkulam Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kunnamkulam Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1507",
    "name": "Kunnamkulam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kunnamkulam Wedding Photography & Drone Cinematography",
    "ml": "Kunnamkulam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1508",
    "name": "ഇവന്റ്സ് - Kunnamkulam Stage Sound System & Light Decoration",
    "en": "Kunnamkulam Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kunnamkulam Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1509",
    "name": "Kunnamkulam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kunnamkulam Home Nursing & Elderly Patient Attendant",
    "ml": "Kunnamkulam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1510",
    "name": "Kunnamkulam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kunnamkulam Academic Home Tuition & Skill Training",
    "ml": "Kunnamkulam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1511",
    "name": "Kunnamkulam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kunnamkulam CCTV Security Camera & Automation Setup",
    "ml": "Kunnamkulam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1512",
    "name": "Kunnamkulam Designer Tailoring & Stitching സർവീസ്",
    "en": "Kunnamkulam Designer Tailoring & Stitching Service",
    "ml": "Kunnamkulam Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1513",
    "name": "ബ്യൂട്ടി കെയർ - Kunnamkulam Bridal Beauty Makeup & Personal Care",
    "en": "Kunnamkulam Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kunnamkulam Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1514",
    "name": "സോളാർ - Kunnamkulam Solar Rooftop & Inverter Power System",
    "en": "Kunnamkulam Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kunnamkulam Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1515",
    "name": "Kunnamkulam TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kunnamkulam TV, Computer & Home Appliance Repair",
    "ml": "Kunnamkulam TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1516",
    "name": "Kunnamkulam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kunnamkulam Open Well Digging & Mud Deep Cleaning",
    "ml": "Kunnamkulam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1517",
    "name": "മേസൺ വർക്ക് - Kunnamkulam Interlock Paver Block & Driveway Laying",
    "en": "Kunnamkulam Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kunnamkulam Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1518",
    "name": "ക്ലീനിംഗ് - Kunnamkulam Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kunnamkulam Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kunnamkulam Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1519",
    "name": "വെൽഡിങ് വർക്ക് - Kunnamkulam Aluminium Glass Sliding & Cabin Partition",
    "en": "Kunnamkulam Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kunnamkulam Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1520",
    "name": "വാഹന സർവീസ് - Kunnamkulam Household Packing & Moving Shifting Assist",
    "en": "Kunnamkulam Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kunnamkulam Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1521",
    "name": "Kunnamkulam Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kunnamkulam Gas Stove & Commercial Burner Repair",
    "ml": "Kunnamkulam Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1522",
    "name": "ക്ലീനിംഗ് - Kunnamkulam Anti-Termite & Mosquito Pest Extermination",
    "en": "Kunnamkulam Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kunnamkulam Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kunnamkulam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1523",
    "name": "ഇലക്ട്രിക്കൽ - Ottapalam Electrician & Power Maintenance",
    "en": "Ottapalam Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Ottapalam Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1524",
    "name": "പ്ലംബിംഗ് - Ottapalam Emergency Plumbing & Water Solution",
    "en": "Ottapalam Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Ottapalam Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1525",
    "name": "Ottapalam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Ottapalam AC Installation & Cool Care Service",
    "ml": "Ottapalam AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1526",
    "name": "തടിപ്പണി - Ottapalam Custom Carpentry & Furniture Restoring",
    "en": "Ottapalam Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Ottapalam Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1527",
    "name": "പെയിന്റിംഗ് - Ottapalam Weatherproof Wall Painting & Damp Proofing",
    "en": "Ottapalam Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Ottapalam Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1528",
    "name": "Ottapalam Civil Masonry & Concrete റിപ്പയർ",
    "en": "Ottapalam Civil Masonry & Concrete Repair",
    "ml": "Ottapalam Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1529",
    "name": "വെൽഡിങ് വർക്ക് - Ottapalam Truss Roofing & Structural Steel Fabrication",
    "en": "Ottapalam Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Ottapalam Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1530",
    "name": "വർക്ക്‌ഷോപ്പ് - Ottapalam On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Ottapalam On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Ottapalam On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1531",
    "name": "വാഹന സർവീസ് - Ottapalam Professional Driver & Taxi Ride Hire",
    "en": "Ottapalam Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Ottapalam Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1532",
    "name": "Ottapalam Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Ottapalam Home Deep Cleaning & Waste Management",
    "ml": "Ottapalam Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1533",
    "name": "Ottapalam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Ottapalam Coconut Tree & Farm Care Service",
    "ml": "Ottapalam തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1534",
    "name": "കാറ്ററിംഗ് - Ottapalam Catering & Traditional Feast Cooking",
    "en": "Ottapalam Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Ottapalam Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1535",
    "name": "Ottapalam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Ottapalam Wedding Photography & Drone Cinematography",
    "ml": "Ottapalam വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1536",
    "name": "ഇവന്റ്സ് - Ottapalam Stage Sound System & Light Decoration",
    "en": "Ottapalam Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Ottapalam Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1537",
    "name": "Ottapalam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Ottapalam Home Nursing & Elderly Patient Attendant",
    "ml": "Ottapalam ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1538",
    "name": "Ottapalam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Ottapalam Academic Home Tuition & Skill Training",
    "ml": "Ottapalam Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1539",
    "name": "Ottapalam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Ottapalam CCTV Security Camera & Automation Setup",
    "ml": "Ottapalam CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1540",
    "name": "Ottapalam Designer Tailoring & Stitching സർവീസ്",
    "en": "Ottapalam Designer Tailoring & Stitching Service",
    "ml": "Ottapalam Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1541",
    "name": "ബ്യൂട്ടി കെയർ - Ottapalam Bridal Beauty Makeup & Personal Care",
    "en": "Ottapalam Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Ottapalam Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1542",
    "name": "സോളാർ - Ottapalam Solar Rooftop & Inverter Power System",
    "en": "Ottapalam Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Ottapalam Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1543",
    "name": "Ottapalam TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Ottapalam TV, Computer & Home Appliance Repair",
    "ml": "Ottapalam TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1544",
    "name": "Ottapalam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Ottapalam Open Well Digging & Mud Deep Cleaning",
    "ml": "Ottapalam Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1545",
    "name": "മേസൺ വർക്ക് - Ottapalam Interlock Paver Block & Driveway Laying",
    "en": "Ottapalam Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Ottapalam Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1546",
    "name": "ക്ലീനിംഗ് - Ottapalam Septic Tank Vacuum Suction & Waste Flush",
    "en": "Ottapalam Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Ottapalam Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1547",
    "name": "വെൽഡിങ് വർക്ക് - Ottapalam Aluminium Glass Sliding & Cabin Partition",
    "en": "Ottapalam Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Ottapalam Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1548",
    "name": "വാഹന സർവീസ് - Ottapalam Household Packing & Moving Shifting Assist",
    "en": "Ottapalam Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Ottapalam Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1549",
    "name": "Ottapalam Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Ottapalam Gas Stove & Commercial Burner Repair",
    "ml": "Ottapalam Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1550",
    "name": "ക്ലീനിംഗ് - Ottapalam Anti-Termite & Mosquito Pest Extermination",
    "en": "Ottapalam Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Ottapalam Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Ottapalam Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1551",
    "name": "ഇലക്ട്രിക്കൽ - Manjeri Electrician & Power Maintenance",
    "en": "Manjeri Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Manjeri Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1552",
    "name": "പ്ലംബിംഗ് - Manjeri Emergency Plumbing & Water Solution",
    "en": "Manjeri Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Manjeri Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1553",
    "name": "Manjeri AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Manjeri AC Installation & Cool Care Service",
    "ml": "Manjeri AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1554",
    "name": "തടിപ്പണി - Manjeri Custom Carpentry & Furniture Restoring",
    "en": "Manjeri Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Manjeri Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1555",
    "name": "പെയിന്റിംഗ് - Manjeri Weatherproof Wall Painting & Damp Proofing",
    "en": "Manjeri Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Manjeri Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1556",
    "name": "Manjeri Civil Masonry & Concrete റിപ്പയർ",
    "en": "Manjeri Civil Masonry & Concrete Repair",
    "ml": "Manjeri Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1557",
    "name": "വെൽഡിങ് വർക്ക് - Manjeri Truss Roofing & Structural Steel Fabrication",
    "en": "Manjeri Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Manjeri Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1558",
    "name": "വർക്ക്‌ഷോപ്പ് - Manjeri On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Manjeri On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Manjeri On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1559",
    "name": "വാഹന സർവീസ് - Manjeri Professional Driver & Taxi Ride Hire",
    "en": "Manjeri Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Manjeri Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1560",
    "name": "Manjeri Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Manjeri Home Deep Cleaning & Waste Management",
    "ml": "Manjeri Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1561",
    "name": "Manjeri തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Manjeri Coconut Tree & Farm Care Service",
    "ml": "Manjeri തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1562",
    "name": "കാറ്ററിംഗ് - Manjeri Catering & Traditional Feast Cooking",
    "en": "Manjeri Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Manjeri Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1563",
    "name": "Manjeri വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Manjeri Wedding Photography & Drone Cinematography",
    "ml": "Manjeri വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1564",
    "name": "ഇവന്റ്സ് - Manjeri Stage Sound System & Light Decoration",
    "en": "Manjeri Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Manjeri Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1565",
    "name": "Manjeri ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Manjeri Home Nursing & Elderly Patient Attendant",
    "ml": "Manjeri ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1566",
    "name": "Manjeri Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Manjeri Academic Home Tuition & Skill Training",
    "ml": "Manjeri Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1567",
    "name": "Manjeri CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Manjeri CCTV Security Camera & Automation Setup",
    "ml": "Manjeri CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1568",
    "name": "Manjeri Designer Tailoring & Stitching സർവീസ്",
    "en": "Manjeri Designer Tailoring & Stitching Service",
    "ml": "Manjeri Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1569",
    "name": "ബ്യൂട്ടി കെയർ - Manjeri Bridal Beauty Makeup & Personal Care",
    "en": "Manjeri Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Manjeri Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1570",
    "name": "സോളാർ - Manjeri Solar Rooftop & Inverter Power System",
    "en": "Manjeri Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Manjeri Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1571",
    "name": "Manjeri TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Manjeri TV, Computer & Home Appliance Repair",
    "ml": "Manjeri TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1572",
    "name": "Manjeri Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Manjeri Open Well Digging & Mud Deep Cleaning",
    "ml": "Manjeri Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1573",
    "name": "മേസൺ വർക്ക് - Manjeri Interlock Paver Block & Driveway Laying",
    "en": "Manjeri Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Manjeri Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1574",
    "name": "ക്ലീനിംഗ് - Manjeri Septic Tank Vacuum Suction & Waste Flush",
    "en": "Manjeri Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Manjeri Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1575",
    "name": "വെൽഡിങ് വർക്ക് - Manjeri Aluminium Glass Sliding & Cabin Partition",
    "en": "Manjeri Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Manjeri Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1576",
    "name": "വാഹന സർവീസ് - Manjeri Household Packing & Moving Shifting Assist",
    "en": "Manjeri Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Manjeri Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1577",
    "name": "Manjeri Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Manjeri Gas Stove & Commercial Burner Repair",
    "ml": "Manjeri Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1578",
    "name": "ക്ലീനിംഗ് - Manjeri Anti-Termite & Mosquito Pest Extermination",
    "en": "Manjeri Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Manjeri Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Manjeri Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1579",
    "name": "ഇലക്ട്രിക്കൽ - Tirur Electrician & Power Maintenance",
    "en": "Tirur Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Tirur Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1580",
    "name": "പ്ലംബിംഗ് - Tirur Emergency Plumbing & Water Solution",
    "en": "Tirur Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Tirur Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1581",
    "name": "Tirur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Tirur AC Installation & Cool Care Service",
    "ml": "Tirur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1582",
    "name": "തടിപ്പണി - Tirur Custom Carpentry & Furniture Restoring",
    "en": "Tirur Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Tirur Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1583",
    "name": "പെയിന്റിംഗ് - Tirur Weatherproof Wall Painting & Damp Proofing",
    "en": "Tirur Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Tirur Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1584",
    "name": "Tirur Civil Masonry & Concrete റിപ്പയർ",
    "en": "Tirur Civil Masonry & Concrete Repair",
    "ml": "Tirur Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1585",
    "name": "വെൽഡിങ് വർക്ക് - Tirur Truss Roofing & Structural Steel Fabrication",
    "en": "Tirur Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Tirur Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1586",
    "name": "വർക്ക്‌ഷോപ്പ് - Tirur On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Tirur On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Tirur On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1587",
    "name": "വാഹന സർവീസ് - Tirur Professional Driver & Taxi Ride Hire",
    "en": "Tirur Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Tirur Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1588",
    "name": "Tirur Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Tirur Home Deep Cleaning & Waste Management",
    "ml": "Tirur Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1589",
    "name": "Tirur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Tirur Coconut Tree & Farm Care Service",
    "ml": "Tirur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1590",
    "name": "കാറ്ററിംഗ് - Tirur Catering & Traditional Feast Cooking",
    "en": "Tirur Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Tirur Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1591",
    "name": "Tirur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Tirur Wedding Photography & Drone Cinematography",
    "ml": "Tirur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1592",
    "name": "ഇവന്റ്സ് - Tirur Stage Sound System & Light Decoration",
    "en": "Tirur Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Tirur Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1593",
    "name": "Tirur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Tirur Home Nursing & Elderly Patient Attendant",
    "ml": "Tirur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1594",
    "name": "Tirur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Tirur Academic Home Tuition & Skill Training",
    "ml": "Tirur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1595",
    "name": "Tirur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Tirur CCTV Security Camera & Automation Setup",
    "ml": "Tirur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1596",
    "name": "Tirur Designer Tailoring & Stitching സർവീസ്",
    "en": "Tirur Designer Tailoring & Stitching Service",
    "ml": "Tirur Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1597",
    "name": "ബ്യൂട്ടി കെയർ - Tirur Bridal Beauty Makeup & Personal Care",
    "en": "Tirur Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Tirur Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1598",
    "name": "സോളാർ - Tirur Solar Rooftop & Inverter Power System",
    "en": "Tirur Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Tirur Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1599",
    "name": "Tirur TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Tirur TV, Computer & Home Appliance Repair",
    "ml": "Tirur TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1600",
    "name": "Tirur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Tirur Open Well Digging & Mud Deep Cleaning",
    "ml": "Tirur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1601",
    "name": "മേസൺ വർക്ക് - Tirur Interlock Paver Block & Driveway Laying",
    "en": "Tirur Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Tirur Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1602",
    "name": "ക്ലീനിംഗ് - Tirur Septic Tank Vacuum Suction & Waste Flush",
    "en": "Tirur Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Tirur Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1603",
    "name": "വെൽഡിങ് വർക്ക് - Tirur Aluminium Glass Sliding & Cabin Partition",
    "en": "Tirur Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Tirur Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1604",
    "name": "വാഹന സർവീസ് - Tirur Household Packing & Moving Shifting Assist",
    "en": "Tirur Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Tirur Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1605",
    "name": "Tirur Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Tirur Gas Stove & Commercial Burner Repair",
    "ml": "Tirur Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1606",
    "name": "ക്ലീനിംഗ് - Tirur Anti-Termite & Mosquito Pest Extermination",
    "en": "Tirur Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Tirur Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Tirur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1607",
    "name": "ഇലക്ട്രിക്കൽ - Perinthalmanna Electrician & Power Maintenance",
    "en": "Perinthalmanna Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Perinthalmanna Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1608",
    "name": "പ്ലംബിംഗ് - Perinthalmanna Emergency Plumbing & Water Solution",
    "en": "Perinthalmanna Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Perinthalmanna Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1609",
    "name": "Perinthalmanna AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Perinthalmanna AC Installation & Cool Care Service",
    "ml": "Perinthalmanna AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1610",
    "name": "തടിപ്പണി - Perinthalmanna Custom Carpentry & Furniture Restoring",
    "en": "Perinthalmanna Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Perinthalmanna Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1611",
    "name": "പെയിന്റിംഗ് - Perinthalmanna Weatherproof Wall Painting & Damp Proofing",
    "en": "Perinthalmanna Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Perinthalmanna Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1612",
    "name": "Perinthalmanna Civil Masonry & Concrete റിപ്പയർ",
    "en": "Perinthalmanna Civil Masonry & Concrete Repair",
    "ml": "Perinthalmanna Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1613",
    "name": "വെൽഡിങ് വർക്ക് - Perinthalmanna Truss Roofing & Structural Steel Fabrication",
    "en": "Perinthalmanna Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Perinthalmanna Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1614",
    "name": "വർക്ക്‌ഷോപ്പ് - Perinthalmanna On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Perinthalmanna On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Perinthalmanna On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1615",
    "name": "വാഹന സർവീസ് - Perinthalmanna Professional Driver & Taxi Ride Hire",
    "en": "Perinthalmanna Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Perinthalmanna Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1616",
    "name": "Perinthalmanna Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Perinthalmanna Home Deep Cleaning & Waste Management",
    "ml": "Perinthalmanna Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1617",
    "name": "Perinthalmanna തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Perinthalmanna Coconut Tree & Farm Care Service",
    "ml": "Perinthalmanna തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1618",
    "name": "കാറ്ററിംഗ് - Perinthalmanna Catering & Traditional Feast Cooking",
    "en": "Perinthalmanna Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Perinthalmanna Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1619",
    "name": "Perinthalmanna വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Perinthalmanna Wedding Photography & Drone Cinematography",
    "ml": "Perinthalmanna വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1620",
    "name": "ഇവന്റ്സ് - Perinthalmanna Stage Sound System & Light Decoration",
    "en": "Perinthalmanna Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Perinthalmanna Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1621",
    "name": "Perinthalmanna ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Perinthalmanna Home Nursing & Elderly Patient Attendant",
    "ml": "Perinthalmanna ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1622",
    "name": "Perinthalmanna Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Perinthalmanna Academic Home Tuition & Skill Training",
    "ml": "Perinthalmanna Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1623",
    "name": "Perinthalmanna CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Perinthalmanna CCTV Security Camera & Automation Setup",
    "ml": "Perinthalmanna CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1624",
    "name": "Perinthalmanna Designer Tailoring & Stitching സർവീസ്",
    "en": "Perinthalmanna Designer Tailoring & Stitching Service",
    "ml": "Perinthalmanna Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1625",
    "name": "ബ്യൂട്ടി കെയർ - Perinthalmanna Bridal Beauty Makeup & Personal Care",
    "en": "Perinthalmanna Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Perinthalmanna Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1626",
    "name": "സോളാർ - Perinthalmanna Solar Rooftop & Inverter Power System",
    "en": "Perinthalmanna Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Perinthalmanna Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1627",
    "name": "Perinthalmanna TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Perinthalmanna TV, Computer & Home Appliance Repair",
    "ml": "Perinthalmanna TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1628",
    "name": "Perinthalmanna Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Perinthalmanna Open Well Digging & Mud Deep Cleaning",
    "ml": "Perinthalmanna Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1629",
    "name": "മേസൺ വർക്ക് - Perinthalmanna Interlock Paver Block & Driveway Laying",
    "en": "Perinthalmanna Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Perinthalmanna Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1630",
    "name": "ക്ലീനിംഗ് - Perinthalmanna Septic Tank Vacuum Suction & Waste Flush",
    "en": "Perinthalmanna Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Perinthalmanna Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1631",
    "name": "വെൽഡിങ് വർക്ക് - Perinthalmanna Aluminium Glass Sliding & Cabin Partition",
    "en": "Perinthalmanna Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Perinthalmanna Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1632",
    "name": "വാഹന സർവീസ് - Perinthalmanna Household Packing & Moving Shifting Assist",
    "en": "Perinthalmanna Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Perinthalmanna Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1633",
    "name": "Perinthalmanna Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Perinthalmanna Gas Stove & Commercial Burner Repair",
    "ml": "Perinthalmanna Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1634",
    "name": "ക്ലീനിംഗ് - Perinthalmanna Anti-Termite & Mosquito Pest Extermination",
    "en": "Perinthalmanna Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Perinthalmanna Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Perinthalmanna Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1635",
    "name": "ഇലക്ട്രിക്കൽ - Kottakkal Electrician & Power Maintenance",
    "en": "Kottakkal Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kottakkal Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1636",
    "name": "പ്ലംബിംഗ് - Kottakkal Emergency Plumbing & Water Solution",
    "en": "Kottakkal Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kottakkal Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1637",
    "name": "Kottakkal AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kottakkal AC Installation & Cool Care Service",
    "ml": "Kottakkal AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1638",
    "name": "തടിപ്പണി - Kottakkal Custom Carpentry & Furniture Restoring",
    "en": "Kottakkal Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kottakkal Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1639",
    "name": "പെയിന്റിംഗ് - Kottakkal Weatherproof Wall Painting & Damp Proofing",
    "en": "Kottakkal Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kottakkal Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1640",
    "name": "Kottakkal Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kottakkal Civil Masonry & Concrete Repair",
    "ml": "Kottakkal Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1641",
    "name": "വെൽഡിങ് വർക്ക് - Kottakkal Truss Roofing & Structural Steel Fabrication",
    "en": "Kottakkal Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kottakkal Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1642",
    "name": "വർക്ക്‌ഷോപ്പ് - Kottakkal On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kottakkal On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kottakkal On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1643",
    "name": "വാഹന സർവീസ് - Kottakkal Professional Driver & Taxi Ride Hire",
    "en": "Kottakkal Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kottakkal Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1644",
    "name": "Kottakkal Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kottakkal Home Deep Cleaning & Waste Management",
    "ml": "Kottakkal Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1645",
    "name": "Kottakkal തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kottakkal Coconut Tree & Farm Care Service",
    "ml": "Kottakkal തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1646",
    "name": "കാറ്ററിംഗ് - Kottakkal Catering & Traditional Feast Cooking",
    "en": "Kottakkal Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kottakkal Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1647",
    "name": "Kottakkal വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kottakkal Wedding Photography & Drone Cinematography",
    "ml": "Kottakkal വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1648",
    "name": "ഇവന്റ്സ് - Kottakkal Stage Sound System & Light Decoration",
    "en": "Kottakkal Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kottakkal Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1649",
    "name": "Kottakkal ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kottakkal Home Nursing & Elderly Patient Attendant",
    "ml": "Kottakkal ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1650",
    "name": "Kottakkal Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kottakkal Academic Home Tuition & Skill Training",
    "ml": "Kottakkal Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1651",
    "name": "Kottakkal CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kottakkal CCTV Security Camera & Automation Setup",
    "ml": "Kottakkal CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1652",
    "name": "Kottakkal Designer Tailoring & Stitching സർവീസ്",
    "en": "Kottakkal Designer Tailoring & Stitching Service",
    "ml": "Kottakkal Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1653",
    "name": "ബ്യൂട്ടി കെയർ - Kottakkal Bridal Beauty Makeup & Personal Care",
    "en": "Kottakkal Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kottakkal Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1654",
    "name": "സോളാർ - Kottakkal Solar Rooftop & Inverter Power System",
    "en": "Kottakkal Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kottakkal Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1655",
    "name": "Kottakkal TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kottakkal TV, Computer & Home Appliance Repair",
    "ml": "Kottakkal TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1656",
    "name": "Kottakkal Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kottakkal Open Well Digging & Mud Deep Cleaning",
    "ml": "Kottakkal Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1657",
    "name": "മേസൺ വർക്ക് - Kottakkal Interlock Paver Block & Driveway Laying",
    "en": "Kottakkal Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kottakkal Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1658",
    "name": "ക്ലീനിംഗ് - Kottakkal Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kottakkal Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kottakkal Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1659",
    "name": "വെൽഡിങ് വർക്ക് - Kottakkal Aluminium Glass Sliding & Cabin Partition",
    "en": "Kottakkal Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kottakkal Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1660",
    "name": "വാഹന സർവീസ് - Kottakkal Household Packing & Moving Shifting Assist",
    "en": "Kottakkal Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kottakkal Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1661",
    "name": "Kottakkal Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kottakkal Gas Stove & Commercial Burner Repair",
    "ml": "Kottakkal Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1662",
    "name": "ക്ലീനിംഗ് - Kottakkal Anti-Termite & Mosquito Pest Extermination",
    "en": "Kottakkal Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kottakkal Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kottakkal Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1663",
    "name": "ഇലക്ട്രിക്കൽ - Nilambur Electrician & Power Maintenance",
    "en": "Nilambur Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Nilambur Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1664",
    "name": "പ്ലംബിംഗ് - Nilambur Emergency Plumbing & Water Solution",
    "en": "Nilambur Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Nilambur Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1665",
    "name": "Nilambur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Nilambur AC Installation & Cool Care Service",
    "ml": "Nilambur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1666",
    "name": "തടിപ്പണി - Nilambur Custom Carpentry & Furniture Restoring",
    "en": "Nilambur Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Nilambur Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1667",
    "name": "പെയിന്റിംഗ് - Nilambur Weatherproof Wall Painting & Damp Proofing",
    "en": "Nilambur Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Nilambur Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1668",
    "name": "Nilambur Civil Masonry & Concrete റിപ്പയർ",
    "en": "Nilambur Civil Masonry & Concrete Repair",
    "ml": "Nilambur Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1669",
    "name": "വെൽഡിങ് വർക്ക് - Nilambur Truss Roofing & Structural Steel Fabrication",
    "en": "Nilambur Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Nilambur Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1670",
    "name": "വർക്ക്‌ഷോപ്പ് - Nilambur On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Nilambur On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Nilambur On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1671",
    "name": "വാഹന സർവീസ് - Nilambur Professional Driver & Taxi Ride Hire",
    "en": "Nilambur Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Nilambur Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1672",
    "name": "Nilambur Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Nilambur Home Deep Cleaning & Waste Management",
    "ml": "Nilambur Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1673",
    "name": "Nilambur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Nilambur Coconut Tree & Farm Care Service",
    "ml": "Nilambur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1674",
    "name": "കാറ്ററിംഗ് - Nilambur Catering & Traditional Feast Cooking",
    "en": "Nilambur Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Nilambur Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1675",
    "name": "Nilambur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Nilambur Wedding Photography & Drone Cinematography",
    "ml": "Nilambur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1676",
    "name": "ഇവന്റ്സ് - Nilambur Stage Sound System & Light Decoration",
    "en": "Nilambur Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Nilambur Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1677",
    "name": "Nilambur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Nilambur Home Nursing & Elderly Patient Attendant",
    "ml": "Nilambur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1678",
    "name": "Nilambur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Nilambur Academic Home Tuition & Skill Training",
    "ml": "Nilambur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1679",
    "name": "Nilambur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Nilambur CCTV Security Camera & Automation Setup",
    "ml": "Nilambur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1680",
    "name": "Nilambur Designer Tailoring & Stitching സർവീസ്",
    "en": "Nilambur Designer Tailoring & Stitching Service",
    "ml": "Nilambur Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1681",
    "name": "ബ്യൂട്ടി കെയർ - Nilambur Bridal Beauty Makeup & Personal Care",
    "en": "Nilambur Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Nilambur Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1682",
    "name": "സോളാർ - Nilambur Solar Rooftop & Inverter Power System",
    "en": "Nilambur Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Nilambur Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1683",
    "name": "Nilambur TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Nilambur TV, Computer & Home Appliance Repair",
    "ml": "Nilambur TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1684",
    "name": "Nilambur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Nilambur Open Well Digging & Mud Deep Cleaning",
    "ml": "Nilambur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1685",
    "name": "മേസൺ വർക്ക് - Nilambur Interlock Paver Block & Driveway Laying",
    "en": "Nilambur Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Nilambur Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1686",
    "name": "ക്ലീനിംഗ് - Nilambur Septic Tank Vacuum Suction & Waste Flush",
    "en": "Nilambur Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Nilambur Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1687",
    "name": "വെൽഡിങ് വർക്ക് - Nilambur Aluminium Glass Sliding & Cabin Partition",
    "en": "Nilambur Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Nilambur Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1688",
    "name": "വാഹന സർവീസ് - Nilambur Household Packing & Moving Shifting Assist",
    "en": "Nilambur Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Nilambur Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1689",
    "name": "Nilambur Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Nilambur Gas Stove & Commercial Burner Repair",
    "ml": "Nilambur Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1690",
    "name": "ക്ലീനിംഗ് - Nilambur Anti-Termite & Mosquito Pest Extermination",
    "en": "Nilambur Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Nilambur Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Nilambur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1691",
    "name": "ഇലക്ട്രിക്കൽ - Vadakara Electrician & Power Maintenance",
    "en": "Vadakara Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Vadakara Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1692",
    "name": "പ്ലംബിംഗ് - Vadakara Emergency Plumbing & Water Solution",
    "en": "Vadakara Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Vadakara Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1693",
    "name": "Vadakara AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Vadakara AC Installation & Cool Care Service",
    "ml": "Vadakara AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1694",
    "name": "തടിപ്പണി - Vadakara Custom Carpentry & Furniture Restoring",
    "en": "Vadakara Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Vadakara Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1695",
    "name": "പെയിന്റിംഗ് - Vadakara Weatherproof Wall Painting & Damp Proofing",
    "en": "Vadakara Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Vadakara Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1696",
    "name": "Vadakara Civil Masonry & Concrete റിപ്പയർ",
    "en": "Vadakara Civil Masonry & Concrete Repair",
    "ml": "Vadakara Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1697",
    "name": "വെൽഡിങ് വർക്ക് - Vadakara Truss Roofing & Structural Steel Fabrication",
    "en": "Vadakara Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Vadakara Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1698",
    "name": "വർക്ക്‌ഷോപ്പ് - Vadakara On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Vadakara On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Vadakara On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1699",
    "name": "വാഹന സർവീസ് - Vadakara Professional Driver & Taxi Ride Hire",
    "en": "Vadakara Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Vadakara Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1700",
    "name": "Vadakara Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Vadakara Home Deep Cleaning & Waste Management",
    "ml": "Vadakara Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1701",
    "name": "Vadakara തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Vadakara Coconut Tree & Farm Care Service",
    "ml": "Vadakara തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1702",
    "name": "കാറ്ററിംഗ് - Vadakara Catering & Traditional Feast Cooking",
    "en": "Vadakara Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Vadakara Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1703",
    "name": "Vadakara വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Vadakara Wedding Photography & Drone Cinematography",
    "ml": "Vadakara വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1704",
    "name": "ഇവന്റ്സ് - Vadakara Stage Sound System & Light Decoration",
    "en": "Vadakara Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Vadakara Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1705",
    "name": "Vadakara ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Vadakara Home Nursing & Elderly Patient Attendant",
    "ml": "Vadakara ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1706",
    "name": "Vadakara Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Vadakara Academic Home Tuition & Skill Training",
    "ml": "Vadakara Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1707",
    "name": "Vadakara CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Vadakara CCTV Security Camera & Automation Setup",
    "ml": "Vadakara CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1708",
    "name": "Vadakara Designer Tailoring & Stitching സർവീസ്",
    "en": "Vadakara Designer Tailoring & Stitching Service",
    "ml": "Vadakara Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1709",
    "name": "ബ്യൂട്ടി കെയർ - Vadakara Bridal Beauty Makeup & Personal Care",
    "en": "Vadakara Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Vadakara Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1710",
    "name": "സോളാർ - Vadakara Solar Rooftop & Inverter Power System",
    "en": "Vadakara Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Vadakara Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1711",
    "name": "Vadakara TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Vadakara TV, Computer & Home Appliance Repair",
    "ml": "Vadakara TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1712",
    "name": "Vadakara Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Vadakara Open Well Digging & Mud Deep Cleaning",
    "ml": "Vadakara Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1713",
    "name": "മേസൺ വർക്ക് - Vadakara Interlock Paver Block & Driveway Laying",
    "en": "Vadakara Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Vadakara Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1714",
    "name": "ക്ലീനിംഗ് - Vadakara Septic Tank Vacuum Suction & Waste Flush",
    "en": "Vadakara Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Vadakara Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1715",
    "name": "വെൽഡിങ് വർക്ക് - Vadakara Aluminium Glass Sliding & Cabin Partition",
    "en": "Vadakara Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Vadakara Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1716",
    "name": "വാഹന സർവീസ് - Vadakara Household Packing & Moving Shifting Assist",
    "en": "Vadakara Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Vadakara Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1717",
    "name": "Vadakara Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Vadakara Gas Stove & Commercial Burner Repair",
    "ml": "Vadakara Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1718",
    "name": "ക്ലീനിംഗ് - Vadakara Anti-Termite & Mosquito Pest Extermination",
    "en": "Vadakara Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Vadakara Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Vadakara Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1719",
    "name": "ഇലക്ട്രിക്കൽ - Koyilandy Electrician & Power Maintenance",
    "en": "Koyilandy Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Koyilandy Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1720",
    "name": "പ്ലംബിംഗ് - Koyilandy Emergency Plumbing & Water Solution",
    "en": "Koyilandy Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Koyilandy Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1721",
    "name": "Koyilandy AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Koyilandy AC Installation & Cool Care Service",
    "ml": "Koyilandy AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1722",
    "name": "തടിപ്പണി - Koyilandy Custom Carpentry & Furniture Restoring",
    "en": "Koyilandy Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Koyilandy Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1723",
    "name": "പെയിന്റിംഗ് - Koyilandy Weatherproof Wall Painting & Damp Proofing",
    "en": "Koyilandy Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Koyilandy Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1724",
    "name": "Koyilandy Civil Masonry & Concrete റിപ്പയർ",
    "en": "Koyilandy Civil Masonry & Concrete Repair",
    "ml": "Koyilandy Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1725",
    "name": "വെൽഡിങ് വർക്ക് - Koyilandy Truss Roofing & Structural Steel Fabrication",
    "en": "Koyilandy Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Koyilandy Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1726",
    "name": "വർക്ക്‌ഷോപ്പ് - Koyilandy On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Koyilandy On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Koyilandy On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1727",
    "name": "വാഹന സർവീസ് - Koyilandy Professional Driver & Taxi Ride Hire",
    "en": "Koyilandy Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Koyilandy Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1728",
    "name": "Koyilandy Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Koyilandy Home Deep Cleaning & Waste Management",
    "ml": "Koyilandy Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1729",
    "name": "Koyilandy തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Koyilandy Coconut Tree & Farm Care Service",
    "ml": "Koyilandy തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1730",
    "name": "കാറ്ററിംഗ് - Koyilandy Catering & Traditional Feast Cooking",
    "en": "Koyilandy Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Koyilandy Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1731",
    "name": "Koyilandy വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Koyilandy Wedding Photography & Drone Cinematography",
    "ml": "Koyilandy വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1732",
    "name": "ഇവന്റ്സ് - Koyilandy Stage Sound System & Light Decoration",
    "en": "Koyilandy Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Koyilandy Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1733",
    "name": "Koyilandy ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Koyilandy Home Nursing & Elderly Patient Attendant",
    "ml": "Koyilandy ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1734",
    "name": "Koyilandy Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Koyilandy Academic Home Tuition & Skill Training",
    "ml": "Koyilandy Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1735",
    "name": "Koyilandy CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Koyilandy CCTV Security Camera & Automation Setup",
    "ml": "Koyilandy CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1736",
    "name": "Koyilandy Designer Tailoring & Stitching സർവീസ്",
    "en": "Koyilandy Designer Tailoring & Stitching Service",
    "ml": "Koyilandy Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1737",
    "name": "ബ്യൂട്ടി കെയർ - Koyilandy Bridal Beauty Makeup & Personal Care",
    "en": "Koyilandy Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Koyilandy Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1738",
    "name": "സോളാർ - Koyilandy Solar Rooftop & Inverter Power System",
    "en": "Koyilandy Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Koyilandy Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1739",
    "name": "Koyilandy TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Koyilandy TV, Computer & Home Appliance Repair",
    "ml": "Koyilandy TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1740",
    "name": "Koyilandy Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Koyilandy Open Well Digging & Mud Deep Cleaning",
    "ml": "Koyilandy Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1741",
    "name": "മേസൺ വർക്ക് - Koyilandy Interlock Paver Block & Driveway Laying",
    "en": "Koyilandy Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Koyilandy Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1742",
    "name": "ക്ലീനിംഗ് - Koyilandy Septic Tank Vacuum Suction & Waste Flush",
    "en": "Koyilandy Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Koyilandy Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1743",
    "name": "വെൽഡിങ് വർക്ക് - Koyilandy Aluminium Glass Sliding & Cabin Partition",
    "en": "Koyilandy Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Koyilandy Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1744",
    "name": "വാഹന സർവീസ് - Koyilandy Household Packing & Moving Shifting Assist",
    "en": "Koyilandy Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Koyilandy Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1745",
    "name": "Koyilandy Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Koyilandy Gas Stove & Commercial Burner Repair",
    "ml": "Koyilandy Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1746",
    "name": "ക്ലീനിംഗ് - Koyilandy Anti-Termite & Mosquito Pest Extermination",
    "en": "Koyilandy Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Koyilandy Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Koyilandy Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1747",
    "name": "ഇലക്ട്രിക്കൽ - Payyanur Electrician & Power Maintenance",
    "en": "Payyanur Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Payyanur Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1748",
    "name": "പ്ലംബിംഗ് - Payyanur Emergency Plumbing & Water Solution",
    "en": "Payyanur Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Payyanur Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1749",
    "name": "Payyanur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Payyanur AC Installation & Cool Care Service",
    "ml": "Payyanur AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1750",
    "name": "തടിപ്പണി - Payyanur Custom Carpentry & Furniture Restoring",
    "en": "Payyanur Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Payyanur Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1751",
    "name": "പെയിന്റിംഗ് - Payyanur Weatherproof Wall Painting & Damp Proofing",
    "en": "Payyanur Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Payyanur Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1752",
    "name": "Payyanur Civil Masonry & Concrete റിപ്പയർ",
    "en": "Payyanur Civil Masonry & Concrete Repair",
    "ml": "Payyanur Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1753",
    "name": "വെൽഡിങ് വർക്ക് - Payyanur Truss Roofing & Structural Steel Fabrication",
    "en": "Payyanur Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Payyanur Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1754",
    "name": "വർക്ക്‌ഷോപ്പ് - Payyanur On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Payyanur On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Payyanur On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1755",
    "name": "വാഹന സർവീസ് - Payyanur Professional Driver & Taxi Ride Hire",
    "en": "Payyanur Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Payyanur Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1756",
    "name": "Payyanur Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Payyanur Home Deep Cleaning & Waste Management",
    "ml": "Payyanur Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1757",
    "name": "Payyanur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Payyanur Coconut Tree & Farm Care Service",
    "ml": "Payyanur തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1758",
    "name": "കാറ്ററിംഗ് - Payyanur Catering & Traditional Feast Cooking",
    "en": "Payyanur Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Payyanur Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1759",
    "name": "Payyanur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Payyanur Wedding Photography & Drone Cinematography",
    "ml": "Payyanur വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1760",
    "name": "ഇവന്റ്സ് - Payyanur Stage Sound System & Light Decoration",
    "en": "Payyanur Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Payyanur Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1761",
    "name": "Payyanur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Payyanur Home Nursing & Elderly Patient Attendant",
    "ml": "Payyanur ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1762",
    "name": "Payyanur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Payyanur Academic Home Tuition & Skill Training",
    "ml": "Payyanur Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1763",
    "name": "Payyanur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Payyanur CCTV Security Camera & Automation Setup",
    "ml": "Payyanur CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1764",
    "name": "Payyanur Designer Tailoring & Stitching സർവീസ്",
    "en": "Payyanur Designer Tailoring & Stitching Service",
    "ml": "Payyanur Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1765",
    "name": "ബ്യൂട്ടി കെയർ - Payyanur Bridal Beauty Makeup & Personal Care",
    "en": "Payyanur Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Payyanur Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1766",
    "name": "സോളാർ - Payyanur Solar Rooftop & Inverter Power System",
    "en": "Payyanur Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Payyanur Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1767",
    "name": "Payyanur TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Payyanur TV, Computer & Home Appliance Repair",
    "ml": "Payyanur TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1768",
    "name": "Payyanur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Payyanur Open Well Digging & Mud Deep Cleaning",
    "ml": "Payyanur Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1769",
    "name": "മേസൺ വർക്ക് - Payyanur Interlock Paver Block & Driveway Laying",
    "en": "Payyanur Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Payyanur Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1770",
    "name": "ക്ലീനിംഗ് - Payyanur Septic Tank Vacuum Suction & Waste Flush",
    "en": "Payyanur Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Payyanur Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1771",
    "name": "വെൽഡിങ് വർക്ക് - Payyanur Aluminium Glass Sliding & Cabin Partition",
    "en": "Payyanur Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Payyanur Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1772",
    "name": "വാഹന സർവീസ് - Payyanur Household Packing & Moving Shifting Assist",
    "en": "Payyanur Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Payyanur Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1773",
    "name": "Payyanur Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Payyanur Gas Stove & Commercial Burner Repair",
    "ml": "Payyanur Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1774",
    "name": "ക്ലീനിംഗ് - Payyanur Anti-Termite & Mosquito Pest Extermination",
    "en": "Payyanur Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Payyanur Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Payyanur Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1775",
    "name": "ഇലക്ട്രിക്കൽ - Taliparamba Electrician & Power Maintenance",
    "en": "Taliparamba Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Taliparamba Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1776",
    "name": "പ്ലംബിംഗ് - Taliparamba Emergency Plumbing & Water Solution",
    "en": "Taliparamba Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Taliparamba Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1777",
    "name": "Taliparamba AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Taliparamba AC Installation & Cool Care Service",
    "ml": "Taliparamba AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1778",
    "name": "തടിപ്പണി - Taliparamba Custom Carpentry & Furniture Restoring",
    "en": "Taliparamba Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Taliparamba Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1779",
    "name": "പെയിന്റിംഗ് - Taliparamba Weatherproof Wall Painting & Damp Proofing",
    "en": "Taliparamba Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Taliparamba Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1780",
    "name": "Taliparamba Civil Masonry & Concrete റിപ്പയർ",
    "en": "Taliparamba Civil Masonry & Concrete Repair",
    "ml": "Taliparamba Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1781",
    "name": "വെൽഡിങ് വർക്ക് - Taliparamba Truss Roofing & Structural Steel Fabrication",
    "en": "Taliparamba Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Taliparamba Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1782",
    "name": "വർക്ക്‌ഷോപ്പ് - Taliparamba On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Taliparamba On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Taliparamba On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1783",
    "name": "വാഹന സർവീസ് - Taliparamba Professional Driver & Taxi Ride Hire",
    "en": "Taliparamba Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Taliparamba Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1784",
    "name": "Taliparamba Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Taliparamba Home Deep Cleaning & Waste Management",
    "ml": "Taliparamba Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1785",
    "name": "Taliparamba തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Taliparamba Coconut Tree & Farm Care Service",
    "ml": "Taliparamba തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1786",
    "name": "കാറ്ററിംഗ് - Taliparamba Catering & Traditional Feast Cooking",
    "en": "Taliparamba Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Taliparamba Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1787",
    "name": "Taliparamba വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Taliparamba Wedding Photography & Drone Cinematography",
    "ml": "Taliparamba വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1788",
    "name": "ഇവന്റ്സ് - Taliparamba Stage Sound System & Light Decoration",
    "en": "Taliparamba Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Taliparamba Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1789",
    "name": "Taliparamba ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Taliparamba Home Nursing & Elderly Patient Attendant",
    "ml": "Taliparamba ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1790",
    "name": "Taliparamba Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Taliparamba Academic Home Tuition & Skill Training",
    "ml": "Taliparamba Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1791",
    "name": "Taliparamba CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Taliparamba CCTV Security Camera & Automation Setup",
    "ml": "Taliparamba CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1792",
    "name": "Taliparamba Designer Tailoring & Stitching സർവീസ്",
    "en": "Taliparamba Designer Tailoring & Stitching Service",
    "ml": "Taliparamba Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1793",
    "name": "ബ്യൂട്ടി കെയർ - Taliparamba Bridal Beauty Makeup & Personal Care",
    "en": "Taliparamba Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Taliparamba Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1794",
    "name": "സോളാർ - Taliparamba Solar Rooftop & Inverter Power System",
    "en": "Taliparamba Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Taliparamba Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1795",
    "name": "Taliparamba TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Taliparamba TV, Computer & Home Appliance Repair",
    "ml": "Taliparamba TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1796",
    "name": "Taliparamba Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Taliparamba Open Well Digging & Mud Deep Cleaning",
    "ml": "Taliparamba Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1797",
    "name": "മേസൺ വർക്ക് - Taliparamba Interlock Paver Block & Driveway Laying",
    "en": "Taliparamba Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Taliparamba Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1798",
    "name": "ക്ലീനിംഗ് - Taliparamba Septic Tank Vacuum Suction & Waste Flush",
    "en": "Taliparamba Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Taliparamba Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1799",
    "name": "വെൽഡിങ് വർക്ക് - Taliparamba Aluminium Glass Sliding & Cabin Partition",
    "en": "Taliparamba Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Taliparamba Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1800",
    "name": "വാഹന സർവീസ് - Taliparamba Household Packing & Moving Shifting Assist",
    "en": "Taliparamba Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Taliparamba Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1801",
    "name": "Taliparamba Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Taliparamba Gas Stove & Commercial Burner Repair",
    "ml": "Taliparamba Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1802",
    "name": "ക്ലീനിംഗ് - Taliparamba Anti-Termite & Mosquito Pest Extermination",
    "en": "Taliparamba Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Taliparamba Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Taliparamba Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1803",
    "name": "ഇലക്ട്രിക്കൽ - Thalassery Electrician & Power Maintenance",
    "en": "Thalassery Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Thalassery Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1804",
    "name": "പ്ലംബിംഗ് - Thalassery Emergency Plumbing & Water Solution",
    "en": "Thalassery Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Thalassery Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1805",
    "name": "Thalassery AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Thalassery AC Installation & Cool Care Service",
    "ml": "Thalassery AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1806",
    "name": "തടിപ്പണി - Thalassery Custom Carpentry & Furniture Restoring",
    "en": "Thalassery Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Thalassery Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1807",
    "name": "പെയിന്റിംഗ് - Thalassery Weatherproof Wall Painting & Damp Proofing",
    "en": "Thalassery Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Thalassery Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1808",
    "name": "Thalassery Civil Masonry & Concrete റിപ്പയർ",
    "en": "Thalassery Civil Masonry & Concrete Repair",
    "ml": "Thalassery Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1809",
    "name": "വെൽഡിങ് വർക്ക് - Thalassery Truss Roofing & Structural Steel Fabrication",
    "en": "Thalassery Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Thalassery Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1810",
    "name": "വർക്ക്‌ഷോപ്പ് - Thalassery On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Thalassery On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Thalassery On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1811",
    "name": "വാഹന സർവീസ് - Thalassery Professional Driver & Taxi Ride Hire",
    "en": "Thalassery Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Thalassery Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1812",
    "name": "Thalassery Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Thalassery Home Deep Cleaning & Waste Management",
    "ml": "Thalassery Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1813",
    "name": "Thalassery തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Thalassery Coconut Tree & Farm Care Service",
    "ml": "Thalassery തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1814",
    "name": "കാറ്ററിംഗ് - Thalassery Catering & Traditional Feast Cooking",
    "en": "Thalassery Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Thalassery Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1815",
    "name": "Thalassery വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Thalassery Wedding Photography & Drone Cinematography",
    "ml": "Thalassery വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1816",
    "name": "ഇവന്റ്സ് - Thalassery Stage Sound System & Light Decoration",
    "en": "Thalassery Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Thalassery Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1817",
    "name": "Thalassery ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Thalassery Home Nursing & Elderly Patient Attendant",
    "ml": "Thalassery ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1818",
    "name": "Thalassery Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Thalassery Academic Home Tuition & Skill Training",
    "ml": "Thalassery Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1819",
    "name": "Thalassery CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Thalassery CCTV Security Camera & Automation Setup",
    "ml": "Thalassery CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1820",
    "name": "Thalassery Designer Tailoring & Stitching സർവീസ്",
    "en": "Thalassery Designer Tailoring & Stitching Service",
    "ml": "Thalassery Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1821",
    "name": "ബ്യൂട്ടി കെയർ - Thalassery Bridal Beauty Makeup & Personal Care",
    "en": "Thalassery Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Thalassery Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1822",
    "name": "സോളാർ - Thalassery Solar Rooftop & Inverter Power System",
    "en": "Thalassery Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Thalassery Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1823",
    "name": "Thalassery TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Thalassery TV, Computer & Home Appliance Repair",
    "ml": "Thalassery TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1824",
    "name": "Thalassery Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Thalassery Open Well Digging & Mud Deep Cleaning",
    "ml": "Thalassery Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1825",
    "name": "മേസൺ വർക്ക് - Thalassery Interlock Paver Block & Driveway Laying",
    "en": "Thalassery Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Thalassery Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1826",
    "name": "ക്ലീനിംഗ് - Thalassery Septic Tank Vacuum Suction & Waste Flush",
    "en": "Thalassery Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Thalassery Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1827",
    "name": "വെൽഡിങ് വർക്ക് - Thalassery Aluminium Glass Sliding & Cabin Partition",
    "en": "Thalassery Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Thalassery Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1828",
    "name": "വാഹന സർവീസ് - Thalassery Household Packing & Moving Shifting Assist",
    "en": "Thalassery Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Thalassery Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1829",
    "name": "Thalassery Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Thalassery Gas Stove & Commercial Burner Repair",
    "ml": "Thalassery Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1830",
    "name": "ക്ലീനിംഗ് - Thalassery Anti-Termite & Mosquito Pest Extermination",
    "en": "Thalassery Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Thalassery Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Thalassery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1831",
    "name": "ഇലക്ട്രിക്കൽ - Kanhangad Electrician & Power Maintenance",
    "en": "Kanhangad Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kanhangad Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1832",
    "name": "പ്ലംബിംഗ് - Kanhangad Emergency Plumbing & Water Solution",
    "en": "Kanhangad Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kanhangad Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1833",
    "name": "Kanhangad AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kanhangad AC Installation & Cool Care Service",
    "ml": "Kanhangad AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1834",
    "name": "തടിപ്പണി - Kanhangad Custom Carpentry & Furniture Restoring",
    "en": "Kanhangad Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kanhangad Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1835",
    "name": "പെയിന്റിംഗ് - Kanhangad Weatherproof Wall Painting & Damp Proofing",
    "en": "Kanhangad Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kanhangad Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1836",
    "name": "Kanhangad Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kanhangad Civil Masonry & Concrete Repair",
    "ml": "Kanhangad Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1837",
    "name": "വെൽഡിങ് വർക്ക് - Kanhangad Truss Roofing & Structural Steel Fabrication",
    "en": "Kanhangad Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kanhangad Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1838",
    "name": "വർക്ക്‌ഷോപ്പ് - Kanhangad On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kanhangad On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kanhangad On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1839",
    "name": "വാഹന സർവീസ് - Kanhangad Professional Driver & Taxi Ride Hire",
    "en": "Kanhangad Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kanhangad Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1840",
    "name": "Kanhangad Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kanhangad Home Deep Cleaning & Waste Management",
    "ml": "Kanhangad Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1841",
    "name": "Kanhangad തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kanhangad Coconut Tree & Farm Care Service",
    "ml": "Kanhangad തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1842",
    "name": "കാറ്ററിംഗ് - Kanhangad Catering & Traditional Feast Cooking",
    "en": "Kanhangad Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kanhangad Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1843",
    "name": "Kanhangad വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kanhangad Wedding Photography & Drone Cinematography",
    "ml": "Kanhangad വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1844",
    "name": "ഇവന്റ്സ് - Kanhangad Stage Sound System & Light Decoration",
    "en": "Kanhangad Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kanhangad Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1845",
    "name": "Kanhangad ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kanhangad Home Nursing & Elderly Patient Attendant",
    "ml": "Kanhangad ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1846",
    "name": "Kanhangad Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kanhangad Academic Home Tuition & Skill Training",
    "ml": "Kanhangad Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1847",
    "name": "Kanhangad CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kanhangad CCTV Security Camera & Automation Setup",
    "ml": "Kanhangad CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1848",
    "name": "Kanhangad Designer Tailoring & Stitching സർവീസ്",
    "en": "Kanhangad Designer Tailoring & Stitching Service",
    "ml": "Kanhangad Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1849",
    "name": "ബ്യൂട്ടി കെയർ - Kanhangad Bridal Beauty Makeup & Personal Care",
    "en": "Kanhangad Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kanhangad Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1850",
    "name": "സോളാർ - Kanhangad Solar Rooftop & Inverter Power System",
    "en": "Kanhangad Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kanhangad Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1851",
    "name": "Kanhangad TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kanhangad TV, Computer & Home Appliance Repair",
    "ml": "Kanhangad TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1852",
    "name": "Kanhangad Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kanhangad Open Well Digging & Mud Deep Cleaning",
    "ml": "Kanhangad Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1853",
    "name": "മേസൺ വർക്ക് - Kanhangad Interlock Paver Block & Driveway Laying",
    "en": "Kanhangad Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kanhangad Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1854",
    "name": "ക്ലീനിംഗ് - Kanhangad Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kanhangad Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kanhangad Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1855",
    "name": "വെൽഡിങ് വർക്ക് - Kanhangad Aluminium Glass Sliding & Cabin Partition",
    "en": "Kanhangad Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kanhangad Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1856",
    "name": "വാഹന സർവീസ് - Kanhangad Household Packing & Moving Shifting Assist",
    "en": "Kanhangad Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kanhangad Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1857",
    "name": "Kanhangad Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kanhangad Gas Stove & Commercial Burner Repair",
    "ml": "Kanhangad Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1858",
    "name": "ക്ലീനിംഗ് - Kanhangad Anti-Termite & Mosquito Pest Extermination",
    "en": "Kanhangad Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kanhangad Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kanhangad Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1859",
    "name": "ഇലക്ട്രിക്കൽ - Kalpetta Electrician & Power Maintenance",
    "en": "Kalpetta Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kalpetta Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1860",
    "name": "പ്ലംബിംഗ് - Kalpetta Emergency Plumbing & Water Solution",
    "en": "Kalpetta Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kalpetta Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1861",
    "name": "Kalpetta AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kalpetta AC Installation & Cool Care Service",
    "ml": "Kalpetta AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1862",
    "name": "തടിപ്പണി - Kalpetta Custom Carpentry & Furniture Restoring",
    "en": "Kalpetta Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kalpetta Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1863",
    "name": "പെയിന്റിംഗ് - Kalpetta Weatherproof Wall Painting & Damp Proofing",
    "en": "Kalpetta Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kalpetta Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1864",
    "name": "Kalpetta Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kalpetta Civil Masonry & Concrete Repair",
    "ml": "Kalpetta Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1865",
    "name": "വെൽഡിങ് വർക്ക് - Kalpetta Truss Roofing & Structural Steel Fabrication",
    "en": "Kalpetta Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kalpetta Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1866",
    "name": "വർക്ക്‌ഷോപ്പ് - Kalpetta On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kalpetta On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kalpetta On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1867",
    "name": "വാഹന സർവീസ് - Kalpetta Professional Driver & Taxi Ride Hire",
    "en": "Kalpetta Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kalpetta Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1868",
    "name": "Kalpetta Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kalpetta Home Deep Cleaning & Waste Management",
    "ml": "Kalpetta Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1869",
    "name": "Kalpetta തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kalpetta Coconut Tree & Farm Care Service",
    "ml": "Kalpetta തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1870",
    "name": "കാറ്ററിംഗ് - Kalpetta Catering & Traditional Feast Cooking",
    "en": "Kalpetta Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kalpetta Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1871",
    "name": "Kalpetta വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kalpetta Wedding Photography & Drone Cinematography",
    "ml": "Kalpetta വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1872",
    "name": "ഇവന്റ്സ് - Kalpetta Stage Sound System & Light Decoration",
    "en": "Kalpetta Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kalpetta Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1873",
    "name": "Kalpetta ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kalpetta Home Nursing & Elderly Patient Attendant",
    "ml": "Kalpetta ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1874",
    "name": "Kalpetta Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kalpetta Academic Home Tuition & Skill Training",
    "ml": "Kalpetta Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1875",
    "name": "Kalpetta CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kalpetta CCTV Security Camera & Automation Setup",
    "ml": "Kalpetta CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1876",
    "name": "Kalpetta Designer Tailoring & Stitching സർവീസ്",
    "en": "Kalpetta Designer Tailoring & Stitching Service",
    "ml": "Kalpetta Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1877",
    "name": "ബ്യൂട്ടി കെയർ - Kalpetta Bridal Beauty Makeup & Personal Care",
    "en": "Kalpetta Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kalpetta Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1878",
    "name": "സോളാർ - Kalpetta Solar Rooftop & Inverter Power System",
    "en": "Kalpetta Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kalpetta Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1879",
    "name": "Kalpetta TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kalpetta TV, Computer & Home Appliance Repair",
    "ml": "Kalpetta TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1880",
    "name": "Kalpetta Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kalpetta Open Well Digging & Mud Deep Cleaning",
    "ml": "Kalpetta Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1881",
    "name": "മേസൺ വർക്ക് - Kalpetta Interlock Paver Block & Driveway Laying",
    "en": "Kalpetta Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kalpetta Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1882",
    "name": "ക്ലീനിംഗ് - Kalpetta Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kalpetta Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kalpetta Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1883",
    "name": "വെൽഡിങ് വർക്ക് - Kalpetta Aluminium Glass Sliding & Cabin Partition",
    "en": "Kalpetta Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Kalpetta Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1884",
    "name": "വാഹന സർവീസ് - Kalpetta Household Packing & Moving Shifting Assist",
    "en": "Kalpetta Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Kalpetta Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1885",
    "name": "Kalpetta Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Kalpetta Gas Stove & Commercial Burner Repair",
    "ml": "Kalpetta Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1886",
    "name": "ക്ലീനിംഗ് - Kalpetta Anti-Termite & Mosquito Pest Extermination",
    "en": "Kalpetta Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Kalpetta Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Kalpetta Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1887",
    "name": "ഇലക്ട്രിക്കൽ - Sulthan Bathery Electrician & Power Maintenance",
    "en": "Sulthan Bathery Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Sulthan Bathery Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1888",
    "name": "പ്ലംബിംഗ് - Sulthan Bathery Emergency Plumbing & Water Solution",
    "en": "Sulthan Bathery Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Sulthan Bathery Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1889",
    "name": "Sulthan Bathery AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Sulthan Bathery AC Installation & Cool Care Service",
    "ml": "Sulthan Bathery AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1890",
    "name": "തടിപ്പണി - Sulthan Bathery Custom Carpentry & Furniture Restoring",
    "en": "Sulthan Bathery Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Sulthan Bathery Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1891",
    "name": "പെയിന്റിംഗ് - Sulthan Bathery Weatherproof Wall Painting & Damp Proofing",
    "en": "Sulthan Bathery Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Sulthan Bathery Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1892",
    "name": "Sulthan Bathery Civil Masonry & Concrete റിപ്പയർ",
    "en": "Sulthan Bathery Civil Masonry & Concrete Repair",
    "ml": "Sulthan Bathery Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1893",
    "name": "വെൽഡിങ് വർക്ക് - Sulthan Bathery Truss Roofing & Structural Steel Fabrication",
    "en": "Sulthan Bathery Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Sulthan Bathery Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1894",
    "name": "വർക്ക്‌ഷോപ്പ് - Sulthan Bathery On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Sulthan Bathery On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Sulthan Bathery On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1895",
    "name": "വാഹന സർവീസ് - Sulthan Bathery Professional Driver & Taxi Ride Hire",
    "en": "Sulthan Bathery Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Sulthan Bathery Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1896",
    "name": "Sulthan Bathery Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Sulthan Bathery Home Deep Cleaning & Waste Management",
    "ml": "Sulthan Bathery Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1897",
    "name": "Sulthan Bathery തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Sulthan Bathery Coconut Tree & Farm Care Service",
    "ml": "Sulthan Bathery തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1898",
    "name": "കാറ്ററിംഗ് - Sulthan Bathery Catering & Traditional Feast Cooking",
    "en": "Sulthan Bathery Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Sulthan Bathery Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1899",
    "name": "Sulthan Bathery വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Sulthan Bathery Wedding Photography & Drone Cinematography",
    "ml": "Sulthan Bathery വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1900",
    "name": "ഇവന്റ്സ് - Sulthan Bathery Stage Sound System & Light Decoration",
    "en": "Sulthan Bathery Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Sulthan Bathery Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1901",
    "name": "Sulthan Bathery ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Sulthan Bathery Home Nursing & Elderly Patient Attendant",
    "ml": "Sulthan Bathery ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1902",
    "name": "Sulthan Bathery Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Sulthan Bathery Academic Home Tuition & Skill Training",
    "ml": "Sulthan Bathery Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1903",
    "name": "Sulthan Bathery CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Sulthan Bathery CCTV Security Camera & Automation Setup",
    "ml": "Sulthan Bathery CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1904",
    "name": "Sulthan Bathery Designer Tailoring & Stitching സർവീസ്",
    "en": "Sulthan Bathery Designer Tailoring & Stitching Service",
    "ml": "Sulthan Bathery Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1905",
    "name": "ബ്യൂട്ടി കെയർ - Sulthan Bathery Bridal Beauty Makeup & Personal Care",
    "en": "Sulthan Bathery Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Sulthan Bathery Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1906",
    "name": "സോളാർ - Sulthan Bathery Solar Rooftop & Inverter Power System",
    "en": "Sulthan Bathery Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Sulthan Bathery Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1907",
    "name": "Sulthan Bathery TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Sulthan Bathery TV, Computer & Home Appliance Repair",
    "ml": "Sulthan Bathery TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1908",
    "name": "Sulthan Bathery Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Sulthan Bathery Open Well Digging & Mud Deep Cleaning",
    "ml": "Sulthan Bathery Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1909",
    "name": "മേസൺ വർക്ക് - Sulthan Bathery Interlock Paver Block & Driveway Laying",
    "en": "Sulthan Bathery Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Sulthan Bathery Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1910",
    "name": "ക്ലീനിംഗ് - Sulthan Bathery Septic Tank Vacuum Suction & Waste Flush",
    "en": "Sulthan Bathery Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Sulthan Bathery Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1911",
    "name": "വെൽഡിങ് വർക്ക് - Sulthan Bathery Aluminium Glass Sliding & Cabin Partition",
    "en": "Sulthan Bathery Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Sulthan Bathery Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1912",
    "name": "വാഹന സർവീസ് - Sulthan Bathery Household Packing & Moving Shifting Assist",
    "en": "Sulthan Bathery Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Sulthan Bathery Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1913",
    "name": "Sulthan Bathery Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Sulthan Bathery Gas Stove & Commercial Burner Repair",
    "ml": "Sulthan Bathery Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1914",
    "name": "ക്ലീനിംഗ് - Sulthan Bathery Anti-Termite & Mosquito Pest Extermination",
    "en": "Sulthan Bathery Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Sulthan Bathery Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Sulthan Bathery Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1915",
    "name": "ഇലക്ട്രിക്കൽ - Thodupuzha Electrician & Power Maintenance",
    "en": "Thodupuzha Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Thodupuzha Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1916",
    "name": "പ്ലംബിംഗ് - Thodupuzha Emergency Plumbing & Water Solution",
    "en": "Thodupuzha Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Thodupuzha Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1917",
    "name": "Thodupuzha AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Thodupuzha AC Installation & Cool Care Service",
    "ml": "Thodupuzha AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1918",
    "name": "തടിപ്പണി - Thodupuzha Custom Carpentry & Furniture Restoring",
    "en": "Thodupuzha Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Thodupuzha Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1919",
    "name": "പെയിന്റിംഗ് - Thodupuzha Weatherproof Wall Painting & Damp Proofing",
    "en": "Thodupuzha Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Thodupuzha Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1920",
    "name": "Thodupuzha Civil Masonry & Concrete റിപ്പയർ",
    "en": "Thodupuzha Civil Masonry & Concrete Repair",
    "ml": "Thodupuzha Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1921",
    "name": "വെൽഡിങ് വർക്ക് - Thodupuzha Truss Roofing & Structural Steel Fabrication",
    "en": "Thodupuzha Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Thodupuzha Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1922",
    "name": "വർക്ക്‌ഷോപ്പ് - Thodupuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Thodupuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Thodupuzha On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1923",
    "name": "വാഹന സർവീസ് - Thodupuzha Professional Driver & Taxi Ride Hire",
    "en": "Thodupuzha Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Thodupuzha Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1924",
    "name": "Thodupuzha Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Thodupuzha Home Deep Cleaning & Waste Management",
    "ml": "Thodupuzha Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1925",
    "name": "Thodupuzha തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Thodupuzha Coconut Tree & Farm Care Service",
    "ml": "Thodupuzha തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1926",
    "name": "കാറ്ററിംഗ് - Thodupuzha Catering & Traditional Feast Cooking",
    "en": "Thodupuzha Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Thodupuzha Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1927",
    "name": "Thodupuzha വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Thodupuzha Wedding Photography & Drone Cinematography",
    "ml": "Thodupuzha വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1928",
    "name": "ഇവന്റ്സ് - Thodupuzha Stage Sound System & Light Decoration",
    "en": "Thodupuzha Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Thodupuzha Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1929",
    "name": "Thodupuzha ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Thodupuzha Home Nursing & Elderly Patient Attendant",
    "ml": "Thodupuzha ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1930",
    "name": "Thodupuzha Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Thodupuzha Academic Home Tuition & Skill Training",
    "ml": "Thodupuzha Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1931",
    "name": "Thodupuzha CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Thodupuzha CCTV Security Camera & Automation Setup",
    "ml": "Thodupuzha CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1932",
    "name": "Thodupuzha Designer Tailoring & Stitching സർവീസ്",
    "en": "Thodupuzha Designer Tailoring & Stitching Service",
    "ml": "Thodupuzha Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1933",
    "name": "ബ്യൂട്ടി കെയർ - Thodupuzha Bridal Beauty Makeup & Personal Care",
    "en": "Thodupuzha Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Thodupuzha Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1934",
    "name": "സോളാർ - Thodupuzha Solar Rooftop & Inverter Power System",
    "en": "Thodupuzha Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Thodupuzha Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1935",
    "name": "Thodupuzha TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Thodupuzha TV, Computer & Home Appliance Repair",
    "ml": "Thodupuzha TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1936",
    "name": "Thodupuzha Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Thodupuzha Open Well Digging & Mud Deep Cleaning",
    "ml": "Thodupuzha Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1937",
    "name": "മേസൺ വർക്ക് - Thodupuzha Interlock Paver Block & Driveway Laying",
    "en": "Thodupuzha Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Thodupuzha Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1938",
    "name": "ക്ലീനിംഗ് - Thodupuzha Septic Tank Vacuum Suction & Waste Flush",
    "en": "Thodupuzha Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Thodupuzha Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1939",
    "name": "വെൽഡിങ് വർക്ക് - Thodupuzha Aluminium Glass Sliding & Cabin Partition",
    "en": "Thodupuzha Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Thodupuzha Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1940",
    "name": "വാഹന സർവീസ് - Thodupuzha Household Packing & Moving Shifting Assist",
    "en": "Thodupuzha Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Thodupuzha Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1941",
    "name": "Thodupuzha Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Thodupuzha Gas Stove & Commercial Burner Repair",
    "ml": "Thodupuzha Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1942",
    "name": "ക്ലീനിംഗ് - Thodupuzha Anti-Termite & Mosquito Pest Extermination",
    "en": "Thodupuzha Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Thodupuzha Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Thodupuzha Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1943",
    "name": "ഇലക്ട്രിക്കൽ - Pala Electrician & Power Maintenance",
    "en": "Pala Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Pala Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1944",
    "name": "പ്ലംബിംഗ് - Pala Emergency Plumbing & Water Solution",
    "en": "Pala Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Pala Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1945",
    "name": "Pala AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Pala AC Installation & Cool Care Service",
    "ml": "Pala AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1946",
    "name": "തടിപ്പണി - Pala Custom Carpentry & Furniture Restoring",
    "en": "Pala Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Pala Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1947",
    "name": "പെയിന്റിംഗ് - Pala Weatherproof Wall Painting & Damp Proofing",
    "en": "Pala Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Pala Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1948",
    "name": "Pala Civil Masonry & Concrete റിപ്പയർ",
    "en": "Pala Civil Masonry & Concrete Repair",
    "ml": "Pala Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1949",
    "name": "വെൽഡിങ് വർക്ക് - Pala Truss Roofing & Structural Steel Fabrication",
    "en": "Pala Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Pala Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1950",
    "name": "വർക്ക്‌ഷോപ്പ് - Pala On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Pala On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Pala On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1951",
    "name": "വാഹന സർവീസ് - Pala Professional Driver & Taxi Ride Hire",
    "en": "Pala Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Pala Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1952",
    "name": "Pala Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Pala Home Deep Cleaning & Waste Management",
    "ml": "Pala Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1953",
    "name": "Pala തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Pala Coconut Tree & Farm Care Service",
    "ml": "Pala തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1954",
    "name": "കാറ്ററിംഗ് - Pala Catering & Traditional Feast Cooking",
    "en": "Pala Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Pala Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1955",
    "name": "Pala വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Pala Wedding Photography & Drone Cinematography",
    "ml": "Pala വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1956",
    "name": "ഇവന്റ്സ് - Pala Stage Sound System & Light Decoration",
    "en": "Pala Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Pala Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1957",
    "name": "Pala ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Pala Home Nursing & Elderly Patient Attendant",
    "ml": "Pala ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1958",
    "name": "Pala Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Pala Academic Home Tuition & Skill Training",
    "ml": "Pala Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1959",
    "name": "Pala CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Pala CCTV Security Camera & Automation Setup",
    "ml": "Pala CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1960",
    "name": "Pala Designer Tailoring & Stitching സർവീസ്",
    "en": "Pala Designer Tailoring & Stitching Service",
    "ml": "Pala Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1961",
    "name": "ബ്യൂട്ടി കെയർ - Pala Bridal Beauty Makeup & Personal Care",
    "en": "Pala Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Pala Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1962",
    "name": "സോളാർ - Pala Solar Rooftop & Inverter Power System",
    "en": "Pala Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Pala Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1963",
    "name": "Pala TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Pala TV, Computer & Home Appliance Repair",
    "ml": "Pala TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1964",
    "name": "Pala Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Pala Open Well Digging & Mud Deep Cleaning",
    "ml": "Pala Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1965",
    "name": "മേസൺ വർക്ക് - Pala Interlock Paver Block & Driveway Laying",
    "en": "Pala Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Pala Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1966",
    "name": "ക്ലീനിംഗ് - Pala Septic Tank Vacuum Suction & Waste Flush",
    "en": "Pala Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Pala Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1967",
    "name": "വെൽഡിങ് വർക്ക് - Pala Aluminium Glass Sliding & Cabin Partition",
    "en": "Pala Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Pala Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1968",
    "name": "വാഹന സർവീസ് - Pala Household Packing & Moving Shifting Assist",
    "en": "Pala Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Pala Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1969",
    "name": "Pala Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Pala Gas Stove & Commercial Burner Repair",
    "ml": "Pala Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1970",
    "name": "ക്ലീനിംഗ് - Pala Anti-Termite & Mosquito Pest Extermination",
    "en": "Pala Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Pala Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Pala Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1971",
    "name": "ഇലക്ട്രിക്കൽ - Vaikom Electrician & Power Maintenance",
    "en": "Vaikom Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Vaikom Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1972",
    "name": "പ്ലംബിംഗ് - Vaikom Emergency Plumbing & Water Solution",
    "en": "Vaikom Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Vaikom Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1973",
    "name": "Vaikom AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Vaikom AC Installation & Cool Care Service",
    "ml": "Vaikom AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1974",
    "name": "തടിപ്പണി - Vaikom Custom Carpentry & Furniture Restoring",
    "en": "Vaikom Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Vaikom Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1975",
    "name": "പെയിന്റിംഗ് - Vaikom Weatherproof Wall Painting & Damp Proofing",
    "en": "Vaikom Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Vaikom Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1976",
    "name": "Vaikom Civil Masonry & Concrete റിപ്പയർ",
    "en": "Vaikom Civil Masonry & Concrete Repair",
    "ml": "Vaikom Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1977",
    "name": "വെൽഡിങ് വർക്ക് - Vaikom Truss Roofing & Structural Steel Fabrication",
    "en": "Vaikom Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Vaikom Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1978",
    "name": "വർക്ക്‌ഷോപ്പ് - Vaikom On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Vaikom On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Vaikom On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1979",
    "name": "വാഹന സർവീസ് - Vaikom Professional Driver & Taxi Ride Hire",
    "en": "Vaikom Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Vaikom Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1980",
    "name": "Vaikom Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Vaikom Home Deep Cleaning & Waste Management",
    "ml": "Vaikom Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1981",
    "name": "Vaikom തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Vaikom Coconut Tree & Farm Care Service",
    "ml": "Vaikom തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1982",
    "name": "കാറ്ററിംഗ് - Vaikom Catering & Traditional Feast Cooking",
    "en": "Vaikom Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Vaikom Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1983",
    "name": "Vaikom വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Vaikom Wedding Photography & Drone Cinematography",
    "ml": "Vaikom വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1984",
    "name": "ഇവന്റ്സ് - Vaikom Stage Sound System & Light Decoration",
    "en": "Vaikom Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Vaikom Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1985",
    "name": "Vaikom ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Vaikom Home Nursing & Elderly Patient Attendant",
    "ml": "Vaikom ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1986",
    "name": "Vaikom Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Vaikom Academic Home Tuition & Skill Training",
    "ml": "Vaikom Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1987",
    "name": "Vaikom CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Vaikom CCTV Security Camera & Automation Setup",
    "ml": "Vaikom CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1988",
    "name": "Vaikom Designer Tailoring & Stitching സർവീസ്",
    "en": "Vaikom Designer Tailoring & Stitching Service",
    "ml": "Vaikom Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1989",
    "name": "ബ്യൂട്ടി കെയർ - Vaikom Bridal Beauty Makeup & Personal Care",
    "en": "Vaikom Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Vaikom Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1990",
    "name": "സോളാർ - Vaikom Solar Rooftop & Inverter Power System",
    "en": "Vaikom Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Vaikom Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1991",
    "name": "Vaikom TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Vaikom TV, Computer & Home Appliance Repair",
    "ml": "Vaikom TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1992",
    "name": "Vaikom Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Vaikom Open Well Digging & Mud Deep Cleaning",
    "ml": "Vaikom Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1993",
    "name": "മേസൺ വർക്ക് - Vaikom Interlock Paver Block & Driveway Laying",
    "en": "Vaikom Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Vaikom Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1994",
    "name": "ക്ലീനിംഗ് - Vaikom Septic Tank Vacuum Suction & Waste Flush",
    "en": "Vaikom Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Vaikom Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1995",
    "name": "വെൽഡിങ് വർക്ക് - Vaikom Aluminium Glass Sliding & Cabin Partition",
    "en": "Vaikom Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Vaikom Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1996",
    "name": "വാഹന സർവീസ് - Vaikom Household Packing & Moving Shifting Assist",
    "en": "Vaikom Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Vaikom Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1997",
    "name": "Vaikom Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Vaikom Gas Stove & Commercial Burner Repair",
    "ml": "Vaikom Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1998",
    "name": "ക്ലീനിംഗ് - Vaikom Anti-Termite & Mosquito Pest Extermination",
    "en": "Vaikom Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Vaikom Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Vaikom Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_1999",
    "name": "ഇലക്ട്രിക്കൽ - Ettumanoor Electrician & Power Maintenance",
    "en": "Ettumanoor Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Ettumanoor Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2000",
    "name": "പ്ലംബിംഗ് - Ettumanoor Emergency Plumbing & Water Solution",
    "en": "Ettumanoor Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Ettumanoor Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2001",
    "name": "Ettumanoor AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Ettumanoor AC Installation & Cool Care Service",
    "ml": "Ettumanoor AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2002",
    "name": "തടിപ്പണി - Ettumanoor Custom Carpentry & Furniture Restoring",
    "en": "Ettumanoor Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Ettumanoor Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2003",
    "name": "പെയിന്റിംഗ് - Ettumanoor Weatherproof Wall Painting & Damp Proofing",
    "en": "Ettumanoor Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Ettumanoor Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2004",
    "name": "Ettumanoor Civil Masonry & Concrete റിപ്പയർ",
    "en": "Ettumanoor Civil Masonry & Concrete Repair",
    "ml": "Ettumanoor Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2005",
    "name": "വെൽഡിങ് വർക്ക് - Ettumanoor Truss Roofing & Structural Steel Fabrication",
    "en": "Ettumanoor Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Ettumanoor Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2006",
    "name": "വർക്ക്‌ഷോപ്പ് - Ettumanoor On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Ettumanoor On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Ettumanoor On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2007",
    "name": "വാഹന സർവീസ് - Ettumanoor Professional Driver & Taxi Ride Hire",
    "en": "Ettumanoor Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Ettumanoor Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2008",
    "name": "Ettumanoor Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Ettumanoor Home Deep Cleaning & Waste Management",
    "ml": "Ettumanoor Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2009",
    "name": "Ettumanoor തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Ettumanoor Coconut Tree & Farm Care Service",
    "ml": "Ettumanoor തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2010",
    "name": "കാറ്ററിംഗ് - Ettumanoor Catering & Traditional Feast Cooking",
    "en": "Ettumanoor Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Ettumanoor Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2011",
    "name": "Ettumanoor വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Ettumanoor Wedding Photography & Drone Cinematography",
    "ml": "Ettumanoor വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2012",
    "name": "ഇവന്റ്സ് - Ettumanoor Stage Sound System & Light Decoration",
    "en": "Ettumanoor Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Ettumanoor Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2013",
    "name": "Ettumanoor ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Ettumanoor Home Nursing & Elderly Patient Attendant",
    "ml": "Ettumanoor ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2014",
    "name": "Ettumanoor Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Ettumanoor Academic Home Tuition & Skill Training",
    "ml": "Ettumanoor Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2015",
    "name": "Ettumanoor CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Ettumanoor CCTV Security Camera & Automation Setup",
    "ml": "Ettumanoor CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2016",
    "name": "Ettumanoor Designer Tailoring & Stitching സർവീസ്",
    "en": "Ettumanoor Designer Tailoring & Stitching Service",
    "ml": "Ettumanoor Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2017",
    "name": "ബ്യൂട്ടി കെയർ - Ettumanoor Bridal Beauty Makeup & Personal Care",
    "en": "Ettumanoor Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Ettumanoor Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2018",
    "name": "സോളാർ - Ettumanoor Solar Rooftop & Inverter Power System",
    "en": "Ettumanoor Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Ettumanoor Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2019",
    "name": "Ettumanoor TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Ettumanoor TV, Computer & Home Appliance Repair",
    "ml": "Ettumanoor TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2020",
    "name": "Ettumanoor Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Ettumanoor Open Well Digging & Mud Deep Cleaning",
    "ml": "Ettumanoor Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2021",
    "name": "മേസൺ വർക്ക് - Ettumanoor Interlock Paver Block & Driveway Laying",
    "en": "Ettumanoor Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Ettumanoor Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2022",
    "name": "ക്ലീനിംഗ് - Ettumanoor Septic Tank Vacuum Suction & Waste Flush",
    "en": "Ettumanoor Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Ettumanoor Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2023",
    "name": "വെൽഡിങ് വർക്ക് - Ettumanoor Aluminium Glass Sliding & Cabin Partition",
    "en": "Ettumanoor Aluminium Glass Sliding & Cabin Partition",
    "ml": "വെൽഡിങ് വർക്ക് - Ettumanoor Aluminium Glass Sliding & Cabin Partition",
    "icon": "🪟",
    "category": "welding",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2024",
    "name": "വാഹന സർവീസ് - Ettumanoor Household Packing & Moving Shifting Assist",
    "en": "Ettumanoor Household Packing & Moving Shifting Assist",
    "ml": "വാഹന സർവീസ് - Ettumanoor Household Packing & Moving Shifting Assist",
    "icon": "📦",
    "category": "vehicles",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2025",
    "name": "Ettumanoor Gas Stove & Commercial Burner റിപ്പയർ",
    "en": "Ettumanoor Gas Stove & Commercial Burner Repair",
    "ml": "Ettumanoor Gas Stove & Commercial Burner റിപ്പയർ",
    "icon": "🍳",
    "category": "mechanic",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2026",
    "name": "ക്ലീനിംഗ് - Ettumanoor Anti-Termite & Mosquito Pest Extermination",
    "en": "Ettumanoor Anti-Termite & Mosquito Pest Extermination",
    "ml": "ക്ലീനിംഗ് - Ettumanoor Anti-Termite & Mosquito Pest Extermination",
    "icon": "🐜",
    "category": "cleaning",
    "specs": [
      "Ettumanoor Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2027",
    "name": "ഇലക്ട്രിക്കൽ - Kanjirappally Electrician & Power Maintenance",
    "en": "Kanjirappally Electrician & Power Maintenance",
    "ml": "ഇലക്ട്രിക്കൽ - Kanjirappally Electrician & Power Maintenance",
    "icon": "⚡",
    "category": "electrician",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2028",
    "name": "പ്ലംബിംഗ് - Kanjirappally Emergency Plumbing & Water Solution",
    "en": "Kanjirappally Emergency Plumbing & Water Solution",
    "ml": "പ്ലംബിംഗ് - Kanjirappally Emergency Plumbing & Water Solution",
    "icon": "🚰",
    "category": "plumber",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2029",
    "name": "Kanjirappally AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "en": "Kanjirappally AC Installation & Cool Care Service",
    "ml": "Kanjirappally AC ഫിറ്റിംഗ് & Cool Care സർവീസ്",
    "icon": "❄️",
    "category": "acrepair",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2030",
    "name": "തടിപ്പണി - Kanjirappally Custom Carpentry & Furniture Restoring",
    "en": "Kanjirappally Custom Carpentry & Furniture Restoring",
    "ml": "തടിപ്പണി - Kanjirappally Custom Carpentry & Furniture Restoring",
    "icon": "🪚",
    "category": "carpenter",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2031",
    "name": "പെയിന്റിംഗ് - Kanjirappally Weatherproof Wall Painting & Damp Proofing",
    "en": "Kanjirappally Weatherproof Wall Painting & Damp Proofing",
    "ml": "പെയിന്റിംഗ് - Kanjirappally Weatherproof Wall Painting & Damp Proofing",
    "icon": "🎨",
    "category": "painter",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2032",
    "name": "Kanjirappally Civil Masonry & Concrete റിപ്പയർ",
    "en": "Kanjirappally Civil Masonry & Concrete Repair",
    "ml": "Kanjirappally Civil Masonry & Concrete റിപ്പയർ",
    "icon": "🧱",
    "category": "mason",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2033",
    "name": "വെൽഡിങ് വർക്ക് - Kanjirappally Truss Roofing & Structural Steel Fabrication",
    "en": "Kanjirappally Truss Roofing & Structural Steel Fabrication",
    "ml": "വെൽഡിങ് വർക്ക് - Kanjirappally Truss Roofing & Structural Steel Fabrication",
    "icon": "🔥",
    "category": "welding",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2034",
    "name": "വർക്ക്‌ഷോപ്പ് - Kanjirappally On-Call Auto Mechanic & Car Breakdown Assist",
    "en": "Kanjirappally On-Call Auto Mechanic & Car Breakdown Assist",
    "ml": "വർക്ക്‌ഷോപ്പ് - Kanjirappally On-Call Auto Mechanic & Car Breakdown Assist",
    "icon": "🔧",
    "category": "mechanic",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2035",
    "name": "വാഹന സർവീസ് - Kanjirappally Professional Driver & Taxi Ride Hire",
    "en": "Kanjirappally Professional Driver & Taxi Ride Hire",
    "ml": "വാഹന സർവീസ് - Kanjirappally Professional Driver & Taxi Ride Hire",
    "icon": "🚗",
    "category": "vehicles",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2036",
    "name": "Kanjirappally Home Deep ക്ലീനിംഗ് & Waste Management",
    "en": "Kanjirappally Home Deep Cleaning & Waste Management",
    "ml": "Kanjirappally Home Deep ക്ലീനിംഗ് & Waste Management",
    "icon": "🧹",
    "category": "cleaning",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2037",
    "name": "Kanjirappally തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "en": "Kanjirappally Coconut Tree & Farm Care Service",
    "ml": "Kanjirappally തെങ്ങ് കയറ്റം & Farm Care സർവീസ്",
    "icon": "🌴",
    "category": "gardening",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2038",
    "name": "കാറ്ററിംഗ് - Kanjirappally Catering & Traditional Feast Cooking",
    "en": "Kanjirappally Catering & Traditional Feast Cooking",
    "ml": "കാറ്ററിംഗ് - Kanjirappally Catering & Traditional Feast Cooking",
    "icon": "🍲",
    "category": "catering",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2039",
    "name": "Kanjirappally വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "en": "Kanjirappally Wedding Photography & Drone Cinematography",
    "ml": "Kanjirappally വിവാഹ ഫോട്ടോഗ്രാഫി & Drone Cinematography",
    "icon": "📷",
    "category": "photography",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2040",
    "name": "ഇവന്റ്സ് - Kanjirappally Stage Sound System & Light Decoration",
    "en": "Kanjirappally Stage Sound System & Light Decoration",
    "ml": "ഇവന്റ്സ് - Kanjirappally Stage Sound System & Light Decoration",
    "icon": "🔊",
    "category": "events",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2041",
    "name": "Kanjirappally ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "en": "Kanjirappally Home Nursing & Elderly Patient Attendant",
    "ml": "Kanjirappally ഹോം നഴ്സിംഗ് പരിചരണം & Elderly Patient Attendant",
    "icon": "🩺",
    "category": "nursing",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2042",
    "name": "Kanjirappally Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "en": "Kanjirappally Academic Home Tuition & Skill Training",
    "ml": "Kanjirappally Academic Home ട്യൂഷൻ ക്ലാസുകൾ & Skill Training",
    "icon": "📚",
    "category": "tuition",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2043",
    "name": "Kanjirappally CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "en": "Kanjirappally CCTV Security Camera & Automation Setup",
    "ml": "Kanjirappally CCTV സെക്യൂരിറ്റി ക്യാമറ & Automation സെറ്റപ്പ്",
    "icon": "📹",
    "category": "cctv",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2044",
    "name": "Kanjirappally Designer Tailoring & Stitching സർവീസ്",
    "en": "Kanjirappally Designer Tailoring & Stitching Service",
    "ml": "Kanjirappally Designer Tailoring & Stitching സർവീസ്",
    "icon": "🧵",
    "category": "tailoring",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2045",
    "name": "ബ്യൂട്ടി കെയർ - Kanjirappally Bridal Beauty Makeup & Personal Care",
    "en": "Kanjirappally Bridal Beauty Makeup & Personal Care",
    "ml": "ബ്യൂട്ടി കെയർ - Kanjirappally Bridal Beauty Makeup & Personal Care",
    "icon": "💄",
    "category": "beautician",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2046",
    "name": "സോളാർ - Kanjirappally Solar Rooftop & Inverter Power System",
    "en": "Kanjirappally Solar Rooftop & Inverter Power System",
    "ml": "സോളാർ - Kanjirappally Solar Rooftop & Inverter Power System",
    "icon": "☀️",
    "category": "solar",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2047",
    "name": "Kanjirappally TV, Computer & Home Appliance റിപ്പയർ",
    "en": "Kanjirappally TV, Computer & Home Appliance Repair",
    "ml": "Kanjirappally TV, Computer & Home Appliance റിപ്പയർ",
    "icon": "📺",
    "category": "electronics",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2048",
    "name": "Kanjirappally Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "en": "Kanjirappally Open Well Digging & Mud Deep Cleaning",
    "ml": "Kanjirappally Open Well Digging & Mud Deep ക്ലീനിംഗ്",
    "icon": "🪣",
    "category": "plumber",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2049",
    "name": "മേസൺ വർക്ക് - Kanjirappally Interlock Paver Block & Driveway Laying",
    "en": "Kanjirappally Interlock Paver Block & Driveway Laying",
    "ml": "മേസൺ വർക്ക് - Kanjirappally Interlock Paver Block & Driveway Laying",
    "icon": "📐",
    "category": "mason",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  },
  {
    "id": "tr_2050",
    "name": "ക്ലീനിംഗ് - Kanjirappally Septic Tank Vacuum Suction & Waste Flush",
    "en": "Kanjirappally Septic Tank Vacuum Suction & Waste Flush",
    "ml": "ക്ലീനിംഗ് - Kanjirappally Septic Tank Vacuum Suction & Waste Flush",
    "icon": "🚛",
    "category": "cleaning",
    "specs": [
      "Kanjirappally Local Area Coverage",
      "Direct In-App Contact & Chat",
      "Experienced Verified Providers",
      "Fast On-Site Response"
    ]
  }
];

  // Initialize display name based on current language
  catalog.forEach(t => {
    t.name = isEn ? (t.en || t.name) : (t.ml || t.name);
  });

  if (typeof window !== 'undefined') {
    window.TRADES_CATALOG_500 = catalog;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = catalog;
  }
})();
