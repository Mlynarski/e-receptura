const initialState = {
  // general information
  serialNumber: '',
  prescriptionNumber: '',
  getDate: '',
  preparationDate: '',

  // ingredients
  ingredients: [],
  ingredientEditedId: 0,

  // dossage control
  dosageControl: '',

  // description of preparing
  descriptionOfPreparing: '',

  // package
  packageType: 'AMPUŁKA',
  capsulesExpiryDate: '',
  capsulesType: '',
  capsulesSerialNumber: '',

  // storage conditions
  shelfLife: '',
  temperature: 'POKOJOWA 15-25 °C',
  shaded: false,

  // comments
  comments: '',

  // final check flag
  finalCheck: false,
};

const insertImmutable = (array, index, item) => {
  const newArray = [...array];
  newArray.splice(index, 0, item);
  return newArray;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ITEM':
      return {
        ...state,
        [action.payload.itemName]: action.payload.value,
      };

    case 'CLEAR_PACKAGE':
      return {
        ...state,
        capsulesExpiryDate: '',
        capsulesType: 'ŻELATYNOWE',
        capsulesSerialNumber: '',
      };

    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: insertImmutable(
          [...state.ingredients],
          action.payload.item.id - 1,
          action.payload.item,
        ).map((item, index) => {
          const newItem = item;
          newItem.id = index + 1;
          return item;
        }),
      };

    case 'SAVE_INGREDIENT':
      return {
        ...state,
        ingredients: insertImmutable(
          [
            ...state.ingredients.filter(
              item => item.id !== action.payload.item.id,
            ),
          ],
          action.payload.item.id - 1,
          action.payload.item,
        ),
        ingredientEditedId: 0,
      };

    case 'UPDATE_INGREDIENT_ID':
      return {
        ...state,
        ingredients: insertImmutable(
          [
            ...state.ingredients.filter(
              item => item.id !== action.payload.oldId,
            ),
          ],
          action.payload.newId - 1,
          state.ingredients[action.payload.oldId - 1],
        ).map((item, index) => {
          const newItem = item;
          newItem.id = index + 1;
          return item;
        }),
        ingredientEditedId: parseInt(action.payload.newId, 10),
      };

    case 'EDIT_INGREDIENT':
      return {
        ...state,
        ingredientEditedId: action.payload.id,
      };

    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: [
          ...state.ingredients.filter(item => item.id !== action.payload.id),
        ].map((item, index) => {
          const newItem = item;
          newItem.id = index + 1;
          return item;
        }),
        ingredientEditedId: action.payload.editedId,
      };

    case 'SET_FINAL_CHECK':
      return {
        ...state,
        finalCheck: action.payload.value,
      };

    case 'CLEAR_FORM':
      return initialState;

    default:
      return state;
  }
};

export default rootReducer;
