// src/components/AgentStatusComponent.js
import React from 'react';
import { useAgentState } from '../context/AgentStateContext';

const AgentStatusComponent = () => {
    const { agentData } = useAgentState(); // Get agentData from context

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available':
                return '#4CAF50'; // Green
            case 'Offline':
                return '#9E9E9E'; // Gray
            case 'On Call':
            case 'Busy':
                return '#F44336'; // Red
            case 'After Call Work':
                return '#2196F3'; // Blue
            default:
                return '#FFC107'; // Yellow for other statuses
        }
    };

    return (
        <div className="agent-status-container">
            <div className="status-indicator">
                <div
                    className="status-dot"
                    style={{ backgroundColor: getStatusColor(agentData.agentStatus) }}
                ></div>
                <span className="status-text">{agentData.agentStatus}</span>
            </div>

            <div className="contact-info">
                <h3>Contact Information</h3>
                <p>State: {agentData.contactState}</p>
                {agentData.isOnCall && (
                    <>
                        <p>Contact ID: {agentData.contactId}</p>
                        <div className="call-timer">
                            <p>Call Duration: {/* You can implement a timer here */}</p>
                        </div>
                        {Object.keys(agentData.callAttributes).length > 0 && (
                            <div className="call-attributes">
                                <h4>Call Attributes</h4>
                                <ul>
                                    {Object.entries(agentData.callAttributes).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="agent-actions">
                <select className="status-selector">
                    <option value="Available">Available</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Break">Break</option>
                    <option value="Training">Training</option>
                    <option value="Offline">Offline</option>
                </select>
                <button className="change-status-btn">Change Status</button>
            </div>
        </div>
    );
};

export default AgentStatusComponent;
