import React from 'react';
import './styles.scss';

const Input = ({ placeholder, ...rest }) => {
  return (<input className="input-field" placeholder={placeholder} {...rest}/>)
}


export default Input;