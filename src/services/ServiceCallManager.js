import CacheManager from './CacheManager';
import './ErrorCatcher';
import { error } from 'qno-console';
import store from '../store/store';

class ServiceCallManager {
  getQueryString = state => {
    const euc = encodeURIComponent;
    return Object.keys(state)
      .map(param => `${euc(param)}=${euc(state[param])}`)
      .join('&');
  };

  call(url, config = {}) {
    if (!url) {
      throw 'No URL provided!';
    }
    // cache: no-cache, force-cache, no-store, reload, default
    let { method = 'GET', cache = 'no-cache', params = null, body, contentType = 'application/json' } = config;
    const headers = {};

    if (method === 'GET' && params && Object.keys(params).length) {
      url = `${url}?${this.getQueryString(params)}`;
    }

    if (['POST', 'PATCH', 'PUT'].includes(method)) {
      body = params ? JSON.stringify(params) : {};
      headers['Content-Type'] = contentType;
    }

    const reqConfig = {
      body,
      method,
      cache,
      headers: {
        ...headers,
        'Accept-Language': `${store.getState().resources.language}-CH,en,q=0.8,hu;q=0.7`,
        Accept: contentType,
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'same-origin',
      mode: 'cross-origin',
    };

    if (reqConfig.method === 'PATCH') {
      reqConfig.method = 'patch';
    }

    return fetch(url, reqConfig).then(response => {
      return response.json().catch(() => {
        error(`Response is invalid JSON: ${response}`);
      });
    });
  }
}

export default new CacheManager(new ServiceCallManager());
