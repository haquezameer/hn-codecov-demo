# Hacker News Top 10 Viewer

[![codecov](https://codecov.io/gh/YOUR_USERNAME/hn-codecov-demo/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/hn-codecov-demo)

A responsive React application that displays the top 10 stories from Hacker News with test coverage integration.

## Features

- Fetches and displays the top 10 stories from Hacker News API
- Clean, minimal, and responsive UI
- Error handling with retry capability
- Comprehensive test suite with Jest and React Testing Library
- Test coverage reporting

## Tech Stack

- React 19
- TypeScript
- Vite
- Styled Components
- Jest + React Testing Library
- Axios

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Testing

Run tests:

```bash
npm test
```

Run tests with coverage report:

```bash
npm run test:coverage
```

## Project Structure

```
src/
├── components/       # UI components
├── services/         # API services
├── __tests__/        # Test files
├── __mocks__/        # Mock files for testing
├── App.tsx           # Main App component
└── main.tsx          # Entry point
```

## API

The application uses the [Hacker News API](https://github.com/HackerNews/API) to fetch the top stories.

## License

MIT
