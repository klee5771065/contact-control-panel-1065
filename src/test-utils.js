// src/test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { AgentStateProvider } from './context/AgentStateContext';

export function renderWithAgentState(ui, { initialState, ...options } = {}) {
    const Wrapper = ({ children }) => (
        <AgentStateProvider initialState={initialState}>
            {children}
        </AgentStateProvider>
    );

    return render(ui, { wrapper: Wrapper, ...options });
}