import {get, post} from "../utils/request";

export const listFiles = (url, params) => {
  return get(url, params);
};

export const download = (url, params, config) => {
  return get(url, params, config);
};

export const upload = (url, params) => {
  return post(url, params);
};
