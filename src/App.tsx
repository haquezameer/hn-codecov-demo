import { createGlobalStyle } from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
import NewsList from './components/NewsList';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f6f6ef;
    color: #333;
    line-height: 1.6;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
        <NewsList />
      </ErrorBoundary>
    </>
  );
}

export default App;
