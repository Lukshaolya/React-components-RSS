/* eslint-disable react/destructuring-assignment */
import { IData } from '../types/interface';

function SearchItem(items: IData[]) {
  if (items) {
    return (
      <div>
        {items.map((item: IData) => (
          <div key={item.name}>
            <p>{item.name}</p>
            <p>Population: {item.population}</p>
            <p>Climate: {item.climate}</p>
            <p>Terrain: {item.terrain}</p>
          </div>
        ))}
      </div>
    );
  }
  return <div>Loading</div>;
}

export default SearchItem;
