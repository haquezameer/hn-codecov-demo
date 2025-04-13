import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../components/ErrorBoundary';

// Create a component that throws an error
const ErrorComponent = () => {
  throw new Error('Test error');
};

// Create a mock for console.error to suppress error messages during test
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error UI when a child component throws an error', () => {
    // We need to mock the reload functionality
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred. Please try reloading the page.')
    ).toBeInTheDocument();
  });

  it('reloads the page when the reload button is clicked', async () => {
    // Setup user event
    const user = userEvent.setup();

    // Save original location
    const originalLocation = window.location;

    // Mock location before rendering
    window.location = {
      ...originalLocation,
      reload: jest.fn(),
    } as Location;

    const reloadMock = window.location.reload as jest.Mock;

    try {
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      // Click the reload button
      const reloadButton = screen.getByText('Reload Page');
      await user.click(reloadButton);

      // Verify reload was called
      expect(reloadMock).toHaveBeenCalledTimes(1);
    } finally {
      // Restore original location
      window.location = originalLocation;
    }
  });
});
