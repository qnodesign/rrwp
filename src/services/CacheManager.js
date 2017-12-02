import log from 'qno-console';

class CacheManager {
  constructor(ServiceCallManager) {
    this.ServiceCallManager = ServiceCallManager;
    this.Cache = {};
  }

  copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  call(url, config = {}) {
    if (!url) {
      throw 'No URL provided!';
    }

    const { method = 'GET', cache = false, params = null } = config;
    const isCacheable = method === 'GET' && cache;
    const key = params ? `${url}?${this.ServiceCallManager.composeQueryParameters(params)}` : url;

    if (isCacheable && this.Cache[key]) {
      log(`Served from cache: ${key}`);
      return Promise.resolve(this.Cache[key]);
    }

    return this.ServiceCallManager.call(url, config).then(response => {
      if (isCacheable) {
        log(`Request cached: ${key}`);
        this.Cache[key] = this.copy(response);
      }
      return Promise.resolve(response);
    });
  }

  emptyCache() {
    this.Cache = {};
  }
}

export default CacheManager;
