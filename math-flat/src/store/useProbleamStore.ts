import { create } from 'zustand'
import type { Problem } from '../api/Problems'


interface ProblemStore {
    problems: Array<Problem> //전체 문제 리스트
    similarProblems: Array<Problem> //현재 active 문제에 대한 유사문제 리스트
    activeId: number // 현재 선택된 문제의 id
    fetchTriggerId: number;  // 유사문제 fetch 트리거 용
    setProblems: (problems: Problem[]) => void //문제 set
    setSimilarProblems: (similarProblems: Problem[]) => void
    setId: (id: number) => void
    removeProblem: (problemInfo: Problem) => void
    swapProblem: (worksheetId: number, similarId: number) => void;
    insertProblemActive: (similarId: number) => void
    setFetchTriggerId: (id: number) => void;
}


export const useProblemStore = create<ProblemStore>((set) => ({
    activeId: 0,
    problems: [],
    similarProblems: [],
    fetchTriggerId: 0,
    setId: (problemId: number) => set(() => ({ activeId: problemId })),
    setProblems: problems => set({ problems }),
    setSimilarProblems: similarProblems => set({ similarProblems }),
    removeProblem: problemInfo => set(state => {
        const isActive = state.activeId === problemInfo.id;
        return {
            problems: state.problems.filter(p => p.id !== problemInfo.id),
            similarProblems: isActive ? [] : state.similarProblems,
            activeId: isActive ? 0 : state.activeId

        }
    }),
    swapProblem: (worksheetId, similarId) => set(state => {
        const worksheetIdx = state.problems.findIndex(p => p.id === worksheetId);
        const similarIdx = state.similarProblems.findIndex(p => p.id === similarId);
        if (worksheetIdx === -1 || similarIdx === -1) return state;


        const newProblems = [...state.problems];
        const newSimilar = [...state.similarProblems];

        const tmp = newProblems[worksheetIdx];
        newProblems[worksheetIdx] = newSimilar[similarIdx];
        newSimilar[similarIdx] = tmp;

        return {
            problems: newProblems,
            similarProblems: newSimilar,
            activeId: newProblems[worksheetIdx].id,
        };
    }),
    insertProblemActive: (similarId: number) =>
        set(state => {
            const activeIdx = state.problems.findIndex(p => p.id === state.activeId);
            if (activeIdx === -1) return state;


            const similarIdx = state.similarProblems.findIndex(p => p.id === similarId);
            if (similarIdx === -1) return state;

            const insertProblem = state.similarProblems[similarIdx];


            const newProblems = [...state.problems];
            newProblems.splice(activeIdx + 1, 0, insertProblem);


            const newSimilarProblems = state.similarProblems.filter(p => p.id !== similarId);
            console.log({ newSimilarProblems });


            return {
                problems: newProblems,
                similarProblems: newSimilarProblems,
                // activeId: insertProblem.id,
            };
        }),

    setFetchTriggerId: (id) => set({ fetchTriggerId: id }),

})) 