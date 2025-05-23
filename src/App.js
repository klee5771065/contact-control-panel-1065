// Basic structure for a custom Amazon Connect CCP React app

// src/App.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';
import CCPComponent from './components/CCPComponent';
import AgentStatusComponent from './components/AgentStatusComponent';
import CallControlsComponent from './components/CallControlsComponent';
import { AgentStateProvider } from './context/AgentStateContext';

function App() {
  // Configuration for your Amazon Connect instance
  const connectConfig = {
    // Replace with your actual Amazon Connect instance URL
    ccpUrl: "https://your-instance-name.awsapps.com/connect/ccp-v2/",
    ccpLoadTimeout: 10000, // 10 seconds
    region: "us-west-2", // Change to your region
    softphone: {
      allowFramedSoftphone: true
    }
  };

  return (
    <AgentStateProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Custom Amazon Connect CCP</h1>
        </header>

        <div className="main-content">
          <div className="ccp-container">
            <h2>CCP (Hidden)</h2>
            <CCPComponent connectConfig={connectConfig} />
          </div>

          <div className="custom-ui-container">
            <div className="agent-status-panel">
              <h2>Agent Status</h2>
              <AgentStatusComponent />
            </div>

            <div className="call-controls-panel">
              <h2>Call Controls</h2>
              <CallControlsComponent />
            </div>
          </div>
        </div>
      </div>
    </AgentStateProvider>
  );
}

export default App;
