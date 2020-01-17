import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ItemWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 60px;
`;

const ItemStyled = styled(Link)`
  text-decoration: none;
  outline: none;
  color: white;
  font-weight: bold;
  user-select: none;

  &:hover {
    margin-top: 2px;
    border-bottom: 2px solid #2871d4;
  }
`;

const MenuItem = ({ name, link, withoutRouter }) => (
  <ItemWrapperStyled>
    {withoutRouter ? (
      <ItemStyled as="a" href={link} to="">
        {name}
      </ItemStyled>
    ) : (
      <ItemStyled to={link}>{name}</ItemStyled>
    )}
  </ItemWrapperStyled>
);

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  withoutRouter: PropTypes.bool,
};

MenuItem.defaultProps = {
  withoutRouter: false,
};

export default MenuItem;
