/**
 * TURKEY EXECUTIVE DASHBOARD - MATHEMATICAL SIMULATION ENGINE
 */

import { policies, getPolicyById } from './cards.js';
import { calculatePollingSupport } from './state.js';

export function runSimulationTurn(state) {
    // 1. Accumulate Policy Effects
    let quarterlyBudgetSurplus = 0;
    const policySystemMods = {
        economy: 0,
        inflation: 0,
        unemployment: 0,
        happiness: 0,
        security: 0,
        freedom: 0,
        media: 0,
        corruption: 0,
        education: 0
    };

    // Initialize voter mods for all 15 groups
    const policyVoterMods = {};
    for (const key in state.voterGroups) {
        policyVoterMods[key] = 0;
    }

    // Calculate base taxes & costs
    // Base public revenue is ₺16B per quarter
    let grossIncome = 16.0; 
    // Base government operations cost is ₺13B per quarter
    let grossExpenses = 13.0; 

    for (const policyId in state.activePolicies) {
        const val = state.activePolicies[policyId];
        if (val !== null) {
            const policyDef = getPolicyById(policyId);
            if (policyDef) {
                const effects = policyDef.getEffects(val);
                
                // Budget impact
                if (effects.budget > 0) {
                    grossIncome += effects.budget;
                } else {
                    grossExpenses += Math.abs(effects.budget);
                }

                // System mods
                if (effects.systems) {
                    for (const sys in effects.systems) {
                        policySystemMods[sys] += effects.systems[sys];
                    }
                }

                // Voter approval mods
                if (effects.voters) {
                    for (const grp in effects.voters) {
                        if (policyVoterMods[grp] !== undefined) {
                            policyVoterMods[grp] += effects.voters[grp];
                        }
                    }
                }
            }
        }
    }

    // Amplify policy effects for radical consequences (1.4x impact)
    const policyAmp = 1.4;
    for (const key in policySystemMods) {
        policySystemMods[key] *= policyAmp;
    }
    for (const key in policyVoterMods) {
        policyVoterMods[key] *= policyAmp;
    }

    // 2. Cabinet Minister Modifiers
    const cab = state.cabinet;

    // 3. Interconnected Systems Calculations
    // Store old values to compute trends
    const oldSystems = { ...state.systems };

    // a. Education Quality
    const eduBudgetVal = state.activePolicies.education_budget ?? 0;
    // Education minister competence adds up to +10%
    state.systems.education = 15 + (eduBudgetVal * 0.6) + (cab.education.competence - 50) * 0.2 + policySystemMods.education;
    
    // b. Economy Development
    const taxRateImpact = ((state.activePolicies.income_tax ?? 0) + (state.activePolicies.corporate_tax ?? 0)) / 2;
    // Economy minister competence adds up to +10%
    state.systems.economy = 42 + (state.systems.education * 0.25) - (state.systems.corruption * 0.2) - (taxRateImpact * 0.15) + (cab.economy.competence - 50) * 0.2 + policySystemMods.economy;
    // Business influence impact: strong business influence grows economy
    const busInf = state.powerCenters?.business?.influence ?? 25;
    state.systems.economy += (busInf - 25) * 0.3;

    // c. Corruption Index
    const policeVal = state.activePolicies.police_funding ?? 0;
    const censorshipVal = state.activePolicies.censorship ?? 0;
    // Economy, Interior and Justice ministers corruption affect index. Justice minister competence helps curb it.
    let ministerCorruptionEffect = (cab.economy.corruption * 0.1) + (cab.interior.corruption * 0.1) + (cab.justice.corruption * 0.2) - (cab.justice.competence - 50) * 0.15;
    state.systems.corruption = 35 - (state.systems.education * 0.15) - (policeVal * 0.08) + (censorshipVal * 0.1) - (state.stability * 0.1) + ministerCorruptionEffect + policySystemMods.corruption;
    // Media influence impact: strong media increases transparency, lowering corruption
    const medInf = state.powerCenters?.media?.influence ?? 20;
    state.systems.corruption -= (medInf - 20) * 0.3;

    // d. Security
    // Interior and Defense ministers competence boost security
    state.systems.security = 25 + (policeVal * 0.5) - (state.systems.freedom * 0.1) + (cab.interior.competence - 50) * 0.2 + (cab.defense.competence - 50) * 0.15 + policySystemMods.security;

    // e. Civic Liberties (Freedom)
    // Justice minister competence boosts civil liberties
    state.systems.freedom = 90 - (censorshipVal * 0.55) - (policeVal * 0.1) + (cab.justice.competence - 50) * 0.2 + policySystemMods.freedom;
    // Judiciary and Military influence impacts: strong judiciary boosts freedom, strong military penalizes it
    const milInf = state.powerCenters?.military?.influence ?? 25;
    const judInf = state.powerCenters?.judiciary?.influence ?? 20;
    state.systems.freedom += (judInf - 20) * 0.45 - (milInf - 25) * 0.4;

    // f. Media Control
    state.systems.media = 10 + (censorshipVal * 0.8) + policySystemMods.media;

    // g. Unemployment Rate
    state.systems.unemployment = 42 - (state.systems.economy * 0.45) + policySystemMods.unemployment;
    // Business influence impact: strong business influence can lead to job inequality
    state.systems.unemployment += (busInf - 25) * 0.15;

    // h. Inflation Rate
    // Competent economy minister reduces inflation (tight monetary policies, interest rates)
    state.systems.inflation = 15 + (state.systems.economy * 0.25) + (state.systems.corruption * 0.15) - (cab.economy.competence - 50) * 0.15 + policySystemMods.inflation;
    // Business influence impact: strong business pressure can drive up inflation
    state.systems.inflation += (busInf - 25) * 0.2;

    // Bound all systems to [0, 100]
    for (const sys in state.systems) {
        state.systems[sys] = Math.max(0, Math.min(100, Math.round(state.systems[sys])));
    }

    // Determine Trends
    for (const sys in state.systems) {
        const diff = state.systems[sys] - oldSystems[sys];
        if (diff > 1.5) state.trends[sys] = 1;
        else if (diff < -1.5) state.trends[sys] = -1;
        else state.trends[sys] = 0;
    }

    // i. Public Happiness
    // Health minister competence boosts public health and happiness
    state.systems.happiness = 45 + 
        (state.systems.freedom * 0.15) + 
        (state.systems.economy * 0.15) - 
        (state.systems.inflation * 0.2) - 
        (state.systems.unemployment * 0.2) - 
        (state.systems.corruption * 0.15) + 
        (cab.health.competence - 50) * 0.15 + 
        policySystemMods.happiness;
        
    state.systems.happiness = Math.max(0, Math.min(100, Math.round(state.systems.happiness)));

    // j. Stability
    state.stability = 45 + 
        (state.systems.happiness * 0.3) + 
        (state.systems.security * 0.25) - 
        (state.systems.inflation * 0.12) - 
        (state.systems.unemployment * 0.12) - 
        (state.systems.corruption * 0.15);

    // Cross-power-center stability impacts: strong military improves law and order stability,
    // but strong media exposes corruption, which hits stability when corruption is high
    state.stability += (milInf - 25) * 0.25;
    if (state.systems.corruption > 45) {
        state.stability -= (medInf - 20) * 0.4;
    }

    // Crisis modifiers on stability
    if (state.systems.happiness < 30) {
        state.stability -= (30 - state.systems.happiness) * 0.8;
    }
    if (state.treasury < 0) {
        const debtBillions = Math.abs(state.treasury) / 1000000000;
        if (debtBillions > 15) {
            state.stability -= Math.min(30, (debtBillions - 15) * 0.5);
            state.systems.inflation = Math.min(100, state.systems.inflation + Math.round(debtBillions * 0.1));
        }
    }
    state.stability = Math.max(0, Math.min(100, Math.round(state.stability)));

    // 4. Voter Demographics Drifts (Dynamic electorate size)
    // High education slowly increases secular/youth sizes, shrinks conservative sizes
    if (state.systems.education > 60) {
        const drift = (state.systems.education - 60) * 0.003;
        state.voterGroups.conservatives.size = Math.max(8, state.voterGroups.conservatives.size - drift);
        state.voterGroups.religious.size = Math.max(1, state.voterGroups.religious.size - drift * 0.2);
        state.voterGroups.secular.size = Math.min(25, state.voterGroups.secular.size + drift * 0.6);
        state.voterGroups.youth.size = Math.min(15, state.voterGroups.youth.size + drift * 0.6);
    }
    
    // High automation/unemployment turns workers into leftists
    if (state.systems.unemployment > 50) {
        const drift = (state.systems.unemployment - 50) * 0.005;
        state.voterGroups.workers.size = Math.max(5, state.voterGroups.workers.size - drift);
        state.voterGroups.leftists.size = Math.min(20, state.voterGroups.leftists.size + drift);
    }

    // Normalize voter sizes to exactly 100%
    let totalSize = 0;
    for (const key in state.voterGroups) {
        totalSize += state.voterGroups[key].size;
    }
    for (const key in state.voterGroups) {
        state.voterGroups[key].size = (state.voterGroups[key].size / totalSize) * 100;
    }

    // 5. Voter Group Approval, Satisfaction and Protest Calculations
    // Define what each of the 15 groups wants (target approval)
    const targetApprovals = {
        conservatives: 40 + (state.systems.security * 0.25) + ((state.activePolicies.religious_edu ?? 0) * 0.25) - (state.systems.freedom * 0.1) + policyVoterMods.conservatives,
        secular:       25 + (state.systems.freedom * 0.3) + (state.systems.education * 0.25) - ((state.activePolicies.religious_edu ?? 0) * 0.3) + ((state.activePolicies.women_safety ?? 0) * 0.2) + policyVoterMods.secular,
        nationalists:  20 + (state.systems.security * 0.3) + ((state.activePolicies.border_control ?? 0) * 0.25) + ((state.activePolicies.migrant_repatriation ?? 0) * 0.25) - ((state.activePolicies.minority_rights ?? 0) * 0.3) + policyVoterMods.nationalists,
        leftists:      20 + ((state.activePolicies.ubi ?? 0) * 0.25) - ((state.activePolicies.healthcare_priv ?? 0) * 0.25) - (state.systems.corruption * 0.15) - (state.systems.unemployment * 0.1) + policyVoterMods.leftists,
        liberals:      25 + (state.systems.economy * 0.3) - ((state.activePolicies.corporate_tax ?? 0) * 0.25) + ((state.activePolicies.imf_cooperation ?? 0) * 0.2) + policyVoterMods.liberals,
        kurds:         15 + ((state.activePolicies.minority_rights ?? 0) * 0.4) + ((state.activePolicies.ubi ?? 0) * 0.15) - (state.systems.security * 0.15) + policyVoterMods.kurds,
        immigrants:    30 - ((state.activePolicies.migrant_repatriation ?? 0) * 0.6) - ((state.activePolicies.border_control ?? 0) * 0.2) + policyVoterMods.immigrants,
        business:      20 + (state.systems.economy * 0.35) - ((state.activePolicies.corporate_tax ?? 0) * 0.3) + ((state.activePolicies.healthcare_priv ?? 0) * 0.2) - (state.systems.inflation * 0.1) + policyVoterMods.business,
        students:      25 + (state.systems.freedom * 0.2) + (state.systems.education * 0.25) + ((state.activePolicies.internet_freedom ?? 0) * 0.25) - (state.systems.unemployment * 0.2) + policyVoterMods.students,
        retirees:      30 - (state.systems.inflation * 0.3) - ((state.activePolicies.pension_age ?? 60) * 0.4) - ((state.activePolicies.healthcare_priv ?? 0) * 0.2) + policyVoterMods.retirees,
        workers:       30 - (state.systems.inflation * 0.25) - (state.systems.unemployment * 0.25) + ((state.activePolicies.ubi ?? 0) * 0.2) - ((state.activePolicies.pension_age ?? 60) * 0.2) + policyVoterMods.workers,
        farmers:       35 + (state.systems.economy * 0.2) - ((state.activePolicies.carbon_tax ?? 0) * 0.25) + ((state.activePolicies.ubi ?? 0) * 0.15) + policyVoterMods.farmers,
        civil_servants:30 + (state.systems.education * 0.15) - (state.systems.inflation * 0.3) - ((state.activePolicies.imf_cooperation ?? 0) * 0.2) + policyVoterMods.civil_servants,
        youth:         20 + (state.systems.freedom * 0.2) + ((state.activePolicies.internet_freedom ?? 0) * 0.35) - (state.systems.unemployment * 0.3) + policyVoterMods.youth,
        religious:     40 + ((state.activePolicies.religious_edu ?? 0) * 0.35) - ((state.activePolicies.women_safety ?? 0) * 0.25) - (state.systems.freedom * 0.15) + policyVoterMods.religious
    };

    let averageProtestRisk = 0;

    // Drift actual approval and calculate satisfaction & protest risk
    for (const key in state.voterGroups) {
        const target = Math.max(0, Math.min(100, targetApprovals[key]));
        
        // 1. Approval drift
        state.voterGroups[key].approval = state.voterGroups[key].approval * 0.65 + target * 0.35;
        state.voterGroups[key].approval = Math.max(0, Math.min(100, Math.round(state.voterGroups[key].approval)));
        
        // 2. Satisfaction (based on approval and national happiness)
        let satisfaction = state.voterGroups[key].approval * 0.6 + state.systems.happiness * 0.4;
        
        // 3. Mini ideology loyalty alignment based on Cabinet Minister ideology
        // E.g. if interior minister is a nationalist, nationalists get +5 satisfaction. If corrupt, seculars get -5.
        if (key === "nationalists" && (cab.interior.ideology === "nationalist" || cab.defense.ideology === "nationalist")) {
            satisfaction += 5;
        }
        if (key === "secular" && (cab.justice.ideology === "conservative" || cab.education.ideology === "conservative")) {
            satisfaction -= 5;
        }
        
        state.voterGroups[key].satisfaction = Math.max(0, Math.min(100, Math.round(satisfaction)));

        // 4. Protest Risk
        // If satisfaction is low, protest risk rises. High security suppresses protest risk.
        let protestRisk = (100 - state.voterGroups[key].satisfaction) * 1.5 - (state.systems.security * 0.4);
        
        // Specific triggers (Youth/Students protest high internet bans or high censorship)
        if ((key === "students" || key === "youth") && (state.activePolicies.censorship ?? 0) > 60) {
            protestRisk += 20;
        }
        
        state.voterGroups[key].protestRisk = Math.max(0, Math.min(100, Math.round(protestRisk)));
        averageProtestRisk += state.voterGroups[key].protestRisk * (state.voterGroups[key].size / 100);
    }

    // High average protest risk directly hits stability
    if (averageProtestRisk > 40) {
        state.stability = Math.max(0, Math.round(state.stability - (averageProtestRisk - 40) * 0.4));
    }

    // 8. Power Centers calculations
    if (!state.powerCenters) {
        state.powerCenters = {
            public:     { name: "Halk Desteği", approval: 50, influence: 30, trend: 0, loyalty: 50, anger: 50, organization: 45, plot: null, plotProgress: 0 },
            military:   { name: "Ordu Desteği", approval: 70, influence: 25, trend: 0, loyalty: 70, anger: 30, organization: 37, plot: null, plotProgress: 0 },
            security:   { name: "Güvenlik Bürokrasisi", approval: 65, influence: 20, trend: 0, loyalty: 65, anger: 35, organization: 30, plot: null, plotProgress: 0 },
            judiciary:  { name: "Yargı Desteği", approval: 60, influence: 20, trend: 0, loyalty: 60, anger: 40, organization: 30, plot: null, plotProgress: 0 },
            business:   { name: "İş Dünyası", approval: 55, influence: 25, trend: 0, loyalty: 55, anger: 45, organization: 37, plot: null, plotProgress: 0 },
            media:      { name: "Medya Desteği", approval: 50, influence: 20, trend: 0, loyalty: 50, anger: 50, organization: 30, plot: null, plotProgress: 0 },
            academia:   { name: "Üniversite & Akademi", approval: 45, influence: 15, trend: 0, loyalty: 45, anger: 55, organization: 22, plot: null, plotProgress: 0 }
        };
    }

    const targetPowerCenters = {
        public:     40 + (state.systems.happiness * 0.4) - (state.systems.inflation * 0.15) - (state.systems.unemployment * 0.15) + ((state.activePolicies.ubi ?? 0) * 0.2) - (((state.activePolicies.pension_age ?? 60) - 50) * 0.3) - ((state.activePolicies.income_tax ?? 25) * 0.2),
        military:   40 + ((state.activePolicies.defense_alliances ?? 40) * 0.3) + (state.systems.security * 0.2) + ((state.activePolicies.police_funding ?? 50) * 0.15) + ((cab.defense.competence - 50) * 0.2),
        security:   35 + ((state.activePolicies.police_funding ?? 50) * 0.4) + ((state.activePolicies.border_control ?? 30) * 0.2) + ((state.activePolicies.censorship ?? 10) * 0.15) - ((state.activePolicies.minority_rights ?? 30) * 0.15) + ((cab.interior.competence - 50) * 0.2),
        judiciary:  40 + (state.systems.freedom * 0.4) - (state.systems.corruption * 0.3) + ((state.activePolicies.women_safety ?? 40) * 0.15) + ((state.activePolicies.minority_rights ?? 30) * 0.15) + ((cab.justice.competence - 50) * 0.2),
        business:   35 + (state.systems.economy * 0.3) - (state.systems.inflation * 0.15) - ((state.activePolicies.corporate_tax ?? 20) * 0.4) - ((state.activePolicies.income_tax ?? 25) * 0.2) - ((state.activePolicies.ubi ?? 0) * 0.15) + ((state.activePolicies.healthcare_priv ?? 20) * 0.2) + ((state.activePolicies.automation_subsidy ?? 0) * 0.2) - ((state.activePolicies.carbon_tax ?? 0) * 0.2) + ((state.activePolicies.imf_cooperation ?? 0) * 0.25),
        media:      40 + (state.systems.freedom * 0.25) - ((state.activePolicies.censorship ?? 10) * 0.45) + ((state.activePolicies.internet_freedom ?? 50) * 0.3),
        academia:   35 + (state.systems.education * 0.35) - ((state.activePolicies.censorship ?? 10) * 0.25) - ((state.activePolicies.religious_edu ?? 30) * 0.2) + ((state.activePolicies.internet_freedom ?? 50) * 0.2)
    };

    for (const key in state.powerCenters) {
        const pc = state.powerCenters[key];
        const target = Math.max(0, Math.min(100, Math.round(targetPowerCenters[key])));
        const oldVal = pc.approval;
        pc.approval = Math.round(oldVal * 0.6 + target * 0.4);
        pc.approval = Math.max(0, Math.min(100, pc.approval));
        
        const diff = pc.approval - oldVal;
        if (diff > 1.5) pc.trend = 1;
        else if (diff < -1.5) pc.trend = -1;
        else pc.trend = 0;

        // --- DEEP HIDDEN STABILITY MECHANICS ---
        
        // 1. Loyalty (Sadakat) calculations
        let targetLoyalty = pc.approval;
        
        // Cabinet matching affects loyalty
        if (key === "military" && cab.defense.ideology === state.ideology) targetLoyalty += 6;
        if (key === "security" && cab.interior.ideology === state.ideology) targetLoyalty += 6;
        if (key === "judiciary" && cab.justice.ideology === state.ideology) targetLoyalty += 6;
        if (key === "business" && cab.economy.ideology === "liberal") targetLoyalty += 6;
        if (key === "academia" && cab.education.ideology === "secular") targetLoyalty += 6;
        
        // Minister loyalty/disloyalty affects centers
        if (key === "security" && cab.interior.loyalty < 55) targetLoyalty -= 10;
        if (key === "military" && cab.defense.loyalty < 55) targetLoyalty -= 10;
        
        // Corruption hurts loyalty
        if (state.systems.corruption > 50) {
            targetLoyalty -= (state.systems.corruption - 50) * 0.25;
        }
        
        // General stability impacts loyalty
        if (state.stability > 75) targetLoyalty += 5;
        else if (state.stability < 40) targetLoyalty -= 10;
        
        pc.loyalty = Math.round(pc.loyalty * 0.7 + Math.max(0, Math.min(100, targetLoyalty)) * 0.3);
        pc.loyalty = Math.max(0, Math.min(100, pc.loyalty));

        // 2. Anger (Öfke) calculations
        let targetAnger = (100 - pc.loyalty) * 0.75 + (100 - pc.approval) * 0.25;
        
        // Special policy irritation triggers
        if (key === "media" && (state.activePolicies.censorship ?? 0) > 40) {
            targetAnger += (state.activePolicies.censorship - 40) * 0.6;
        }
        if (key === "academia" && (state.activePolicies.censorship ?? 0) > 40) {
            targetAnger += (state.activePolicies.censorship - 40) * 0.4;
        }
        if (key === "academia" && (state.activePolicies.religious_edu ?? 30) > 50) {
            targetAnger += (state.activePolicies.religious_edu - 50) * 0.35;
        }
        if (key === "business" && (state.activePolicies.corporate_tax ?? 20) > 25) {
            targetAnger += (state.activePolicies.corporate_tax - 25) * 0.8;
        }
        if (key === "public" && state.systems.unemployment > 40) {
            targetAnger += (state.systems.unemployment - 40) * 0.5;
        }
        if (key === "military" && (state.activePolicies.defense_alliances ?? 40) < 30) {
            targetAnger += (30 - state.activePolicies.defense_alliances) * 0.6;
        }
        
        pc.anger = Math.round(pc.anger * 0.65 + Math.max(0, Math.min(100, targetAnger)) * 0.35);
        pc.anger = Math.max(0, Math.min(100, pc.anger));

        // 3. Organization (Örgütlenme) calculations
        let orgChange = 0;
        if (pc.anger > 50) {
            orgChange += (pc.anger - 50) * 0.25; // Angry groups coordinate
        } else {
            orgChange -= (50 - pc.anger) * 0.15; // Content groups are passive
        }
        
        orgChange += (pc.influence - 20) * 0.1; // Influence provides resources
        
        // Freedom assists organizing
        if (state.systems.freedom > 55) {
            orgChange += (state.systems.freedom - 55) * 0.15;
        }
        
        // Security suppresses organization (except for forces themselves)
        if (key !== "security" && key !== "military") {
            if (state.systems.security > 60) {
                orgChange -= (state.systems.security - 60) * 0.25;
            }
        }
        
        pc.organization = Math.round(pc.organization + orgChange);
        pc.organization = Math.max(1, Math.min(100, pc.organization));

        // 4. Conspiracy Plot (Gizli Plan) updates
        if (pc.loyalty < 45 && pc.anger > 55 && pc.organization > 40) {
            if (!pc.plot) {
                if (key === "military") pc.plot = "darbe_hazirligi";
                else if (key === "business") pc.plot = "ekonomik_sabotaj";
                else if (key === "media") pc.plot = "koordineli_karalama";
                else if (key === "security") pc.plot = "reform_engelleme";
                else pc.plot = "huzursuzluk_plani";
                pc.plotProgress = 10;
            } else {
                const tick = Math.round((pc.anger - 55) * 0.18 + (pc.organization - 40) * 0.15);
                pc.plotProgress = Math.min(100, pc.plotProgress + Math.max(2, tick));
            }
        } else {
            if (pc.plot) {
                pc.plotProgress = Math.max(0, pc.plotProgress - 10);
                if (pc.plotProgress === 0) {
                    pc.plot = null;
                }
            }
        }
    }

    // 9. Active Risks Consequences
    const activeRisks = calculateActiveRisks(state);
    let riskPcPenalty = 0;
    
    activeRisks.forEach(risk => {
        if (risk.id === "protest_risk") {
            state.stability = Math.max(0, state.stability - 4);
        } else if (risk.id === "riot_risk") {
            state.stability = Math.max(0, state.stability - 10);
        } else if (risk.id === "memorandum_risk") {
            state.stability = Math.max(0, state.stability - 8);
            riskPcPenalty += 5;
        } else if (risk.id === "coup_risk") {
            state.stability = Math.max(0, state.stability - 15);
        } else if (risk.id === "capital_flight") {
            state.systems.economy = Math.max(0, state.systems.economy - 8);
            grossExpenses += 1.5; // Drains ₺1.5B quarterly
        } else if (risk.id === "constitutional_crisis") {
            state.stability = Math.max(0, state.stability - 5);
            riskPcPenalty += 8;
        } else if (risk.id === "media_campaign") {
            riskPcPenalty += 4;
        }
    });

    // 6. Financial Balance
    quarterlyBudgetSurplus = (grossIncome - grossExpenses) * 1000000000;
    state.treasury += quarterlyBudgetSurplus;

    // Apply difficulty modifiers to political capital generation
    let pcMultiplier = 1.0;
    if (state.difficulty === "easy") pcMultiplier = 1.25;
    if (state.difficulty === "hard") pcMultiplier = 0.8;

    // 7. Political Capital Generation (tuned down for tighter gameplay)
    let pcGain = 5 + (state.systems.happiness * 0.08) + (state.systems.media * 0.04) - ((100 - state.stability) * 0.09);
    
    // Add bonus political capital if Foreign minister is extremely competent (better diplomatic status)
    pcGain += (cab.foreign.competence - 50) * 0.08;

    // Judiciary influence penalty: strong judiciary restricts government executive reach, decreasing PC generation
    pcGain -= (judInf - 20) * 0.3;

    pcGain = Math.round(pcGain * pcMultiplier);
    
    // Apply risk penalty
    pcGain = Math.max(0, pcGain - riskPcPenalty);
    
    // Apply Faction Passive Buffs and Penalties
    if (state.regimeWatch) {
        const rw = state.regimeWatch;
        
        // 1. Cemaatler
        if (rw.cemaatler.favor >= 70) {
            state.voterGroups.conservatives.approval = Math.min(100, state.voterGroups.conservatives.approval + 3);
            state.voterGroups.religious.approval = Math.min(100, state.voterGroups.religious.approval + 3);
        } else if (rw.cemaatler.favor <= 30) {
            state.voterGroups.conservatives.approval = Math.max(0, state.voterGroups.conservatives.approval - 3);
            if (state.powerCenters && state.powerCenters.public) {
                state.powerCenters.public.plotProgress = Math.min(100, state.powerCenters.public.plotProgress + 2);
            }
        }

        // 2. Kemalist Bürokrasi
        if (rw.kemalist_burokrasi.favor >= 70) {
            state.stability = Math.min(100, state.stability + 1);
            state.systems.security = Math.min(100, state.systems.security + 1);
        } else if (rw.kemalist_burokrasi.favor <= 30) {
            state.stability = Math.max(0, state.stability - 2);
            if (state.powerCenters && state.powerCenters.judiciary) {
                state.powerCenters.judiciary.plotProgress = Math.min(100, state.powerCenters.judiciary.plotProgress + 3);
            }
        }

        // 3. Büyük Sermaye
        if (rw.buyuk_sermaye.favor >= 70) {
            state.systems.economy = Math.min(100, state.systems.economy + 1);
            state.treasury += 100000000; // +₺100M cash bonus
        } else if (rw.buyuk_sermaye.favor <= 30) {
            state.systems.economy = Math.max(0, state.systems.economy - 2);
        }

        // 4. Süper NATO
        if (rw.super_nato.favor >= 70) {
            state.systems.security = Math.min(100, state.systems.security + 2);
            state.systems.freedom = Math.max(0, state.systems.freedom - 1);
        } else if (rw.super_nato.favor <= 30) {
            state.stability = Math.max(0, state.stability - 1);
            pcGain = Math.max(0, pcGain - 1); // leaks intelligence, restricts PC
        }

        // 5. Sebataycılar
        if (rw.sebataycilar.favor >= 70) {
            state.voterGroups.secular.approval = Math.min(100, state.voterGroups.secular.approval + 3);
            state.systems.media = Math.min(100, state.systems.media + 2);
        } else if (rw.sebataycilar.favor <= 30) {
            state.voterGroups.secular.approval = Math.max(0, state.voterGroups.secular.approval - 3);
            state.systems.media = Math.max(0, state.systems.media - 2);
        }
        
        // Faction Drift Calculations (Regime Watch)
        const relEdu = state.activePolicies.religious_edu ?? 30;
        const corpTax = state.activePolicies.corporate_tax ?? 20;
        const freedom = state.systems.freedom;
        const corruption = state.systems.corruption;
        
        // 1. Cemaatler
        let cemFavorChange = (relEdu - 35) * 0.15 - (freedom - 50) * 0.1;
        rw.cemaatler.favor = Math.max(0, Math.min(100, Math.round(rw.cemaatler.favor + cemFavorChange)));
        
        // 2. Kemalist Bürokrasi
        let kemFavorChange = (freedom - 50) * 0.15 - (relEdu - 30) * 0.15 - (corruption - 30) * 0.1;
        rw.kemalist_burokrasi.favor = Math.max(0, Math.min(100, Math.round(rw.kemalist_burokrasi.favor + kemFavorChange)));
        
        // 3. Büyük Sermaye
        let serFavorChange = (25 - corpTax) * 0.4 + (state.systems.economy - 50) * 0.15 - (corruption - 35) * 0.1;
        rw.buyuk_sermaye.favor = Math.max(0, Math.min(100, Math.round(rw.buyuk_sermaye.favor + serFavorChange)));
        
        // 4. Süper NATO
        let natoFavorChange = (state.systems.security - 55) * 0.15 - (freedom - 55) * 0.08;
        rw.super_nato.favor = Math.max(0, Math.min(100, Math.round(rw.super_nato.favor + natoFavorChange)));
        
        // 5. Sebataycılar
        let sebFavorChange = (state.systems.media - 40) * 0.15 - (state.activePolicies.censorship ?? 10) * 0.15 + (state.voterGroups.secular.approval - 50) * 0.1;
        rw.sebataycilar.favor = Math.max(0, Math.min(100, Math.round(rw.sebataycilar.favor + sebFavorChange)));
        
        // Faction Influence slowly adjusts based on favor and other indicators
        rw.cemaatler.influence = Math.max(10, Math.min(90, Math.round(rw.cemaatler.influence + (rw.cemaatler.favor > 60 ? 1 : rw.cemaatler.favor < 40 ? -1 : 0))));
        rw.kemalist_burokrasi.influence = Math.max(10, Math.min(90, Math.round(rw.kemalist_burokrasi.influence + (rw.kemalist_burokrasi.favor > 60 ? 1 : rw.kemalist_burokrasi.favor < 40 ? -1 : 0))));
        rw.buyuk_sermaye.influence = Math.max(10, Math.min(90, Math.round(rw.buyuk_sermaye.influence + (rw.buyuk_sermaye.favor > 60 ? 1 : -0.5))));
        rw.super_nato.influence = Math.max(10, Math.min(90, Math.round(rw.super_nato.influence + (state.systems.security > 65 ? 0.8 : -0.5))));
        rw.sebataycilar.influence = Math.max(10, Math.min(90, Math.round(rw.sebataycilar.influence + (state.systems.media > 60 ? 1 : -0.5))));

        // --- FACTION ALLIANCES & CONSPIRACY PLOTS ---
        // Find angry factions (favor <= 35)
        const angryKeys = [];
        for (const key in rw) {
            rw[key].activeAlliance = null; // Clear old alliance tags
            if (rw[key].favor <= 35) {
                angryKeys.push(key);
            }
        }

        let allianceName = null;
        let allianceType = null;
        if (angryKeys.length >= 2) {
            // Determine alliance type
            if (angryKeys.includes("cemaatler") && angryKeys.includes("kemalist_burokrasi")) {
                allianceName = "Milli Selamet İttifakı";
                allianceType = "cemaat_kemalist";
            } else if (angryKeys.includes("cemaatler") && angryKeys.includes("buyuk_sermaye")) {
                allianceName = "Anadolu Sermaye Koalisyonu";
                allianceType = "cemaat_sermaye";
            } else if (angryKeys.includes("super_nato") && angryKeys.includes("buyuk_sermaye")) {
                allianceName = "Atlantikçi Blok";
                allianceType = "nato_sermaye";
            } else if (angryKeys.includes("kemalist_burokrasi") && angryKeys.includes("super_nato")) {
                allianceName = "Derin Devlet Cephesi";
                allianceType = "kemalist_nato";
            } else if (angryKeys.includes("buyuk_sermaye") && angryKeys.includes("sebataycilar")) {
                allianceName = "Medya-Finans Karteli";
                allianceType = "sermaye_seb";
            } else {
                allianceName = "Hükümet Karşıtı Koalisyon";
                allianceType = "generic_alliance";
            }

            // Set active alliance tag
            angryKeys.forEach(k => {
                rw[k].activeAlliance = allianceName;
            });
        }

        // Update plot progression
        for (const key in rw) {
            const f = rw[key];
            if (f.favor <= 35) {
                let gain = 4; // Individual plot gain
                if (f.activeAlliance) {
                    gain = 8; // Faster gain in coalition!
                }
                f.plotProgress = Math.min(100, (f.plotProgress || 0) + gain);
                
                // Log warning if progress is high
                if (f.plotProgress >= 60 && f.plotProgress % 2 === 0) {
                    const origin = f.activeAlliance ? `${f.activeAlliance} ittifakı` : `${f.name}`;
                    state.logs.push(`İSTİHBARAT UYARISI: ${origin} tarafından hükümete karşı yürütülen gizli plan olgunlaşıyor (İlerleme: %${f.plotProgress})!`);
                }
            } else {
                // Decay plot progress if faction is happy/neutral
                f.plotProgress = Math.max(0, (f.plotProgress || 0) - 10);
            }
        }
    }

    state.politicalCapital = Math.max(0, Math.min(200, state.politicalCapital + pcGain));

    // ==========================================
    // FACTION POWER VACUUM DRIFT & NORMALIZATION (Zero-Sum Game)
    // ==========================================
    if (state.regimeWatch) {
        const rw = state.regimeWatch;
        
        // 1. Enforce minimum influence of 5
        for (const key in rw) {
            rw[key].influence = Math.max(5, rw[key].influence);
        }
        
        // 2. Power Vacuum Drift
        if (rw.cemaatler.influence < 15) {
            rw.kemalist_burokrasi.influence += 1.5;
            rw.cemaatler.influence = Math.max(5, rw.cemaatler.influence - 1.5);
        }
        if (rw.kemalist_burokrasi.influence < 15) {
            rw.buyuk_sermaye.influence += 1.5;
            rw.kemalist_burokrasi.influence = Math.max(5, rw.kemalist_burokrasi.influence - 1.5);
        }
        if (rw.buyuk_sermaye.influence < 15) {
            rw.super_nato.influence += 0.75;
            rw.sebataycilar.influence += 0.75;
            rw.buyuk_sermaye.influence = Math.max(5, rw.buyuk_sermaye.influence - 1.5);
        }
        if (rw.super_nato.influence < 15) {
            rw.kemalist_burokrasi.influence += 1.5;
            rw.super_nato.influence = Math.max(5, rw.super_nato.influence - 1.5);
        }
        if (rw.sebataycilar.influence < 15) {
            rw.cemaatler.influence += 1.5;
            rw.sebataycilar.influence = Math.max(5, rw.sebataycilar.influence - 1.5);
        }

        // 3. Zero-Sum Normalization: scale all influences so their sum is exactly 210
        let sum = 0;
        for (const key in rw) {
            sum += rw[key].influence;
        }
        if (sum > 0) {
            for (const key in rw) {
                rw[key].influence = Math.max(5, Math.min(95, Math.round((rw[key].influence / sum) * 210)));
            }
        }
    }

    // ==========================================
    // PURGE PROGRESSION (Multiphase Purges)
    // ==========================================
    if (state.activePurge && state.activePurge.target) {
        const p = state.activePurge;
        if (p.stage === 1) {
            // Stage 1 -> 2 (Evidence Collection)
            const jud = state.powerCenters.judiciary.approval;
            const sec = state.systems.security;
            const gain = Math.round((jud + sec) / 7 + Math.random() * 5);
            p.evidenceQuality = Math.min(100, p.evidenceQuality + gain);
            p.stage = 2;
            state.logs.push(`OPERASYON SÜRECİ (AŞAMA 2): ${state.regimeWatch[p.target].name} grubuna karşı delil toplama evresine geçildi. Kanıt kalitesi artıyor.`);
        } else if (p.stage === 2) {
            // Stage 2 -> 3 (Public Preparation)
            const med = state.powerCenters.media.approval;
            const pub = state.powerCenters.public.approval;
            const gain = Math.round((med + pub) / 7 + Math.random() * 5);
            p.publicPrep = Math.min(100, p.publicPrep + gain);
            p.stage = 3;
            state.logs.push(`OPERASYON SÜRECİ (AŞAMA 3): ${state.regimeWatch[p.target].name} tasfiyesi için kamuoyu hazırlığı evresine geçildi. Medya desteği aranıyor.`);
        } else if (p.stage === 3) {
            // Stage 3 -> 4 (Execution Decision)
            p.stage = 4;
            state.logs.push(`OPERASYON KRİTİK EŞİKTE (AŞAMA 4): ${state.regimeWatch[p.target].name} tasfiye planı tamamlandı. Operasyon kararı bekleniyor!`);
        }
    }

    // ==========================================
    // GİZLİ DOSYALAR (Secret Files Resolution & Generation)
    // ==========================================
    // 1. Resolve ignored files from previous turn - increased penalties for ignoring true threats
    if (state.secretFile && state.secretFile.status === 'ignored') {
        if (state.secretFile.isTrue) {
            const stabilityPenalty = Math.round(25 + Math.random() * 10); // 25% - 35% stability penalty
            state.stability = Math.max(0, state.stability - stabilityPenalty);
            state.powerCenters.public.approval = Math.max(0, state.powerCenters.public.approval - 15);
            state.systems.security = Math.max(0, state.systems.security - 12);
            state.logs.push(`SIZDIRILAN BELGELER & MİLLİ KRİZ: Önceden görmezden geldiğiniz MİT raporu doğru çıktı! Gizli plan gerçekleşti. İstikrar -%${stabilityPenalty}, Güvenlik -%12, Halk Desteği -%15!`);
            state.systems.media = Math.max(0, state.systems.media - 8);
        } else {
            state.logs.push("İSTİHBARAT ARŞİVİ: Görmezden gelinen raporun asılsız olduğu anlaşıldı. Kriz atlatıldı.");
        }
        state.secretFile = null;
    }
    // 2. Resolve monitored files - increased rewards for technical tracking
    else if (state.secretFile && state.secretFile.status === 'monitored') {
        if (state.secretFile.isTrue) {
            state.stability = Math.min(100, state.stability + 10);
            state.systems.security = Math.min(100, state.systems.security + 6);
            state.politicalCapital = Math.min(200, state.politicalCapital + 15);
            state.logs.push(`TEKNİK TAKİP BAŞARILI: ${state.secretFile.text.substring(0, 30)}... takibi sonuç verdi, komplo planı belgelendi ve çökertildi! (+15 PC, +10 İstikrar, +6 Güvenlik)`);
        } else {
            state.logs.push("TAKİP SONUCU: Hedeflerin rutin faaliyetler içinde olduğu anlaşıldı, dosya kapatıldı.");
        }
        state.secretFile = null;
    }
    // 3. Resolve investigated files
    else if (state.secretFile && state.secretFile.status === 'investigated') {
        state.secretFile = null;
    }

    // 4. Generate new Secret File for next turn
    const secretFileDatabase = [
        {
            id: "mit_aym_muhalefet",
            text: "Yüksek yargı mensuplarının muhalefet liderleriyle gizli anayasa taslağı ve yetki devri planları hazırladığı tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_darbe_toplantisi",
            text: "Ordu içindeki cuntacı kliği temsil eden subayların Ankara dışındaki bir villada gizli darbe toplantıları yaptığı bildirildi.",
            condition: (s) => true
        },
        {
            id: "mit_cemaat_atama",
            text: "Emniyet ve yargı bürokrasisinde yuvalanan radikal bir dini cemaatin, stratejik kadrolara yerleştirmek üzere yasadışı atama listesi hazırladığı saptandı.",
            condition: (s) => true
        },
        {
            id: "mit_holding_sermaye",
            text: "Büyük holdinglerin ve finans spekülatörlerinin koordine bir sermaye kaçırma operasyonuyla Türk Lirası'nı çökerteceği istihbaratı alındı.",
            condition: (s) => true
        },
        {
            id: "mit_kontrgerilla_sabotaj",
            text: "Gladio ve NATO bağlantılı derin devlet unsurlarının, doğalgaz boru hatları ve kritik barajlara yönelik sabotaj eylemleri planladığı sızdı.",
            condition: (s) => true
        },
        {
            id: "mit_medya_istifa",
            text: "Kültürel elitlerin ve medya baronlarının koordine bir karalama kampanyasıyla kabineyi topluca istifaya sürükleme planı deşifre edildi.",
            condition: (s) => true
        },
        {
            id: "mit_tarikat_ihale",
            text: "Milli Savunma Bakanlığı içindeki bazı tarikat hücrelerinin, devlet ihalelerini doğrudan kendi cemaat vakıflarına aktardığı bilgisi sızdırılmak üzere.",
            condition: (s) => true
        },
        {
            id: "mit_kabine_darbesi",
            text: "Kabine içindeki bazı bakanların parti içi muhalefetle işbirliği yaparak genel başkanlık darbesi planladığı rapor edildi.",
            condition: (s) => true
        },
        {
            id: "mit_kamu_bankasi_doviz",
            text: "Kamu bankalarının arka kapıdan milyarlarca dolar satarak kuru baskılama çabalarının sızdırılacağı ve finansal panik yaratılacağı ihbarı alındı.",
            condition: (s) => true
        },
        {
            id: "mit_sendika_kaos",
            text: "Radikal sol sendika liderlerinin, sanayi havzalarında üretimi süresiz durdurmak üzere illegal koordinasyon hücreleri kurduğu belirlendi.",
            condition: (s) => true
        },
        {
            id: "mit_ab_fonu_fonlama",
            text: "AB merkezli vakıfların, çevre platformları maskesi altında nükleer santral ve mega projeleri durdurmak için fon aktardığı tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_emniyet_cemaat_tasfiye",
            text: "Emniyetteki bir cemaat kliği, seküler polis müdürlerine karşı sahte kaset ve kumpas delilleri üretirken suçüstü tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_yargi_rusvet_zinciri",
            text: "Yüksek yargı üyeleri ile organize suç örgütleri arasında milyon dolarlık tahliye rüşvet zinciri kurulduğu bilgisi ulaştı.",
            condition: (s) => true
        },
        {
            id: "mit_universite_genc_protesto",
            text: "Üniversitelerde sol öğrenci kulüplerinin, rejim karşıtı kitlesel sokak çatışmaları başlatmak üzere Molotof deposu kurduğu tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_savunma_sanayi_casusluk",
            text: "Milli savunma sanayi şirketindeki bazı yazılım mühendislerinin, insansız sistem kodlarını yabancı istihbarat servislerine sattığı belirlendi.",
            condition: (s) => true
        },
        {
            id: "mit_diyanet_vakif_yolsuzluk",
            text: "Diyanet bütçesinden bazı cemaatlerin lüks araç alımları ve tarikat vakıf binalarının inşasının fonlandığına dair belgeler basına sızmak üzere.",
            condition: (s) => true
        },
        {
            id: "mit_belediye_halk_parasi",
            text: "Muhalefet belediyelerinin, sosyal yardım adı altında terör örgütünün gençlik yapılanmalarına finansal fon aktardığı belgelendi.",
            condition: (s) => true
        },
        {
            id: "mit_hazine_tahvil_sabotaj",
            text: "Yabancı fonların devlet tahvillerine yönelik koordine bir satış dalgasıyla Türkiye'yi temerrüde zorlama planı saptandı.",
            condition: (s) => true
        },
        {
            id: "mit_tarim_gida_karteli",
            text: "Büyük tarım ve gıda kartellerinin enflasyon algısı oluşturmak ve hükümeti devirmek için tonlarca patates ve soğanı çürüterek imha ettiği saptandı.",
            condition: (s) => true
        },
        {
            id: "mit_kripto_vergi_kacakciligi",
            text: "İş dünyasından önemli isimlerin ve bürokratların kripto borsaları üzerinden yurt dışına milyarlarca dolarlık vergisiz servet transfer ettiği belirlendi.",
            condition: (s) => true
        },
        {
            id: "mit_liman_kacakcilik",
            text: "Kritik bir Ege limanında gümrük yetkililerinin rüşvet karşılığı yasadışı kargo ve tehlikeli madde geçişine göz yumduğu istihbaratı ulaştı.",
            condition: (s) => true
        },
        {
            id: "mit_yargic_tehdit",
            text: "Hükümetin kritik tasfiye davasına bakan mahkeme başkanına yönelik mafya tarafından şantaj veya suikast hazırlığı yapıldığı saptandı.",
            condition: (s) => true
        },
        {
            id: "mit_enerji_siber_saldiri",
            text: "Yabancı bir siber cunta grubunun, devletin elektrik dağıtım ve doğalgaz SCADA şebekesine siber saldırı düzenleme hazırlığı tespit edildi.",
            condition: (s) => true
        },
        {
            id: "mit_sinir_kacakci_gecis",
            text: "Güney sınırındaki bazı yerel milis şefleri ve korucuların rüşvet karşılığı radikal militan geçişlerine yardım ettiği rapor edildi.",
            condition: (s) => true
        },
        {
            id: "mit_yabanci_elci_fonu",
            text: "Bir Batı elçiliğinin, sivil toplum örgütleri ve gazeteciler üzerinden etki ajanlığı faaliyetlerini fonlamak için gizli banka hesapları kullandığı belirlendi.",
            condition: (s) => true
        }
    ];

    if (!state.triggeredSecretFiles) {
        state.triggeredSecretFiles = [];
    }

    // Filter by conditions and not triggered yet
    let availableFiles = secretFileDatabase.filter(file => file.condition(state) && !state.triggeredSecretFiles.includes(file.id));

    if (availableFiles.length === 0) {
        // Fallback: search for any untriggered reports regardless of condition
        availableFiles = secretFileDatabase.filter(file => !state.triggeredSecretFiles.includes(file.id));
    }

    if (availableFiles.length === 0) {
        // If all reports have been shown, reset history to allow repeats
        state.triggeredSecretFiles = [];
        availableFiles = secretFileDatabase;
    }

    // Pick one
    const chosenFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
    state.triggeredSecretFiles.push(chosenFile.id);

    const reliability = Math.round(25 + Math.random() * 60); // 25% - 85%
    const isTrue = Math.random() < (reliability / 100);

    state.secretFile = {
        id: 200 + state.turn,
        secretFileId: chosenFile.id, // Keep track of template ID
        text: chosenFile.text,
        reliability: reliability,
        isTrue: isTrue,
        status: 'pending'
    };

    // ==========================================
    // CABINET MINISTER LOYALTY DRIFT (Ideology Clash)
    // ==========================================
    if (state.cabinet) {
        for (const portfolio in state.cabinet) {
            const min = state.cabinet[portfolio];
            let clash = false;
            
            // Check clash conditions
            if (state.ideology === "conservative" || (state.regimeWatch && state.regimeWatch.cemaatler.favor > 65)) {
                if (min.ideology === "secular" || min.ideology === "liberal" || min.ideology === "center_left") {
                    clash = true;
                }
            }
            if (state.ideology === "kemalist_secular" || (state.regimeWatch && state.regimeWatch.kemalist_burokrasi.favor > 65)) {
                if (min.ideology === "conservative" || min.ideology === "religious" || min.ideology === "islamist") {
                    clash = true;
                }
            }
            if (state.ideology === "liberal" || (state.regimeWatch && state.regimeWatch.buyuk_sermaye.favor > 65)) {
                if (min.ideology === "leftist" || min.ideology === "nationalist") {
                    clash = true;
                }
            }
            
            if (clash) {
                min.loyalty = Math.max(0, min.loyalty - Math.round(4 + Math.random() * 4));
            } else {
                min.loyalty = Math.min(100, min.loyalty + 2);
            }
        }
    }

    // ==========================================
    // FACTION DEMANDS SYSTEM
    // ==========================================
    if (state.activeDemand) {
        const d = state.activeDemand;
        const currentValue = state.activePolicies[d.target] ?? null;
        let isMet = false;
        
        if (d.op === "gte" && currentValue !== null && currentValue >= d.value) {
            isMet = true;
        } else if (d.op === "lte" && currentValue !== null && currentValue <= d.value) {
            isMet = true;
        } else if (d.op === "null" && currentValue === null) {
            isMet = true;
        }
        
        if (isMet) {
            const faction = state.regimeWatch[d.faction];
            if (faction) {
                faction.favor = Math.min(100, faction.favor + 20);
            }
            state.stability = Math.min(100, state.stability + 5);
            state.politicalCapital = Math.min(200, state.politicalCapital + 8);
            state.logs.push(`YASA TALEBİ YERİNE GETİRİLDİ: ${faction ? faction.name : d.faction} talebinin yasalaşması üzerine desteğini artırdı! (+20 İlişki, +5 İstikrar, +8 PC)`);
            state.activeDemand = null;
        } else if (state.turn >= d.deadline) {
            const faction = state.regimeWatch[d.faction];
            if (faction) {
                faction.favor = Math.max(0, faction.favor - 25);
            }
            state.logs.push(`YASA TALEBİ BAŞARISIZ: ${faction ? faction.name : d.faction} grubunun talep ettiği yasa süresi içinde çıkarılmadı! İlişki -25.`);
            state.activeDemand = null;
        }
    }

    if (!state.activeDemand && state.turn >= 2 && Math.random() < 0.35) {
        const demandDatabase = [
            {
                faction: "cemaatler",
                target: "religious_edu",
                value: 50,
                op: "gte",
                text: "Cemaatler, din eğitimi ağırlığının (religious_edu) en az %50 seviyesine çıkarılmasını istiyor."
            },
            {
                faction: "cemaatler",
                target: "censorship",
                value: 40,
                op: "gte",
                text: "Cemaatler, sosyal ahlak yasası uyarınca sansürün (censorship) en az %40 yapılmasını istiyor."
            },
            {
                faction: "kemalist_burokrasi",
                target: "religious_edu",
                value: 20,
                op: "lte",
                text: "Kemalist Bürokrasi, din eğitimi ağırlığının (religious_edu) en fazla %20'ye indirilmesini talep ediyor."
            },
            {
                faction: "kemalist_burokrasi",
                target: "minority_rights",
                value: 40,
                op: "gte",
                text: "Kemalist Bürokrasi, anayasal güvence için azınlık haklarının (minority_rights) en az %40 yapılmasını istiyor."
            },
            {
                faction: "buyuk_sermaye",
                target: "corporate_tax",
                value: 15,
                op: "lte",
                text: "Büyük Sermaye, kurumlar vergisinin (corporate_tax) en fazla %15 seviyesine çekilmesini istiyor."
            },
            {
                faction: "buyuk_sermaye",
                target: "income_tax",
                value: 20,
                op: "lte",
                text: "Büyük Sermaye, gelir vergisinin (income_tax) en fazla %20 yapılmasını istiyor."
            },
            {
                faction: "super_nato",
                target: "police_funding",
                value: 60,
                op: "gte",
                text: "Süper NATO, terörle mücadele için polis bütçesinin (police_funding) en az %60 olmasını talep ediyor."
            },
            {
                faction: "super_nato",
                target: "border_control",
                value: 50,
                op: "gte",
                text: "Süper NATO, sınır güvenliğinin (border_control) en az %50'ye çıkarılmasını istiyor."
            },
            {
                faction: "sebataycilar",
                target: "censorship",
                value: 20,
                op: "lte",
                text: "Sebataycı seçkinler, basın özgürlüğü için sansürün (censorship) en fazla %20 yapılmasını istiyor."
            },
            {
                faction: "sebataycilar",
                target: "education_budget",
                value: 55,
                op: "gte",
                text: "Sebataycı seçkinler, bilimsel kalkınma için eğitim bütçesinin (education_budget) en az %55 olmasını talep ediyor."
            }
        ];

        const picked = demandDatabase[Math.floor(Math.random() * demandDatabase.length)];
        state.activeDemand = {
            faction: picked.faction,
            target: picked.target,
            value: picked.value,
            op: picked.op,
            text: picked.text,
            deadline: state.turn + 3
        };
        state.logs.push(`GÜÇ GRUBU TALEBİ: ${state.regimeWatch[picked.faction].name} hükümete bir yasa talebi iletti! Talep: ${picked.text} (Süre: 3 Çeyrek)`);
    }

    // ==========================================
    // CASCADE EFFECTS ENGINE (Zincirleme Etkiler)
    // ==========================================
    runCascadeEffects(state);

    // ==========================================
    // VOTER ALLIANCE DETECTION (Seçmen İttifakları)
    // ==========================================
    checkVoterAlliances(state);

    // ==========================================
    // IDEOLOGY DRIFT (İdeoloji Kayması)
    // ==========================================
    updateIdeologyDrift(state);

    return {
        surplus: quarterlyBudgetSurplus,
        pcGain: pcGain,
        protestRisk: Math.round(averageProtestRisk)
    };
}

// ==========================================
// CASCADE EFFECTS (Zincirleme Etkiler Motoru)
// ==========================================
function runCascadeEffects(state) {
    const cascadeLogs = [];

    // 1. Economy collapse → Worker/Retiree/Public rage
    if (state.systems.economy < 35) {
        const severity = (35 - state.systems.economy) * 0.4;
        state.voterGroups.workers.approval = Math.max(0, Math.round(state.voterGroups.workers.approval - severity));
        state.voterGroups.retirees.approval = Math.max(0, Math.round(state.voterGroups.retirees.approval - severity * 0.8));
        state.powerCenters.public.approval = Math.max(0, Math.round(state.powerCenters.public.approval - severity * 0.6));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: Ekonomik çöküş işçi ve emekli kesimlerinde sert tepkiye yol açıyor.`);
    }

    // 2. Freedom suppression → Academia/Media revolt
    if (state.systems.freedom < 30) {
        const severity = (30 - state.systems.freedom) * 0.5;
        state.powerCenters.academia.approval = Math.max(0, Math.round(state.powerCenters.academia.approval - severity));
        state.powerCenters.media.approval = Math.max(0, Math.round(state.powerCenters.media.approval - severity * 0.8));
        state.voterGroups.students.approval = Math.max(0, Math.round(state.voterGroups.students.approval - severity * 0.6));
        state.voterGroups.youth.approval = Math.max(0, Math.round(state.voterGroups.youth.approval - severity * 0.5));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: Özgürlük baskısı akademi ve medyada isyan dalgası başlatıyor.`);
    }

    // 3. High security → Military power creep
    if (state.systems.security > 80) {
        const creep = (state.systems.security - 80) * 0.15;
        state.powerCenters.military.influence = Math.min(50, state.powerCenters.military.influence + creep);
        state.powerCenters.security.influence = Math.min(50, state.powerCenters.security.influence + creep * 0.5);
        state.systems.freedom = Math.max(0, Math.round(state.systems.freedom - creep * 0.8));
        if (creep > 1) cascadeLogs.push(`ZİNCİRLEME ETKİ: Aşırı güvenlik politikaları ordu ve emniyetin nüfuzunu artırıyor.`);
    }

    // 4. High inflation → Worker/Retiree/Farmer devastation
    if (state.systems.inflation > 60) {
        const severity = (state.systems.inflation - 60) * 0.4;
        state.voterGroups.workers.approval = Math.max(0, Math.round(state.voterGroups.workers.approval - severity));
        state.voterGroups.retirees.approval = Math.max(0, Math.round(state.voterGroups.retirees.approval - severity * 1.2));
        state.voterGroups.farmers.approval = Math.max(0, Math.round(state.voterGroups.farmers.approval - severity * 0.7));
        state.voterGroups.civil_servants.approval = Math.max(0, Math.round(state.voterGroups.civil_servants.approval - severity * 0.8));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: Enflasyon patlaması dar gelirlileri eziyor, sokak protestoları yayılıyor.`);
    }

    // 5. High corruption → Judiciary auto-opposition
    if (state.systems.corruption > 50) {
        const severity = (state.systems.corruption - 50) * 0.35;
        state.powerCenters.judiciary.approval = Math.max(0, Math.round(state.powerCenters.judiciary.approval - severity));
        state.powerCenters.judiciary.anger = Math.min(100, Math.round(state.powerCenters.judiciary.anger + severity * 0.5));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: Artan yolsuzluk yargıyı hükümete karşı mobilize ediyor.`);
    }

    // 6. Media control + bad economy = hidden dissent explosion
    if (state.systems.media > 60 && state.systems.economy < 40) {
        state.powerCenters.public.anger = Math.min(100, state.powerCenters.public.anger + 3);
        state.stability = Math.max(0, state.stability - 2);
        cascadeLogs.push(`ZİNCİRLEME ETKİ: Medya propagandası ekonomik gerçekleri örtbas ediyor ama halk öfkesi gizlice kaynıyor.`);
    }

    // 7. Education boom → Secularization pressure
    if (state.systems.education > 70) {
        const drift = (state.systems.education - 70) * 0.08;
        state.voterGroups.secular.approval = Math.min(100, Math.round(state.voterGroups.secular.approval + drift));
        state.voterGroups.youth.approval = Math.min(100, Math.round(state.voterGroups.youth.approval + drift * 0.6));
        state.voterGroups.conservatives.approval = Math.max(0, Math.round(state.voterGroups.conservatives.approval - drift * 0.4));
        state.voterGroups.religious.approval = Math.max(0, Math.round(state.voterGroups.religious.approval - drift * 0.5));
    }

    // 8. Unemployment crisis → Youth radicalization
    if (state.systems.unemployment > 55) {
        const severity = (state.systems.unemployment - 55) * 0.3;
        state.voterGroups.youth.approval = Math.max(0, Math.round(state.voterGroups.youth.approval - severity));
        state.voterGroups.students.protestRisk = Math.min(100, Math.round(state.voterGroups.students.protestRisk + severity));
        state.powerCenters.public.anger = Math.min(100, Math.round(state.powerCenters.public.anger + severity * 0.5));
        if (severity > 3) cascadeLogs.push(`ZİNCİRLEME ETKİ: İşsizlik krizi gençleri radikalleştiriyor, kampüslerde huzursuzluk artıyor.`);
    }

    // 9. Decree rule + ignore courts → Judiciary crisis accelerator
    if ((state.activePolicies.decree_rule ?? 0) > 30 && (state.activePolicies.ignore_courts ?? 0) > 30) {
        state.powerCenters.judiciary.approval = Math.max(0, state.powerCenters.judiciary.approval - 5);
        state.powerCenters.judiciary.anger = Math.min(100, state.powerCenters.judiciary.anger + 5);
        cascadeLogs.push(`ZİNCİRLEME ETKİ: Kararname yönetimi ve yargı kararlarını tanımama, anayasal kriz riskini tırmandırıyor.`);
    }

    // 10. Private militia → Military jealousy and anger
    if ((state.activePolicies.private_militia ?? 0) > 20) {
        const milAnger = ((state.activePolicies.private_militia ?? 0) - 20) * 0.15;
        state.powerCenters.military.approval = Math.max(0, Math.round(state.powerCenters.military.approval - milAnger));
        state.powerCenters.military.anger = Math.min(100, Math.round(state.powerCenters.military.anger + milAnger * 0.8));
        if (milAnger > 2) cascadeLogs.push(`ZİNCİRLEME ETKİ: Paramiliter milis güçleri orduyu rahatsız ediyor, kışlada darbe söylentileri yayılıyor.`);
    }

    // Add cascade logs to state
    cascadeLogs.forEach(log => state.logs.push(log));
}

// ==========================================
// VOTER ALLIANCE SYSTEM (Seçmen İttifakları)
// ==========================================
function checkVoterAlliances(state) {
    const alliances = [];
    const vg = state.voterGroups;

    // 1. EMEK CEPHESİ (Labor Front) - Workers + Leftists + Students
    if (vg.workers.approval < 30 && vg.leftists.approval < 30 && vg.students.approval < 35) {
        alliances.push({
            id: "emek_cephesi",
            name: "Emek Cephesi",
            members: ["İşçiler", "Solcular", "Öğrenciler"],
            threat: "Genel Grev ve Fabrika İşgalleri",
            severity: "critical",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "emek_cephesi")?.progress || 0) + 12)
        });
    }

    // 2. MİLLİYETÇİ BLOK - Nationalists + Conservatives + Farmers
    if (vg.nationalists.approval < 30 && vg.conservatives.approval < 30 && vg.farmers.approval < 35) {
        alliances.push({
            id: "milliyetci_blok",
            name: "Milliyetçi Blok",
            members: ["Milliyetçiler", "Muhafazakarlar", "Çiftçiler"],
            threat: "Büyük Miting ve Hükümet İstifası Talebi",
            severity: "critical",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "milliyetci_blok")?.progress || 0) + 10)
        });
    }

    // 3. LİBERAL MUHALEFET - Liberals + Business + Secular
    if (vg.liberals.approval < 30 && vg.business.approval < 30 && vg.secular.approval < 35) {
        alliances.push({
            id: "liberal_muhalefet",
            name: "Liberal Muhalefet Cephesi",
            members: ["Liberaller", "İş Dünyası", "Seküler Kesim"],
            threat: "Sermaye Kaçışı ve Medya Bombardımanı",
            severity: "high",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "liberal_muhalefet")?.progress || 0) + 10)
        });
    }

    // 4. ETNİK DİRENİŞ - Kurds + Immigrants + Leftists
    if (vg.kurds.approval < 25 && vg.immigrants.approval < 30 && vg.leftists.approval < 30) {
        alliances.push({
            id: "etnik_direnis",
            name: "Etnik Direniş Hareketi",
            members: ["Kürt Seçmen", "Göçmenler", "Solcular"],
            threat: "Bölgesel İsyan ve Sivil İtaatsizlik",
            severity: "high",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "etnik_direnis")?.progress || 0) + 8)
        });
    }

    // 5. GENÇLİK İSYANI - Youth + Students + Workers
    if (vg.youth.approval < 25 && vg.students.approval < 25 && vg.workers.approval < 30) {
        alliances.push({
            id: "genclik_isyani",
            name: "Gençlik İsyanı",
            members: ["Gençler", "Öğrenciler", "İşçiler"],
            threat: "Kampüs İşgalleri ve Sokak Çatışmaları",
            severity: "critical",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "genclik_isyani")?.progress || 0) + 12)
        });
    }

    // 6. DİNDAR KOALİSYON - Religious + Conservatives vs government
    if (vg.religious.approval < 25 && vg.conservatives.approval < 30) {
        alliances.push({
            id: "dindar_koalisyon",
            name: "Dindar Koalisyon",
            members: ["Dinciler", "Muhafazakarlar"],
            threat: "Cami Vaazlarında İsyan Çağrısı ve Sivil İtaatsizlik",
            severity: "high",
            progress: Math.min(100, (state.voterAlliances.find(a => a.id === "dindar_koalisyon")?.progress || 0) + 10)
        });
    }

    // Decay progress for alliances that no longer meet conditions
    const previousAlliances = state.voterAlliances || [];
    previousAlliances.forEach(prev => {
        if (!alliances.find(a => a.id === prev.id)) {
            prev.progress = Math.max(0, prev.progress - 15);
            if (prev.progress > 0) {
                alliances.push(prev);
            }
        }
    });

    // Log warnings for high-progress alliances
    alliances.forEach(a => {
        if (a.progress >= 70 && a.progress % 2 === 0) {
            state.logs.push(`⚠️ SEÇMEN İTTİFAKI ALARMI: "${a.name}" (${a.members.join(' + ')}) komplo planı olgunlaşıyor (%${a.progress})! Tehdit: ${a.threat}`);
        }
    });

    state.voterAlliances = alliances;
}

// ==========================================
// IDEOLOGY DRIFT (İdeoloji Kayma Sistemi)
// ==========================================
function updateIdeologyDrift(state) {
    if (!state.ideologyDrift) {
        state.ideologyDrift = { conservative: 0, kemalist_secular: 0, center_left: 0, liberal: 0, nationalist: 0, technocrat: 0 };
    }

    const drift = state.ideologyDrift;
    const ap = state.activePolicies;

    // Conservative drift triggers
    if ((ap.censorship ?? 0) > 40) drift.conservative += 2;
    if ((ap.religious_edu ?? 0) > 50) drift.conservative += 3;
    if ((ap.laiklik_abolition ?? 0) > 20) drift.conservative += 4;
    if ((ap.multilateral_law ?? 0) > 20) drift.conservative += 3;
    if ((ap.mandatory_ottoman ?? 0) > 20) drift.conservative += 3;

    // Kemalist secular drift triggers
    if ((ap.ban_religious_sects ?? 0) > 30) drift.kemalist_secular += 3;
    if (state.systems.freedom > 55 && (ap.religious_edu ?? 0) < 20) drift.kemalist_secular += 2;
    if ((ap.end_uni_autonomy ?? 0) < 10 && state.systems.education > 60) drift.kemalist_secular += 1;

    // Center-left drift triggers
    if ((ap.ubi ?? 0) > 30) drift.center_left += 3;
    if ((ap.political_amnesty ?? 0) > 30) drift.center_left += 3;
    if ((ap.land_reform ?? 0) > 30) drift.center_left += 4;
    if ((ap.women_safety ?? 0) > 60) drift.center_left += 2;

    // Liberal drift triggers
    if ((ap.corporate_tax ?? 20) < 15) drift.liberal += 2;
    if ((ap.healthcare_priv ?? 0) > 40) drift.liberal += 2;
    if ((ap.imf_cooperation ?? 0) > 30) drift.liberal += 3;
    if ((ap.internet_freedom ?? 50) > 70) drift.liberal += 1;
    if ((ap.privatize_water ?? 0) > 30) drift.liberal += 2;

    // Nationalist drift triggers
    if ((ap.capital_punishment ?? 0) > 30) drift.nationalist += 2;
    if ((ap.conscription_extend ?? 0) > 30) drift.nationalist += 3;
    if ((ap.nato_exit ?? 0) > 30) drift.nationalist += 4;
    if ((ap.seize_foreign_assets ?? 0) > 30) drift.nationalist += 3;
    if ((ap.border_control ?? 30) > 60) drift.nationalist += 2;
    if ((ap.migrant_repatriation ?? 0) > 40) drift.nationalist += 2;

    // Technocrat drift triggers
    if ((ap.automation_subsidy ?? 0) > 40) drift.technocrat += 2;
    if (state.systems.education > 65) drift.technocrat += 1;
    if ((ap.nuclear_plants ?? 0) > 30) drift.technocrat += 2;
    if ((ap.ban_gasoline_cars ?? 0) > 30) drift.technocrat += 2;

    // Decay all drift scores slowly toward 0
    for (const key in drift) {
        if (drift[key] > 0) drift[key] = Math.max(0, drift[key] - 1);
    }

    // Check if drift is strong enough to suggest ideology change
    const maxDrift = Math.max(...Object.values(drift));
    const maxKey = Object.keys(drift).find(k => drift[k] === maxDrift);

    if (maxDrift >= 25 && maxKey !== state.ideology) {
        state.logs.push(`⚠️ İDEOLOJİK KAYMA: Politikalarınız sizi "${getIdeologyLabel(maxKey)}" yönüne doğru çekiyor (Baskı: ${maxDrift}). İdeolojik dönüşüm kapınızda!`);
    }
}

function getIdeologyLabel(id) {
    const labels = {
        conservative: "Muhafazakâr",
        kemalist_secular: "Kemalist / Laik",
        center_left: "Merkez Sol",
        liberal: "Liberal",
        nationalist: "Milliyetçi",
        technocrat: "Teknokrat"
    };
    return labels[id] || id;
}

export { checkVoterAlliances, updateIdeologyDrift, getIdeologyLabel };


export function calculateActiveRisks(state) {
    const risks = [];
    if (!state.powerCenters) return risks;

    if (state.powerCenters.public.approval < 20) {
        risks.push({
            id: "protest_risk",
            name: "Protesto Riski",
            desc: "Düşük halk desteği nedeniyle sokak eylemleri ve protestolar yaygınlaşıyor.",
            severity: "medium"
        });
    }
    if (state.powerCenters.public.approval < 10) {
        risks.push({
            id: "riot_risk",
            name: "İsyan Riski",
            desc: "Halk desteğinin tamamen çökmesiyle rejim karşıtı kitlesel isyanlar tetiklenmek üzere.",
            severity: "high"
        });
    }
    if (state.powerCenters.military.approval < 20 && state.stability < 40) {
        risks.push({
            id: "memorandum_risk",
            name: "Askeri Muhtıra Riski",
            desc: "Ordu komuta kademesi istikrarsızlıktan rahatsız, hükümete bildiri yayınlama eşiğinde.",
            severity: "high"
        });
    }
    if (state.powerCenters.military.approval < 10 && state.stability < 25) {
        risks.push({
            id: "coup_risk",
            name: "Darbe Girişimi Riski",
            desc: "Ordu içindeki cuntalar darbe hazırlığı yapıyor, rejim tehlikede!",
            severity: "critical"
        });
    }
    if (state.powerCenters.business.approval < 20) {
        risks.push({
            id: "capital_flight",
            name: "Sermaye Kaçışı",
            desc: "İş dünyasının güven kaybı nedeniyle yerli ve yabancı sermaye hızla yurt dışına kaçıyor.",
            severity: "medium"
        });
    }
    if (state.powerCenters.judiciary.approval < 20) {
        risks.push({
            id: "constitutional_crisis",
            name: "Anayasal Kriz",
            desc: "Yargı kurumları ile hükümet arasında anayasal yetki uyuşmazlığı ve kriz yaşanıyor.",
            severity: "medium"
        });
    }
    if (state.powerCenters.media.approval < 20) {
        risks.push({
            id: "media_campaign",
            name: "Hükümet Karşıtı Kampanyalar",
            desc: "Medya organları hükümeti yıpratmak için yoğun karalama kampanyaları yürütüyor.",
            severity: "medium"
        });
    }
    return risks;
}
