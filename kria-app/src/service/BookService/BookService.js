import axios from 'axios';

class BookService{
    static BASE_URL = "http://localhost:8080";

    static async getAllBooks() {
        try {
            const response = await axios.get(`${BookService.BASE_URL}/api/books`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getBookById(id) {
        try {
            const response = await axios.get(`${BookService.BASE_URL}/api/books/search/id/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addBook(json) {
        try {
            const response = await axios.post(`${BookService.BASE_URL}/api/books/add`,json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async editBookById(id,json) {
        try {
            const response = await axios.put(`${BookService.BASE_URL}/api/books/${id}`,json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteBookById(id) {
        try {
            const response = await axios.delete(`${BookService.BASE_URL}/api/books/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

}

export default BookService;