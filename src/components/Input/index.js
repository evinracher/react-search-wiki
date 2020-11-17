import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

// You can also put default values like this
// const Input = ({ placeholder = 'Input search query', ...rest }) => {
const Input = ({ placeholder, ...rest }) => {
  return (<input className="input-field" placeholder={placeholder} {...rest} />)
}

// This can get deprecated
Input.defaultProps = {
  placeholder: 'Input search query',
};

export default Input;