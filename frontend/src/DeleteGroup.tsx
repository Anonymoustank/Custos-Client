import React, { useState } from 'react';
import './stylesheets/customForms.css'

const DeleteGroup: React.FC = () => {
  const [groupId, setGroupId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/deleteGroup', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ groupId })
      });
      if (response.ok) {
        alert('Group deleted successfully');
      } else {
        alert('Failed to delete group');
      }
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="delete-group-form">
      <h2>Delete Group</h2>
      <input
        type="text"
        name="groupId"
        value={groupId}
        onChange={handleChange}
        placeholder="Group ID"
      />
      <button type="submit">Delete Group</button>
    </form>
  );
};

export default DeleteGroup;