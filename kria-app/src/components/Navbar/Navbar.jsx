import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserService from "../../service/UserService/UserService";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const location = useLocation();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            console.log("Logged out");
        }
    };

    if (isAuthenticated) {
        return (
            <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 font-poppins">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <a href="#" className="flex items-center">
                        <img src="https://cdn0.iconfinder.com/data/icons/colorful-school/111/08-512.png" className="h-6 mr-3 sm:h-9" alt="Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">KRIA</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <div className="hidden mt-2 mr-4 sm:inline-block">
                            <span></span>
                        </div>
                        <a
                            onClick={handleLogout}
                            href="/"
                            className="text-white uppercase bg-red-700 hover:bg-red-800 focus:ring-4 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 ">
                            Log Out
                        </a>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2" aria-expanded={isMenuOpen}>
                            <span className="sr-only">Open main menu</span>
                            <svg className={`w-6 h-6 ${isMenuOpen ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                            <svg className={`w-6 h-6 ${isMenuOpen ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? '' : 'hidden'}`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a
                                    href="/dashboard"
                                    className={`block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 ${location.pathname === '/dashboard' ? 'text-white bg-purple-700 lg:text-purple-700 dark:text-white' : 'text-gray-700 lg:text-gray-700 dark:text-gray-400'}`}
                                    aria-current={location.pathname === '/dashboard' ? 'page' : undefined}>
                                    DashBoard
                                </a>
                            </li>
                            {isAdmin &&
                                <li>
                                    <a
                                        href="/admin-board"
                                        className={`block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 ${location.pathname === '/admin-board' ? 'text-white bg-purple-700 lg:text-purple-700 dark:text-white' : 'text-gray-700 lg:text-gray-700 dark:text-gray-400'}`}>
                                        Admin Board
                                    </a>
                                </li>
                            }
                            <li>
                                <a
                                    href="#"
                                    className={`block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 ${location.pathname === '/view-all-books' ? 'text-white bg-purple-700 lg:text-purple-700 dark:text-white' : 'text-gray-700 lg:text-gray-700 dark:text-gray-400'}`}>
                                    View All Books
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
