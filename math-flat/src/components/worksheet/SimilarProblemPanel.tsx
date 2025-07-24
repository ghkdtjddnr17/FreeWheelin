import { useEffect } from "react"
import { useSimilarProblems } from "../../hooks/useProblems"
import { useProblemStore } from "../../store/useProbleamStore"
import ProblemCard from "../common/ProblemCard"
import { useProblemActions } from "../../hooks/useProblemActions"
import { CustomScrollbar } from "../common/CustomScrollbar"


const SimilarProblemPanel = () => {

    const { data } = useSimilarProblems()
    const similarProblems = useProblemStore(state => state.similarProblems);
    const { swap, insert, setSimilarProblems } = useProblemActions();

    useEffect(() => {
        if (data) setSimilarProblems(data)
    }, [data, setSimilarProblems])

    return (
        <div className="xl:w-[504px] h-full bg-gray-100 rounded-xl p-6 lg:w-[480px]">
            {
                similarProblems.length > 0 ? <>
                    <div className="text-base font-bold mb-6">유사 문항</div>
                    <CustomScrollbar height="calc(100% - 98px)">
                        <div className="flex flex-col">
                            <div className="w-full overflow-y-auto overflow-x-hidden box-border">

                                {
                                    similarProblems.map((item, i) => {
                                        return <ProblemCard
                                            key={item.id}
                                            problemItem={item}
                                            index={i + 1}
                                            selected={false}
                                            primaryAction={{
                                                label: "교체",
                                                icon: "ic_swap",
                                                onClick: () => swap(item.id)
                                            }}
                                            secondaryAction={{
                                                label: "추가",
                                                icon: "ic_plus",
                                                onClick: () => insert(item.id)
                                            }} />
                                    })
                                }
                            </div>
                        </div>
                    </CustomScrollbar>
                </> :
                    <div className="text-center text-gray-500 text-sm space-y-1 flex flex-col justify-center h-full">
                        <div className="flex items-center justify-center gap-1">
                            <div className="flex gap-1 text-xs bg-white rounded-xs px-2 py-1">
                                <img src="/icon/ic_plus.svg" />
                                유사문제
                            </div>
                            <span>버튼을 누르면</span>
                        </div>
                        <div>문제를 추가 또는 교체할 수 있습니다.</div>
                    </div>
            }

        </div>

    )
}

export default SimilarProblemPanel