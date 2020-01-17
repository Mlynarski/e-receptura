import styled from 'styled-components';

const DropdownMenu = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  width: 300px;
  max-height: 294px;
  margin-top: -18px;
  background: white;
  overflow-y: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 999;
`;

export default DropdownMenu;
