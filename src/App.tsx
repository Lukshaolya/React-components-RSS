import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />}>
          <Route path=":id" element={<SearchPage />} />
          {/* <Route path="main/detailed" element={<DetailedMain />} />
        <Route path="main/detailed/:productTitle" element={<DetailedCard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
