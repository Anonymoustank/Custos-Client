import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import FrontendView from './FrontendView';
import UserProfileForm from './UserProfileForm';
import GroupForm from './GroupForm';
import DeleteGroup from './DeleteGroup';
import ViewGroups from './ViewGroups';

const handleUserProfileSubmit = (profile: any) => {
  console.log('User Profile Submitted:', profile);
  // Handle the submitted user profile data
};
const GroupFormSubmnit = (group: any) => {
  console.log('Group Creation Submitted:', group);
  // Handle the submitted user profile data
};
const DeleteGroupSubmit = (group: any) => {
  console.log('Group Creation Submitted:', group);
  // Handle the submitted user profile data
};


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/frontendView" element={<FrontendView />} />
      <Route path="/userProfileForm" element={<UserProfileForm onSubmit={handleUserProfileSubmit} />} />
      <Route path="/GroupForm" element={<GroupForm onSubmit={GroupFormSubmnit} />} />
      <Route path="/DeleteGroup" element={<DeleteGroup />} />
      <Route path="/ViewGroups" element={<ViewGroups />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);