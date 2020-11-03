import {get, post} from '../utils/request'

export const getForecastModelConfig = () => {
  return get('/api/model/config');
};

export const runForecastModelConfig = () => {
  return post('/api/model/execute');
};

export const cancelForecastModelConfig = () => {
  return get('/api/model/cancel');
};

export const getForecastModelStatus = () => {
  return get('/api/model/status');
};

export const updateForecastModelConfig = (params) => {
  return post('/api/model/updateconfig', params);
};

