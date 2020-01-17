import styled from 'styled-components';

const Button = styled.button`
  width: ${props => (props.width ? props.width : 70)}px;
  height: ${props => (props.height ? props.height : 25)}px;
  margin: ${props => (props.margin ? props.margin : 1)}px;
  padding: 0px;
  background: #e0e0df;
  border: 1px solid #bdbdbd;
  outline: none;
  transition: border-color 0.2s ease-out;
  font-size: 12px;

  &:hover {
    border-color: #000000;
  }

  &:active {
    border-width: 2px;
    border-color: #2871d4;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

export default Button;
