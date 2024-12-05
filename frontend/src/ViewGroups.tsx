import React, { useEffect, useState } from 'react';
import './stylesheets/customForms.css';

interface Group {
  groupId: string;
  name: string;
  description: string;
  scopes: string[];
}

const ViewGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:4000/getAllGroups');
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleDelete = async (groupId: string) => {
    try {
      const response = await fetch('http://localhost:4000/deleteGroup', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ groupId })
      });
      if (response.ok) {
        setGroups(groups.filter(group => group.groupId !== groupId));
        alert("Successfully deleted")
      } else {
        alert("Failed to delete group")
        console.error('Failed to delete group');
      }
    } catch (error) {
      alert("Failed to delete group")
      console.error('Error deleting group:', error);
    }
  };

  return (
    <div className="group-list">
      <h2>All Groups</h2>
      {groups.map((group) => (
        <div key={group.groupId} className="group-item">
          <h3>
            {group.name}
            <button
              className="delete-button"
              onClick={() => handleDelete(group.groupId)}
            >
              &#x2716;
            </button>
          </h3>
          <p>{group.description}</p>
          <p>Scopes: {group.scopes.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewGroups;