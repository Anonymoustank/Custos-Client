import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/customForms.css'

interface Group {
  groupId: string;
  name: string;
  description: string;
  scopes: string[];
}

interface GroupFormProps {
  onSubmit: (group: Group) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [group, setGroup] = useState<Group>({
    groupId: '',
    name: '',
    description: '',
    scopes: ['']
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === 'scopes' && index !== undefined) {
      const newScopes = [...group.scopes];
      newScopes[index] = value;
      setGroup({ ...group, scopes: newScopes });
    } else {
      setGroup({ ...group, [name]: value });
    }
  };

  const handleAddScope = () => {
    setGroup({ ...group, scopes: [...group.scopes, ''] });
  };

  const handleRemoveScope = (index: number) => {
    const newScopes = group.scopes.filter((_, i) => i !== index);
    setGroup({ ...group, scopes: newScopes });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
      });
      const data = await response.json();
      onSubmit(data);
      alert('SUCCESS!')
    } catch (error) {
      console.error('Error submitting group:', error);
      alert('Error submitting group')
    }
  };

  const handleViewGroups = () => {
    navigate('/viewGroups');
  };

  return (
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <h2>Create Group</h2>
      <div className="form-group">
        <label htmlFor="groupId">Group ID</label>
        <input id="groupId" name="groupId" value={group.groupId} onChange={handleChange} placeholder="Group ID" />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={group.name} onChange={handleChange} placeholder="Name" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={group.description} onChange={handleChange} placeholder="Description" />
      </div>
      {group.scopes.map((scope, index) => (
        <div className="form-group" key={index}>
          <label htmlFor={`scope${index}`}>Scope {index + 1}</label>
          <input
            id={`scope${index}`}
            name="scopes"
            value={scope}
            onChange={(e) => handleChange(e, index)}
            placeholder={`Scope ${index + 1}`}
          />
          <button className="removeScopeButton" type="button" onClick={() => handleRemoveScope(index)}>Remove</button>
        </div>
      ))}
      <button className="addScopeButton" type="button" onClick={handleAddScope}>Add Scope</button>
      <button className="submit-button" type="submit">Submit</button>
      <button className="view-groups-button" type="button" onClick={handleViewGroups}>View Groups</button>
    </form>
  );
};

export default GroupForm;