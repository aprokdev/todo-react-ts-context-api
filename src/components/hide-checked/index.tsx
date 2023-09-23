import React from 'react';
import Checkbox from '@ui/checkbox';
import Label from '@ui/label';
import './style.scss';
import { IHideCheckedProps } from './types';

function HideChecked({ isCompletedHidden, setHideCompleted, disabled }: IHideCheckedProps) {
    return (
        <div className="hide-checked">
            <Checkbox
                checked={isCompletedHidden}
                onChange={(e) => setHideCompleted(e.target.checked)}
                id="#sort-checked"
                testId="sort-checked"
                disabled={disabled}
            />
            <Label htmlFor="#sort-checked" disabled={disabled}>
                Hide completed
            </Label>
        </div>
    );
}

// export default HideChecked;
export default React.memo(HideChecked);
