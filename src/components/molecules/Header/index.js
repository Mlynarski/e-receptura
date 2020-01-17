import React from 'react';
import styled from 'styled-components';
import HeaderText from '../../atoms/HeaderText';
import HeaderLogo from '../../atoms/HeaderLogo';
import Menu from '../Menu';
import background from '../../../assets/wfinal.jpg';

const MainWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 999;
`;

const TitleWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Header = () => (
  <MainWrapperStyled>
    <TitleWrapperStyled>
      <HeaderLogo />
      <HeaderText>E-RECEPTURA</HeaderText>
    </TitleWrapperStyled>
    <Menu
      items={[
        {
          name: 'STRONA GŁÓWNA',
          link: '/',
        },
        {
          name: 'GENERATOR',
          link: '/generator',
        },
        {
          name: 'ZASADY KORZYSTANIA',
          link: '/rules',
        },
      ]}
    />
  </MainWrapperStyled>
);

export default Header;
