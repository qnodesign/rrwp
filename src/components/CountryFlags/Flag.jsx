import React from 'react';
import PropTypes from 'prop-types';

const Flag = ({ country }) => {
  return <img width="400" src={country.flag} />;
};

Flag.propTypes = {
  country: PropTypes.object,
};

export default Flag;
