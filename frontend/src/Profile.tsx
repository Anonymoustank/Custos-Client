import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/profile.css';
import axios from 'axios';
import FrontendView from './FrontendView';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
    name: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

const Profile: React.FC<ProfileProps> = ({ name, username, email, isAdmin: initialAdminStatus }) => {
    const [isAdmin, setIsAdmin] = useState(initialAdminStatus);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(initialAdminStatus);
    }, [initialAdminStatus]);

    const addAdmin = async () => {
        try {
            await axios.post('/api/v1/group-management/addAdmin', {
                clientId: localStorage.getItem('custosClientId'),
                groupId: 'admin',
                username: username,
                access_token: localStorage.getItem('accessToken'),
            });
            setIsAdmin(true);
        } catch (error) {
            console.error('Error adding admin:', error);
        }
    };

    const removeAdmin = async () => {
        try {
            await axios.post('/api/v1/group-management/removeAdmin', {
                clientId: localStorage.getItem('custosClientId'),
                groupId: 'admin',
                username: username,
                access_token: localStorage.getItem('accessToken'),
            });
            setIsAdmin(false);
        } catch (error) {
            console.error('Error removing admin:', error);
        }
    };

    const toggleAdminStatus = () => {
        if (!isAdmin) {
            addAdmin();
        } else {
            removeAdmin();
        }
    };

    const handleViewGroups = () => {
        navigate('/userProfileForm', { state: { email } });
    };

    return (
        <div className={`container d-flex ${isAdmin ? 'flex-column align-items-center' : 'vh-100 justify-content-center align-items-center'}`}>
            <div className="profile-container">
                <h5>Profile</h5>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Username:</strong> {username}</p>

                <button onClick={toggleAdminStatus} className="btn btn-secondary w-100 mt-3">
                    {'Click to Toggle Admin Status'}
                </button>
                <button onClick={handleViewGroups} className="btn btn-secondary w-100 mt-3">
                    {'Profile Management'}
                </button>
            </div>

            {isAdmin && (
                <div className="frontend-view-container">
                    <FrontendView />
                </div>
            )}
        </div>
    );
};

export default Profile;
