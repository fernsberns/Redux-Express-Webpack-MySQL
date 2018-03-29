import { combineReducers } from 'redux';
import booksReducer from './book_reducers';

const rootReducer = combineReducers({
  getBooks: booksReducer,
  deleteBook: booksReducer
});

export default rootReducer;
