import * as axios from 'axios';
import { format } from 'date-fns';
import { inputDateFormat } from './constants';
import { API } from './config';

const getHeros = async function() {
  try {
    const response = await axios.get(`${API}/heroes.json`);
    let data = parseList(response);
    const heroes = data.map(hero => {
      hero.originDate = format(hero.originDate, inputDateFormat);

      return hero;
    });

    return heroes;
  } catch (error) {
    console.error(error);

    return [];
  }
};

const parseList = response => {
  if (response.status !== 200) {
    throw Error(response.message);
  }

  if (!response.data) {
    return [];
  }

  let list = response.data;

  if (typeof list !== 'object') {
    list = [];
  }

  return list;
};

export const data = {
  getHeros,
};
