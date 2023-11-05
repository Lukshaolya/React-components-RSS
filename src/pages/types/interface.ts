export interface IItems {
  items: IData[];
}

export interface IData {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface IItemsResponse {
  count: number;
  next: string;
  previous: null;
  results: IItems;
}
