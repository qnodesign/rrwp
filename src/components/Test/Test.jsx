import styles from './Test.less';
import React from 'react';
import { getParams } from '../../services/Matcher';
import translate from '../../services/TranslationService';
import go from '../../services/RoutingService';

const Test = props => {
  const { target } = getParams(props);

  const translations = {
    title: translate('title'),
    heading: translate('heading'),
    target: translate(`target.${target}`),
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
      {target && <h2>{translations.target}</h2>}
      <p>{translations.heading}</p>
      <button onClick={toMale}>Male</button>
      <button onClick={toFemale}>Female</button>
    </div>
  );
};

export default Test;
