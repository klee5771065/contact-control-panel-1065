import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithAgentState } from '../test-utils';
import CallControlsComponent from './CallControlsComponent';
import '../__mocks__/amazon-connect';

describe('CallControlsComponent', () => {
    test('shows "No active calls" when not on a call', () => {
        renderWithAgentState(<CallControlsComponent />, {
            initialState: {
                contactState: 'None',
                isOnCall: false,
                contactId: null
            }
        });

        expect(screen.getByText('No active calls')).toBeInTheDocument();
    });

    test('shows incoming call controls when contact state is Connecting', () => {
        renderWithAgentState(<CallControlsComponent />, {
            initialState: {
                contactState: 'Connecting',
                isOnCall: false,
                contactId: '12345'
            }
        });

        // Check for incoming call UI elements
        expect(screen.getByText('Incoming Call')).toBeInTheDocument();
        expect(screen.getByText('Accept Call')).toBeInTheDocument();
        expect(screen.getByText('Reject Call')).toBeInTheDocument();
    });

    // Then in your test for button functionality:
    test('Accept Call button calls accept function', () => {
        renderWithAgentState(<CallControlsComponent />, {
            initialState: {
                contactState: 'Connecting',
                isOnCall: false,
                contactId: '12345'
            }
        });

        const acceptButton = screen.getByText('Accept Call');
        fireEvent.click(acceptButton);

        // Verify that the connect API was called correctly
        expect(window.connect.core.getContactById).toHaveBeenCalledWith('12345');
    });
});