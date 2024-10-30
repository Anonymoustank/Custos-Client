import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/profile.css';

interface ProfileProps {
    name: string;
    // username: string;
    email: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email }) => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="profile-container">
                <h5>Profile</h5>
                <p><strong>Name:</strong> {name}</p>
                {/* <p><strong>Username:</strong> {username}</p> */}
                <p><strong>Email:</strong> {email}</p>
            </div>
        </div>
    );
};

export default Profile;