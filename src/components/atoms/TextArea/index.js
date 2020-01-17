import styled from 'styled-components';

const TextArea = styled.textarea`
  box-sizing: border-box;
  outline: none;
  resize: none;
  min-height: 180px;
  min-width: 310px;
  width: 800px;
  @media (max-width: 1150px) {
    width: 80vw;
  }
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  padding: 15px 10px 15px 10px;
  background-color: transparent;
  transition: border-color 0.2s ease-out;
  font-size: 14px;

  &:hover {
    border-color: #000000;
  }

  &:focus {
    padding-left: 9px;
    padding-top: 14px;
    border-width: 2px;
    border-color: #2871d4;
  }
`;

export default TextArea;
