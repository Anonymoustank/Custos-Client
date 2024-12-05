import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './stylesheets/customForms.css'; // Import CSS for styling

interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserProfileFormProps {
  onSubmit: (userProfile: UserProfile) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSubmit }) => {
  const location = useLocation();
  const emailFromProfile = location.state?.email || '';

  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: '',
    firstName: '',
    lastName: '',
    email: emailFromProfile
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/createUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userProfile)
      });
      const data = await response.json();
      alert('SUCCESS!');
      onSubmit(data);
      navigate('/groupForm'); // Redirect to /groupForm
    } catch (error) {
      console.error('Error submitting user profile:', error);
      alert('Error submitting user profile');
    }
  };

  return (
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <h2>Create User Profile</h2>
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          name="userId"
          value={userProfile.userId}
          onChange={handleChange}
          placeholder="Enter User ID"
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={userProfile.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={userProfile.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={userProfile.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
      </div>
      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
};

export default UserProfileForm;