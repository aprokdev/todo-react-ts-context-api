import { MouseEventHandler, ReactNode } from 'react';

export interface IButtonProps {
    className?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    disabled: boolean;
    children: ReactNode;
    testId?: string;
}
