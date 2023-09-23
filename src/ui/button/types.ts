import { MouseEvent, ReactNode } from 'react';

export interface IButtonProps {
    className?: string;
    onClick: (event: MouseEvent) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled: boolean;
    children: ReactNode;
    testId?: string;
}
