import createHistory from 'history/createHashHistory';
import { info, error } from 'qno-console';
const history = createHistory();

export function gotoError() {
  error('Go to: /error');
  history.push('/error');
}

export default path => {
  info(`Go to: /${path}`);
  history.push(`/${path}`);
};
