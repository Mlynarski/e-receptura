import styled from 'styled-components';
import selectIcon from '../../../assets/select_icon.svg';

const Select = styled.select`
  box-sizing: border-box;
  margin: 2px 2px 18px 2px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  width: ${props => (props.width ? props.width : 200)}px;
  height: ${props => (props.height ? props.height : 55)}px;
  padding: 15px 18px 15px 10px;
  font-size: 14px;
  background-color: transparent;
  background-image: url(${selectIcon});
  background-size: 18px;
  background-position: 99% 50%;
  background-repeat: no-repeat;
  appearance: none;
  outline: none;

  &:hover {
    background-color: white;
  }

  option {
    font-size: 14px;
  }
`;

export default Select;
