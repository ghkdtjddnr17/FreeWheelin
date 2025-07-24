import { useProblemStore } from "../store/useProbleamStore";
import type { Problem } from "../api/Problems";

export function useProblemActions() {
    const activeId = useProblemStore(state => state.activeId);
    const setId = useProblemStore(state => state.setId);
    const setFetchTriggerId = useProblemStore(state => state.setFetchTriggerId);
    const swapProblem = useProblemStore(state => state.swapProblem);
    const insertProblemActive = useProblemStore(state => state.insertProblemActive);
    const removeProblem = useProblemStore(state => state.removeProblem);
    const setProblems = useProblemStore(state => state.setProblems)
    const setSimilarProblems = useProblemStore(state => state.setSimilarProblems)
    
    // 각 핸들러를 하나의 객체로 래핑
    return {
        activeId,
        setActive: (id: number) => setId(id),
        setProblems,
        setSimilarProblems,
        fetchSimilar: (id: number) => {
            setId(id);
            setFetchTriggerId(id);
        },
        swap: (similarId: number) => {
            swapProblem(activeId, similarId);
            setId(similarId);
        },
        insert: (similarId: number) => {
            insertProblemActive(similarId);
        },
        remove: (problem: Problem) => {
            removeProblem(problem);
        }
    };
}
