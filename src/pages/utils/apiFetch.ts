import { useLocation } from 'react-router-dom';

const API = 'https://swapi.dev/api/';
const PLANETS = 'planets';
export const PAGE_PARAM = '/?page=';

export const API_PLANETS = API + PLANETS;
export const API_PLANETS_BASIC = API + PLANETS;

export const getApiResource = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Could not fetch.', res.status);
      return false;
    }
    return await res.json();
  } catch (error) {
    // console.error('Could not fetch.', error.message);
    return false;
  }
};

const getId = (url: string, category: string) => {
  const id = url.replace(category, '').replace(/\//g, '');
  return id;
};

export const getPeoplePageId = (url: string) => {
  const pos = url.lastIndexOf(PAGE_PARAM);
  const id = url.slice(pos + PAGE_PARAM.length);

  return Number(id);
};

export const getPeopleId = (url: string) => getId(url, API_PLANETS);

// export const getPeopleImage = (id: number) => `${URL_IMG_PERSON}/${id+GUIDE_IMG_EXTENSION}`;

export const useQueryParams = () => new URLSearchParams(useLocation().search);
