import axios from 'axios';

export default {
    bookSearch(searchstring) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchstring)
    },
    saveBook(book) {
        return axios.post('/api/books', book);
    },
    listBooks() {
        return axios.get('/api/books');
    },
    deleteBook(id) {
        return axios.delete('/api/books/' + id);
    }
}