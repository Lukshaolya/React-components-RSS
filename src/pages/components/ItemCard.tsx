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

  const searchParams = useQueryParams();
  const currentItem = searchParams.get('search');
  const navigate = useNavigate();

  const handleGetData = async (idCard: string) => {
    const url = `${API_PLANETS_BASIC}/${idCard}/`;
    const response = await getApiResource(url);
    console.log(response);
    setData(response);
    isLoading(false);
  };

  useEffect(() => {
    if (!currentItem && id) {
      handleGetData(id);
      navigate(`?search=${id}`);
    }
  }, [currentItem, id, navigate]);

  if (loading) {
    return <div className="loading_container">Loading</div>;
  }

  if (data) {
    return (
      <div className="rearchResults_container">
        <div className="item-card" key={data.name}>
          <p>{data.name}</p>
          <p>Population: {data.population}</p>
          <p>Climate{data.climate}</p>
        </div>
      </div>
    );
  }
}

export default DetailedCard;
