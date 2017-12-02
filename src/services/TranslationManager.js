import store from '../store/store';
import parser from 'react-html-parser';
import { error } from 'qno-console';

const isHtml = str => {
  return str.includes('<') && str.includes('>') && str.includes('</');
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

  let res = translation[language][key] || false;

  if (!res) {
    return config && typeof config === 'boolean' ? res : `NOT TRANSLATED: ${key}`;
  }
  if (config) {
    res = typeof config === 'boolean' ? false : resolve(res, config);
  }

  return isHtml(res) ? parser(res) : res;
};
