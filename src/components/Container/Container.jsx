import styles from './Container.less';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { loadTranslation } from '../../services/TranslationService';

class Container extends PureComponent {
  loadTranslation(language, translation) {
    if (!translation || !translation[language]) {
      loadTranslation(language);
    }
  }

  componentWillReceiveProps({ resources, translation }) {
    this.loadTranslation(resources.language, translation);
  }

  componentWillMount() {
    const { resources, translation } = this.props;
    this.loadTranslation(resources.language, translation);
  }

  render() {
    const { children, customprop } = this.props;

    return (
      <div className={classNames(styles.container, 'container')}>
        <header className={styles.header} />
        <div>{children}</div>
        {customprop && <p>{customprop}</p>}
        <footer className={styles.footer} />
      </div>
    );
  }
}

Container.propTypes = {
  customprop: PropTypes.node,
  resources: PropTypes.shape({
    language: PropTypes.string,
  }),
  translation: PropTypes.object,
};
Container.defaultProps = {};

const mapStateToProps = store => {
  return { ...store };
};

export default connect(mapStateToProps)(Container);
