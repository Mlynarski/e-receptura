import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const WrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  align-items: ${props => (props.row && !props.center ? 'baseline' : 'center')};

  justify-content: center;
  margin-left: ${props => (props.margin ? props.margin : '0')}px;
  margin-right: ${props => (props.margin ? props.margin : '0')}px;

  ${props =>
    props.width &&
    css`
      width: ${props.width}px;
    `}
`;

const FormLabel = styled.label`
  margin: 0px;
  font-weight: normal;
  text-align: center;

  ${props =>
    props.labelWidth &&
    css`
      width: ${props.labelWidth}px;
    `}
`;

const ItemLabel = ({
  label,
  children,
  row,
  margin,
  width,
  labelWidth,
  center,
}) => (
  <WrapperStyled row={row} margin={margin} center={center} width={width}>
    <FormLabel labelWidth={labelWidth}>{label}</FormLabel>
    {children}
  </WrapperStyled>
);

ItemLabel.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  row: PropTypes.bool,
  margin: PropTypes.number,
  width: PropTypes.number,
  labelWidth: PropTypes.number,
  center: PropTypes.bool,
};

ItemLabel.defaultProps = {
  row: false,
  margin: 0,
  width: undefined,
  labelWidth: undefined,
  center: false,
};

export default ItemLabel;
