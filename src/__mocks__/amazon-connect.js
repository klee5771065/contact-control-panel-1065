// src/__mocks__/amazon-connect.js
const mockConnect = {
    core: {
        initCCP: jest.fn(),
        getContactById: jest.fn().mockImplementation(() => ({
            accept: jest.fn(),
            destroy: jest.fn(),
            hold: jest.fn(),
            resume: jest.fn(),
            sendDigits: jest.fn()
        })),
        getAgentConnection: jest.fn().mockImplementation(() => ({
            mute: jest.fn(),
            unmute: jest.fn()
        }))
    },
    agent: jest.fn(callback => {
        const mockAgent = {
            getState: jest.fn().mockReturnValue({ name: 'Available' }),
            setState: jest.fn(),
            getAgentStates: jest.fn().mockReturnValue([
                { name: 'Available' },
                { name: 'Lunch' },
                { name: 'Break' }
            ]),
            onStateChange: jest.fn(),
            onContact: jest.fn()
        };
        callback(mockAgent);
        return mockAgent;
    })
};

// Assign to global object
global.connect = mockConnect;

export default mockConnect;