import React, { useEffect, useState } from 'react';
import UserService from '../service/UserService/UserService';

export default function Dashboard() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const profileResponse = await UserService.getYourProfile(token);
            setProfileInfo(profileResponse.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className='font-poppins'>
            <h1 className='text-3xl font-bold text-center mt-6 p-2'>Dashboard</h1>

            {/* PROFILE */}
            <div className=" shadow-2xl border-4 border-gray-800 bg-gray-900 text-white w-[25rem] ml-11 flex flex-col gap-4 rounded-lg overflow-hidden">
                <div className="bg-gray-800 flex justify-center items-center h-32">
                    <div className="w-28 h-28 bg-gray-700 rounded-full flex justify-center items-center">
                    <div className="w-28 h-28 bg-gray-700 rounded-full flex justify-center items-center">
                      <img className=" h-42 invert rounded-full" src="https://static.vecteezy.com/system/resources/previews/021/079/672/original/user-account-icon-for-your-design-only-free-png.png" alt="PFP" />
                      </div>
                    </div>
                </div>
                <div className="p-4 relative">
                    <h1 className="text-3xl font-bold relative z-10">{profileInfo.name}</h1>
                    <p className="text-lg relative z-10">Email: {profileInfo.email}</p>
                    <p className="text-lg relative z-10">ID: {profileInfo.id}</p>
                    <p className="text-lg relative z-10">Role: {profileInfo.role}</p>
                </div>
            </div>

            
        </div>
    );
}
