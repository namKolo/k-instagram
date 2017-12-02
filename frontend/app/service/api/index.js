// @flow
import 'whatwg-fetch';
import { stringify } from 'query-string';
import merge from 'lodash/merge';
import { apiUrl } from 'config';

export const checkStatus = (response: Object): Object => {
  if (response.ok) {
    return response;
  }
  const error = new Error(`${response.status} ${response.statusText}`);
  throw error;
};

export const parseJSON = (response: Object): Object => {
  return response.json();
};

const logResponse = (response: Object) => {
  console.log(response);
  return response;
};

export const parseSettings = (params: { method?: string, data?: Object, locale?: string } = {}) => {
  const { method = 'get', data, locale, ...otherSettings } = params;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  };

  const settings = merge(
    {
      body: data ? JSON.stringify(data) : undefined,
      method,
      headers,
    },
    otherSettings,
  );
  return settings;
};

export const parseEndpoint = (endpoint: string, params?: Object): string => {
  const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint;
  const querystring = params ? `?${stringify(params)}` : '';
  return `${url}${querystring}`;
};

const api = {};

api.request = (endpoint: string, setting: { params?: Object } = {}): any => {
  const { params, ...settings } = setting;
  return fetch(parseEndpoint(endpoint, params), parseSettings(settings))
    .then(checkStatus)
    .then(parseJSON)
    .then(logResponse);
};

['delete', 'get'].forEach(method => {
  api[method] = (endpoint: string, settings: Object) =>
    api.request(endpoint, { method, ...settings });
});

['post', 'put', 'patch'].forEach(method => {
  api[method] = (endpoint: string, data: Object, settings: Object) =>
    api.request(endpoint, { method, data, ...settings });
});

api.create = (settings: Object = {}) => ({
  settings,

  setToken(token: string) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`,
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    };
  },

  request(endpoint: string, settings: Object) {
    return api.request(endpoint, merge({}, this.settings, settings));
  },

  post(endpoint: string, data: Object, settings: Object) {
    return this.request(endpoint, { method: 'post', data, ...settings });
  },

  get(endpoint: string, settings: Object) {
    return this.request(endpoint, { method: 'get', ...settings });
  },

  put(endpoint: string, data: Object, settings: Object) {
    return this.request(endpoint, { method: 'put', data, ...settings });
  },

  patch(endpoint: string, data: Object, settings: Object) {
    return this.request(endpoint, { method: 'patch', data, ...settings });
  },

  delete(endpoint: string, settings: Object) {
    return this.request(endpoint, { method: 'delete', ...settings });
  },
});

export default api;
