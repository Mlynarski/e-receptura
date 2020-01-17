import React, { useReducer, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateIngredientId as updateIngredientIdAction,
  saveIngredient as saveIngredientAction,
  removeIngredient as removeIngredientAction,
} from '../../../actions';
import { IngredientsTableRow, IngredientsItem } from './tableStyle';
import TextInput from '../../atoms/TextInput';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import Autocomplete from '../../molecules/Autocomplete';
import getIngredients from '../../../api';
import debounce from '../../../utils/debounce';
import formatDateString from '../../../utils/formatDateString';

const IngredientsItemStyled = styled(IngredientsItem)`
  align-self: start !important;
  border: none !important;
`;

const IngredientInputs = ({
  ingredient,
  tableLength,
  ingredientEditedId,
  addIngredient,
  updateIngredientId,
  saveIngredient,
  removeIngredient,
  forNewItem,
}) => {
  const {
    id,
    name,
    qFounded,
    qWeighted,
    qError,
    serialNumber,
    expDate,
  } = ingredient;

  const initialState = {
    ...(id === undefined ? { id: tableLength + 1 } : { id }),
    name,
    qFounded,
    qWeighted,
    qError,
    serialNumber,
    expDate,
  };

  const [inputs, setInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  );

  const [autoCompleteList, setAutoCompleteList] = useState([]);
  const [autoCompleteFocus, setAutoCompleteFocus] = useState(false);

  const [onSaveCheck, setOnSaveCheck] = useState(false);

  useEffect(() => {
    if (forNewItem) {
      setInput({ id: tableLength + 1 });
    } else {
      setInput({ expDate: formatDateString(expDate) });
    }
  }, [forNewItem, expDate, tableLength]);

  const generateSelectOption = N =>
    Array.from({ length: N }, (v, k) => <option key={k}>{k + 1}</option>);

  // handle change
  const handleChange = event => {
    const { name: eventName, value } = event.target;

    const re1 = /^[0-9]*$/;
    const re2 = /^[0-9]+\.?([0-9])*$/;

    const debounceApiRequest = debounce(
      () => getIngredients(value, setAutoCompleteList),
      300,
    );

    switch (eventName) {
      case 'id':
        if (!forNewItem) {
          updateIngredientId(id, value);
        }
        setInput({ [eventName]: value });
        break;

      case 'name':
        setInput({ [eventName]: value });
        debounceApiRequest();
        break;

      case 'qFounded':
      case 'qWeighted':
        if (value === '' || re2.test(value)) {
          setInput({ [eventName]: value });
        }
        break;

      case 'SerialNumber':
        if (value === '' || re1.test(value)) {
          setInput({ serialNumber: value });
        }
        break;

      default:
        setInput({ [eventName]: value });
    }
  };

  const preSaveIngredient = () => {
    if (
      inputs.name === '' ||
      inputs.qFounded === '' ||
      inputs.qWeighted === '' ||
      inputs.serialNumber === '' ||
      inputs.expDate === ''
    ) {
      setOnSaveCheck(true);
    } else if (forNewItem) {
      addIngredient(inputs);
      setInput({
        name: '',
        qFounded: '',
        qWeighted: '',
        qError: '',
        serialNumber: '',
        expDate: '',
      });
      setOnSaveCheck(false);
    } else {
      saveIngredient(inputs);
    }
  };

  return (
    <IngredientsTableRow noHover noBorder marginTop={5}>
      <IngredientsItemStyled>
        <Select name="id" value={inputs.id} onChange={handleChange} width={58}>
          {forNewItem
            ? generateSelectOption(tableLength + 1)
            : generateSelectOption(tableLength)}
        </Select>
      </IngredientsItemStyled>
      <IngredientsItemStyled>
        <Autocomplete
          onSelect={value => {
            setInput({ name: value });
            setAutoCompleteList([]);
          }}
          itemList={autoCompleteList}
          inputFocused={autoCompleteFocus}
        >
          <TextInput
            name="name"
            label="SKŁADNIK"
            value={inputs.name}
            onChange={handleChange}
            width={300}
            error={onSaveCheck && inputs.name === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''}
            onFocus={() => setAutoCompleteFocus(true)}
            onBlur={() => setAutoCompleteFocus(false)}
            toUpperCase
          />
        </Autocomplete>
      </IngredientsItemStyled>
      <IngredientsItemStyled>
        <TextInput
          name="qFounded"
          label="ILOŚĆ ZAŁOŻONA"
          value={inputs.qFounded}
          onChange={handleChange}
          width={150}
          widthMobile={300}
          error={
            onSaveCheck && inputs.qFounded === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''
          }
        />
      </IngredientsItemStyled>
      <IngredientsItemStyled>
        <TextInput
          name="qWeighted"
          label="ILOŚĆ ODWAŻONA"
          value={inputs.qWeighted}
          onChange={handleChange}
          width={150}
          widthMobile={300}
          error={
            onSaveCheck && inputs.qWeighted === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''
          }
        />
      </IngredientsItemStyled>
      <IngredientsItemStyled>
        <TextInput
          name="SerialNumber"
          label="NUMER SERII"
          value={inputs.serialNumber}
          onChange={handleChange}
          width={150}
          widthMobile={300}
          error={
            onSaveCheck && inputs.serialNumber === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''
          }
        />
      </IngredientsItemStyled>
      <IngredientsItemStyled>
        <TextInput
          name="expDate"
          label="DATA WAŻNOŚCI"
          value={inputs.expDate}
          onChange={handleChange}
          width={150}
          widthMobile={300}
          error={onSaveCheck && inputs.expDate === '' ? 'PROSZĘ UZUPEŁNIĆ' : ''}
          type="date"
        />
      </IngredientsItemStyled>
      <IngredientsItemStyled>
        {forNewItem ? (
          <Button onClick={() => preSaveIngredient()} height={55}>
            DODAJ
          </Button>
        ) : (
          <>
            <Button onClick={() => preSaveIngredient()} height={55}>
              ZAPISZ
            </Button>
            <Button
              onClick={() => removeIngredient(id, ingredientEditedId)}
              height={55}
            >
              USUŃ
            </Button>
          </>
        )}
      </IngredientsItemStyled>
    </IngredientsTableRow>
  );
};

IngredientInputs.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    qFounded: PropTypes.string,
    qWeighted: PropTypes.string,
    qError: PropTypes.string,
    serialNumber: PropTypes.string,
    expDate: PropTypes.string,
  }),
  tableLength: PropTypes.number.isRequired,
  ingredientEditedId: PropTypes.number.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  updateIngredientId: PropTypes.func.isRequired,
  saveIngredient: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  forNewItem: PropTypes.bool.isRequired,
};

IngredientInputs.defaultProps = {
  ingredient: {
    id: undefined,
    name: '',
    qFounded: '',
    qWeighted: '',
    qError: '',
    serialNumber: '',
    expDate: '',
  },
};

const mapStateToProps = ({ ingredientEditedId }) => ({ ingredientEditedId });

const mapDispatchToProps = dispatch => ({
  addIngredient: item => dispatch(saveIngredientAction(item, true)),
  saveIngredient: item => dispatch(saveIngredientAction(item, false)),
  updateIngredientId: (oldId, newId) =>
    dispatch(updateIngredientIdAction(oldId, newId)),
  removeIngredient: (id, ingredientEditedId) =>
    dispatch(removeIngredientAction(id, ingredientEditedId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IngredientInputs);
