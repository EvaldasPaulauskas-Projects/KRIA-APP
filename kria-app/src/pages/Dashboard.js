import React, { useEffect, useState } from 'react';
import UserService from '../service/UserService/UserService';

export default function Dashboard(){
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

    return(
        <div>
            <h1>DashBoard</h1>
            <p>{profileInfo.name}</p>
        </div>
    )
}