import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const Input = ({ placeholder, ...rest }) => {
  return (<input className="input-field" placeholder={placeholder} {...rest}/>)
}

Input.defaultProps = {
  placeholder: 'Input search query',
}

export default Input;