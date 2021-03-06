import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from '../utils/API';

class Home extends Component {

    state = {
        input: '',
        books: []
    };

    inputChange = (event) => {
        let val = event.target.value;
        this.setState({
            input: val
        })
    };

    parseResults = (data) => {
        let books = data.data.items;
        let book;
        for(book of books) {

            let bookInfo = {};

            bookInfo.title = book.volumeInfo.title;
            bookInfo.authors = book.volumeInfo.authors;
            bookInfo.description = book.volumeInfo.description;
            bookInfo.thumb = book.volumeInfo.imageLinks.smallThumbnail;
            bookInfo.link = book.volumeInfo.infoLink;

            if(bookInfo.title && bookInfo.authors && bookInfo.description && bookInfo.thumb && bookInfo.link) {
                this.setState({
                    //es6 magic to push to the books array state
                    books: [...this.state.books, bookInfo]
                });
            }

        }
    };

    inputEnter = (event) => {
        if(event.key === 'Enter') {
            this.search();
        }
    };

    search = () => {
        this.setState({
           books: []
        });
        API.bookSearch(this.state.input)
            .then((response) =>{
                this.parseResults(response);
            });
    };

    saveBook = (event) => {
        API.saveBook(this.state.books[event.target.id]);
    };

    render() {
        return (
            <div>
                <div className={'mt-5 ml-5 form-inline'}>
                    <label className={'mr-3'}>Search for a book: </label>
                    <input className={'col-6 form-control mr-3'} onKeyDown={this.inputEnter}
                           value={this.state.input} onChange={this.inputChange}/>
                    <button className={'col-2 btn btn-primary mr-3'} onClick={this.search}>Search</button>
                    <Link to="/books">Saved Books</Link>
                </div>
                {
                    this.state.books.length > 0 &&
                    this.state.books.map((book, i) => {
                        return(
                        <div className={'card'}  key={i}>
                            <div className={'card-body'}>
                                <img src={book.thumb} alt={'img'} />
                                <br />
                                <a href={book.link}>{book.title}</a>
                                <p>By: {book.authors.map((author, i) => {
                                    return author
                                })}</p>
                                <p>{book.description}</p>
                                <button className={'btn btn-primary'} id={i} onClick={this.saveBook}>Save</button>
                            </div>
                         </div>)
                    })
                }
            </div>
        );
    }
}

export default Home;
