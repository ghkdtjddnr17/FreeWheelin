import React from "react"
import { useLevelInfo } from "../../hooks/useLevelLabel"
import clsx from "clsx"
import type { ProblemCardProps } from "../../types/ProblemCard"


const ProblemCard: React.FC<ProblemCardProps> = ({ problemItem, index, selected, primaryAction, secondaryAction }) => {
    const { title, problemImageUrl, level, answerRate, type } = problemItem
    const getLevelInfo = useLevelInfo();
    const { label, color } = getLevelInfo(level);

    return (
        <div className={clsx("w-full rounded-xl bg-white text-[#333] mb-6 box-border", selected && "border-[3px] border-[#00ABFF]")}>
            <div className="flex items-center  px-4 py-2 bg-[#FAFAFA] rounded-t-xl w-full">
                <span className="w-10 font-bold text-xl shrink-0 text-center">{index}</span>
                <span className="flex-1 px-3 text-sm truncate">
                    {title}
                </span>
                <div className="flex items-center gap-3 shrink-0 text-xs opacity-80">
                    <button type="button" className="flex gap-1" onClick={primaryAction.onClick}>
                        <img src={`/icon/${primaryAction.icon}.svg`} alt={primaryAction.label} /> {primaryAction.label}
                    </button>
                    <button type="button" className="flex gap-1" onClick={secondaryAction.onClick}>
                        <img src={`/icon/${secondaryAction.icon}.svg`}  alt={secondaryAction.label}/>{secondaryAction.label}
                    </button>
                </div>
            </div>

            <div className="flex gap-8 py-6 px-4">
                <div className="flex flex-col gap-2 text-xs">
                    <div className={clsx("rounded-sm bg-[#F5F5F5] w-[40px] text-center")} style={{ color: color }}>
                        {label}
                    </div>
                    <div className="rounded-sm bg-[#F5F5F5] w-[40px] text-center text-[#707070]">
                        {answerRate}%
                    </div>
                    <div className="rounded-sm bg-[#F5F5F5] w-[40px] text-center text-[#959595]">
                        {type === 1 ? "객관식" : "주관식"}
                    </div>

                </div>
                <div className="xl:max-w-[350px] lg:w-[300px]">
                    <img className="max-h-[400px]" src={problemImageUrl} alt={title} />
                </div>
            </div>
        </div>
    )
}


export default React.memo(ProblemCard)



