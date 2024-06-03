import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from "../../service/UserService/UserService";

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'USER', // Default role to 'USER'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService
            console.log(formData);
            await UserService.register(formData);

            // Clear the form fields after successful registration
            setFormData({
                username: '',
                email: '',
                password: '',
                role: 'USER',
            });
            alert('User registered successfully');
            navigate('/');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background font-poppins">
            <div className="bg-secondary p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary2 transition duration-300"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-primary2 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <p className="text-center text-white text-xs mt-4">
                    Already have an account? <a className="text-blue-200" href="/login">Login instead</a>
                </p>
            </div>
        </div>
    );
}

export default RegistrationPage;
