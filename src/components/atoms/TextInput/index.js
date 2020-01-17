import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import idsGenerator from '../../../utils/idsGenerator';

const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  
  &::after {
    position: absolute;
    margin-top: ${props => (props.height ? props.height + 6 : 61)}px;
    margin-left: 15px;
    color: #f44336;
    font-size: 11px;
    font-weight: normal;
    content: '${props => (props.error ? props.error : '')}';
  }
`;

const TextInputStyled = styled.input`
  box-sizing: border-box;
  width: ${props => (props.width ? props.width : 200)}px;
  @media (max-width: 1150px) {
    width: ${props => (props.widthMobile ? props.widthMobile : props.width)}px;
  }
  height: ${props => (props.height ? props.height : 55)}px;
  margin: 2px;
  border-radius: 4px;
  border: 1px solid ${props => (props.error ? '#f44336' : '#bdbdbd')};
  padding: 15px 10px 15px 10px;
  background-color: transparent;
  font-size: 14px;
  transition: border-color 0.2s ease-out;
  outline: none;
  text-transform: ${props => (props.toUpperCase ? 'uppercase' : 'none')};

  &:hover {
    border-color: ${props => (props.error ? '#f44336' : '#000000')};
  }

  &:focus {
    padding-left: 9px;
    border-width: 2px;
    border-color: ${props => (props.error ? '#f44336' : '#2871d4')};
  }

  &:focus + label {
    padding: 0px 5px 0px 5px;
    top: -4px;
    font-size: 11px;
    color: ${props => (props.error ? '#f44336' : '#2871d4')};
    background: #f6f6f6;
  }

  &:not(:placeholder-shown) + label {
    padding: 0px 5px 0px 5px;
    top: -4px;
    font-size: 11px;
    background: #f6f6f6;
    color: ${props => (props.error ? '#f44336' : '#737373')};
  }

  &:not(:placeholder-shown):focus + label {
    padding: 0px 5px 0px 5px;
    top: -4px;
    font-size: 11px;
    background: #f6f6f6;
    color: ${props => (props.error ? '#f44336' : '#2871d4')};
  }
`;

const LabelInputStyled = styled.label`
  @media (max-width: 1150px) {
    display: none;
  }
  position: absolute;
  top: 20px;
  left: 12px;
  font-size: 14px;
  font-weight: normal;
  color: ${props => (props.error ? '#f44336' : '#737373')};
  transition: 0.2s ease-out all;
  cursor: text;
  user-select: none;
`;

const TextInput = ({
  name,
  label,
  error,
  onChange,
  value,
  width,
  widthMobile,
  height,
  type,
  onFocus,
  onBlur,
  toUpperCase,
}) => {
  const ids = useState(idsGenerator());

  return (
    <WrapperStyled error={error}>
      <TextInputStyled
        name={name}
        id={`${name}_${ids}`}
        placeholder=" "
        error={error}
        onChange={onChange}
        value={value}
        width={width}
        widthMobile={widthMobile}
        height={height}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        toUpperCase={toUpperCase}
      />
      <LabelInputStyled htmlFor={`${name}_${ids}`} error={error}>
        {label}
      </LabelInputStyled>
    </WrapperStyled>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  widthMobile: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  toUpperCase: PropTypes.bool,
};

TextInput.defaultProps = {
  label: '',
  error: '',
  onChange: undefined,
  value: undefined,
  width: undefined,
  widthMobile: undefined,
  height: undefined,
  type: undefined,
  onFocus: undefined,
  onBlur: undefined,
  toUpperCase: false,
};

export default TextInput;
