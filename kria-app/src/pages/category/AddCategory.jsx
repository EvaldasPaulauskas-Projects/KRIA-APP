import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CategorieeService from '../../service/CategorieService/CategorieService';

function AddCategory() {
    const [categoryName, setCategoryName] = useState('');

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const category = { tag: categoryName }; // Constructing JSON object
            const response = await CategorieeService.addACategory(category);
            console.log('Category added: ', response);
            // Reset the form
            setCategoryName('');

            navigate("/admin-board");
        } catch (error) {
            console.error('Error adding category:', error);

            setError(error.response.data);
            setTimeout(() => {
              setError("");
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-200 mb-6">Add a Category</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="tag" className="block text-gray-300">Category Name:</label>
                        <input
                            type="text"
                            id="tag"
                            name="tag"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary2 text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:scale-105"
                    >
                        Add Category
                    </button>

                    {error && <p className="mt-4 text-red-500 text-xs italic">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
