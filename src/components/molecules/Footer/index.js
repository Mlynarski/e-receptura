import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem';

const FooterWrapper = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 0.8;
`;

const Footer = () => (
  <FooterWrapper>
    <MenuItem
      name="BY (C) E-RECEPTURA.PL"
      link="mailto: kontakt@e-receptura.pl"
      withoutRouter
    />
  </FooterWrapper>
);

export default Footer;
