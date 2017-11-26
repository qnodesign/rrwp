import styles from './Test.less';
import React from 'react';
import { getParams } from '../../services/Matcher';
import translate from '../../services/TranslationService';
import go from '../../services/RoutingService';

const Test = props => {
  const params = getParams(props) || {};

  const translations = {
    title: translate('title'),
    heading: translate('heading'),
    male: translate('male'),
    female: translate('female'),
    target: (params.target && translate(`target.${params.target}`)) || null,
  };

  const toMale = () => {
    go('Test/male');
  };
  const toFemale = () => {
    go('Test/female');
  };

  return (
    <div className={styles.test}>
      <h1>{translations.title}</h1>
      {params.target && <h2>{translations.target}</h2>}
      <p>{translations.heading}</p>
      <button onClick={toMale}>{translations.male}</button> <button onClick={toFemale}>{translations.female}</button>
    </div>
  );
};

export default Test;
