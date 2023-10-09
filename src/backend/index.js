import { getRandomTimeout } from '../utils';
import ApiFactory from './api/ApiFactory.class';

export default async function (endpoint, method, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const api = new ApiFactory(endpoint).getApi();
      resolve(api[method](data));
    }, getRandomTimeout());
  });
}
