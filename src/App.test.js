import { render, screen } from '@testing-library/react';
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
