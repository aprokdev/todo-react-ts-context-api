import { ReactNode } from 'react';

export interface ILabelProps {
    children: ReactNode;
    className?: string;
    testId?: string;
    htmlFor: string;
}
