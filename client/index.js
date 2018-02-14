import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'

const createStoreWithMiddleware =  applyMiddleware(reduxThunk)(createStore);
export const store = createStoreWithMiddleware(reducer, composeWithDevTools());


    // var BookFilter = React.createClass({
    //     render: function() {
    //       // console.log("Rendering BookFilter");
    //       return (
    //         <div>A way to filter the list of books would come here soon.</div>
    //       )
    //     }
    //   });
      
    //   var BookRow = React.createClass({
    //     render: function() {
    //       // console.log("Rendering BookRow:", this.props.book);
    //       return (
            
    //         <tr>
    //           <td>{this.props.book.id}</td>
    //           <td>{this.props.book.author}</td>
    //           <td>{this.props.book.title}</td>
    //           <td>{this.props.book.genre}</td>
    //           <td><button className="btn btn-sm btn-danger" onClick={this.removeBook}><i className="fa fa-trash text-white"></i></button></td>
    //         </tr>
            
    //       )
    //     },
    //     removeBook(id){
    //       console.log('deleted record where id = ' + this.props.book.id);
      
    //       $.ajax({
    //         type: 'DELETE', url: '/api/books/'+ this.props.book.id
    //       });
    //     }
      
    //   });
      
    //   var BookTable = React.createClass({
    //     render: function() {
    //       console.log("Rendering book table, num items:", this.props.books);

    //       var bookRows =this.props.books.map(function(book) {
    //         return <BookRow key={book.id} book={book} />
    //       });
    //       return (
    //         <table className="table table-hover">
    //           <thead>
    //             <tr>
    //               <th>Id</th>
    //               <th>Author</th>
    //               <th>Title</th>
    //               <th>Genre</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {bookRows}
    //           </tbody>
    //         </table>
    //       )
    //     }
    //   });
      
    //   var BookAdd = React.createClass({
        
    //     render: function() {
    //       // console.log("Rendering BookAdd");
    //       return (
    //         <div>
    //           <form name="bookAdd">
    //             <input className="m-2"  type="text" name="author" placeholder="author" />
    //             <input className="m-2"  type="text" name="title" placeholder="Title" />
    //             <button className="m-2 btn btn-sm btn-info" onClick={this.handleSubmit}>Add Book</button>
    //           </form>
    //         </div>
    //       )
    //     },
      
    //     handleSubmit: function(e) {
    //       e.preventDefault();
    //       var form = document.forms.bookAdd;
    //       this.props.addBook({author: form.author.value, title: form.title.value, genre: 'fiction'});
    //       // clear the form for the next input
    //       form.author.value = ""; form.title.value = "";
    //     }
    //   });
      
    //   var BookList = React.createClass({

    //     getInitialState: function() {
    //       return {books: []};
    //     },
        
    //     addBook: function(book) {
    //       console.log("Adding book:", book);
    //       $.ajax({
    //         type: 'POST', url: '/api/books/add', contentType: 'application/json',
    //         data: JSON.stringify(book),
    //         success: function(data) {
    //           var book = data;
    //           // We're advised not to modify the state, it's immutable. So, make a copy.
    //           var booksModified = this.state.books.concat(book);
    //           this.setState({books: booksModified});
    //         }.bind(this),
    //         error: function(xhr, status, err) {
    //           // ideally, show error to user.
    //           console.log("Error adding book:", err);
    //         }
    //       });
    //     },

    //     componentDidMount() {
    //       // var socket = io.connect('http://localhost:3000');
    //       // var refresh=function(){
    //       // this.timerID = setInterval(() => {
    //       $.ajax({
    //         type: 'GET', url: '/api/books', contentType: 'application/json',
    //         success: function(data) {
    //           this.setState({books: data});
    //         }.bind(this),
    //         error: function(xhr, status, err) {
    //           // ideally, show error to user.
    //           console.log("Error adding book:", err);
    //         }
    //       });
    //     // }, 100);
          
    //     },
        
    //     componentWillUnmount() {
    //       clearInterval(this.timerID);
    //     },
      
      
    //     render: function() {
    //       // console.log("Rendering book list, num items:", this.state.books.length);
    //       return (
    //         <div>
    //           <h1>Book Shelf</h1>
    //           <BookFilter />
    //           <hr />
    //           <BookTable books={this.state.books}/>
    //           <hr />
    //           <BookAdd addBook={this.addBook} />
    //         </div>
    //       )
          
    //     }
      
    //   });
  
  // ReactDOM.render(
    
  //   <BookList />,
    
  //   document.getElementById('app')
  // );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'));
