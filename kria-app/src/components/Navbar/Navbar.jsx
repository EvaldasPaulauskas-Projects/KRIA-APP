import React from 'react';
import UserService from "../../service/UserService/UserService";

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();



    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            console.log("Logged out")
            
        }
    };


    if (isAuthenticated) {
        return (
            <nav>
            <a href='/dashboard'>RKRIA</a>
            <div className="flex items-center gap-6">
                <a href="/" onClick={handleLogout}>Logout</a>
            </div>
        </nav>
        );
    } else {
        return null;
    }
    
}

export default Navbar;