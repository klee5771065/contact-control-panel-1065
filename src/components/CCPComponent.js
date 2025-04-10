// src/components/CCPComponent.js

import React, { useEffect, useRef } from 'react';

const CCPComponent = ({ connectConfig, setAgentData }) => {
    const containerRef = useRef(null);
    const isInitialized = useRef(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // Load the Amazon Connect Streams API
        const script = document.createElement('script');
        script.src = `${connectConfig.ccpUrl.replace('/ccp-v2/', '')}/connect/connect-streams-min.js`;
        script.async = true;
        script.onload = initializeConnect;
        document.body.appendChild(script);

        return () => {
            // Clean up
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [connectConfig.ccpUrl]);

    const initializeConnect = () => {
        if (!window.connect || isInitialized.current) return;

        try {
            // Initialize the CCP
            window.connect.core.initCCP(containerRef.current, connectConfig);
            isInitialized.current = true;

            // Set up event listeners
            setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize Connect CCP:', error);
        }
    };

    const setupEventListeners = () => {
        const agentConnection = new window.connect.Agent();

        // Agent state change handler
        agentConnection.onStateChange(agentStateEvent => {
            const agentStatus = agentStateEvent.newState;

            setAgentData(prevData => ({
                ...prevData,
                agentStatus
            }));
        });

        // Contact event handlers
        agentConnection.onContact(contact => {
            contact.onConnecting(handleContactConnecting);
            contact.onConnected(handleContactConnected);
            contact.onEnded(handleContactEnded);

            // Listen for contact attribute updates
            contact.onAttributesUpdated(attributes => {
                setAgentData(prevData => ({
                    ...prevData,
                    callAttributes: attributes
                }));
            });
        });
    };

    const handleContactConnecting = contactEvent => {
        const contact = contactEvent.getContact();
        const contactId = contact.getContactId();

        setAgentData(prevData => ({
            ...prevData,
            contactState: 'Connecting',
            contactId
        }));
    };

    const handleContactConnected = contactEvent => {
        const contact = contactEvent.getContact();
        const contactId = contact.getContactId();
        const contactType = contact.getType();

        setAgentData(prevData => ({
            ...prevData,
            contactState: 'Connected',
            isOnCall: true,
            contactId,
            contactType
        }));
    };

    const handleContactEnded = contactEvent => {
        setAgentData(prevData => ({
            ...prevData,
            contactState: 'None',
            isOnCall: false,
            contactId: null
        }));
    };

    // Style to hide the embedded CCP but keep it functional
    const ccpStyle = {
        width: '400px',
        height: '600px',
        position: 'absolute',
        top: '-9999px',
        left: '-9999px'
    };

    return <div id="ccp-container" ref={containerRef} style={ccpStyle}></div>;
};

export default CCPComponent;