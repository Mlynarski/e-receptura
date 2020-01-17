import styled, { css } from 'styled-components';

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #d5d5d5;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  align-self: center;
  animation: animationIn 0.6s;

  @keyframes animationIn {
    0% {
      transform: translateY(-800px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes animationInForm {
    0% {
      transform: translateX(-2000px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  ${props =>
    props.welcome &&
    css`
      justify-content: center;
      align-items: center;
      text-align: justify;
      min-height: 200px;

      @media (min-width: 1199px) {
        width: 60%;
      }
    `}
  ${props =>
    props.forms &&
    css`
      justify-content: center;
      align-items: center;
      border: 1px solid gray;
      padding: 0px 5px 5px 5px;
      background-color: #f6f6f6;
      min-width: 320px;
      animation: animationInForm 0.6s;
    `};
`;

export default ContentBox;
