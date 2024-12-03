import React, { useState, ChangeEvent, FormEvent } from 'react';

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
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: '',
    firstName: '',
    lastName: '',
    email: ''
  });

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
      onSubmit(data);
    } catch (error) {
      console.error('Error submitting user profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userId" value={userProfile.userId} onChange={handleChange} placeholder="User ID" />
      <input name="firstName" value={userProfile.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={userProfile.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="email" value={userProfile.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserProfileForm;