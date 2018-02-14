import { combineReducers } from 'redux';
import booksReducer from './book_reducer';

const rootReducer = combineReducers({
  getBooks: booksReducer
});

export default rootReducer;
