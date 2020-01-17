const calcError = (founded, weighted) => {
  return ((Math.abs(founded - weighted) / founded) * 100).toFixed(2);
};

export const updateItem = (itemName, value) => {
  return {
    type: 'UPDATE_ITEM',
    payload: {
      itemName,
      value,
    },
  };
};

export const clearPackage = () => {
  return {
    type: 'CLEAR_PACKAGE',
  };
};

export const saveIngredient = (
  { id, name, qFounded, qWeighted, serialNumber, expDate },
  addNewIngredient,
) => {
  const item = {
    id,
    name,
    qFounded: parseFloat(qFounded).toFixed(2),
    qWeighted: parseFloat(qWeighted).toFixed(2),
    qError: calcError(qFounded, qWeighted),
    serialNumber,
    expDate: new Date(expDate).toLocaleDateString('en-GB'),
  };

  return {
    ...(addNewIngredient
      ? { type: 'ADD_INGREDIENT' }
      : { type: 'SAVE_INGREDIENT' }),
    payload: {
      item,
    },
  };
};

export const updateIngredientId = (oldId, newId) => {
  return {
    type: 'UPDATE_INGREDIENT_ID',
    payload: {
      oldId,
      newId,
    },
  };
};

export const editIngredient = id => {
  return {
    type: 'EDIT_INGREDIENT',
    payload: {
      id,
    },
  };
};

export const removeIngredient = (id, ingredientEditedId) => {
  let editedId = 0;

  if (id === ingredientEditedId) {
    editedId = 0;
  } else if (id < ingredientEditedId) {
    editedId = ingredientEditedId - 1;
  } else if (id > ingredientEditedId) {
    editedId = ingredientEditedId;
  }

  return {
    type: 'REMOVE_INGREDIENT',
    payload: {
      id,
      editedId,
    },
  };
};

export const setFinalCheck = value => {
  return {
    type: 'SET_FINAL_CHECK',
    payload: {
      value,
    },
  };
};

export const clearForm = () => {
  return {
    type: 'CLEAR_FORM',
  };
};
