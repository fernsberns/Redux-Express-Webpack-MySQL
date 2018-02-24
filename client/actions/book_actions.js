

let postsArr=[];
let desArr = [];

export function fetchPostsActionCreator() {
  return dispatch => {
    console.log('hello')
    const URL = "http://localhost:3000/api/books";
      return fetch(URL, { method: 'GET'})
        .then( (response) => {
          // console.log(response,'88888888');
          // console.log(  Promise.all([response, response.json()]),'--------');
          Promise.all([response.json()]).then((val)=>{
            // console.log(val[0][0], 'vallllll');
            desArr = [].concat(...val); 
            postsArr.push(...desArr);
            console.log(desArr);
            dispatch({type:'GET_BOOK', payload: postsArr})
          })
        });
  }
}

//delete through updating deletedat column
export function deletePostActionCreator(id) {
  return dispatch => {
  const URL = "http://localhost:3000/api/books/" + id;
  console.log(URL + " Deleted successfully");
      return fetch(URL, { method: 'PUT'})
        .then( 
              // console.log(id);
              dispatch({type:'DELETE_BOOK', payload: id})
        );
  }
}
