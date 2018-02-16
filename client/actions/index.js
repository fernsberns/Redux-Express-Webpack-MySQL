import getData from '../components/app'
import { GET_BOOK } from './types';



export function getBooks(){
  console.log('This works, apparently.');
  
  const URL = "http://localhost:3000/api/books";
  return fetch(URL, { method: 'GET',type: 'GET_BOOK',
  payload: book})
     .then( response => Promise.all([response, response.json()]));

  console.log(response.json());
}


