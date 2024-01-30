
export interface TraitLevel {
    name: string,
    threshold: number,
    effects: Record<string, number>;
    epithet: string;
}

export interface Trait {
    name: string,
    characters: string,
    antitraits: string,
    levels: TraitLevel[];
}

export type Traits = Record<string, Trait>;
