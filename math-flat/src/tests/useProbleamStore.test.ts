import { act } from "react";
import { useProblemStore } from "../store/useProbleamStore";

import type { Problem } from "../api/Problems";


const makeProblem = (id: number, level: 1|2|3|4|5 = 1): Problem => ({
    id,
    title: `문제${id}`,
    level,
    answerRate: 70,
    type: 1,
    problemImageUrl: "",
    // Problem 타입의 나머지 필수 필드도 추가!
});

  

describe("useProblemStore", () => {
    beforeEach(() => {
        // 상태 초기화
        useProblemStore.setState({
            problems: [],
            similarProblems: [],
            activeId: 0,
            fetchTriggerId: 0,
        });
    });

    it("setProblems sets problem list", () => {
        act(() => {
            useProblemStore.getState().setProblems([makeProblem(1), makeProblem(2)]);
        });
        expect(useProblemStore.getState().problems.length).toBe(2);
        expect(useProblemStore.getState().problems[0].title).toBe("문제1");
    });

    it("removeProblem removes an active problem and resets similarProblems, activeId", () => {
        act(() => {
            useProblemStore.getState().setProblems([makeProblem(1)]);
            useProblemStore.setState({ activeId: 1, similarProblems: [makeProblem(10, 2)] });
            useProblemStore.getState().removeProblem(makeProblem(1));
        });
        const { problems, similarProblems, activeId } = useProblemStore.getState();
        expect(problems).toHaveLength(0);
        expect(similarProblems).toHaveLength(0);
        expect(activeId).toBe(0);
    });

    it("swapProblem swaps problem with similar", () => {
        act(() => {
            useProblemStore.getState().setProblems([makeProblem(1)]);
            useProblemStore.setState({ similarProblems: [makeProblem(2, 2)], activeId: 1 });
            useProblemStore.getState().swapProblem(1, 2);
        });
        const { problems, similarProblems, activeId } = useProblemStore.getState();
        expect(problems[0].id).toBe(2);
        expect(similarProblems[0].id).toBe(1);
        expect(activeId).toBe(2);
    });

    it("insertProblemBeforeActive inserts similar problem after active", () => {
        act(() => {
            useProblemStore.getState().setProblems([makeProblem(1), makeProblem(3, 3)]);
            useProblemStore.setState({ activeId: 1, similarProblems: [makeProblem(2, 2)] });
            useProblemStore.getState().insertProblemActive(2);
        });
        const { problems } = useProblemStore.getState();
        expect(problems[1].id).toBe(2);
        expect(problems.map(p => p.id)).toEqual([1, 2, 3]);
    });
});
