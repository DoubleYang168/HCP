import {get, post} from '../utils/request'

export const getUncertaintyModelConfig = () => {
  return get('/api/model/config');
};

export const runUncertaintyModelConfig = () => {
  return post('/api/model/execute');
};

export const cancelUncertaintyModelConfig = () => {
  return get('/api/model/cancel');
};

export const getUncertaintyModelStatus = () => {
  return get('/api/model/status');
};

export const updateUncertaintyModelConfig = (params) => {
  return post('/api/model/updateconfig', params);
};

