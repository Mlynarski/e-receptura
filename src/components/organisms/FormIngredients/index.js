import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editIngredient as editIngredientAction,
  removeIngredient as removeIngredientAction,
} from '../../../actions';
import ContentBox from '../../atoms/ContentBox';
import CategoryTitle from '../../atoms/CategoryTitle';
import Button from '../../atoms/Button';
import {
  tableCategories,
  IngredientsTableRow,
  IngredientsItem,
} from './tableStyle';
import IngredientInputs from './ingredientInputs';

const ContentBoxStyled = styled(ContentBox)`
  padding: 0px !important;
`;

const QErrorStyled = styled.div`
  display: inline-block;
  font-weight: normal;
  color: ${props => (props.children > 5 ? 'red' : 'green')};

  &::before {
    content: '(';
  }

  &::after {
    content: '%)';
  }
`;

const FormIngredients = ({
  ingredients,
  ingredientEditedId,
  editIngredient,
  removeIngredient,
}) => {
  return (
    <ContentBoxStyled forms>
      <CategoryTitle>SKŁADNIKI</CategoryTitle>
      {ingredients.length > 0 && (
        <IngredientsTableRow>
          {tableCategories.map(item => (
            <IngredientsItem key={item}>{item}</IngredientsItem>
          ))}
        </IngredientsTableRow>
      )}
      {ingredients.map(item =>
        item.id === ingredientEditedId ? (
          <IngredientInputs
            key={item.id}
            ingredient={item}
            tableLength={ingredients.length}
            forNewItem={false}
          />
        ) : (
          <IngredientsTableRow key={item.id}>
            <IngredientsItem>{item.id}</IngredientsItem>
            <IngredientsItem>{item.name}</IngredientsItem>
            <IngredientsItem>{item.qFounded}</IngredientsItem>
            <IngredientsItem>
              {item.qWeighted}
              <QErrorStyled>{item.qError}</QErrorStyled>
            </IngredientsItem>
            <IngredientsItem>{item.serialNumber}</IngredientsItem>
            <IngredientsItem>{item.expDate}</IngredientsItem>
            <IngredientsItem>
              <Button onClick={() => editIngredient(item.id)}>EDYCJA</Button>
              <Button
                onClick={() => removeIngredient(item.id, ingredientEditedId)}
              >
                USUŃ
              </Button>
            </IngredientsItem>
          </IngredientsTableRow>
        ),
      )}
      <IngredientInputs tableLength={ingredients.length} forNewItem />
    </ContentBoxStyled>
  );
};

FormIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      qFounded: PropTypes.string,
      qWeighted: PropTypes.string,
      qError: PropTypes.string,
      serialNumber: PropTypes.string,
      expDate: PropTypes.string,
    }),
  ).isRequired,
  ingredientEditedId: PropTypes.number.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  editIngredient: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ingredients, ingredientEditedId }) => ({
  ingredients,
  ingredientEditedId,
});

const mapDispatchToProps = dispatch => ({
  editIngredient: id => dispatch(editIngredientAction(id)),
  removeIngredient: (id, ingredientEditedId) =>
    dispatch(removeIngredientAction(id, ingredientEditedId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormIngredients);
