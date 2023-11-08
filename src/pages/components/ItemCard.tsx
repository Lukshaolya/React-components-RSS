import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  API_PLANETS_BASIC,
  getApiResource,
  useQueryParams,
} from '../utils/apiFetch';
import { IData } from '../types/interface';

function DetailedCard(props: { id: string | null }) {
  const { id } = props;
  const [data, setData] = useState<IData>();
  const [loading, isLoading] = useState(true);
  const [opened, isOpened] = useState(false);

  const searchParams = useQueryParams();
  const currentItem = searchParams.get('search');
  const navigate = useNavigate();

  const handleGetData = async (idCard: string) => {
    const url = `${API_PLANETS_BASIC}/${idCard}/`;
    console.log(idCard);
    const response = await getApiResource(url);
    console.log(response);
    setData(response);
    isLoading(false);
    isOpened(true);
  };

  useEffect(() => {
    if (!currentItem && id) {
      handleGetData(id);
      isLoading(true);
      // navigate(`?search=${id}`);
    }
  }, [id, currentItem, navigate]);

  const handleClose = () => {
    isOpened(false);
  };

  if (loading) {
    return <div className="loading_container">Loading</div>;
  }

  if (data && opened) {
    return (
      <div className="detailedCard_container">
        <div className="item-card__detailed" key={data.name}>
          <p>{data.name}</p>
          <p>Population: {data.population}</p>
          <p>Climate{data.climate}</p>
          <p>Diameter{data.diameter}</p>
          <p>Gravity{data.gravity}</p>
          <p>Climate{data.climate}</p>
          <p>Terrain{data.terrain}</p>
          <p>Surface_water{data.surface_water}</p>
          <button className="close_btn" type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
  return null;
}

export default DetailedCard;
