import styles from './Container.less';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Container extends PureComponent {
  render() {
    const { children, customprop } = this.props;

    return (
      <div>
        <header />
        {customprop}
        {children}
        <footer />
      </div>
    );
  }
}

Container.PropTypes = {
  customprop: PropTypes.node,
};

export default Container;
