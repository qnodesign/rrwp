import React from 'react';
import PropTypes from 'prop-types';

const Flag = ({ flag }) => {
  return <img width="300" src={flag} />;
};

Flag.propTypes = {
  flag: PropTypes.string,
};

export default Flag;
