import getData from '../components/app'
import { GET_BOOK, POST_BOOK } from './types';





export function getBooks() {
  console.log('This works, apparently.');

  const URL = "http://localhost:3000/api/books";
  return (dispatch) => {

    fetch(URL, {
      method: 'GET', type: 'GET_BOOK',
      // payload: book
    })
      .then(response => dispatch({ type: "GET_BOOK", payload: response.json() }));

  }
  // console.log("dd", response.json());
}

export  function postBook() {
  const url = "http://localhost:3000/api/books/add"
  return (dispatch) => {

    fetch(url, {
      method: "POST", type: "POST_BOOK",//payload:book, 
      //body: JSON.stringify({
      //  book
      //  })
    }
    ).then((response) => {
      dispatch({ type: "POST_BOOK", payload: Promise.all([response, response.json()]) })
    })
  }

}




