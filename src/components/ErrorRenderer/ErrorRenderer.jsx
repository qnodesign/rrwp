import styles from './ErrorRenderer.less';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const ErrorRenderer = () => {
  return <div className={styles.error}>Error occured</div>;
};

export default ErrorRenderer;
