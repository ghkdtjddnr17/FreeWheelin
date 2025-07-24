import ProblemCard from "../common/ProblemCard"
import { useProblems } from "../../hooks/useProblems"
import { useProblemStore } from "../../store/useProbleamStore";
import { useEffect, useMemo } from "react";
import { CustomScrollbar } from "../common/CustomScrollbar";

import { getLevelCountsArr } from "../../utils/problemStats";
import { useProblemActions } from "../../hooks/useProblemActions";
import clsx from "clsx";

const WorksheetEditor = () => {
    const { data: problemInfo } = useProblems()
    const problems = useProblemStore(state => state.problems);
    const { activeId, fetchSimilar, remove, setProblems } = useProblemActions();

    useEffect(() => {
        if (problemInfo) setProblems(problemInfo);
    }, [problemInfo])

    const levelCountsArr = useMemo(() => getLevelCountsArr(problems), [problems]);

    return <>

        <div className="xl:w-[712px] h-full bg-[#5C5C5C] rounded-xl p-6 text-white lg:w-[480px]">
            {/* 상단 헤더 */}
            <div className="text-base font-bold mb-6">학습지 상세 편집</div>
            <CustomScrollbar height="calc(100% - 98px)">

                {
                    problems.length > 0 ? problems?.map((item, i) => {
                        return <div className="w-full overflow-y-auto overflow-x-hidden box-border ">
                            <ProblemCard
                                key={item.id}
                                problemItem={item}
                                index={i + 1}
                                selected={activeId === item.id}
                                primaryAction={{
                                    label: "유사문제",
                                    icon: "ic_plus",
                                    onClick: () => fetchSimilar(item.id)
                                }}
                                secondaryAction={{
                                    label: "삭제",
                                    icon: "ic_remove",
                                    onClick: () => remove(item)
                                }} />
                        </div>
                    }) : <div className="h-full flex flex-1 items-center justify-center">
                        <div className="text-center text-sm leading-relaxed">
                            학습지 문제 수가 없습니다. <br />
                            다음단계로 넘어가기 위해 문제를 추가해주세요.
                        </div>
                    </div>
                }
            </CustomScrollbar>
            <div className="rounded-b-xl px-4 py-2 text-[15px] flex justify-end text-[#E0E0E0] mt-3">
                {
                    problems.length > 0 && <>
                        {levelCountsArr.map((item, idx) => (
                            <span key={item.label}>
                                {idx > 0 && <span className="mx-1.5">·</span>}
                                {item.label}{item.count}
                            </span>
                        ))}
                        <span className="mx-2">|</span>
                    </>
                }

                <span className={clsx("font-bold text-white", problems.length === 0 && "text-[#FD5354]")}>문제 수 {problems.length}개</span>
            </div>
        </div>
    </>
}

export default WorksheetEditor