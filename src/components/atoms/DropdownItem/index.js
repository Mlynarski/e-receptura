import styled from 'styled-components';

const DropdownItem = styled.button`
  width: 100%;
  background-color: ${props => (props.isSelected ? '#d5d5d5' : '#ffffff')};
  border: none;
  padding: 2px;
  outline: none;
  text-align: left;
  font-size: 14px;

  &::-moz-focus-inner {
    border: 0;
  }
`;

export default DropdownItem;
