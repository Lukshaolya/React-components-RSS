import { useEffect, useState } from 'react';
import { IData } from './types/interface';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<IData[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [errorHandler, setErrorHandler] = useState(false);
  const [loading, isLoading] = useState(true);

  const handleGetData = async () => {
    const response = await fetch('https://swapi.dev/api/planets/');
    const dataResponse = await response.json();
    console.log(data);
    setData(dataResponse.results);
    setFilteredData(dataResponse.results);
    isLoading(false);
    console.log(dataResponse.results);
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveSearchTerm = () => {
    window.localStorage.setItem('searchTerm', searchTerm);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      handleGetData();
      isLoading(true);
    } else {
      const filteredResult: IData[] = data.filter((item): boolean =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(filteredResult);
    }
    saveSearchTerm();
  };

  if (errorHandler) {
    throw new Error('The university colapse is started');
  }

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      <button
        type="button"
        className="search-button"
        onClick={() => {
          setErrorHandler(true);
        }}
      >
        Swith on Error
      </button>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {filteredData.map((item) => (
            <div key={item.name}>
              <p>{item.name}</p>
              <p>Population: {item.population}</p>
              <p>Climate: {item.climate}</p>
              <p>Terrain: {item.terrain}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
