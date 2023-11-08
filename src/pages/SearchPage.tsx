import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { IData } from './types/interface';
import './styles.css';
import {
  API_PLANETS_BASIC,
  PAGE_PARAM,
  getApiResource,
  getPeopleId,
  useQueryParams,
} from './utils/apiFetch';
import Pagination from './components/Pagination';
import DetailedCard from './components/ItemCard';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<IData[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [errorHandler, setErrorHandler] = useState(false);
  const [loading, isLoading] = useState(true);
  const [detailedID, setDetailedID] = useState('');
  const [clicked, isClicked] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(10);

  const navigate = useNavigate();

  const searchParams = useQueryParams();
  const currentPage = searchParams.get('search');
  const PAGE = API_PLANETS_BASIC + PAGE_PARAM + currentPage;
  const totalItems = 60;

  useEffect(() => {
    if (!currentPage) {
      navigate(`?page=1`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetData = async (url: string) => {
    const response = await getApiResource(url);
    const dataResponse = response.results;
    setData(dataResponse.slice(0, cardsPerPage));
    setFilteredData(dataResponse.slice(0, cardsPerPage));
    isLoading(false);
  };

  useEffect(() => {
    console.log(API_PLANETS_BASIC + PAGE_PARAM + currentPage);
    console.log(currentPage);
    handleGetData(PAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, cardsPerPage]);

  const saveSearchTerm = () => {
    window.localStorage.setItem('searchTerm', searchTerm);
  };

  const paginate = (pageNumber: number) => {
    navigate(`?page=${pageNumber}`);
  };

  const handleNext = () => {
    navigate(`?page=${+(currentPage || 1) + 1}`);
  };

  const handlePrev = () => {
    navigate(`?page=${+(currentPage || 1) - 1}`);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      handleGetData(PAGE);
      isLoading(true);
    } else {
      const filteredResult: IData[] = data.filter((item): boolean =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(filteredResult);
    }
    saveSearchTerm();
  };

  const handleOpenCard = (id: string) => {
    setDetailedID(id);
    isClicked(true);
    console.log(id);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCardsPerPage(parseInt(event.target.value, 10));
    console.log(cardsPerPage);
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

        <select value={cardsPerPage} onChange={handleChange}>
          <option value={5}>5</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
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
              {/* <p>{item.url}</p>
              <p>{getPeopleId(item.url)}</p> */}
              <button
                type="button"
                onClick={() => handleOpenCard(getPeopleId(item.url))}
              >
                More
              </button>
            </div>
          ))}
        </div>
      )}

      {clicked ? <DetailedCard id={detailedID} /> : ''}

      <div className="pagination_container">
        <div className="pagination_cont">
          <Pagination
            currentPage={+(currentPage || 1)}
            totalItems={totalItems}
            cardsPerPage={cardsPerPage}
            paginate={paginate}
            prev={handlePrev}
            next={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
