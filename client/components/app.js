import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePostActionCreator, fetchPostsActionCreator, showAddFormActionCreator } from '../actions/book_actions';
import booksReducer from '../reducers/book_reducers';
import './style.scss'



class App extends React.Component {

 constructor(props) {
    super(props);
    this.state = {};
    
  }


  componentWillMount(){

    this.props.getBooks();
  

  }

  
  componentDidMount() {
    TweenMax.from("#addbook",.5, {opacity:0,delay:1});
    TweenMax.from("#book", .5, {opacity:0, delay:1});
  
    
  }


  componentWillUnmount() {
    clearInterval(this._interval);
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps,'new props');
  }

addbookForm(){
  return(  
  <div className="m-2" >    
    <br/>    
  <form>         
    <center>
    <br></br>
    <input className="form-control form-control-sm mb-2" placeholder="Title" type="text" ></input>
    <input className="form-control form-control-sm mb-2" placeholder="Author" type="text" ></input>
    <input className="form-control form-control-sm mb-2" placeholder="Genre" type="text" ></input>    
    <input type="text" className="form-control form-control-sm" placeholder="Book cover image link" ></input>

    </center>
  </form>
  <button className="btn btn-sm btn-light border m-2" 
              onClick = { () =>   TweenMax.from("#addform", .5, {opacity:0, delay:0}) }
                    ><b className="text-dark h6">Submit </b></button>
  </div>
  );
}

appendtoList(){
  return (        
            
    <div className="m-2 p-2 d-inline-block bg-white containeradd" id="addbook">
          <img src="https://images-na.ssl-images-amazon.com/images/I/41FhogvNebL._SX331_BO1,204,203,200_.jpg" className="image"></img>
    <div className="overlayadd">
            {/* ternary operator es6 */}
            {this.props.book.showAddComp ? (
              <div id="addform">
                <this.addbookForm/>
                </div>
            ) : (
              <center>
              <br></br><br></br><br></br>
              <h4 className="m-2 text-grey h6">Add a book to shelf</h4>
              <br></br>
              <button className="btn btn-sm btn-dark m-2" 
              onClick = { () => this.props.showaddForm() }
                    ><b className="text-success h4">Add </b><i className="fa fa-2x fa-plus-circle text-success"></i></button>
              </center>
            )}

            {/* logical && operator es6 */}
          {/* <center>
          <br></br><br></br><br></br>
          <h4 className="m-2 text-grey h6">Add a book to shelf</h4>
          { this.props.book.showAddComp && <this.addbookForm/> }
          <br></br>
          <button className="btn btn-sm btn-dark m-2" 
          onClick = { () => this.props.showaddForm() }
                ><b className="text-success h4">Add </b><i className="fa fa-2x fa-plus-circle text-success"></i></button>
          </center> */}
      </div>
    
                
    </div>
  );
}

renderList() {
  if(this.props.book){    
    return this.props.book.posts.map((book, ind) => {
      if(book.cover != null){
      
        return (        
            
          <div className="m-2 p-2 d-inline-block bg-white container"
                key={ind}// onClick={() => this.props.selectUser(user)}
                >
                {/* <h3>{book.id}   </h3>              */}
                <img src={book.cover} className="image" ></img>
          <div className="overlay">
                <center>
                <br></br><br></br><br></br>
                <h3 className="m-2 text-grey">{book.title}</h3>
                <small className="text-grey m-2">by: {book.author} ( {book.genre})</small>
                <br></br>
                <button className="btn btn-sm btn-dark m-2" 
                onClick = { () => this.props.deleteBook(book.id) }
                      ><b className="text-danger">remove </b><i className="fa fa-times-circle text-danger" ></i></button>
                </center>
            </div>
          
                      
          </div>
        );
      }
      else{
        return (        
            
          <div className="m-2 p-2 d-inline-block bg-white container" 
                key={ind}// onClick={() => this.props.selectUser(user)}
                >
                {/* <h3>{book.id}   </h3>              */}
                <img src="http://www.longmanhomeusa.com/images/cover_not_available.png" className="image"></img>
          <div className="overlay">
                <center>
                <br></br><br></br><br></br>
                <h3 className="m-2 text-grey">{book.title}</h3>
                <small className="text-grey m-2">by: {book.author} ( {book.genre})</small>
                <br></br>
                <button className="btn btn-sm btn-dark m-2" 
                onClick = { () => this.props.deleteBook(book.id) }
                      ><b className="text-danger">remove </b><i className="fa fa-times-circle text-danger" onClick = { () => this.props.deleteBook(book.id) } ></i></button>
                </center>
            </div>
          
                      
          </div>
        );
      }



    });
    
  }
}



render() {
  console.log(this.props.book,'book------')
    return (
      //Navbar soon to be implemented as component with react router
      <div className="bgclr" >
        <div className="bg-white nvbr">
        <div className="col-9">
    </div>
        <div className="col-3">
<nav className="navbar navbar-toggleable-md navbar-light align-right">
    <a className="navbar-brand text-muted" href="#"><small>Shelf</small></a>
    <a className="navbar-brand text-muted" href="#"><small>Authors</small></a>
    <a className="navbar-brand text-muted" href="#"><small>Settings</small></a>
    </nav>

    </div>
   
    </div>

<span id="book">
            {this.renderList()}
 </span>     
      {this.appendtoList()}

      {/* <table className="table table-hover">
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
      </table> */}
      </div>
    );  
  }
};
  



function mapStateToProps(state){
  return { book: state.getBooks }
}

function mapDispatchToProps(dispatch) {
  return {
    getBooks: () => dispatch(fetchPostsActionCreator()),
    deleteBook: (id) => dispatch(deletePostActionCreator(id)),
    showaddForm: () => dispatch(showAddFormActionCreator())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
