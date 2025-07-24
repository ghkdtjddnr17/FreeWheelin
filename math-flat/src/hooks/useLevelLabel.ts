// src/hooks/useLevelLabel.ts
// level 값별 이름+색상
const LEVEL_INFO: Record<number, { label: string; color: string }> = {
    1: { label: "하", color: "#5C5C5C" },  // 예시: 파랑
    2: { label: "중하", color: "#00ABFF" },
    3: { label: "중", color: "#54C0B1" },  // 예시: 노랑
    4: { label: "상", color: "#FFC64D" },
    5: { label: "최상", color: "#FD5354" },  // 예시: 주황
};

export function useLevelInfo() {
    const getLevelInfo = (level?: number | null) => {
        return LEVEL_INFO[level ?? 0] || { label: "-", color: "#BDBDBD" };
    };
    return getLevelInfo;
}
