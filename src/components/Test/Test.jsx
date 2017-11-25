import styles from './Test.less';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const Test = () => {
  return (
    <div className={styles.test}>
      <h1>Hello World</h1>
      <p>This is the test of the rrwp application</p>
    </div>
  );
};

export default Test;
