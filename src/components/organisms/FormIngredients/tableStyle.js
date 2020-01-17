import styled from 'styled-components';

export const tableCategories = [
  'LP',
  'SKŁADNIK',
  'ILOŚĆ ZAŁOŻONA',
  'ILOŚĆ ODWAŻONA',
  'NUMER SERII',
  'DATA WAŻNOŚCI',
];

export const IngredientsTableRow = styled.div`
  display: grid;
  grid-template-columns: 60px 300px 150px 150px 150px 150px 144px;
  grid-template-rows: auto;
  border-bottom: 1px solid #000000;
  grid-column-gap: 1px;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;

  ${props =>
    !props.noHover &&
    `&:hover {
      &:not(:first-of-type) {
        background-color: #d5d5d5;
      }
    }`}

  /*MOBILE VIEW*/
  @media (max-width: 1150px) {
    width: calc(100% - 8px);
    margin-bottom: 10px;
    border: ${props => (props.noBorder ? 'none' : '1px solid #000000')};
    border-radius: 4px;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
      'val1'
      'val2'
      'val3'
      'val4'
      'val5'
      'val6'
      'button';

    /* HIDE TABLE HEADER IN MOBILE VIEW*/
    &:not(:only-of-type) {
      &:first-of-type {
        display: none;
      }
    }
  }
`;

export const IngredientsItem = styled.div`
  justify-self: center;
  align-self: center;
  text-align: center;
  text-transform: uppercase;

  /*MOBILE VIEW*/
  @media (max-width: 1150px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 1px solid black;
    width: 100%;
    font-weight: bold;
    ${tableCategories.map(
      (item, index) =>
        `&:nth-of-type(${index + 1}) {
          grid-area: val${index + 1};
          &::before {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-bottom: 3px;
            font-weight: normal;
            content: '${item}:';
          }
        }`,
    )}

    &:last-of-type {
      grid-area: 'button';
      border: none;
    }
  }
`;
