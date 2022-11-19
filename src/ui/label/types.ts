import { ReactNode } from 'react';

export interface ILabelProps {
    id: string;
    children: ReactNode;
    className?: string;
    testId?: string;
}
