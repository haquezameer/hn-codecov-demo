import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export interface Story {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

export const fetchTopStories = async (): Promise<number[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/topstories.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top stories:', error);
    throw error;
  }
};

export const fetchStory = async (id: number): Promise<Story> => {
  try {
    const response = await axios.get(`${BASE_URL}/item/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching story ${id}:`, error);
    throw error;
  }
};

export const fetchTopTenStories = async (): Promise<Story[]> => {
  try {
    const topStoryIds = await fetchTopStories();
    const top10Ids = topStoryIds.slice(0, 10);

    const storiesPromises = top10Ids.map((id) => fetchStory(id));
    const stories = await Promise.all(storiesPromises);

    return stories.filter((story) => story.url); // Filter out stories without URLs
  } catch (error) {
    console.error('Error fetching top ten stories:', error);
    throw error;
  }
};
