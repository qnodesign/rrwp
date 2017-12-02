import styles from './Test.less';
import React from 'react';
import { info } from 'qno-console';
import { getParams } from '../../services/Matcher';
import translate from '../../services/TranslationManager';
import go, { gotoError } from '../../services/RoutingManager';
import ServiceCallManager from '../../services/ServiceCallManager';
import { Button } from 'reactstrap';

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

  const CountryFlags = () => {
    go('CountryFlags');
  };

  return (
    <div className={styles.test}>
      <h1>{translations.title}</h1>
      {params.target && <h2>{translations.target}</h2>}
      <p>{translations.heading}</p>
      <div className="btn-group" role="group" aria-label="Basic example">
        <Button color="success" onClick={toMale}>
          {translations.male}
        </Button>
        <Button color="primary" onClick={toFemale}>
          {translations.female}
        </Button>
        <Button color="danger" onClick={toError}>
          Error
        </Button>
        <Button color="danger" onClick={jsError}>
          JS Error
        </Button>
        <Button color="info" onClick={CountryFlags}>
          Flags
        </Button>
        <Button color="warning" onClick={cahceCall}>
          service call cached
        </Button>
      </div>
    </div>
  );
};

export default Test;
