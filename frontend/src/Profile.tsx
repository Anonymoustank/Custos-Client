import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/profile.css';
import axios from 'axios';


interface ProfileProps {
    name: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

const Profile: React.FC<ProfileProps> = ({ name, username, email, isAdmin }) => {
        const addAdmin = async () => {
    
          try {
            const response = await axios.post('/api/v1/group-management/addAdmin', {
              clientId: localStorage.getItem('custosClientId'),
              groupId: 'admin',
              username: username,
              access_token: localStorage.getItem('accessToken'),
            });
            
            localStorage.setItem('isAdmin', "true")

          } catch (error) {
            console.error('Error fetching token:', error);
          }
        };

        const removeAdmin = async () => {
    
            try {
              const response = await axios.post('/api/v1/group-management/removeAdmin', {
                clientId: localStorage.getItem('custosClientId'),
                groupId: 'admin',
                username: username,
                access_token: localStorage.getItem('accessToken'),
              });
              
              localStorage.setItem('isAdmin', "true")
  
            } catch (error) {
              console.error('Error fetching token:', error);
            }
          };

        const toggleAdminStatus = () => {
            if (!isAdmin) {
                addAdmin();
            } else {
                removeAdmin();
            }
        };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="profile-container">

                <h5>Profile</h5>
                <p><strong>Name:</strong> {name}</p>
                {/* <p><strong>Username:</strong> {username}</p> */}
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Username:</strong> {username}</p>

                {/* Toggle Admin Status Button */}
                <button onClick={toggleAdminStatus} className="btn btn-secondary w-100 mt-3">
                
                {isAdmin ? 'Remove Admin Access' : 'Grant Admin Access'}
                </button>
            </div>
        </div>
    );
};

export default Profile;