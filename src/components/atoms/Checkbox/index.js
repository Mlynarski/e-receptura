import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckboxIcon from '../../../assets/check_icon.svg';
import idsGenerator from '../../../utils/idsGenerator';

const CheckboxStyled = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  opacity: 0;

  &:checked + label {
    border: 2px solid #2871d4;
    background-color: #2871d4;
    background-image: url(${CheckboxIcon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &:active {
      box-shadow: 0px 0px 10px 3px rgba(40, 113, 212, 1);
    }
  }

  &:active + label {
    box-shadow: 0px 0px 10px 3px grey;
  }
`;

const LabelStyled = styled.label`
  position: relative;
  height: 20px;
  width: 20px;
  margin: 10px;
  background-color: transparent;
  border: 2px solid grey;
  border-radius: 10%;
  transition: box-shadow 0.2s ease-out;
`;

const Checkbox = ({ name, onChange, value, checked }) => {
  const ids = useState(idsGenerator());

  return (
    <>
      <CheckboxStyled
        name={name}
        id={`${name}_${ids}`}
        onChange={onChange}
        value={value}
        checked={checked}
      />
      <LabelStyled htmlFor={`${name}_${ids}`} />
    </>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  onChange: undefined,
  value: false,
  checked: false,
};

export default Checkbox;
