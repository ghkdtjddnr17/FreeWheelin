// src/hooks/useProblems.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProblems, fetchSimilarProblems } from "../api/Problems";
import { useProblemStore } from "../store/useProbleamStore";

export const useProblems = () => {
    return useQuery({
        queryKey: ["problems"],
        queryFn: () => {
            return fetchProblems()
        }
    })
}

export const useSimilarProblems = () => {
    const { fetchTriggerId, problems } = useProblemStore();
    console.log("useSimilarProblems", { fetchTriggerId });

    const filterProblem = problems.filter(p => p.id !== fetchTriggerId).map(({ id }) => id)

    return useQuery({
        queryKey: ["similar", fetchTriggerId],
        queryFn: () => fetchSimilarProblems(fetchTriggerId, filterProblem),
        enabled: !!fetchTriggerId
    })
}