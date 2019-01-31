import beerData from '../../../public/json/beer_list.json'

const axios = {
  get: (url) => {
    return Promise.resolve({
      data: beerData
    });
  },
  post: (url, beer) => {
    return Promise.resolve({
      data: beer
    });
  }
};

export default axios;