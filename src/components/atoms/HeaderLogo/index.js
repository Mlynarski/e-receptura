import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/head_icon.svg';

const HeaderLogoStyled = styled.img`
  user-select: none;

  @media (max-width: 800px) {
    width: 20%;
  }
`;

const HeaderLogo = () => <HeaderLogoStyled src={logo} />;

export default HeaderLogo;
