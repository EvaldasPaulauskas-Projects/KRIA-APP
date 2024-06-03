import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import BookService from '../../service/BookService/BookService';
import CategorieeService from '../../service/CategorieService/CategorieService';

function EditBook() {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [bookData, setBookData] = useState({
        name: '',
        description: '',
        isbn: '',
        photo: '',
        pages: '',
        category: ''
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBookAndCategories() {
            try {
                const book = await BookService.getBookById(id);
                const categoriesData = await CategorieeService.getAllCategories();
                setBookData({
                    name: book.name,
                    description: book.description,
                    isbn: book.isbn,
                    photo: book.photo,
                    pages: book.pages,
                    category: book.category
                });
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching book or categories:', error);
            }
        }

        fetchBookAndCategories();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await BookService.editBookById(id, bookData);
            console.log('Book edited successfully');
            navigate("/admin-board");
        } catch (error) {
            console.error('Error editing book:', error);
            setError(error.response.data);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-200 mb-6">Edit Book</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-300">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={bookData.name}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-300">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={bookData.description}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="isbn" className="block text-gray-300">ISBN:</label>
                        <input
                            type="number"
                            id="isbn"
                            name="isbn"
                            value={bookData.isbn}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-300">Photo URL:</label>
                        <input
                            type="text"
                            id="photo"
                            name="photo"
                            value={bookData.photo}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pages" className="block text-gray-300">Number of Pages:</label>
                        <input
                            type="number"
                            id="pages"
                            name="pages"
                            value={bookData.pages}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-300">Category:</label>
                        <select
                            id="category"
                            name="category"
                            value={bookData.category}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        >
                            <option className='text-black' value="">Select a category</option>
                            {categories.map(category => (
                                <option className='text-black' key={category.id} value={category.tag}>{category.tag}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary2 text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:scale-105"
                    >
                        Save Changes
                    </button>
                    {error && <p className="mt-4 text-red-500 text-xs italic">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default EditBook;
