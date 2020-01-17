import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';

const MainWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const ContentWrapperStyled = styled.div`
  display: flex;
  flex: 1;
  background-color: #f6f6f6;
  flex-direction: column;
`;

const MainTemplate = ({ children }) => (
  <MainWrapperStyled>
    <Header />
    <ContentWrapperStyled>{children}</ContentWrapperStyled>
    <Footer />
  </MainWrapperStyled>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
