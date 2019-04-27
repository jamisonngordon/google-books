import axios from 'axios';

export default {
    bookSearch(searchstring) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchstring)
    }
}