import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { IData } from '../types/interface';

function DetailedCard() {
  const { productTitle } = useParams();
  const navigate = useNavigate();
  // const [productData, setProductData] = useState<IData>();

  const [titleForRequest, setTitleForRequest] = useState('');

  useEffect(() => {
    if (titleForRequest !== productTitle) {
      const getProduct = async () => {};
      getProduct();
      setTitleForRequest(productTitle || '');
      navigate(`$detailed${titleForRequest}`);
    }
  }, [productTitle, titleForRequest, navigate]);

  // if (productData) {
  //   return (
  //       <div className="card" key={productData.name}>
  //         <p className="game-title">{productData.climate}</p>
  //         {/* <img src={productData.headerImg} alt={productData.gameTitle} />
  //         <p className='card-text'>{productData.descriptionShort}</p>
  //         <p className='card-text'>{`${productData.category}`}</p>
  //         <p className='card-text'>{`${productData.devCompany}`}</p>
  //         <p className='card-text'>{`${productData.price}$`}</p> */}
  //       </div>

  //   )
  // }
  return null;
}

export default DetailedCard;
