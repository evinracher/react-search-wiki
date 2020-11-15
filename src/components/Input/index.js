import React from 'react';
import './styles.css';

const Input = ({ placeholder, ...rest }) => {
  return (<input className="input-field" placeholder={placeholder} {...rest}/>)
}


export default Input;