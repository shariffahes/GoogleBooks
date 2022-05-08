import { BOOKS_ACTIONS } from '../actions/books';

const initialState = {
  books: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_ACTIONS.POPULATE_BOOKS:
      return {...state, books: action.books};
    case BOOKS_ACTIONS.CLEAR:
      return initialState;
    default:
      return state;
  }
};
