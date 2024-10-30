import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';

interface UserInfo {
  name: string;
  email: string;
  username: string;
}

const Callback: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>({
    name: "Loading...",
    email: "Loading...",
    username: "Loading..."
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
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [code]);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) return;
    const getUserInfo = async () => {
      try {
        const response = await axios.post('/api/v1/user-management/userinfo', {
          access_token: accessToken,
          clientId: localStorage.getItem('custosClientId'),
          code: code,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error getting user data: ', error);
      }
    };
    getUserInfo();
  }, [accessToken, code]);

  return (
    userInfo && (
      <Profile name={userInfo.name} email={userInfo.email} />
    )
  );
};

export default Callback;
