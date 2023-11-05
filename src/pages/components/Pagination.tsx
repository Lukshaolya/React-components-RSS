/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import { IData } from '../types/interface';

function Pagination(data: IData[]) {
  // const [data, setData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  // const handleClick = (event: { target: { id: number }; }) => {
  //   setcurrentPage(Number(event.target.id));
  // };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i += 1) {
    pages.push(i);
  }

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          // id={number}
          // onClick={handleClick}
          // className={currentPage == number ? 'active' : null}
        >
          {number}
        </li>
      );
    }
    return null;
  });

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos")
  //     .then((response) => response.json())
  //     .then((json) => setData(json));
  // }, []);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
      <ul className="pageNumbers">
        <li>
          <button
            type="button"
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0]}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            type="button"
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
      <button type="button" onClick={handleLoadMore} className="loadmore">
        Load More
      </button>
    </>
  );
}

export default Pagination;
