import {get, post} from '../utils/request'

export const getMethodModelConfig = () => {
  return get('/api/model/config');
};

export const runMethodModelConfig = () => {
  return post('/api/model/execute');
};

export const cancelMethodModelConfig = () => {
  return get('/api/model/cancel');
};

export const getMethodModelStatus = () => {
  return get('/api/model/status');
};

export const updateMethodModelConfig = (params) => {
  return post('/api/model/updateconfig', params);
};

