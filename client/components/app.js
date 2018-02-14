import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsActionCreator } from '../actions';
import booksReducer from '../reducers/book_reducer';



class App extends React.Component {

 constructor(props) {
    super(props);c
    this.state = {};
  }


  componentWillMount(){

    // const { getBooks } = this.props;
    // this.setState(getBooks());
   
    fetchPostsActionCreator()

    //if you uncomment the code below and comment the fetchPostCreator it should work without redux. 

            // this._interval = setInterval(() => {
            // $.ajax({
            //   type: 'GET', url: '/api/books', contentType: 'application/json',
            //   success: function(data) {
            //     // data = Object.assign({}, ...data);
            //     this.setState({book: data});

            //     return data;
            //   }.bind(this),
            //   error: function(xhr, status, err) {
            //     // ideally, show error to user.
            //     console.log(err);
            //   }
            // });
            // }, 200);

  }

  
  componentDidMount() {

  }


  componentWillUnmount() {
    clearInterval(this._interval);
  }


renderList() {
  if(this.state.book){    
    return this.state.book.map((book) => {
        return (
          
            <tr
                key={book.id}// onClick={() => this.props.selectUser(user)}
            >
                <td>{book.id}   </td>             
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td><button className="btn btn-sm btn-danger" 
                // onClick = { $.ajax({type: 'DELETE', url: '/api/books/'+ book.id}) }
                      ><i className="fa fa-trash text-white"></i></button></td>
            </tr>
        );
        
    });
  }
}



render() {
    return (
      <div>
      <table className="table table-hover">
      <thead>
        <tr>
        <th>id</th>
        <th>Title</th>
        <th>Author</th>
        <th>genre</th>
        <th></th>
        </tr>
      </thead>
        <tbody>
            {this.renderList()}
        </tbody>
      </table>
      </div>
    );  
  }
};
  



function mapStateToProps(state){
  return { book: state.book }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBooks: () => dispatch(getBooks)
  };
}

export default connect(mapStateToProps, { fetchPostsActionCreator })(App);
