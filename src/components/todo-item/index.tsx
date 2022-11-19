/* eslint-disable jsx-a11y/no-autofocus */
import PropTypes from 'prop-types';
import React from 'react';
import Fade from 'react-reveal/Fade';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';
import TextareaAutosize from '~ui/textarea-autosize';
import './style.scss';
import { ITodoData, ITodoItem } from './type';

function TodoItem({ data, onChangeTodo, onDeleteTodo, onEditTodo }: ITodoItem) {
    const { id, label, isCompleted, created }: ITodoData = data;
    const [editing, setEditing] = React.useState(false);
    const [value, setValue] = React.useState(label);

    const onBlurInput = React.useCallback(() => {
        onEditTodo(value, id);
        setEditing(false);
    }, [id, value, onEditTodo]);

    const date = React.useMemo(() => {
        const date = new Date(created);
        return date.toLocaleDateString('en-EN', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }, [created]);

    return (
        <Fade bottom>
            <div className="todo-item" data-testid="todo-item">
                <div className="todo-item__check-group">
                    <Checkbox checked={isCompleted} onChange={onChangeTodo} id={id} testId={`${label}-cb`} />
                    {editing ? (
                        <TextareaAutosize
                            value={value}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
                            onBlur={onBlurInput}
                            id={id}
                            className="todo-item__input"
                            autoFocus
                            data-testid={`${label}-edit-field`}
                        />
                    ) : (
                        <Label id={id} testId={`${label}-label`}>
                            {label}
                        </Label>
                    )}
                </div>
                <span className="todo-item__created">{date}</span>
                <button
                    type="button"
                    onClick={() => setEditing(true)}
                    disabled={false}
                    className="todo-item__action-btn"
                    data-testid={`${label}-edit`}
                >
                    Edit
                </button>
                <span className="todo-item__separator">/</span>
                <button
                    type="button"
                    onClick={() => onDeleteTodo(id)}
                    disabled={false}
                    className="todo-item__action-btn"
                    data-testid={`${label}-delete`}
                >
                    Delete
                </button>
            </div>
        </Fade>
    );
}

TodoItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isCompleted: PropTypes.bool,
        label: PropTypes.string,
        created: PropTypes.number,
    }),
    onChangeTodo: PropTypes.func,
    onDeleteTodo: PropTypes.func,
    onEditTodo: PropTypes.func,
    testId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TodoItem;
