import { SET_BOOKS, SET_BOOKS_LOADING_OFF, SET_BOOKS_LOADING_ON } from "../action";

const initialState = {
  content: [], // questo ci rappresenta il contenuto, ora vuoto, del carrello. acquisirà elementi libro dopo ogni cambio di stato (dispatch + action)
  isLoading: false
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        content: action.payload
      };
    case SET_BOOKS_LOADING_ON:
      return {
        ...state,
        isLoading: true
      };
    case SET_BOOKS_LOADING_OFF:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default booksReducer;
