import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  align-items: ${props => (props.align ? props.align : 'center')};
  flex-wrap: wrap;
  justify-content: center;
  margin-left: ${props => (props.margin ? props.margin : '0')}px;
  margin-right: ${props => (props.margin ? props.margin : '0')}px;
`;

export default FlexWrapper;
