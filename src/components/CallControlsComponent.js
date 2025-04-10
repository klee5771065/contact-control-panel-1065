// src/components/CallControlsComponent.js
import React, { useState } from 'react';

const CallControlsComponent = ({ agentData, isOnCall, contactId }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isOnHold, setIsOnHold] = useState(false);

    const handleAcceptCall = () => {
        if (!window.connect || !contactId) return;

        try {
            const contact = window.connect.core.getContactById(contactId);
            if (contact) {
                contact.accept();
            }
        } catch (error) {
            console.error('Failed to accept call:', error);
        }
    };

    const handleEndCall = () => {
        if (!window.connect || !contactId) return;

        try {
            const contact = window.connect.core.getContactById(contactId);
            if (contact) {
                contact.destroy();
            }
        } catch (error) {
            console.error('Failed to end call:', error);
        }
    };

    const handleToggleMute = () => {
        if (!window.connect) return;

        try {
            if (isMuted) {
                window.connect.core.getAgentConnection().unmute();
            } else {
                window.connect.core.getAgentConnection().mute();
            }
            setIsMuted(!isMuted);
        } catch (error) {
            console.error('Failed to toggle mute:', error);
        }
    };

    const handleToggleHold = () => {
        if (!window.connect || !contactId) return;

        try {
            const contact = window.connect.core.getContactById(contactId);
            if (contact) {
                if (isOnHold) {
                    contact.resume();
                } else {
                    contact.hold();
                }
                setIsOnHold(!isOnHold);
            }
        } catch (error) {
            console.error('Failed to toggle hold:', error);
        }
    };

    return (
        <div className="call-controls-container">
            {agentData.contactState === 'Connecting' && (
                <div className="incoming-call-controls">
                    <h3>Incoming Call</h3>
                    <button
                        className="accept-call-btn"
                        onClick={handleAcceptCall}
                    >
                        Accept Call
                    </button>
                    <button
                        className="reject-call-btn"
                        onClick={handleEndCall}
                    >
                        Reject Call
                    </button>
                </div>
            )}

            {isOnCall && agentData.contactState === 'Connected' && (
                <div className="active-call-controls">
                    <h3>Active Call</h3>
                    <div className="control-buttons">
                        <button
                            className={`mute-btn ${isMuted ? 'active' : ''}`}
                            onClick={handleToggleMute}
                        >
                            {isMuted ? 'Unmute' : 'Mute'}
                        </button>

                        <button
                            className={`hold-btn ${isOnHold ? 'active' : ''}`}
                            onClick={handleToggleHold}
                        >
                            {isOnHold ? 'Resume' : 'Hold'}
                        </button>

                        <button
                            className="end-call-btn"
                            onClick={handleEndCall}
                        >
                            End Call
                        </button>
                    </div>

                    <div className="keypad">
                        <h4>Keypad</h4>
                        <div className="keypad-grid">
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(key => (
                                <button
                                    key={key}
                                    className="keypad-btn"
                                    onClick={() => {
                                        // Send DTMF tones
                                        const contact = window.connect.core.getContactById(contactId);
                                        if (contact) {
                                            contact.sendDigits(key);
                                        }
                                    }}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {!isOnCall && agentData.contactState === 'None' && (
                <div className="no-call-message">
                    <p>No active calls</p>
                </div>
            )}
        </div>
    );
};

export default CallControlsComponent;