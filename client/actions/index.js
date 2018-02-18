import getData from '../components/app'
import { GET_BOOK } from './types';



export function getBooks(book) {
  console.log('This works, apparently.');

  const URL = "http://localhost:3000/api/books";
  return fetch(URL, { method: 'GET', type: 'GET_BOOK' })
    .then(response => console.log(JSON.parse(response),'-------------'));

  console.log(response.json(), '*********');
}



// export const fetchPostsActionCreator = (dispatch) => {

//   return dispatch(getBooks('Rich Dad Poor Dad'))

// }

let postsArr=[];

export function fetchPostsActionCreator() {
  return dispatch => {
    console.log('hello')
    const URL = "http://localhost:3000/api/books";
    return fetch(URL, { method: 'GET', type: 'GET_BOOK'})
    .then( (response) => {
      // console.log(response,'88888888');
      // console.log(  Promise.all([response, response.json()]),'--------');

      Promise.all([response.json()]).then((val)=>{
        // console.log(val[0][0], 'vallllll');
        postsArr.push(val[0][0]);
        dispatch({type:'GET_BOOK', payload: postsArr})
      })
    });

    
  }
}
