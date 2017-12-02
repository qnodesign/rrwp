import { error } from 'qno-console';
import fetchIntercept from 'fetch-intercept';

class ErrorCatcher {
  constructor() {
    this.registerHttpCatcher();
  }

  registerHttpCatcher() {
    fetchIntercept.register({
      response: response => {
        if (
          response.headers.get('content-type') &&
          response.headers.get('content-type').startsWith('application/problem+json')
        ) {
          return response.json().then(res => Promise.reject(res));
        } else if (response.status !== 200) {
          error(
            'Service error:',
            response.url || response.statusText,
            response.status,
            response.headers.get('content-type')
          );
          return Promise.reject();
        }
        return response;
      },
    });
  }
}
export default new ErrorCatcher();
