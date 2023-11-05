import ErrorBoundary from './pages/ErrorBoundaty';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  );
}

export default App;
