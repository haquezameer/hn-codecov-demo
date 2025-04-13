import axios from 'axios';
import { fetchTopStories, fetchStory, fetchTopTenStories } from '../services/api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchTopStories', () => {
    it('fetches top stories successfully', async () => {
      const mockData = [123, 456, 789];
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await fetchTopStories();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      );
      expect(result).toEqual(mockData);
    });

    it('throws an error when fetch fails', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchTopStories()).rejects.toThrow(errorMessage);
    });
  });

  describe('fetchStory', () => {
    it('fetches a story by id', async () => {
      const mockStory = {
        id: 123,
        title: 'Test Story',
        url: 'https://example.com',
        score: 100,
        by: 'testuser',
        time: 1617984000,
        descendants: 10,
      };
      mockedAxios.get.mockResolvedValueOnce({ data: mockStory });

      const result = await fetchStory(123);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/item/123.json'
      );
      expect(result).toEqual(mockStory);
    });

    it('throws an error when fetch fails', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchStory(123)).rejects.toThrow(errorMessage);
    });
  });

  describe('fetchTopTenStories', () => {
    it('fetches top 10 stories', async () => {
      // Mock for fetchTopStories
      const mockStoryIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      mockedAxios.get.mockResolvedValueOnce({ data: mockStoryIds });

      // Mock for each fetchStory call
      const mockStories = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Test Story ${i + 1}`,
        url: `https://example.com/story${i + 1}`,
        score: 100 + i,
        by: 'testuser',
        time: 1617984000,
        descendants: 10 + i,
      }));

      // Setup mocks for each fetchStory call
      mockStories.forEach((story) => {
        mockedAxios.get.mockResolvedValueOnce({ data: story });
      });

      const result = await fetchTopTenStories();

      // Check that fetchTopStories and fetchStory were called
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      );
      mockStories.forEach((story) => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          `https://hacker-news.firebaseio.com/v0/item/${story.id}.json`
        );
      });

      expect(result.length).toBe(10);
      expect(result[0].title).toBe('Test Story 1');
      expect(result[9].title).toBe('Test Story 10');
    });

    it('filters out stories without URLs', async () => {
      // Mock for fetchTopStories
      const mockStoryIds = [1, 2, 3, 4, 5];
      mockedAxios.get.mockResolvedValueOnce({ data: mockStoryIds });

      // Create some stories with URLs and some without
      const mockStories = [
        {
          id: 1,
          title: 'Story with URL',
          url: 'https://example.com',
          score: 100,
          by: 'user',
          time: 1617984000,
          descendants: 10,
        },
        {
          id: 2,
          title: 'Story without URL',
          url: '',
          score: 200,
          by: 'user',
          time: 1617984000,
          descendants: 20,
        },
        {
          id: 3,
          title: 'Another with URL',
          url: 'https://test.com',
          score: 300,
          by: 'user',
          time: 1617984000,
          descendants: 30,
        },
        {
          id: 4,
          title: 'Another without URL',
          url: null,
          score: 400,
          by: 'user',
          time: 1617984000,
          descendants: 40,
        },
        {
          id: 5,
          title: 'Last with URL',
          url: 'https://last.com',
          score: 500,
          by: 'user',
          time: 1617984000,
          descendants: 50,
        },
      ];

      // Setup mocks for each fetchStory call
      mockStories.forEach((story) => {
        mockedAxios.get.mockResolvedValueOnce({ data: story });
      });

      const result = await fetchTopTenStories();

      // Should only include stories with URLs
      expect(result.length).toBe(3);
      expect(result.every((story) => !!story.url)).toBe(true);
    });

    it('throws an error when fetch fails', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchTopTenStories()).rejects.toThrow(errorMessage);
    });
  });
});
