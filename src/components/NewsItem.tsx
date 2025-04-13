import styled from 'styled-components';
import { Story } from '../services/api';

const StyledNewsItem = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const StyledLink = styled.a`
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Meta = styled.div`
  display: flex;
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const MetaItem = styled.span`
  margin-right: 1rem;
`;

interface NewsItemProps {
  story: Story;
}

const NewsItem = ({ story }: NewsItemProps) => {
  // Format time to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Extract hostname from URL
  const getHostname = (url: string) => {
    try {
      const hostname = new URL(url).hostname.replace('www.', '');
      return hostname;
    } catch {
      return '';
    }
  };

  return (
    <StyledNewsItem data-testid="news-item">
      <Title>
        <StyledLink href={story.url} target="_blank" rel="noopener noreferrer">
          {story.title}
        </StyledLink>
      </Title>
      {story.url && (
        <div>
          <StyledLink
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#666', fontSize: '0.875rem' }}
          >
            ({getHostname(story.url)})
          </StyledLink>
        </div>
      )}
      <Meta>
        <MetaItem>{story.score} points</MetaItem>
        <MetaItem>by {story.by}</MetaItem>
        <MetaItem>on {formatDate(story.time)}</MetaItem>
        <MetaItem>{story.descendants} comments</MetaItem>
      </Meta>
    </StyledNewsItem>
  );
};

export default NewsItem;
