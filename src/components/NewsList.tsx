import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchTopTenStories, Story } from '../services/api';
import NewsItem from './NewsItem';

const StyledNewsList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #ff6600;
  margin: 0;
`;

const Button = styled.button`
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e05c00;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
`;

const ErrorText = styled.p`
  text-align: center;
  color: #d32f2f;
`;

const NewsList = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTopTenStories();
      setStories(data);
    } catch {
      setError('Failed to fetch stories. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStories();
  };

  if (loading && !refreshing) {
    return (
      <StyledNewsList>
        <Header>
          <Title>Hacker News Top 10</Title>
        </Header>
        <LoadingText data-testid="loading">Loading stories...</LoadingText>
      </StyledNewsList>
    );
  }

  if (error) {
    return (
      <StyledNewsList>
        <Header>
          <Title>Hacker News Top 10</Title>
          <Button onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Header>
        <ErrorText data-testid="error">{error}</ErrorText>
      </StyledNewsList>
    );
  }

  return (
    <StyledNewsList data-testid="news-list">
      <Header>
        <Title>Hacker News Top 10</Title>
        <Button onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Header>
      {stories.map((story) => (
        <NewsItem key={story.id} story={story} />
      ))}
    </StyledNewsList>
  );
};

export default NewsList;
