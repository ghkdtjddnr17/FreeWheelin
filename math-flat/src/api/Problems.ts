
const BASE_URL = import.meta.env.VITE_API_URL;
if (!BASE_URL) {
    console.warn("API URL이 정의되지 않았습니다. .env 파일의 VITE_API_URL을 확인하세요.");
}
// src/api/problems.ts
export interface Problem {
    id: number,
    level: 1 | 2 | 3 | 4 | 5
    type: 1 | 2,
    problemImageUrl: string,
    title: string,
    answerRate: number
}

export const fetchProblems = async (): Promise<Problem[]> => {
    if (!BASE_URL) throw new Error("API URL 미설정");

    const res = await fetch(`${BASE_URL}/problems`);

    if (!res.ok) {
        throw new Error("문제 목록을 불러오는데 실패했습니다");
    }

    return res.json();
};


export const fetchSimilarProblems = async (problemId: number, excludedProblemIds: Array<number>): Promise<Problem[]> => {
    if (!BASE_URL) throw new Error("API URL 미설정");

    const params = new URLSearchParams()
    if (excludedProblemIds.length > 0) {
        params.set("excludedProblemIds", excludedProblemIds.join(','));
    }

    const res = await fetch(`${BASE_URL}/problems/${problemId}/similarity?${params.toString()}`);

    if (!res.ok) {
        throw new Error("문제 목록을 불러오는데 실패했습니다");
    }

    return res.json();
};
