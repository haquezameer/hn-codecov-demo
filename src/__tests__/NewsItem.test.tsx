import { render, screen } from '@testing-library/react';
import NewsItem from '../components/NewsItem';
import { Story } from '../services/api';

describe('NewsItem Component', () => {
  const mockStory: Story = {
    id: 1,
    title: 'Test Story',
    url: 'https://example.com/test',
    score: 100,
    by: 'testuser',
    time: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    descendants: 25,
  };

  it('renders story details correctly', () => {
    render(<NewsItem story={mockStory} />);

    // Check if title is rendered
    expect(screen.getByText('Test Story')).toBeInTheDocument();

    // Check if URL domain is rendered
    expect(screen.getByText('(example.com)')).toBeInTheDocument();

    // Check if score is rendered
    expect(screen.getByText('100 points')).toBeInTheDocument();

    // Check if author is rendered
    expect(screen.getByText('by testuser')).toBeInTheDocument();

    // Check if comments count is rendered
    expect(screen.getByText('25 comments')).toBeInTheDocument();
  });

  it('creates a link to the original article', () => {
    render(<NewsItem story={mockStory} />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    // Check if link has correct href
    const titleLink = screen.getByText('Test Story').closest('a');
    expect(titleLink).toHaveAttribute('href', 'https://example.com/test');
    expect(titleLink).toHaveAttribute('target', '_blank');
    expect(titleLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles a story without URL gracefully', () => {
    const storyWithoutUrl = { ...mockStory, url: '' };
    render(<NewsItem story={storyWithoutUrl} />);

    // Should still render the title
    expect(screen.getByText('Test Story')).toBeInTheDocument();

    // Should not render the URL domain
    expect(screen.queryByText(/\(.*\)/)).not.toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<NewsItem story={mockStory} />);

    // Check if date is rendered in the expected format (this will vary by locale)
    const dateElement = screen.getByText(/on .*/);
    expect(dateElement).toBeInTheDocument();
  });
});
