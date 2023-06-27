import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { TodoProvider } from '@todo-context/index';

export function renderWithTodoProvider(ui: React.ReactElement, renderOptions: RenderOptions) {
    function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
        return <TodoProvider>{children}</TodoProvider>;
    }
    return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
