/**
 * NER Landslide Early Warning & Risk Monitoring System
 * Smart India Hackathon 2026 - MDoNER
 * Frontend Lead: Hanif Ahmed Mazumder
 */
const API_BASE_URL = "http://localhost:5000/api";

// ================= LOCATION DATA REGISTRY (10 NER SITES) =================
const NER_LOCATIONS = {
  aizawl: {
    id: "aizawl",
    name: "Aizawl, Mizoram",
    state: "Mizoram",
    coords: [23.7271, 92.7176],
    radarX: 54,
    radarY: 78,
    riskScore: 84,
    level: "Severe",
    soilMoisture: 88,
    aiConfidence: 81,
    rainfallLast7Days: [12, 16, 20, 24, 27, 30, 34],
    threshold: 22,
    weather: {
      temp: "21°C",
      condition: "Heavy Monsoonal Rain",
      humidity: "94%",
      wind: "18 km/h SW"
    },
    activeAlert: "Rainfall crossed 160mm in 24h — prediction model flags 81% landslide probability. Field advisory issued.",
    timeAgo: "6 min ago",
    incidentHistory: [
      { date: "14 Jul 2025", severity: "Severe", outcome: "32 families evacuated, NH-54 blocked for 18 hours" },
      { date: "19 May 2024", severity: "High", outcome: "Debris flow near Bawngkawn, prompt clearance by SDRF" }
    ],
    rainfall30Days: [
      8, 10, 12, 14, 15, 14, 16, 18, 19, 17, 16, 15, 14, 15, 16, 17, 19, 21, 23, 26, 28, 30, 31, 32, 31, 30, 29, 31, 33, 36
    ]
  },
  shillong: {
    id: "shillong",
    name: "Shillong, Meghalaya",
    state: "Meghalaya",
    coords: [25.5788, 91.8933],
    radarX: 34,
    radarY: 58,
    riskScore: 68,
    level: "High",
    soilMoisture: 78,
    aiConfidence: 74,
    rainfallLast7Days: [10, 14, 16, 19, 23, 26, 28],
    threshold: 22,
    weather: {
      temp: "18°C",
      condition: "Continuous Heavy Showers",
      humidity: "91%",
      wind: "14 km/h S"
    },
    activeAlert: "Soil saturation at 78% after sustained rainfall through the last 6 hours.",
    timeAgo: "24 min ago",
    incidentHistory: [
      { date: "02 Jun 2025", severity: "High", outcome: "Minor road damage near Barapani, no casualties reported" },
      { date: "12 Aug 2024", severity: "Moderate", outcome: "Localized slope slippage along Shillong bypass" }
    ],
    rainfall30Days: [
      6, 8, 9, 11, 13, 14, 15, 14, 16, 15, 14, 13, 15, 16, 18, 19, 20, 22, 23, 24, 25, 27, 28, 29, 28, 27, 26, 27, 28, 29
    ]
  },
  gangtok: {
    id: "gangtok",
    name: "Gangtok, Sikkim",
    state: "Sikkim",
    coords: [27.3389, 88.6065],
    radarX: 12,
    radarY: 28,
    riskScore: 62,
    level: "High",
    soilMoisture: 72,
    aiConfidence: 69,
    rainfallLast7Days: [9, 11, 13, 17, 21, 24, 25],
    threshold: 22,
    weather: {
      temp: "15°C",
      condition: "Thick Fog & Drizzle",
      humidity: "89%",
      wind: "10 km/h W"
    },
    activeAlert: "Rainfall trend rising steadily — risk upgraded from Moderate to High.",
    timeAgo: "52 min ago",
    incidentHistory: [
      { date: "11 Jul 2024", severity: "Severe", outcome: "Tourist route closed for 3 days, 2 minor injuries" },
      { date: "04 Sep 2023", severity: "High", outcome: "North Sikkim highway blocked at Chungthang" }
    ],
    rainfall30Days: [
      5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 14, 15, 17, 18, 19, 21, 22, 23, 24, 25, 26, 25, 24, 23, 24, 25, 26
    ]
  },
  kohima: {
    id: "kohima",
    name: "Kohima, Nagaland",
    state: "Nagaland",
    coords: [25.6751, 94.1086],
    radarX: 78,
    radarY: 48,
    riskScore: 46,
    level: "Moderate",
    soilMoisture: 64,
    aiConfidence: 58,
    rainfallLast7Days: [7, 8, 10, 12, 14, 16, 18],
    threshold: 22,
    weather: {
      temp: "19°C",
      condition: "Overcast with Light Showers",
      humidity: "84%",
      wind: "12 km/h NE"
    },
    activeAlert: "Slope moisture sensors near NH-2 reporting elevated readings.",
    timeAgo: "1 hr 10 min ago",
    incidentHistory: [
      { date: "28 Aug 2024", severity: "Moderate", outcome: "Localized slope slippage, kept under monitoring" }
    ],
    rainfall30Days: [
      4, 5, 7, 8, 9, 10, 10, 11, 12, 11, 10, 9, 11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 19, 18, 17, 16, 17, 18, 19, 20
    ]
  },
  itanagar: {
    id: "itanagar",
    name: "Itanagar, Arunachal Pradesh",
    state: "Arunachal Pradesh",
    coords: [27.0844, 93.6053],
    radarX: 74,
    radarY: 22,
    riskScore: 38,
    level: "Moderate",
    soilMoisture: 55,
    aiConfidence: 45,
    rainfallLast7Days: [5, 7, 8, 10, 12, 14, 15],
    threshold: 22,
    weather: {
      temp: "22°C",
      condition: "Intermittent Rain",
      humidity: "82%",
      wind: "9 km/h N"
    },
    activeAlert: "Moderate slope movement recorded in Papum Pare district.",
    timeAgo: "2 hrs ago",
    incidentHistory: [
      { date: "15 Jun 2024", severity: "Moderate", outcome: "Culvert overflow, road traffic restored within 4 hours" }
    ],
    rainfall30Days: [
      3, 4, 6, 7, 8, 8, 9, 10, 11, 10, 9, 8, 9, 10, 11, 12, 13, 13, 14, 15, 15, 16, 16, 15, 14, 13, 14, 15, 15, 16
    ]
  },
  imphal: {
    id: "imphal",
    name: "Imphal, Manipur",
    state: "Manipur",
    coords: [24.8170, 93.9368],
    radarX: 70,
    radarY: 66,
    riskScore: 42,
    level: "Moderate",
    soilMoisture: 59,
    aiConfidence: 51,
    rainfallLast7Days: [6, 7, 9, 11, 13, 14, 16],
    threshold: 22,
    weather: {
      temp: "23°C",
      condition: "Scattered Showers",
      humidity: "80%",
      wind: "11 km/h S"
    },
    activeAlert: "Drainage runoff monitoring active along foothill sectors.",
    timeAgo: "3 hrs ago",
    incidentHistory: [
      { date: "09 Jul 2024", severity: "Moderate", outcome: "NH-37 Imphal-Jiribam road temporary mudslide cleared" }
    ],
    rainfall30Days: [
      4, 5, 5, 7, 8, 9, 10, 10, 11, 12, 11, 10, 9, 10, 11, 12, 13, 14, 14, 15, 16, 16, 17, 16, 15, 14, 15, 16, 17, 18
    ]
  },
  guwahati: {
    id: "guwahati",
    name: "Guwahati, Assam",
    state: "Assam",
    coords: [26.1445, 91.7362],
    radarX: 42,
    radarY: 44,
    riskScore: 28,
    level: "Moderate",
    soilMoisture: 48,
    aiConfidence: 35,
    rainfallLast7Days: [4, 5, 7, 8, 9, 11, 12],
    threshold: 22,
    weather: {
      temp: "27°C",
      condition: "Humid & Cloudy",
      humidity: "78%",
      wind: "8 km/h E"
    },
    activeAlert: "Hills periphery (Kamakhya & Narakasur) under routine surveillance.",
    timeAgo: "4 hrs ago",
    incidentHistory: [
      { date: "18 Jun 2024", severity: "Moderate", outcome: "Retaining wall breach in Noonmati, repaired by GMC" }
    ],
    rainfall30Days: [
      3, 4, 4, 5, 6, 7, 8, 8, 9, 9, 8, 7, 8, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 12, 11, 10, 11, 11, 12, 13
    ]
  },
  silchar: {
    id: "silchar",
    name: "Silchar, Assam",
    state: "Assam",
    coords: [24.8333, 92.7789],
    radarX: 45,
    radarY: 68,
    riskScore: 32,
    level: "Moderate",
    soilMoisture: 52,
    aiConfidence: 40,
    rainfallLast7Days: [5, 6, 8, 9, 11, 12, 14],
    threshold: 22,
    weather: {
      temp: "26°C",
      condition: "Passing Showers",
      humidity: "82%",
      wind: "10 km/h SW"
    },
    activeAlert: "Barak valley sub-station telemetry parameters stable.",
    timeAgo: "5 hrs ago",
    incidentHistory: [
      { date: "22 May 2024", severity: "Moderate", outcome: "Cachar-Dima Hasao road monitored for embankment slips" }
    ],
    rainfall30Days: [
      3, 3, 4, 5, 6, 7, 8, 8, 9, 9, 8, 7, 8, 9, 10, 11, 11, 12, 13, 13, 14, 14, 15, 14, 13, 12, 13, 14, 14, 15
    ]
  },
  agartala: {
    id: "agartala",
    name: "Agartala, Tripura",
    state: "Tripura",
    coords: [23.8315, 91.2868],
    radarX: 28,
    radarY: 74,
    riskScore: 20,
    level: "Low",
    soilMoisture: 38,
    aiConfidence: 22,
    rainfallLast7Days: [3, 4, 4, 5, 6, 7, 8],
    threshold: 22,
    weather: {
      temp: "28°C",
      condition: "Partly Cloudy",
      humidity: "72%",
      wind: "11 km/h SE"
    },
    activeAlert: "All geotechnical slope parameters within normal safety margins.",
    timeAgo: "6 hrs ago",
    incidentHistory: [
      { date: "10 Aug 2023", severity: "Low", outcome: "Routine minor drain clearance, normal traffic flow" }
    ],
    rainfall30Days: [
      2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 5, 4, 5, 5, 6, 7, 7, 8, 8, 8, 9, 9, 8, 8, 7, 6, 7, 7, 8, 8
    ]
  },
  dibrugarh: {
    id: "dibrugarh",
    name: "Dibrugarh, Assam",
    state: "Assam",
    coords: [27.4728, 94.9120],
    radarX: 88,
    radarY: 18,
    riskScore: 18,
    level: "Low",
    soilMoisture: 34,
    aiConfidence: 19,
    rainfallLast7Days: [2, 3, 4, 4, 5, 6, 7],
    threshold: 22,
    weather: {
      temp: "26°C",
      condition: "Clear Sky with Breeze",
      humidity: "69%",
      wind: "13 km/h NE"
    },
    activeAlert: "Normal conditions across upper Brahmaputra riverbanks.",
    timeAgo: "7 hrs ago",
    incidentHistory: [
      { date: "05 Jul 2023", severity: "Low", outcome: "Erosion embankment audit completed by Water Resources Dept" }
    ],
    rainfall30Days: [
      2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 5, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 7, 6, 5, 6, 6, 7, 7
    ]
  }
};

function normalizeLocation(location) {
    return {
        id: String(location.id),

        name: location.state
            ? `${location.name}, ${location.state}`
            : location.name,

        state: location.state || "",

        coords: [
            Number(location.latitude),
            Number(location.longitude)
        ],

        // Existing frontend fields.
        // Keep defaults for now because those values
        // are not coming from the locations API yet.
        radarX: 50,
        radarY: 50,

        riskScore: 0,
        level: "Low",

        soilMoisture: 0,
        aiConfidence: 0,

        rainfallLast7Days: [],

        threshold: 0,

        weather: {
            temp: "--",
            condition: "No data",
            humidity: "--",
            wind: "--"
        },

        activeAlert: null,
        timeAgo: "",

        incidentHistory: [],
        rainfall30Days: []
    };
}

async function fetchLocationsFromBackend() {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const locations = await response.json();

        console.log("Locations from backend:", locations);

        const normalizedLocations = locations.map(normalizeLocation);

        console.log(
            "Normalized locations:",
            normalizedLocations
        );

        return normalizedLocations;

    } catch (error) {
        console.error("Failed to fetch locations:", error);

        return [];
    }
}

function addBackendLocationsToMap(locations) {
    if (!currentState.leafletMapInstance) {
        console.warn("Leaflet map is not initialized yet.");
        return;
    }

    locations.forEach((location) => {
        const [lat, lng] = location.coords;

        const marker = L.marker([lat, lng])
            .addTo(currentState.leafletMapInstance)
            .bindPopup(`
                <strong>${location.name}</strong><br>
                State: ${location.state}<br>
                Latitude: ${lat}<br>
                Longitude: ${lng}
            `);

        currentState.leafletMarkers[`backend_${location.id}`] = marker;
    });
}

// ================= APP STATE =================
let currentState = {
  activeLocationId: "aizawl",
  activeTab: "overview",
  isAuthorityView: false,
  isOfflineSimulated: false,
  mapMode: "radar", // "radar" or "gis"
  leafletMapInstance: null,
  leafletMarkers: {},
  soundMuted: false
};

// ================= AUDIO ALERT SYNTHESIZER (WEB AUDIO API) =================
function playAlertSiren() {
  if (currentState.soundMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Dual-tone high-tech chime (880Hz -> 1174Hz)
    const playTone = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(880, now, 0.18);
    playTone(1174, now + 0.22, 0.28);
  } catch (e) {
    console.warn("Audio Context init suspended until user interaction.", e);
  }
}

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", async() => {

  initClock();

  setupEventListeners();

  const backendLocations = await fetchLocationsFromBackend();

  window.backendLocations = backendLocations;

  console.log("Backend locations loaded:", backendLocations);

  console.log(
    "Backend locations count:",
    window.backendLocations.length
  );

  renderRadarMapPins();

  renderActiveAlertsList();

  renderHistoryDropdown();

  selectLocation("aizawl");

});

// ================= CLOCK =================
function initClock() {
  const clockEl = document.getElementById("liveClock");
  function update() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, "0");
    if (clockEl) {
      clockEl.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm} IST`;
    }
  }
  update();
  setInterval(update, 1000);
}

// ================= EVENT LISTENERS =================
function setupEventListeners() {
  // Tabs
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabTarget = btn.getAttribute("data-tab");
      switchTab(tabTarget);
    });
  });

  // Public / Authority Toggle
  document.getElementById("btnPublicView").addEventListener("click", () => setViewMode(false));
  document.getElementById("btnAuthorityView").addEventListener("click", () => setViewMode(true));

  // Map Mode Toggle (Radar vs GIS)
  const btnRadar = document.getElementById("btnRadarMap");
  const btnGis = document.getElementById("btnGisMap");
  if (btnRadar && btnGis) {
    btnRadar.addEventListener("click", () => setMapMode("radar"));
    btnGis.addEventListener("click", () => setMapMode("gis"));
  }

  // Simulation controls
  document.getElementById("btnSimulateOffline").addEventListener("click", toggleSimulateOffline);
  document.getElementById("btnSimulateRain").addEventListener("click", triggerCloudburstSimulation);
  document.getElementById("btnResetSim").addEventListener("click", resetSimulations);

  // Sound toggle
  const soundBtn = document.getElementById("btnToggleSound");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      currentState.soundMuted = !currentState.soundMuted;
      soundBtn.innerHTML = currentState.soundMuted ? "🔇 Muted" : "🔊 Sound ON";
    });
  }

  // Historical location dropdown
  const histSelect = document.getElementById("historyLocationSelect");
  if (histSelect) {
    histSelect.addEventListener("change", (e) => {
      updateHistoricalView(e.target.value);
    });
  }

  // Authority quick action triggers
  const dispatchBtn = document.getElementById("btnTriggerNDRF");
  if (dispatchBtn) {
    dispatchBtn.addEventListener("click", () => {
      alert("🚨 PRIORITY DIRECTIVE ISSUED:\nSDRF & District Disaster Management Authorities alerted for " + NER_LOCATIONS[currentState.activeLocationId].name + ".\nAutomated SMS broadcast queue mobilized.");
    });
  }

  const exportBtn = document.getElementById("btnExportReport");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportSituationReport);
  }
}

// ================= TAB NAVIGATION =================
function switchTab(tabId) {
  currentState.activeTab = tabId;

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === `tab-${tabId}`);
  });

  if (tabId === "historical") {
    updateHistoricalView(currentState.activeLocationId);
  }

  if (tabId === "overview" && currentState.mapMode === "gis" && currentState.leafletMapInstance) {
    setTimeout(() => {
      currentState.leafletMapInstance.invalidateSize();
    }, 200);
  }
}

// ================= VIEW TOGGLE (PUBLIC VS AUTHORITY) =================
function setViewMode(isAuthority) {
  currentState.isAuthorityView = isAuthority;
  document.getElementById("btnPublicView").classList.toggle("active", !isAuthority);
  document.getElementById("btnAuthorityView").classList.toggle("active", isAuthority);

  const authorityBoxes = document.querySelectorAll(".authority-box");
  authorityBoxes.forEach(b => b.classList.toggle("visible", isAuthority));

  const publicBox = document.getElementById("publicAdvisoryBox");
  if (publicBox) {
    publicBox.style.display = isAuthority ? "none" : "block";
  }
}

// ================= LOCATION SELECTION =================
function selectLocation(locId) {
  if (!NER_LOCATIONS[locId]) return;
  currentState.activeLocationId = locId;
  const loc = NER_LOCATIONS[locId];

  // Update Highlight on radar pins
  document.querySelectorAll(".map-pin").forEach(pin => {
    pin.classList.toggle("active", pin.getAttribute("data-id") === locId);
  });

  // Update Leaflet map marker if GIS active
  if (currentState.leafletMapInstance && currentState.leafletMarkers[locId]) {
    currentState.leafletMapInstance.flyTo(loc.coords, 8.5, { duration: 1.2 });
    currentState.leafletMarkers[locId].openPopup();
  }

  // Update Weather Card
  document.getElementById("weatherLocationName").textContent = loc.name;
  document.getElementById("weatherConditionText").textContent = loc.weather.condition;
  document.getElementById("weatherTempText").textContent = loc.weather.temp;
  document.getElementById("weatherHumidityText").textContent = "💧 " + loc.weather.humidity;
  document.getElementById("weatherWindText").textContent = "💨 " + loc.weather.wind;

  // Update Gauge Card Header
  document.getElementById("gaugeLocationTitle").textContent = `Risk — ${loc.name.split(",")[0]}`;
  updateRiskGauge(loc.riskScore, loc.level);

  // Update Submetrics
  document.getElementById("soilMetricText").textContent = `${loc.soilMoisture}%`;
  document.getElementById("aiMetricText").textContent = `${loc.aiConfidence}%`;

  // Update 7-Day Rainfall Chart
  document.getElementById("chartLocationSubtitle").textContent = `${loc.name} · mm accumulated per day`;
  render7DayRainfallChart(loc.rainfallLast7Days, loc.threshold);

  // Update Alert Protocol active banner
  const protoBanner = document.getElementById("activeProtocolText");
  if (protoBanner) {
    let levelName = loc.riskScore >= 76 ? "Level 3 — Emergency" : (loc.riskScore >= 51 ? "Level 2 — Warning" : "Level 1 — Advisory");
    protoBanner.textContent = `Currently active: ${levelName} for ${loc.name}`;
  }

  // Update History dropdown selection if visible
  const histSelect = document.getElementById("historyLocationSelect");
  if (histSelect && histSelect.value !== locId) {
    histSelect.value = locId;
  }
}

// ================= SVG SPEEDOMETER GAUGE =================
function updateRiskGauge(score, level) {
  const scoreEl = document.getElementById("gaugeScoreHuge");
  const levelEl = document.getElementById("gaugeLevelLabel");
  const needleEl = document.getElementById("gaugeNeedlePath");

  // Needle angle: 0 score = -90deg, 100 score = +90deg
  const clampedScore = Math.max(0, Math.min(100, score));
  const angle = (clampedScore / 100) * 180 - 90;

  if (needleEl) {
    needleEl.style.transform = `rotate(${angle}deg)`;
  }

  if (scoreEl) {
    scoreEl.textContent = clampedScore;
    scoreEl.className = "gauge-score-huge " + level.toLowerCase();
  }

  if (levelEl) {
    levelEl.textContent = level;
    levelEl.className = "gauge-level-label " + level.toLowerCase();
  }
}

// ================= 7-DAY RAINFALL TREND CHART (SVG) =================
function render7DayRainfallChart(data, threshold) {
  const svg = document.getElementById("rainfall7DaySvg");
  if (!svg) return;

  const width = 460;
  const height = 150;
  const paddingLeft = 36;
  const paddingRight = 16;
  const paddingTop = 20;
  const paddingBottom = 30;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(40, ...data, threshold + 8);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];

  const getX = (index) => paddingLeft + (index / (data.length - 1)) * plotWidth;
  const getY = (val) => paddingTop + plotHeight - (val / maxVal) * plotHeight;

  // Build points
  let pointsStr = "";
  let areaPointsStr = `${paddingLeft},${paddingTop + plotHeight} `;

  data.forEach((val, i) => {
    const x = getX(i);
    const y = getY(val);
    pointsStr += `${x},${y} `;
    areaPointsStr += `${x},${y} `;
  });

  areaPointsStr += `${getX(data.length - 1)},${paddingTop + plotHeight}`;

  const threshY = getY(threshold);

  let html = `
    <defs>
      <linearGradient id="rainAreaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#15803d" stop-opacity="0.32" />
        <stop offset="100%" stop-color="#15803d" stop-opacity="0.02" />
      </linearGradient>
    </defs>

    <!-- Grid lines -->
    <line x1="${paddingLeft}" y1="${paddingTop}" x2="${width - paddingRight}" y2="${paddingTop}" stroke="#e2e8f0" stroke-width="1" />
    <line x1="${paddingLeft}" y1="${getY(20)}" x2="${width - paddingRight}" y2="${getY(20)}" stroke="#e2e8f0" stroke-width="1" />
    <line x1="${paddingLeft}" y1="${paddingTop + plotHeight}" x2="${width - paddingRight}" y2="${paddingTop + plotHeight}" stroke="#cbd5e1" stroke-width="1" />

    <!-- Y Axis Labels -->
    <text x="${paddingLeft - 6}" y="${paddingTop + 4}" font-size="10" fill="#94a3b8" text-anchor="end">${Math.round(maxVal)}</text>
    <text x="${paddingLeft - 6}" y="${getY(20) + 3}" font-size="10" fill="#94a3b8" text-anchor="end">20</text>
    <text x="${paddingLeft - 6}" y="${paddingTop + plotHeight + 3}" font-size="10" fill="#94a3b8" text-anchor="end">0</text>

    <!-- Area polygon -->
    <polygon points="${areaPointsStr}" fill="url(#rainAreaGradient)" />

    <!-- Threshold dashed line -->
    <line x1="${paddingLeft}" y1="${threshY}" x2="${width - paddingRight}" y2="${threshY}" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 4" />
    <text x="${width - paddingRight - 4}" y="${threshY - 5}" font-size="10" font-weight="700" fill="#dc2626" text-anchor="end">threshold (${threshold}mm)</text>

    <!-- Trend line -->
    <polyline fill="none" stroke="#166534" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${pointsStr}" />
  `;

  // Circles & X labels
  data.forEach((val, i) => {
    const x = getX(i);
    const y = getY(val);
    const isOver = val >= threshold;

    html += `
      <circle cx="${x}" cy="${y}" r="${isOver ? 4.5 : 3.5}" fill="${isOver ? '#dc2626' : '#15803d'}" stroke="#ffffff" stroke-width="1.5" />
      <text x="${x}" y="${paddingTop + plotHeight + 18}" font-size="10" fill="#64748b" text-anchor="middle" font-weight="500">${days[i]}</text>
    `;
  });

  svg.innerHTML = html;
}

// ================= RADAR MAP PINS =================
function renderRadarMapPins() {
  const container = document.getElementById("radarPinsContainer");
  if (!container) return;

  container.innerHTML = "";

  Object.values(NER_LOCATIONS).forEach(loc => {
    const pin = document.createElement("div");
    pin.className = `map-pin ${loc.id === currentState.activeLocationId ? "active" : ""}`;
    pin.setAttribute("data-id", loc.id);
    pin.style.left = `${loc.radarX}%`;
    pin.style.top = `${loc.radarY}%`;

    const cityShort = loc.name.split(",")[0];

    pin.innerHTML = `
      <div class="pin-pill">${cityShort}</div>
      <div class="pin-dot ${loc.level.toLowerCase()}"></div>
    `;

    pin.addEventListener("click", () => {
      selectLocation(loc.id);
    });

    container.appendChild(pin);
  });
}

// ================= ACTIVE ALERTS LIST =================
function renderActiveAlertsList() {
  const container = document.getElementById("activeAlertsList");
  if (!container) return;

  container.innerHTML = "";

  // Sort by priority (Severe > High > Moderate > Low)
  const priorityMap = { Severe: 4, High: 3, Moderate: 2, Low: 1 };
  const sorted = Object.values(NER_LOCATIONS).sort((a, b) => priorityMap[b.level] - priorityMap[a.level]);

  sorted.slice(0, 5).forEach(loc => {
    const card = document.createElement("div");
    card.className = `alert-card-item ${loc.level.toLowerCase()}`;
    card.setAttribute("data-id", loc.id);

    card.innerHTML = `
      <div class="alert-card-top">
        <span class="alert-location-name">${loc.name}</span>
        <span class="alert-timeago">${loc.timeAgo}</span>
      </div>
      <div class="alert-description-text">${loc.activeAlert}</div>
    `;

    card.addEventListener("click", () => {
      selectLocation(loc.id);
      window.scrollTo({ top: 120, behavior: "smooth" });
    });

    container.appendChild(card);
  });
}

// ================= HISTORICAL TRENDS =================
function renderHistoryDropdown() {
  const select = document.getElementById("historyLocationSelect");
  if (!select) return;

  select.innerHTML = "";
  Object.values(NER_LOCATIONS).forEach(loc => {
    const opt = document.createElement("option");
    opt.value = loc.id;
    opt.textContent = loc.name;
    select.appendChild(opt);
  });
}

function updateHistoricalView(locId) {
  const loc = NER_LOCATIONS[locId] || NER_LOCATIONS.aizawl;

  // Title
  document.getElementById("historicalChartTitle").textContent = `30-Day Cumulative Rainfall Trend — ${loc.name}`;

  // Render 30-day bar chart
  render30DayBarChart(loc.rainfall30Days, loc.threshold);

  // Render Incidents Table
  const tableBody = document.getElementById("incidentsTableBody");
  if (tableBody) {
    tableBody.innerHTML = "";

    // Combine current location and other regional incidents
    const allIncidents = [
      ...loc.incidentHistory.map(item => ({ ...item, location: loc.name })),
      { date: "11 Jul 2024", location: "Gangtok, Sikkim", severity: "Severe", outcome: "Tourist route closed for 3 days, 2 minor injuries" },
      { date: "28 Aug 2024", location: "Kohima, Nagaland", severity: "Moderate", outcome: "Localized slope slippage, kept under monitoring" },
      { date: "02 Jun 2025", location: "Shillong, Meghalaya", severity: "High", outcome: "Minor road damage, no casualties reported" }
    ];

    // Remove duplicates
    const unique = [];
    const seen = new Set();
    allIncidents.forEach(inc => {
      const key = `${inc.date}-${inc.location}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(inc);
      }
    });

    unique.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="font-weight:600">${item.date}</td>
        <td>${item.location}</td>
        <td><span class="badge-tag ${item.severity.toLowerCase()}">${item.severity}</span></td>
        <td style="color:#475569">${item.outcome}</td>
      `;
      tableBody.appendChild(tr);
    });
  }
}

function render30DayBarChart(data, threshold) {
  const svg = document.getElementById("rainfall30DaySvg");
  if (!svg) return;

  const width = 880;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 16;
  const paddingTop = 20;
  const paddingBottom = 30;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;
  const maxVal = Math.max(45, ...data);

  const barWidth = Math.floor((plotWidth / data.length) * 0.7);
  const gap = plotWidth / data.length;

  let html = `
    <!-- Grid -->
    <line x1="${paddingLeft}" y1="${paddingTop}" x2="${width - paddingRight}" y2="${paddingTop}" stroke="#f1f5f9" />
    <line x1="${paddingLeft}" y1="${paddingTop + plotHeight * 0.5}" x2="${width - paddingRight}" y2="${paddingTop + plotHeight * 0.5}" stroke="#f1f5f9" />
    <line x1="${paddingLeft}" y1="${paddingTop + plotHeight}" x2="${width - paddingRight}" y2="${paddingTop + plotHeight}" stroke="#cbd5e1" />

    <!-- Labels -->
    <text x="${paddingLeft - 8}" y="${paddingTop + 4}" font-size="10" fill="#94a3b8" text-anchor="end">${maxVal}mm</text>
    <text x="${paddingLeft - 8}" y="${paddingTop + plotHeight}" font-size="10" fill="#94a3b8" text-anchor="end">0mm</text>
  `;

  // Draw threshold line
  const threshY = paddingTop + plotHeight - (threshold / maxVal) * plotHeight;
  html += `
    <line x1="${paddingLeft}" y1="${threshY}" x2="${width - paddingRight}" y2="${threshY}" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 3" />
    <text x="${width - paddingRight}" y="${threshY - 4}" font-size="10" fill="#dc2626" text-anchor="end" font-weight="700">Safety Threshold (${threshold}mm)</text>
  `;

  data.forEach((val, i) => {
    const x = paddingLeft + i * gap + (gap - barWidth) / 2;
    const barHeight = (val / maxVal) * plotHeight;
    const y = paddingTop + plotHeight - barHeight;
    const isCritical = val >= threshold;

    html += `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="3" fill="${isCritical ? '#166534' : '#34d399'}" />
    `;

    // Show day text every 5 days
    if ((i + 1) % 5 === 0 || i === 0) {
      html += `
        <text x="${x + barWidth / 2}" y="${paddingTop + plotHeight + 16}" font-size="9" fill="#64748b" text-anchor="middle">${i + 1}</text>
      `;
    }
  });

  svg.innerHTML = html;
}

// ================= DUAL MAP TOGGLE (RADAR VS LEAFLET GIS) =================
function setMapMode(mode) {
  currentState.mapMode = mode;

  const btnRadar = document.getElementById("btnRadarMap");
  const btnGis = document.getElementById("btnGisMap");
  const radarWrapper = document.getElementById("radarMapWrapper");
  const leafletWrapper = document.getElementById("leafletMapContainer");

  if (mode === "radar") {
    btnRadar.classList.add("active");
    btnGis.classList.remove("active");
    radarWrapper.style.display = "block";
    leafletWrapper.style.display = "none";
  } else {
    btnRadar.classList.remove("active");
    btnGis.classList.add("active");
    radarWrapper.style.display = "none";
    leafletWrapper.style.display = "block";

    initLeafletGISMap();
  }
}

function initLeafletGISMap() {
  if (currentState.leafletMapInstance) {
    currentState.leafletMapInstance.invalidateSize();
    return;
  }

  if (typeof L === "undefined") {
    console.warn("Leaflet library not loaded yet.");
    return;
  }

  const map = L.map("leafletMapContainer").setView([25.8, 92.8], 7);
  currentState.leafletMapInstance = map;

  // OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "© OpenStreetMap contributors | MDoNER Landslide Grid"
  }).addTo(map);


  // ==========================================
  // EXISTING FRONTEND LOCATIONS
  // ==========================================

  Object.values(NER_LOCATIONS).forEach(loc => {

    const colorMap = {
      Severe: "#ef4444",
      High: "#f97316",
      Moderate: "#f59e0b",
      Low: "#10b981"
    };

    const markerColor = colorMap[loc.level] || "#10b981";

    const customIcon = L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div style="
          background:${markerColor};
          width:16px;
          height:16px;
          border-radius:50%;
          border:2.5px solid #fff;
          box-shadow:0 2px 6px rgba(0,0,0,0.4);
        "></div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const marker = L.marker(loc.coords, {
      icon: customIcon
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-family:sans-serif; padding:4px;">
        <strong style="font-size:13px">${loc.name}</strong><br/>
        <span style="font-size:11px; color:#64748b">
          Risk Score:
          <strong>${loc.riskScore}/100 (${loc.level})</strong>
        </span><br/>
        <span style="font-size:11px; color:#166534">
          Soil Saturation: ${loc.soilMoisture}%
        </span>
      </div>
    `);

    marker.on("click", () => {
      selectLocation(loc.id);
    });

    currentState.leafletMarkers[loc.id] = marker;
  });


  // ==========================================
  // BACKEND LOCATIONS
  // ==========================================

  if (window.backendLocations && window.backendLocations.length > 0) {

    addBackendLocationsToMap(window.backendLocations);

    console.log(
      "Backend locations added to GIS map:",
      window.backendLocations
    );

  } else {

    console.log("No backend locations available for GIS map.");

  }
}
// ================= INTERACTIVE SIMULATIONS =================
function triggerCloudburstSimulation() {
  const loc = NER_LOCATIONS[currentState.activeLocationId];
  playAlertSiren();

  // Escalate numbers
  loc.riskScore = 93;
  loc.level = "Severe";
  loc.soilMoisture = 96;
  loc.aiConfidence = 91;
  loc.rainfallLast7Days = [16, 20, 26, 32, 40, 52, 68];
  loc.activeAlert = `SIMULATED CLOUDBURST: 180mm flash downpour recorded! Critical slope failure threshold breached near ${loc.name}. Immediate evacuation recommended.`;
  loc.timeAgo = "Just now";

  // Flash UI
  selectLocation(loc.id);
  renderActiveAlertsList();

  const simBar = document.getElementById("simNoticeBar");
  if (simBar) {
    simBar.style.display = "flex";
    simBar.innerHTML = `
      <span>⚡ <strong>CLOUDBURST SIMULATION ACTIVE:</strong> Extreme flash downpour simulated for ${loc.name}. Automatic Level 3 Escalation triggered!</span>
      <button class="btn-ghost-sm" style="color:#78350f; border-color:#d97706" onclick="resetSimulations()">Dismiss / Reset</button>
    `;
  }

  // Update Top Alert Banner
  const topAlertText = document.getElementById("topAlertBannerText");
  if (topAlertText) {
    topAlertText.textContent = `CRITICAL ALERT — Extreme flash rainfall & landslide trigger at ${loc.name}! Evacuate danger zone immediately.`;
  }
}

function toggleSimulateOffline() {
  currentState.isOfflineSimulated = !currentState.isOfflineSimulated;
  const btn = document.getElementById("btnSimulateOffline");
  const syncDot = document.getElementById("syncStatusDot");
  const syncLabel = document.getElementById("syncStatusLabel");
  const simBar = document.getElementById("simNoticeBar");

  if (currentState.isOfflineSimulated) {
    btn.textContent = "Reconnect Live Feed";
    syncDot.classList.add("offline");
    syncLabel.textContent = "Offline (Cached Telemetry)";

    simBar.style.display = "flex";
    simBar.innerHTML = `
      <span>📡 <strong>OFFLINE MODE SIMULATED:</strong> Displaying edge-cached geotechnical telemetry. Satellite uplink reconnecting...</span>
      <button class="btn-ghost-sm" style="color:#78350f; border-color:#d97706" onclick="toggleSimulateOffline()">Restore Live Feed</button>
    `;
  } else {
    btn.textContent = "Simulate Offline";
    syncDot.classList.remove("offline");
    syncLabel.textContent = "Synced 1 min ago";
    simBar.style.display = "none";
  }
}

function resetSimulations() {
  const loc = NER_LOCATIONS[currentState.activeLocationId];
  loc.riskScore = loc.id === "aizawl" ? 84 : 45;
  loc.level = loc.riskScore >= 76 ? "Severe" : "Moderate";
  loc.soilMoisture = loc.id === "aizawl" ? 88 : 60;
  loc.aiConfidence = loc.id === "aizawl" ? 81 : 55;
  loc.rainfallLast7Days = [12, 16, 20, 24, 27, 30, 34];

  selectLocation(loc.id);
  renderActiveAlertsList();

  const simBar = document.getElementById("simNoticeBar");
  if (simBar) simBar.style.display = "none";

  const topAlertText = document.getElementById("topAlertBannerText");
  if (topAlertText) {
    topAlertText.textContent = "4 active alerts — highest: Severe risk near Aizawl, Mizoram";
  }
}

// ================= PRINTABLE SITREP EXPORT =================
function exportSituationReport() {
  const loc = NER_LOCATIONS[currentState.activeLocationId];
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
    <head>
      <title>SITREP - ${loc.name} Landslide Early Warning</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #111; line-height: 1.5; }
        .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
        .badge { display: inline-block; padding: 4px 8px; font-weight: bold; background: #fee2e2; color: #b91c1c; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; }
        th { background: #f4f4f4; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>GOVERNMENT OF INDIA - MINISTRY OF DONER</h2>
        <h3>NER Landslide Early Warning & Incident Situation Report (SITREP)</h3>
        <p><strong>Generated on:</strong> ${new Date().toLocaleString()} | Smart India Hackathon 2026</p>
      </div>
      <p><strong>Monitored Region:</strong> ${loc.name} (${loc.state})</p>
      <p><strong>Current Risk Assessment:</strong> <span class="badge">${loc.level} (Score: ${loc.riskScore}/100)</span></p>
      <p><strong>AI Landslide Probability:</strong> ${loc.aiConfidence}%</p>
      <p><strong>Soil Moisture Index:</strong> ${loc.soilMoisture}%</p>
      <p><strong>Cumulative 24h Rainfall:</strong> ${loc.rainfallLast7Days[6]} mm (Threshold: ${loc.threshold} mm)</p>
      <p><strong>Field Advisory / Threat Summary:</strong> ${loc.activeAlert}</p>
      
      <h4>Recent Incident History</h4>
      <table>
        <tr><th>Date</th><th>Location</th><th>Severity</th><th>Impact / Mitigation</th></tr>
        ${loc.incidentHistory.map(i => `<tr><td>${i.date}</td><td>${loc.name}</td><td>${i.severity}</td><td>${i.outcome}</td></tr>`).join("")}
      </table>
      <br/><br/>
      <p style="font-size: 11px; color: #666;">This is an automated decision-support SITREP generated by the AI Landslide Early Warning System. Dispatched to SDRF, DDMA and State Police Command.</p>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 350);
}
