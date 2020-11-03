import {get, post} from '../utils/request'

export const getModelModelConfig = () => {
  return get('/api/model/config');
};

export const runModelModelConfig = () => {
  return post('/api/model/execute');
};

export const cancelModelModelConfig = () => {
  return get('/api/model/cancel');
};

export const getModelModelStatus = () => {
  return get('/api/model/status');
};

export const updateModelModelConfig = (params) => {
  return post('/api/model/updateconfig', params);
};

