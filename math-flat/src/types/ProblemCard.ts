import type { Problem } from "../api/Problems";

type ActionButton = {
    label: string;
    icon: string;
    onClick: () => void;
};

export interface ProblemCardProps {
    problemItem: Problem;
    index: number;
    selected?: boolean;
    primaryAction: ActionButton;
    secondaryAction: ActionButton;
}
