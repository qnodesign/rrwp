import createHistory from 'history/createHashHistory';
import { info, error } from 'qno-console';
const history = createHistory();

const getQueryString = state => {
  const euc = encodeURIComponent;
  return Object.keys(state)
    .map(param => `${euc(param)}=${euc(state[param])}`)
    .join('&');
};

export const gotoError = () => {
  //TODO: invent error redirect throug ErrorBoundary
  error('Go to: /error');
  history.push('/error');
};

export default (path, state) => {
  info(`Go to: /${path}${state ? `, state: ${JSON.stringify(state)}` : ''}`);
  const query = state ? `?${getQueryString(state)}` : '';
  history.push(`/${path}${query}`);
};
