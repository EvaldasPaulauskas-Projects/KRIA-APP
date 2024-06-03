import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import CategorieeService from '../service/CategorieService/CategorieService';

function AdminBoard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesData = await CategorieeService.getAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await CategorieeService.deleteACategory(id);
            setCategories(categories.filter(category => category.id !== id));
            console.log('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className='font-poppins'>
            <h1 className='text-3xl font-bold text-center mt-6 p-2'>Admin Board</h1>

            {/* Categories Section */}
            <h1 className="text-2xl font-bold ml-20 mt-12">Categories:</h1>
            <ul className="bg-gray-900 border-2 border-gray-700 ml-20 mr-8 p-4 text-gray-200 flex flex-col md:flex-row gap-8">
                <Link to='/add-category' className='border-b-2 border-gray-300 flex flex-col text-center items-center justify-center gap-4 text-xl p-6'>
                    <h1 className="text-gray-300">Add Category</h1>
                    <h1 className="text-gray-300">+</h1>
                </Link>
                {categories.map(category => (
                    <li key={category.id}>
                        <div className="flex flex-col text-center border border-gray-700 p-8 bg-gray-800 shadow-md rounded-md">
                            <h1 className="text-xl font-semibold">Tag: {category.tag}</h1>
                            <h1 className="text-xl font-semibold">ID: {category.id}</h1>

                            <div className="flex flex-col gap-6 mt-6">
                                <Link to={`/edit-category/${category.id}`} className=" text-blue-400 hover:text-blue-600 cursor-pointer bg-gray-700 p-2 rounded-md">Edit</Link>
                                <button onClick={() => handleDelete(category.id)} className="text-red-400 hover:text-red-600 cursor-pointer bg-gray-700 p-2 rounded-md">Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminBoard;
