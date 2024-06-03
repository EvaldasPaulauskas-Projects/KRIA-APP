import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategorieeService from '../service/CategorieService/CategorieService';
import BookService from '../service/BookService/BookService';

function AdminBoard() {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchBooks();
    }, []);

    const fetchCategories = async () => {
        try {
            const categoriesData = await CategorieeService.getAllCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBooks = async () => {
        try {
            const booksData = await BookService.getAllBooks();
            setBooks(booksData);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await CategorieeService.deleteACategory(id);
            setCategories(categories.filter(category => category.id !== id));
            console.log('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await BookService.deleteBookById(id);
            console.log('Book deleted successfully');
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error('Error deleting book:', error);
            window.location.reload(); // Refresh the page
        }
    };

    return (
        <div className='font-poppins'>
            <h1 className='text-3xl font-bold text-center mt-6 p-2'>Admin Board</h1>

            {/* Categories Section */}
            <div className="ml-20 mt-12">
                <h1 className="text-2xl font-bold py-8">Categories :</h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ml-20 mr-8">
                    <li>
                        <Link to='/add-category' className='flex flex-col items-center justify-center gap-4 text-xl p-6 bg-gray-800 shadow-md rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out'>
                            <h1 className="text-gray-300">Add Category</h1>
                            <h1 className="text-6xl text-gray-500">+</h1>
                        </Link>
                    </li>
                    {categories.map(category => (
                        <li key={category.id}>
                            <div className="border border-gray-700 p-8 bg-gray-800 shadow-md rounded-md hover:shadow-lg transition duration-300 ease-in-out">
                                <h1 className="text-2xl font-semibold text-gray-200">Tag: {category.tag}</h1>
                                <h1 className="text-lg font-semibold text-gray-300">ID: {category.id}</h1>

                                <div className="flex justify-center gap-6 mt-6">
                                    <Link to={`/edit-category/${category.id}`} className="text-white bg-blue-500 hover:bg-blue-600 cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">Edit</Link>
                                    <button onClick={() => handleDeleteCategory(category.id)} className="text-white bg-red-500 hover:bg-red-600 cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Books Section */}
            <div className="ml-20 mt-12">
                <h1 className="text-2xl font-bold">Books :</h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-20 mr-8 mt-8">
                    <li>
                        <Link to='/add-book' className='border border-gray-700 rounded-md flex flex-col items-center justify-center p-6 text-gray-300 hover:bg-gray-700 hover:border-gray-600 hover:text-white'>
                            <h1 className="text-xl">Add Book</h1>
                            <h1 className="text-4xl">+</h1>
                        </Link>
                    </li>
                    {books.map(book => (
                        <li key={book.id} className="flex-shrink-0">
                            <div className="bg-gray-800 border border-gray-700 rounded-md shadow-md flex flex-col h-full">
                                <img src={book.photo} alt={book.name} className="rounded-t-md w-full h-64 object-cover" />
                                <div className="p-6 flex-grow">
                                    <h1 className="text-xl font-semibold text-gray-200 mb-2">Name: {book.name}</h1>
                                    <p className="text-gray-300 mb-4">{book.description}</p>
                                    <div className="flex justify-between text-gray-300">
                                        <p>Pages: {book.pages}</p>
                                        <p>Category: {book.category}</p>
                                        <p>ISBN: {book.isbn}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4 py-4">
                                    <Link to={`/edit-book/${book.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">Edit</Link>
                                    <button onClick={() => handleDeleteBook(book.id)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-600 cursor-pointer">Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminBoard;
