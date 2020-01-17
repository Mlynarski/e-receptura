import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MenuItem from '../../atoms/MenuItem';

const MenuWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: black;
  box-shadow: 0px 5px 2px grey;
  opacity: 0.8;

  @media (max-width: ${props => props.numOfItems * 210}px) {
    flex-direction: column;
  }
`;

const Menu = ({ items }) => {
  return (
    <MenuWrapperStyled numOfItems={items.length}>
      {items.map(item => (
        <MenuItem key={item.name} name={item.name} link={item.link} />
      ))}
    </MenuWrapperStyled>
  );
};

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Menu;
