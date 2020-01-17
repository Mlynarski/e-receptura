import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';

const WrapperStyled = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  position: fixed;
  bottom: 0px;
  height: 60px;
  width: 100%;
  background-color: #323232;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  z-index: 999;
`;

const CookiesBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    if (cookies.includes('ERECEPTURA=true')) {
      setIsVisible(false);
    }
  }, []);

  const setCookie = () => {
    const date = new Date();
    // 90 days
    date.setTime(date.getTime() + 90 * 24 * 60 * 60 * 1000);
    document.cookie = `${encodeURIComponent(
      'ERECEPTURA',
    )}=${'true'}; expires=${date.toUTCString()}};`;

    setIsVisible(false);
  };

  return (
    <WrapperStyled isVisible={isVisible}>
      Ta strona używa plików cookies w celach statystycznych
      <Button onClick={setCookie}>Akceptuj</Button>
    </WrapperStyled>
  );
};

export default CookiesBar;
