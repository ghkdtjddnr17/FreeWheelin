// utils/problemStats.ts
export const LEVEL_LABEL_MAP = {
    1: "하",
    2: "중하",
    3: "중",
    4: "상",
    5: "최상"
} as const;

export const LEVEL_ORDER = ["하", "중하", "중", "상", "최상"] as const;

export function getLevelCountsArr(problems: { level: number }[]) {
    const counts: Record<string, number> = {};
    for (const p of problems) {
        const label = LEVEL_LABEL_MAP[p.level as keyof typeof LEVEL_LABEL_MAP];
        if (label) counts[label] = (counts[label] || 0) + 1;
    }
    return LEVEL_ORDER.map(label => ({
        label,
        count: counts[label] || 0
    }));
}
