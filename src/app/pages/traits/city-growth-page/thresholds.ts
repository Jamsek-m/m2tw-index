export interface GrowthLevel {
    name: string;
    value: number;
}

export type GrowthType = "city" | "castle";

export const GROWTH_THRESHOLDS: Record<GrowthType, GrowthLevel[]> = {
    city: [
        {name: "Village", value: 0},
        {name: "Town", value: 800},
        {name: "Large Town", value: 2000},
        {name: "City", value: 6000},
        {name: "Large City", value: 12000},
        {name: "Huge City", value: 24000},
    ],
    castle: [
        {name: "Castle", value: 0},
        {name: "Fortress", value: 4500},
        {name: "Citadel", value: 9000},
    ],
};

export function getNextGrowth(currentPopulation: number, growthPerTurn: number, type: GrowthType): [GrowthLevel, number] | null {
    const levels = GROWTH_THRESHOLDS[type];

    let currentLevel = levels[0];
    for (const level of levels) {
        if (currentPopulation >= level.value) {
            currentLevel = level;
        } else {
            break;
        }
    }

    const currentLevelIndex = levels.indexOf(currentLevel);
    const nextLevel = currentLevelIndex < levels.length - 1 ? levels[currentLevelIndex + 1] : null;

    if (!nextLevel) {
        return null;
    }

    let turnsToNextLevel = 0;
    let population = currentPopulation;
    while (population < nextLevel.value) {
        population += population * growthPerTurn;
        turnsToNextLevel++;
    }

    return [
        nextLevel,
        turnsToNextLevel,
    ];
}
