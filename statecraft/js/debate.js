/**
 * TURKEY 2038 - TV DEBATE ENGINE
 */

export const debateOpponents = [
    {
        name: "Kemal Demir",
        party: "Milliyetçi İttifak Partisi (MİP)",
        title: "Nationalist Opposition Leader"
    },
    {
        name: "Dr. Aylin Yılmaz",
        party: "Sosyal Adalet Hareketi (SAH)",
        title: "Progressive Coalition Leader"
    },
    {
        name: "Caner Bilgin",
        party: "Hür Girişim Birliği (HGB)",
        title: "Techno-Libertarian Candidate"
    }
];

export const debateQuestions = [
    {
        id: "economy",
        topic: "Economic Inflation & Cost of Living",
        opponentSpeech: "Your administration has completely mismanaged the state budget! High inflation is destroying the purchasing power of our workers and retirees. How do you defend this?",
        choices: [
            {
                text: "We are building a future-proof automated economy. Tech subsidies and growth will cure inflation long term.",
                consequenceText: "Business Owners approve (+15%), Students approve (+10%), but Workers (-10%) and Retirees (-12%) are frustrated by lack of immediate relief.",
                effects: {
                    business: 15,
                    students: 10,
                    workers: -10,
                    retirees: -12
                }
            },
            {
                text: "Our focus is social solidarity. We will expand welfare, cap rents, and fund pensions through tax hikes on big corporations.",
                consequenceText: "Workers (+15%) and Retirees (+15%) cheer, but Business Owners (-20%) and tech sectors are alienated.",
                effects: {
                    workers: 15,
                    retirees: 15,
                    business: -20
                }
            },
            {
                text: "We must restore budget discipline. By auditing government agencies and curbing corruption, we will naturally bring inflation down.",
                consequenceText: "Seculars (+12%) and Workers (+8%) appreciate the anti-corruption focus, while nationalists are neutral.",
                effects: {
                    secular: 12,
                    workers: 8,
                    corruption: -10 // directly reduces corruption state
                }
            }
        ]
    },
    {
        id: "security",
        topic: "Security vs Civic Freedoms",
        opponentSpeech: "Under the pretense of fighting cyber-terrorism and external threats, this administration has systematically blocked social networks and cracked down on student assemblies!",
        choices: [
            {
                text: "Without national security, there is no country. We will not allow external actors or agitators to disrupt Turkey's stability.",
                consequenceText: "Nationalists (+20%) and Conservatives (+12%) rally to your defense. Students (-18%) and Seculars (-15%) decry authoritarianism.",
                effects: {
                    nationalists: 20,
                    conservatives: 12,
                    students: -18,
                    secular: -15
                }
            },
            {
                text: "Freedom is the bedrock of innovation. We will remove national firewalls, repeal censorship, and protect the right to strike.",
                consequenceText: "Seculars (+15%) and Students (+20%) celebrate. Nationalists (-15%) and Conservatives (-10%) warn of safety risks.",
                effects: {
                    secular: 15,
                    students: 20,
                    nationalists: -15,
                    conservatives: -10
                }
            },
            {
                text: "A balanced state requires moderate controls. We will protect speech, but riots and border integrity remain our absolute red line.",
                consequenceText: "Moderate positive shift across several groups. Pleases nationalists (+6%) and seculars (+5%).",
                effects: {
                    nationalists: 6,
                    secular: 5,
                    conservatives: 4
                }
            }
        ]
    },
    {
        id: "education",
        topic: "Education Curriculum & Brain Drain",
        opponentSpeech: "The education system has been degraded. By reducing sciences and pushing sectarian faith-based courses, we are forcing Turkey's brightest minds to emigrate to Europe. How will you stop this brain drain?",
        choices: [
            {
                text: "We will establish a strictly secular curriculum focused on science, quantum tech, and advanced AI. Education must remain rational.",
                consequenceText: "Seculars (+20%) and Students (+15%) support you. Conservatives are deeply alienated (-25%).",
                effects: {
                    secular: 20,
                    students: 15,
                    conservatives: -25
                }
            },
            {
                text: "A nation is hollow without moral roots. Scientific knowledge must be anchored in religious and cultural values to preserve our society.",
                consequenceText: "Conservatives (+22%) and Nationalists (+10%) strongly approve. Seculars (-25%) and Students (-12%) oppose.",
                effects: {
                    conservatives: 22,
                    nationalists: 10,
                    secular: -25,
                    students: -12
                }
            },
            {
                text: "We will create a multi-track academy system. Families should choose between technological, vocational, and religious specializations.",
                consequenceText: "A compromise. Pleases seculars (+8%) and conservatives (+8%) who support educational choice.",
                effects: {
                    secular: 8,
                    conservatives: 8,
                    business: 5
                }
            }
        ]
    }
];

export function getDebateOpponentForParty(ideology) {
    if (ideology === "technocrat" || ideology === "center_left") {
        return debateOpponents[0]; // Kemal Demir (Nationalist Party) as main rival
    } else if (ideology === "conservative" || ideology === "liberal") {
        return debateOpponents[1]; // Dr. Aylin Yılmaz (Progressive Coalition)
    } else {
        return debateOpponents[2]; // Caner Bilgin (Libertarian)
    }
}
