import { ChangeEvent } from 'react';

export interface ICheckboxProps {
    checked: boolean;
    className?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    testId?: string;
}
