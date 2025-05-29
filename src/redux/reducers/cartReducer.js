import { ADD_TO_CART, REMOVE_FROM_CART } from "../action";

const initialState = {
  createdAt: new Date().toISOString(),
  content: [] // questo ci rappresenta il contenuto, ora vuoto, del carrello. acquisirà elementi libro dopo ogni cambio di stato (dispatch + action)
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        content: [...state.content, action.payload]
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        content: state.content.filter((_, i) => i !== action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
