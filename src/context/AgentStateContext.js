// src/context/AgentStateContext.js
import React, { createContext, useState, useContext } from 'react';

const AgentStateContext = createContext();

export const AgentStateProvider = ({ children, initialState }) => {
    const [agentData, setAgentData] = useState(initialState || {
        agentStatus: 'Loading...',
        contactState: 'None',
        isOnCall: false,
        contactId: null,
        callAttributes: {}
    });

    return (
        <AgentStateContext.Provider value={{ agentData, setAgentData }}>
            {children}
        </AgentStateContext.Provider>
    );
};

export const useAgentState = () => useContext(AgentStateContext);