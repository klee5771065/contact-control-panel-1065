import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders core CCP elements', () => {
  render(<App />);

  // Check main header
  const headerElement = screen.getByText("Custom Amazon Connect CCP");
  expect(headerElement).toBeInTheDocument();

  // Check agent status
  const statusElement = screen.getByText("Loading...");
  expect(statusElement).toBeInTheDocument();

  // Check contact state
  const stateElement = screen.getByText("State: None");
  expect(stateElement).toBeInTheDocument();

  // Check call status message
  const callStatusElement = screen.getByText("No active calls");
  expect(callStatusElement).toBeInTheDocument();
});

// Test for status dropdown changes
test('status dropdown selection can be changed', () => {
  render(<App />);

  // Find the status dropdown
  const statusDropdown = screen.getByRole('combobox');
  expect(statusDropdown).toBeInTheDocument();

  // Initially, no specific option might be selected, or a default

  // Change the selection to "Lunch"
  fireEvent.change(statusDropdown, { target: { value: 'Lunch' } });

  // Verify the dropdown value has changed
  expect(statusDropdown.value).toBe('Lunch');

  // Change to another option
  fireEvent.change(statusDropdown, { target: { value: 'Break' } });
  expect(statusDropdown.value).toBe('Break');
});

// Test for Change Status button
test('Change Status button is present and enabled', () => {
  render(<App />);

  // Find the Change Status button
  const changeStatusButton = screen.getByText('Change Status');
  expect(changeStatusButton).toBeInTheDocument();
  expect(changeStatusButton).toBeEnabled();
});