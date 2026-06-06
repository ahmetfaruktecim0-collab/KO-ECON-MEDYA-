/**
 * TURKEY EXECUTIVE DASHBOARD - INTERACTIVE SVG MAP GENERATION & MANAGEMENT
 */

import { calculatePollingSupport } from './state.js';

export const regions = [
    {
        id: "marmara",
        name: "Marmara Bölgesi",
        voterDemographics: {
            secular: 0.22,
            business: 0.12,
            workers: 0.14,
            students: 0.12,
            youth: 0.10,
            conservatives: 0.10,
            civil_servants: 0.08,
            nationalists: 0.06,
            liberals: 0.04,
            kurds: 0.02
        },
        path: "M 60,105 L 90,65 L 155,45 L 225,45 L 255,85 L 235,125 L 185,120 L 125,125 Z",
        center: { x: 160, y: 85 }
    },
    {
        id: "aegean",
        name: "Ege Bölgesi",
        voterDemographics: {
            secular: 0.32,
            students: 0.12,
            youth: 0.10,
            liberals: 0.08,
            workers: 0.08,
            business: 0.06,
            retirees: 0.12,
            conservatives: 0.06,
            nationalists: 0.06
        },
        path: "M 120,135 L 180,130 L 195,195 L 125,250 L 85,190 Z",
        center: { x: 140, y: 185 }
    },
    {
        id: "mediterranean",
        name: "Akdeniz Bölgesi",
        voterDemographics: {
            secular: 0.20,
            nationalists: 0.18,
            workers: 0.14,
            retirees: 0.12,
            conservatives: 0.10,
            liberals: 0.08,
            farmers: 0.08,
            youth: 0.06,
            students: 0.04
        },
        path: "M 130,260 L 200,205 L 310,240 L 380,295 L 430,295 L 430,320 L 415,315 L 360,305 L 220,285 Z",
        center: { x: 270, y: 285 }
    },
    {
        id: "black_sea",
        name: "Karadeniz Bölgesi",
        voterDemographics: {
            nationalists: 0.32,
            conservatives: 0.24,
            farmers: 0.16,
            religious: 0.08,
            workers: 0.10,
            secular: 0.06,
            civil_servants: 0.04
        },
        path: "M 235,45 L 335,65 L 435,55 L 535,75 L 655,75 L 645,115 L 505,125 L 355,115 L 255,85 Z",
        center: { x: 440, y: 85 }
    },
    {
        id: "central_anatolia",
        name: "İç Anadolu Bölgesi",
        voterDemographics: {
            conservatives: 0.32,
            religious: 0.12,
            nationalists: 0.20,
            farmers: 0.12,
            civil_servants: 0.10,
            secular: 0.06,
            workers: 0.08
        },
        path: "M 245,130 L 365,125 L 505,135 L 485,200 L 385,215 L 315,230 L 205,195 L 190,130 Z",
        center: { x: 340, y: 175 }
    },
    {
        id: "eastern_anatolia",
        name: "Doğu Anadolu Bölgesi",
        voterDemographics: {
            kurds: 0.28,
            conservatives: 0.24,
            farmers: 0.18,
            religious: 0.10,
            nationalists: 0.10,
            workers: 0.06,
            secular: 0.04
        },
        path: "M 515,130 L 645,120 L 665,75 L 775,100 L 785,195 L 765,255 L 630,245 L 585,215 Z",
        center: { x: 670, y: 165 }
    },
    {
        id: "southeastern_anatolia",
        name: "Güneydoğu Anadolu Bölgesi",
        voterDemographics: {
            kurds: 0.38,
            conservatives: 0.20,
            immigrants: 0.15,
            workers: 0.12,
            religious: 0.08,
            farmers: 0.07
        },
        path: "M 495,205 L 595,220 L 635,250 L 760,260 L 755,295 L 525,295 L 445,295 L 395,295 Z",
        center: { x: 580, y: 260 }
    }
];

export function getRegionById(id) {
    return regions.find(r => r.id === id);
}

export function getRegionIdByPlate(plate) {
    const p = parseInt(plate);
    if (isNaN(p)) return "central_anatolia";
    
    // Marmara
    if ([10, 11, 16, 17, 22, 34, 39, 41, 54, 59, 77].includes(p)) return "marmara";
    // Aegean
    if ([3, 9, 20, 35, 43, 45, 48, 64].includes(p)) return "aegean";
    // Mediterranean
    if ([1, 7, 15, 31, 32, 33, 46, 80].includes(p)) return "mediterranean";
    // Black Sea
    if ([5, 8, 14, 19, 28, 29, 37, 52, 53, 55, 57, 60, 61, 67, 69, 74, 78, 81].includes(p)) return "black_sea";
    // Central Anatolia
    if ([6, 18, 26, 38, 40, 42, 50, 51, 58, 66, 68, 70, 71].includes(p)) return "central_anatolia";
    // Eastern Anatolia
    if ([4, 12, 13, 23, 24, 25, 30, 36, 44, 49, 62, 65, 75, 76].includes(p)) return "eastern_anatolia";
    // Southeastern Anatolia
    if ([2, 21, 27, 47, 56, 63, 72, 73, 79].includes(p)) return "southeastern_anatolia";
    
    return "central_anatolia";
}

// Calculate the active support rate of a region for the player party
export function calculateRegionSupport(region, state) {
    let supportSum = 0;
    let weightSum = 0;
    
    for (const group in region.voterDemographics) {
        const weight = region.voterDemographics[group];
        const approval = state.voterGroups[group]?.approval ?? 50;
        supportSum += approval * weight;
        weightSum += weight;
    }
    
    let support = supportSum / weightSum;

    // Apply overall stability penalty
    if (state.stability < 45) {
        support -= (45 - state.stability) * 0.4;
    }
    
    return Math.max(0, Math.min(100, Math.round(support)));
}

// Calculate the active happiness rate of a region
export function calculateRegionHappiness(region, state) {
    let localOffset = 0;
    
    if (region.id === "marmara") {
        localOffset = (state.voterGroups.business.approval + state.voterGroups.workers.approval - 100) * 0.15;
    } else if (region.id === "aegean") {
        localOffset = (state.voterGroups.secular.approval + state.voterGroups.students.approval - 100) * 0.15;
    } else if (region.id === "eastern_anatolia") {
        localOffset = (state.voterGroups.conservatives.approval + state.voterGroups.kurds.approval - 100) * 0.15;
    }
    
    const happiness = state.systems.happiness + localOffset;
    return Math.max(0, Math.min(100, Math.round(happiness)));
}

const regionLabelCoords = {
    marmara: { x: 180, y: 120 },
    aegean: { x: 160, y: 260 },
    mediterranean: { x: 400, y: 380 },
    black_sea: { x: 550, y: 110 },
    central_anatolia: { x: 480, y: 240 },
    eastern_anatolia: { x: 820, y: 220 },
    southeastern_anatolia: { x: 750, y: 360 }
};

export function initMapListeners(state) {
    const svg = document.getElementById("svg-turkey");
    if (!svg) return;

    // Generate cities list dynamically from the SVG DOM attributes
    const cities = [];
    const cityGroups = svg.querySelectorAll("g[data-city-code]");
    cityGroups.forEach(group => {
        const plate = group.getAttribute("data-city-code");
        const name = group.getAttribute("data-city-name") || "";
        const id = parseInt(plate);
        cities.push({
            id: id,
            plate: plate,
            name: name,
            regionId: getRegionIdByPlate(plate)
        });
    });

    const svgNamespace = "http://www.w3.org/2000/svg";
    regions.forEach(region => {
        const coord = regionLabelCoords[region.id];
        if (coord) {
            const text = document.createElementNS(svgNamespace, "text");
            text.setAttribute("x", coord.x);
            text.setAttribute("y", coord.y);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("fill", "rgba(243, 244, 246, 0.45)");
            text.setAttribute("font-family", "var(--font-header)");
            text.setAttribute("font-size", "10px");
            text.setAttribute("font-weight", "600");
            text.setAttribute("style", "pointer-events: none; text-shadow: 0 1px 3px rgba(0,0,0,0.8); letter-spacing: 0.8px;");
            text.textContent = region.name.split(" ")[0].toUpperCase();
            svg.appendChild(text);
        }
    });

    cityGroups.forEach(group => {
        const cityCode = group.getAttribute("data-city-code");
        const city = cities.find(c => c.plate === cityCode);
        if (!city) return;

        group.addEventListener("mouseenter", (e) => {
            const scale = typeof window.activeMapScale !== 'undefined' ? window.activeMapScale : "regions";
            if (scale === "regions") {
                const regionId = city.regionId;
                const regionCities = cities.filter(c => c.regionId === regionId);
                regionCities.forEach(rc => {
                    const rcGroup = svg.querySelector(`g[data-city-code="${rc.plate}"]`);
                    if (rcGroup) {
                        rcGroup.querySelectorAll("path").forEach(p => p.classList.add("highlight-path"));
                    }
                });
            } else {
                group.querySelectorAll("path").forEach(p => p.classList.add("highlight-path"));
            }
        });

        group.addEventListener("mousemove", (e) => {
            // Tooltip on hover disabled as per request
        });

        group.addEventListener("mouseleave", () => {
            svg.querySelectorAll("path.highlight-path").forEach(p => p.classList.remove("highlight-path"));
            hideTooltip();
        });

        group.addEventListener("click", () => {
            const scale = typeof window.activeMapScale !== 'undefined' ? window.activeMapScale : "regions";
            const parentRegion = getRegionById(city.regionId);
            if (scale === "regions") {
                if (window.logMessage) {
                    window.logMessage(`Seçilen Bölge: ${parentRegion.name}. Bölgesel onay oranı: %${calculateRegionSupport(parentRegion, state)}.`);
                }
                if (typeof window.showRegionDetail === "function") {
                    window.showRegionDetail(parentRegion, null);
                }
            } else {
                const localSupportOffset = Math.round(((city.id * 7) % 9) - 4);
                const support = Math.max(0, Math.min(100, calculateRegionSupport(parentRegion, state) + localSupportOffset));
                if (window.logMessage) {
                    window.logMessage(`Seçilen İl: ${city.name} (${city.plate}). Yerel onay oranı: %${support}.`);
                }
                if (typeof window.showRegionDetail === "function") {
                    window.showRegionDetail(parentRegion, city);
                }
            }
        });
    });
}

export function drawTurkeyMap(containerId, state, mode = "support", onClickCallback = null) {
    const svg = document.getElementById("svg-turkey");
    if (!svg) return;

    const scale = typeof window.activeMapScale !== 'undefined' ? window.activeMapScale : "regions";
    
    // Generate cities list dynamically from the SVG DOM attributes
    const citiesList = [];
    const cityGroups = svg.querySelectorAll("g[data-city-code]");
    cityGroups.forEach(group => {
        const plate = group.getAttribute("data-city-code");
        const name = group.getAttribute("data-city-name") || "";
        const id = parseInt(plate);
        citiesList.push({
            id: id,
            plate: plate,
            name: name,
            regionId: getRegionIdByPlate(plate)
        });
    });

    // Helper to interpolate between two RGB values
    function interpolateColor(c1, c2, factor) {
        const r = Math.round(c1[0] + factor * (c2[0] - c1[0]));
        const g = Math.round(c1[1] + factor * (c2[1] - c1[1]));
        const b = Math.round(c1[2] + factor * (c2[2] - c1[2]));
        return `rgb(${r}, ${g}, ${b})`;
    }

    // 1. Support heat color logic (Mat Bordo -> Antrasit -> Orman Yeşili)
    function getSupportColor(value) {
        const colorLow = [166, 60, 62];      // Mat Bordo
        const colorMid = [53, 54, 59];        // Antrasit panel rengi (#35363B)
        const colorHigh = [62, 125, 90];      // Orman Yeşili (#3e7d5a)
        if (value < 50) {
            return interpolateColor(colorLow, colorMid, value / 50);
        } else {
            return interpolateColor(colorMid, colorHigh, (value - 50) / 50);
        }
    }

    // 2. Economy/Satisfaction heatmap logic (Mat Bordo -> Antrasit -> Stratejik Amber)
    function getEconomyColor(value) {
        const colorLow = [166, 60, 62];      // Mat Bordo
        const colorMid = [53, 54, 59];        // Antrasit panel rengi (#35363B)
        const colorHigh = [217, 158, 54];     // Stratejik Amber (#d99e36)
        if (value < 50) {
            return interpolateColor(colorLow, colorMid, value / 50);
        } else {
            return interpolateColor(colorMid, colorHigh, (value - 50) / 50);
        }
    }

    // 3. Ideology mapping (Conservatives: Beige, Seculars: Muted Blue, Nationalists: Mat Bordo, Kurds: Muted Purple, Left: Dusty Rose)
    function getIdeologyColor(regionId) {
        if (regionId === "central_anatolia") return "var(--color-conservative)";
        if (regionId === "aegean") return "var(--color-secular)";
        if (regionId === "marmara") return "var(--color-liberal)";
        if (regionId === "black_sea") return "var(--color-nationalist)";
        if (regionId === "mediterranean") return "var(--color-leftist)";
        if (regionId === "eastern_anatolia") return "var(--color-religious)";
        if (regionId === "southeastern_anatolia") return "var(--color-kurd)";
        return "var(--color-leftist)";
    }

    // 4. Voter group weight mapping (Antrasit -> Stratejik Amber)
    function getGroupWeightColor(weight) {
        const ratio = Math.max(0, Math.min(1, weight / 0.40));
        const colorMid = [53, 54, 59];
        const colorHigh = [217, 158, 54];
        return interpolateColor(colorMid, colorHigh, ratio);
    }

    // Draw Heatmap Fill on Shards
    citiesList.forEach(city => {
        const group = svg.querySelector(`g[data-city-code="${city.plate}"]`);
        if (!group) return;

        const parentRegion = getRegionById(city.regionId);
        const localSupportOffset = Math.round(((city.id * 7) % 9) - 4);
        const localHappinessOffset = Math.round(((city.id * 13) % 9) - 4);

        let value = 50;
        let color = "";

        if (mode === "support") {
            value = scale === "cities" ? Math.max(0, Math.min(100, calculateRegionSupport(parentRegion, state) + localSupportOffset)) : calculateRegionSupport(parentRegion, state);
            color = getSupportColor(value);
        } else if (mode === "happiness") {
            value = scale === "cities" ? Math.max(0, Math.min(100, calculateRegionHappiness(parentRegion, state) + localHappinessOffset)) : calculateRegionHappiness(parentRegion, state);
            color = getEconomyColor(value);
        } else if (mode === "ideology") {
            color = getIdeologyColor(parentRegion.id);
        } else if (mode === "economy") {
            let offset = parentRegion.id === "marmara" ? 15 : (parentRegion.id === "eastern_anatolia" ? -12 : 0);
            value = Math.max(0, Math.min(100, state.systems.economy + offset + (scale === "cities" ? localSupportOffset : 0)));
            color = getEconomyColor(value);
        } else if (mode === "unemployment") {
            let offset = parentRegion.id === "southeastern_anatolia" ? 18 : (parentRegion.id === "marmara" ? -10 : 0);
            value = Math.max(0, Math.min(100, state.systems.unemployment + offset + (scale === "cities" ? localSupportOffset : 0)));
            color = getSupportColor(100 - value);
        } else if (mode === "security") {
            let offset = parentRegion.id === "eastern_anatolia" ? -15 : (parentRegion.id === "central_anatolia" ? 8 : 0);
            value = Math.max(0, Math.min(100, state.systems.security + offset + (scale === "cities" ? localSupportOffset : 0)));
            color = getSupportColor(value);
        } else if (mode === "protests") {
            let localSatisfaction = calculateRegionHappiness(parentRegion, state);
            value = Math.max(0, Math.min(100, (100 - localSatisfaction) * 1.5 - (state.systems.security * 0.3)));
            color = getSupportColor(100 - value);
        } else if (mode.startsWith("group_")) {
            const groupKey = mode.replace("group_", "");
            const weight = parentRegion.voterDemographics[groupKey] || 0;
            const cityOffset = ((city.id * 3) % 5) - 2; // small organic variation for cities
            const displayWeight = Math.max(0, Math.min(1, weight + (scale === "cities" ? cityOffset * 0.01 : 0)));
            color = getGroupWeightColor(displayWeight);
        }

        const paths = group.querySelectorAll("path");
        paths.forEach(p => {
            p.style.fill = color;
        });
    });

    // Render Pulsing Warning Lights on Regions with High Protest Risk (>50%) or Economic Stress (>50%)
    const existingAlerts = svg.querySelector(".map-alerts");
    if (existingAlerts) existingAlerts.remove();

    const svgNamespace = "http://www.w3.org/2000/svg";
    const alertsGroup = document.createElementNS(svgNamespace, "g");
    alertsGroup.setAttribute("class", "map-alerts");
    svg.appendChild(alertsGroup);

    regions.forEach(region => {
        const localSatisfaction = calculateRegionHappiness(region, state);
        const protestRisk = Math.max(0, Math.min(100, (100 - localSatisfaction) * 1.5 - (state.systems.security * 0.3)));
        
        const econ = Math.max(0, Math.min(100, state.systems.economy + (region.id === "marmara" ? 15 : (region.id === "eastern_anatolia" ? -12 : 0))));
        const unemp = Math.max(0, Math.min(100, state.systems.unemployment + (region.id === "southeastern_anatolia" ? 18 : (region.id === "marmara" ? -10 : 0))));
        const econStress = Math.max(0, Math.min(100, (100 - econ) * 1.1 + (unemp * 0.3) + (state.systems.inflation * 0.2) - 20));

        const coords = regionLabelCoords[region.id];
        if (coords) {
            const hasProtest = protestRisk > 50;
            const hasEcon = econStress > 50;

            if (hasProtest && hasEcon) {
                drawAlertDot(coords.x - 9, coords.y - 18, "!", "var(--color-danger)", "pulse-alert-dot");
                drawAlertDot(coords.x + 9, coords.y - 18, "₺", "var(--color-warning)", "pulse-econ-dot");
            } else if (hasProtest) {
                drawAlertDot(coords.x, coords.y - 18, "!", "var(--color-danger)", "pulse-alert-dot");
            } else if (hasEcon) {
                drawAlertDot(coords.x, coords.y - 18, "₺", "var(--color-warning)", "pulse-econ-dot");
            }
        }
    });

    function drawAlertDot(cx, cy, label, fill, pulseClass) {
        const circle = document.createElementNS(svgNamespace, "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", "7");
        circle.setAttribute("fill", fill);
        circle.setAttribute("class", pulseClass);
        circle.setAttribute("style", "cursor: pointer;");
        alertsGroup.appendChild(circle);

        const text = document.createElementNS(svgNamespace, "text");
        text.setAttribute("x", cx);
        text.setAttribute("y", cy + 3);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", fill === "var(--color-warning)" ? "#1a1917" : "#ffffff");
        text.setAttribute("font-family", "var(--font-header)");
        text.setAttribute("font-size", "9px");
        text.setAttribute("font-weight", "700");
        text.setAttribute("style", "pointer-events: none;");
        text.textContent = label;
        alertsGroup.appendChild(text);
    }
}

function showTooltip(event, target, state, isCity = false) {
    const tooltip = document.getElementById("region-tooltip");
    if (!tooltip) return;

    // Fetch active overlay mode
    const mode = typeof window.activeMapMode !== 'undefined' ? window.activeMapMode : "support";
    
    let title = "";
    let valueText = "";
    let extraInfo = "";
    let progressVal = null;
    let isProgressGood = true;

    const parentRegion = isCity ? getRegionById(target.regionId) : target;
    const localSupportOffset = isCity ? Math.round(((target.id * 7) % 9) - 4) : 0;
    const localHappinessOffset = isCity ? Math.round(((target.id * 13) % 9) - 4) : 0;

    title = isCity ? `${target.plate} - ${target.name.toUpperCase()}` : target.name.toUpperCase();

    if (mode === "support") {
        const support = Math.max(0, Math.min(100, calculateRegionSupport(parentRegion, state) + localSupportOffset));
        valueText = `Hükümet Onay Oranı: <strong>%${support}</strong>`;
        progressVal = support;
        isProgressGood = support >= 50;
    } else if (mode === "happiness") {
        const happiness = Math.max(0, Math.min(100, calculateRegionHappiness(parentRegion, state) + localHappinessOffset));
        valueText = `Halk Memnuniyeti: <strong>%${happiness}</strong>`;
        progressVal = happiness;
        isProgressGood = happiness >= 50;
    } else if (mode === "ideology") {
        let dominantGroup = "";
        let maxWeight = 0;
        for (const grp in parentRegion.voterDemographics) {
            if (parentRegion.voterDemographics[grp] > maxWeight) {
                maxWeight = parentRegion.voterDemographics[grp];
                dominantGroup = grp;
            }
        }
        const grpTurkish = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt Seçmen", immigrants: "Göçmen", business: "İş Dünyası",
            students: "Öğrenciler", retirees: "Emekliler", workers: "Mavi Yaka / İşçiler", farmers: "Çiftçiler",
            civil_servants: "Kamu Çalışanları", youth: "Genç Seçmen", religious: "Dindar / Cemaatler"
        };
        valueText = `Baskın Siyasi Eğilim: <strong>${grpTurkish[dominantGroup] || dominantGroup}</strong>`;
        extraInfo = `Yoğunluk Oranı: <strong>%${Math.round(maxWeight * 100)}</strong>`;
        progressVal = Math.round(maxWeight * 100);
        isProgressGood = true;
    } else if (mode === "economy") {
        let offset = parentRegion.id === "marmara" ? 15 : (parentRegion.id === "eastern_anatolia" ? -12 : 0);
        const econ = Math.max(0, Math.min(100, state.systems.economy + offset + localSupportOffset));
        valueText = `Bölgesel Ekonomik Durum: <strong>%${econ}</strong>`;
        progressVal = econ;
        isProgressGood = econ >= 50;
    } else if (mode === "unemployment") {
        let offset = parentRegion.id === "southeastern_anatolia" ? 18 : (parentRegion.id === "marmara" ? -10 : 0);
        const unemp = Math.max(0, Math.min(100, state.systems.unemployment + offset + localSupportOffset));
        valueText = `İşsizlik Oranı: <strong>%${unemp}</strong>`;
        progressVal = unemp;
        isProgressGood = unemp < 45; // Unemployment is bad if high
    } else if (mode === "security") {
        let offset = parentRegion.id === "eastern_anatolia" ? -15 : (parentRegion.id === "central_anatolia" ? 8 : 0);
        const sec = Math.max(0, Math.min(100, state.systems.security + offset + localSupportOffset));
        valueText = `Asayiş & Güvenlik: <strong>%${sec}</strong>`;
        progressVal = sec;
        isProgressGood = sec >= 50;
    } else if (mode === "protests") {
        let localSatisfaction = calculateRegionHappiness(parentRegion, state);
        const protest = Math.max(0, Math.min(100, (100 - localSatisfaction) * 1.5 - (state.systems.security * 0.3)));
        valueText = `Protesto & Kaos Riski: <strong>%${Math.round(protest)}</strong>`;
        progressVal = Math.round(protest);
        isProgressGood = protest < 40; // Protests are bad if high
    } else if (mode.startsWith("group_")) {
        const groupKey = mode.replace("group_", "");
        const weight = parentRegion.voterDemographics[groupKey] || 0;
        const groupData = state.voterGroups[groupKey];
        const grpTurkish = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt Seçmen", immigrants: "Göçmen", business: "İş İnsanı",
            students: "Öğrenci", retirees: "Emekli", workers: "İşçi", farmers: "Çiftçi",
            civil_servants: "Memur", youth: "Genç Seçmen", religious: "Dindar"
        };
        const grpName = grpTurkish[groupKey] || groupKey;
        valueText = `Bölgedeki ${grpName} Oranı: <strong>%${Math.round(weight * 100)}</strong>`;
        progressVal = Math.round(weight * 100);
        isProgressGood = true;
        if (groupData) {
            extraInfo = `Grup Memnuniyeti: <strong>%${Math.round(groupData.satisfaction)}</strong> | Ulusal Onay: <strong>%${Math.round(groupData.approval)}</strong>`;
        }
    }

    if (!isCity && mode !== "ideology" && !mode.startsWith("group_")) {
        let dominantGroup = "";
        let maxWeight = 0;
        for (const grp in target.voterDemographics) {
            if (target.voterDemographics[grp] > maxWeight) {
                maxWeight = target.voterDemographics[grp];
                dominantGroup = grp;
            }
        }
        const grpTurkish = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt Seçmen", immigrants: "Göçmen", business: "İş İnsanı",
            students: "Öğrenci", retirees: "Emekli", workers: "İşçi", farmers: "Çiftçi",
            civil_servants: "Memur", youth: "Genç Seçmen", religious: "Dindar"
        };
        extraInfo = `Baskın Demografi: <strong>${grpTurkish[dominantGroup] || dominantGroup} (%${Math.round(maxWeight * 100)})</strong>`;
    } else if (isCity && mode !== "ideology" && !mode.startsWith("group_")) {
        extraInfo = `Bağlı Coğrafi Bölge: <strong>${parentRegion.name}</strong>`;
    } else if (isCity && mode.startsWith("group_")) {
        extraInfo += ` (Bölge: <strong>${parentRegion.name}</strong>)`;
    }

    function getTooltipBarColorClass(val, isInverted) {
        if (isInverted) {
            return val < 35 ? "green-bg" : (val > 60 ? "red-bg" : "yellow-bg");
        } else {
            return val > 65 ? "green-bg" : (val < 40 ? "red-bg" : "yellow-bg");
        }
    }

    // Build Premium HTML structure with customized indicators
    let progressHtml = "";
    if (progressVal !== null) {
        progressHtml = `
            <div class="progress-bar-wrapper" style="height: 5px; margin: 8px 0 10px; background-color: rgba(255,255,255,0.06);">
                <div class="progress-bar ${getTooltipBarColorClass(progressVal, mode === 'unemployment' || mode === 'protests')}" style="width: ${progressVal}%;"></div>
            </div>
        `;
    }

    // Generate top 3 demographic progress bars for region details
    let demographicsHtml = "";
    if (parentRegion && parentRegion.voterDemographics) {
        demographicsHtml = `
            <div class="tooltip-demographics" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px;">
                <h5 style="margin: 0 0 6px 0; font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.3px;">Bölge Demografisi</h5>
        `;
        
        const sortedDemographics = Object.entries(parentRegion.voterDemographics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
            
        const grpNames = {
            conservatives: "Muhafazakar", secular: "Seküler", nationalists: "Milliyetçi", leftists: "Solcu",
            liberals: "Liberal", kurds: "Kürt", immigrants: "Göçmen", business: "İş Dünyası",
            students: "Öğrenci", retirees: "Emekli", workers: "İşçi", farmers: "Çiftçi",
            civil_servants: "Memur", youth: "Genç", religious: "Dindar"
        };
        
        sortedDemographics.forEach(([grp, ratio]) => {
            const pct = Math.round(ratio * 100);
            const grpName = grpNames[grp] || grp;
            demographicsHtml += `
                <div class="demographic-row" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.6rem; margin-bottom: 4px;">
                    <span style="color: var(--text-secondary);">${grpName}</span>
                    <div style="flex: 1; height: 3px; background: rgba(255,255,255,0.06); margin: 0 8px; border-radius: 1.5px; overflow: hidden;">
                        <div style="width: ${pct}%; height: 100%; background: var(--color-gold-text);"></div>
                    </div>
                    <span style="font-weight: 600; color: var(--text-primary);">%${pct}</span>
                </div>
            `;
        });
        
        demographicsHtml += `</div>`;
    }

    tooltip.innerHTML = `
        <h4>${title}</h4>
        <p>${valueText}</p>
        ${progressHtml}
        <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px; margin-bottom: 2px;">${extraInfo}</p>
        ${demographicsHtml}
    `;
    
    tooltip.classList.remove("hidden");
    moveTooltip(event);
}

function moveTooltip(event) {
    const tooltip = document.getElementById("region-tooltip");
    if (!tooltip) return;
    
    const mapWrapper = document.querySelector(".map-wrapper");
    const rect = mapWrapper.getBoundingClientRect();
    
    const x = event.clientX - rect.left + 15;
    const y = event.clientY - rect.top + 15;
    
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById("region-tooltip");
    if (tooltip) {
        tooltip.classList.add("hidden");
    }
}

