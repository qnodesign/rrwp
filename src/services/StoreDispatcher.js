import store from '../store/store';
import { setLanguageAction } from '../store/reducers/ResourceReducer';
import { setTranslationAction } from '../store/reducers/TranslationReducer';

const FALLBACK = 'en';
const VALID = ['en', 'hu'];

const getLanguage = code => {
  const language = code || document.querySelector('html').getAttribute('lang');
  return VALID.includes(language) ? language : FALLBACK;
};

const setLanguage = code => {
  const language = code || getLanguage();
  store.dispatch(setLanguageAction(language));
  return new Promise(resolve => resolve(language));
};

const loadTranslation = language => {
  const translation = {
    [language]: require(`../resources/text-resources-${language}.json`),
  };
  store.dispatch(setTranslationAction(translation));
};

export { setLanguage, loadTranslation };
