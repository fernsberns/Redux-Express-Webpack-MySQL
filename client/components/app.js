import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postBook,getBooks } from '../actions';
import booksReducer from '../reducers/book_reducer';
// import store from '../index'
// import postBook from '../actions/index'



class App extends React.Component {

 constructor(props) {
    super(props);
    this.state = {};
  }


  componentWillMount(){

    // const { getBooks } = this.props;
    // this.setState(getBooks());
    // store.subscribe(() => {

    // });

    this.props.getBooks()
//  this.props.postBook()
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
  console.log(this.state)
  
  if(this.state.book){    
    return this.state.book.map((book) => {
        return (
          
            <tr
                key={this.state.book.id}// onClick={() => this.props.selectUser(user)}
            >
                <td>{this.state.book.id}   </td>             
                <td>{this.state.book.title}</td>
                <td>{this.state.book.author}</td>
                <td>{this.state.book.genre}</td>
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
  



const mapStateToProps = (state) => {
  return { book: state.booksReducer }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: () => dispatch(getBooks()),
    postBook:()=>dispatch(postBook())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
