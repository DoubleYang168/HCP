import {get, post} from '../utils/request'

export const getShortTermModelConfig = () => {
  return get('/api/model/config');
};

export const runShortTermModelConfig = () => {
  return post('/api/model/execute');
};

export const cancelShortTermModelConfig = () => {
  return get('/api/model/cancel');
};

export const getShortTermModelStatus = () => {
  return get('/api/model/status');
};

export const updateShortTermModelConfig = (params) => {
  return post('/api/model/updateconfig', params);
};

