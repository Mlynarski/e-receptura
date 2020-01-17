import React from 'react';
import styled from 'styled-components';
import ContentBox from '../../components/atoms/ContentBox';

const SignStyled = styled.div`
  font-size: 16px;
  text-align: right;
  width: 100%;
  margin-right: 20px;
  margin-top: 40px;
`;

const PageWelcome = () => (
  <ContentBox welcome>
    Witam na stronie generatora protokołu sporządzania leku recepturowego.
    Aplikacja powstała aby pomóc farmaceutom łatwiej i szybciej przygotowywać
    protokoły. Mam nadzieję, że generator spełni Państwa oczekiwania.
    <SignStyled>Twórca generatora</SignStyled>
  </ContentBox>
);

export default PageWelcome;
