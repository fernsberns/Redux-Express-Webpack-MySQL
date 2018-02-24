

const INITIAL_STATE = {
  posts: []
}


const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_BOOK":
    return {...state, posts: action.payload};
    case "DELETE_BOOK": 
    var postscopy = state.posts;
    let index = state.posts.findIndex((postscopy) => postscopy.id == action.payload);
    console.log(index);
      var deletedpost = state.posts.slice(index, index+1);
      let difference = state.posts.filter(x => !deletedpost.includes(x));
      return {...state, posts: difference}
    default:
      return state;
  }
}



export default booksReducer;
