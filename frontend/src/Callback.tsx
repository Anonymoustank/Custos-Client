import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';

interface UserInfo {
  name: string;
  email: string;
  preferred_username: string;
  isAdmin: boolean;
}

const Callback: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>({
    name: "Loading...",
    email: "Loading...",
    preferred_username: "Loading...",
    isAdmin: false
  });
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setCode(urlParams.get('code'));
  }, [location.search]);

  useEffect(() => {
    const fetchToken = async () => {
      if (!code) return;

      try {
        const response = await axios.post('/api/v1/identity-management/token', {
          code: code,
          redirect_uri: localStorage.getItem('redirectUrl'),
          grant_type: 'authorization_code',
          code_verifier: localStorage.getItem('pkce_code_verifier'),
          clientId: localStorage.getItem('custosClientId')
        });

        setAccessToken(response.data.access_token); // Store the access token
        localStorage.setItem("accessToken", response.data.access_token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [code]);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return; // Corrected key to 'accessToken'
    const getUserInfo = async () => {
      try {
        const response = await axios.post('/api/v1/user-management/userinfo', {
          access_token: accessToken,
          clientId: localStorage.getItem('custosClientId'),
          code: code,
        });
        const userData = response.data;
        const isAdmin = userData.groups.includes("admin");
        setUserInfo({
          name: userData.name,
          email: userData.email,
          preferred_username: userData.preferred_username,
          isAdmin: isAdmin
        });
        localStorage.setItem('isAdmin', isAdmin.toString());
      } catch (error) {
        console.error('Error getting user data: ', error);
      }
    };
    getUserInfo();
  }, [accessToken, code]);

  return (
    userInfo && (
      <Profile name={userInfo.name} username={userInfo.preferred_username} email={userInfo.email} isAdmin={userInfo.isAdmin} />
    )
  );
};

export default Callback;
