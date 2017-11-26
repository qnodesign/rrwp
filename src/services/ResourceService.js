import store from '../store/store';
import { setLanguageAction } from '../store/reducers/ResourceReducer';

const FALLBACK = 'en';
const VALID = ['en', 'hu'];

export const setLanguage = code => {
  const language = code || getLanguage();
  store.dispatch(setLanguageAction(language));
  return new Promise(resolve => resolve(language));
};

export const getLanguage = code => {
  const language = code || document.querySelector('html').getAttribute('lang');
  return VALID.includes(language) ? language : FALLBACK;
};
