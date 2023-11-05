import { useEffect, useState } from 'react';
import { IData } from './types/interface';
import './styles.css';
// import Pagination from './components/Pagination';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<IData[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [errorHandler, setErrorHandler] = useState(false);
  const [loading, isLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // const totalItems = filteredData.length - 1;

  const handleGetData = async () => {
    const response = await fetch(
      `https://swapi.dev/api/planets/?page=${currentPage}&perPage=${itemsPerPage}`,
    );
    const dataResponse = await response.json();
    console.log(dataResponse);
    setData(dataResponse.results.slice(0, itemsPerPage));
    setFilteredData(dataResponse.results.slice(0, itemsPerPage));
    isLoading(false);
    console.log(dataResponse.results.slice(0, itemsPerPage));
  };

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log(event.target.value);
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
    handleGetData();
    setData(data.slice(0, itemsPerPage));
    setFilteredData(filteredData.slice(0, itemsPerPage));
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
    <div className="container">
      <div className="seacrhBar_container">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button className="searchBar-btn" type="button" onClick={handleSearch}>
          Search
        </button>
        <button
          className="searchBar-btn"
          type="button"
          onClick={() => {
            setErrorHandler(true);
          }}
        >
          Swith on Error
        </button>
      </div>
      <div>
        <select value={itemsPerPage} onChange={handleChangeItemsPerPage}>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </select>
      </div>

      {loading ? (
        <div className="loading_container">Loading</div>
      ) : (
        <div className="rearchResults_container">
          {filteredData.map((item) => (
            <div className="item-card" key={item.name}>
              <p>{item.name}</p>
              <p>Population: {item.population}</p>
              {/* <p>Climate: {item.climate}</p>
              <p>Terrain: {item.terrain}</p> */}
            </div>
          ))}
        </div>
      )}

      <div className="pagination_container">
        {/* <Pagination
            data={filteredData}
        /> */}
      </div>
    </div>
  );
}

export default SearchPage;
