import React, { Component } from "react";
import API from '../utils/API'
import {Link} from "react-router-dom";


class Books extends Component {

    state = {
        books: []
    };

    componentDidMount() {
        this.getBooks();
    }

    deleteBook = (event) => {
        let id = this.state.books[event.target.id]._id;
        API.deleteBook(id).then(() => {
            this.getBooks();
        });
    };

    getBooks = () => {
        API.listBooks().then((response) => {
            this.setState({
                books: response.data
            })
        });
    };

    render() {
        return (
            <div>
                <h2 className={'text-center'}>Saved Books</h2>
                <Link to="/">Back To search</Link>
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
                                        <button className={'btn btn-primary'} id={i} onClick={this.deleteBook}>Delete</button>
                                    </div>
                                </div>)
                        })
                }
            </div>
        );
    }
}

export default Books;
