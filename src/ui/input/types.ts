import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    className?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    type?: string;
    placeholder?: string;
    testId?: string;
}
