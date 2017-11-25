import store from '../store/store';
import parser from 'react-html-parser';
import { error } from 'qno-console';
import { setTranslationAction } from '../store/reducers/TranslationReducer';

const isHtml = string => {
  return string.includes('<') && string.includes('>') && string.includes('/>');
};

const resolve = (string, config) => {
  if (!config) {
    return string;
  }
  Object.keys(config).forEach(key => {
    string = string.replace(new RegExp(`{{${key}}}`, 'g'), config[key]);
  });
  const tests = string.match(/{{.+}}/g);
  if (tests && tests.length) {
    error(`Translation config does not contain variables as of: ${tests}`);
  }
};

export function loadTranslation(language) {
  const translation = { [language]: require(`../resources/text-resources-${language}.json`) };
  store.dispatch(setTranslationAction(translation));
}

export default (key, config) => {
  const language = store.getState().resources.language;
  const translation = store.getState().translation;
  if (!language) {
    error(`Following key cannot be translated: ${key}`);
    throw 'Language is not set';
  }
  if (!Object.keys(translation).length) {
    error('Translations are not loaded');
    throw 'Translations are not loaded';
  }

  let translated = translation[language][key] || `NOT TRANSLATED: ${key}`;
  translated = resolve(translated, config);

  return isHtml(translated) ? parser(translated) : translated;
};
