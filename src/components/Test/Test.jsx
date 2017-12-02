import styles from './Test.less';
import React from 'react';
import { info } from 'qno-console';
import { getParams } from '../../services/Matcher';
import translate from '../../services/TranslationManager';
import go, { gotoError } from '../../services/RoutingManager';
import ServiceCallManager from '../../services/ServiceCallManager';

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
    go('Test/male', { male: true, female: false });
  };
  const toFemale = () => {
    go('Test/female');
  };
  const toError = () => {
    gotoError();
  };
  const jsError = a => {
    a();
  };
  const cahceCall = () => {
    ServiceCallManager.call('https://jsonplaceholder.typicode.com/posts/2', { cache: 'default' }).then(info);
  };

  const call = () => {
    ServiceCallManager.call('https://jsonplaceholder.typicode.com/posts/1').then(info);
  };

  return (
    <div className={styles.test}>
      <h1>{translations.title}</h1>
      {params.target && <h2>{translations.target}</h2>}
      <p>{translations.heading}</p>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button className="btn btn-success" onClick={toMale}>
          {translations.male}
        </button>
        <button className="btn btn-primary" onClick={toFemale}>
          {translations.female}
        </button>
        <button className="btn btn-danger" onClick={toError}>
          Error
        </button>
        <button className="btn btn-danger" onClick={jsError}>
          JS Error
        </button>
        <button className="btn btn-info" onClick={call}>
          service call
        </button>
        <button className="btn btn-warning" onClick={cahceCall}>
          service call cached
        </button>
      </div>{' '}
    </div>
  );
};

export default Test;
