import React, { useEffect, useState } from 'react';
import UserService from '../service/UserService/UserService';
import FavoriteService from '../service/FavoriteService/FavoriteService';
import BookService from '../service/BookService/BookService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
    const [profileInfo, setProfileInfo] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    useEffect(() => {
        if (profileInfo.id) {
            fetchFavorites();
        }
    }, [profileInfo]);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const profileResponse = await UserService.getYourProfile(token);
            setProfileInfo(profileResponse.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const fetchFavorites = async () => {
        try {
            const favoritesResponse = await FavoriteService.getUserFavorites(profileInfo.id);
            // Iterate through favorites and fetch details of each book
            const favoriteBooks = await Promise.all(favoritesResponse.map(async (favorite) => {
                const book = await BookService.getBookById(favorite.bookId);
                return {
                    ...book,
                    favoriteId: favorite.id // Add favoriteId for reference if needed
                };
            }));
            setFavorites(favoriteBooks);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const removeFavorite = async (favoriteId) => {
        try {
            await FavoriteService.deleteFavoriteById(favoriteId);
            // Update favorites list after removal
            setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.favoriteId !== favoriteId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div className='font-poppins'>
            <h1 className='text-3xl font-bold text-center mt-6 p-2'>Dashboard</h1>
            {/* PROFILE */}
            <div className="shadow-2xl border-4 border-gray-800 bg-gray-900 text-white w-[25rem] ml-11 flex flex-col gap-4 rounded-lg overflow-hidden">
                <div className="bg-gray-800 flex justify-center items-center h-32">
                    <div className="w-28 h-28 bg-gray-700 rounded-full flex justify-center items-center">
                        <img className="h-42 invert rounded-full" src="https://static.vecteezy.com/system/resources/previews/021/079/672/original/user-account-icon-for-your-design-only-free-png.png" alt="PFP" />
                    </div>
                </div>
                <div className="p-4 relative">
                    <h1 className="text-3xl font-bold relative z-10">{profileInfo.name}</h1>
                    <p className="text-lg relative z-10">Email: {profileInfo.email}</p>
                    <p className="text-lg relative z-10">ID: {profileInfo.id}</p>
                    <p className="text-lg relative z-10">Role: {profileInfo.role}</p>
                </div>
            </div>
            {/* FAVORITES */}
            <div className="-my-[19rem] mx-auto w-full max-w-2xl mr-[25rem]">
                <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
                <ul className="divide-y divide-gray-200">
                    {favorites.map((favorite, index) => (
                        <li key={index} className="py-4 border-t-2 border-b-2 border-black">
                            <div className="flex items-center gap-2">
                                <img className="h-24 w-34 object-cover rounded-lg shadow-md" src={favorite.photo} alt={favorite.name} />
                                <div className="ml-4 flex flex-col gap-2">
                                    <h3 className="text-xl font-bold">{favorite.name}</h3>
                                    <p className="text-gray-700 text-1xl break-words w-[32rem]">{favorite.description}</p>
                                    <p className="text-gray-600">Category: {favorite.category}</p>
                                    <p className="text-gray-600">Pages: {favorite.pages}</p>
                                    <p className="text-gray-600">ISBN: {favorite.isbn}</p>
                                    <button onClick={() => removeFavorite(favorite.favoriteId)} className="text-red-500 hover:text-red-700 focus:outline-none flex items-center gap-2">
                                        <FontAwesomeIcon icon={faTrash} />
                                        <span>Remove from Favorites</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
