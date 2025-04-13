import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsList from '../components/NewsList';
import * as api from '../services/api';

// Mock the API
jest.mock('../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('NewsList Component', () => {
  const mockStories = [
    {
      id: 1,
      title: 'Test Story 1',
      url: 'https://example.com/test1',
      score: 100,
      by: 'user1',
      time: Math.floor(Date.now() / 1000) - 3600,
      descendants: 25,
    },
    {
      id: 2,
      title: 'Test Story 2',
      url: 'https://example.com/test2',
      score: 200,
      by: 'user2',
      time: Math.floor(Date.now() / 1000) - 7200,
      descendants: 50,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', () => {
    // Mock API to return a promise that doesn't resolve yet
    mockedApi.fetchTopTenStories.mockReturnValue(new Promise(() => {}));

    render(<NewsList />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading stories...')).toBeInTheDocument();
  });

  it('displays stories after loading', async () => {
    // Mock API to return stories
    mockedApi.fetchTopTenStories.mockResolvedValue(mockStories);

    render(<NewsList />);

    // Initially in loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Wait for stories to load
    await waitFor(() => expect(screen.getByTestId('news-list')).toBeInTheDocument());

    // Check if stories are displayed
    expect(screen.getByText('Test Story 1')).toBeInTheDocument();
    expect(screen.getByText('Test Story 2')).toBeInTheDocument();
  });

  it('displays error message when API fails', async () => {
    // Mock API to throw error
    mockedApi.fetchTopTenStories.mockRejectedValue(new Error('API Error'));

    render(<NewsList />);

    // Wait for error message to appear
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());

    expect(
      screen.getByText('Failed to fetch stories. Please try again later.')
    ).toBeInTheDocument();
  });

  it('refreshes stories when refresh button is clicked', async () => {
    // Setup user event
    const user = userEvent.setup();

    // Mock API to return stories
    mockedApi.fetchTopTenStories.mockResolvedValue(mockStories);

    render(<NewsList />);

    // Wait for stories to load
    await waitFor(() => expect(screen.getByTestId('news-list')).toBeInTheDocument());

    // Click refresh button
    const refreshButton = screen.getByText('Refresh');
    await user.click(refreshButton);

    // Verify API was called again
    expect(mockedApi.fetchTopTenStories).toHaveBeenCalledTimes(2);
  });
});
