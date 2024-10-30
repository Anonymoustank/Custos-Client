import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface UserInfo {
  given_name: string;
  name: string;
  email: string;
  preferred_username: string;
}

const Callback: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
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

        console.log('Response data:', response.data);
        setAccessToken(response.data.access_token); // Store the access token
        localStorage.setItem('access_token', response.data.access_token); // Optionally store in localStorage
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
          access_token: localStorage.getItem('access_token'),
          clientId: localStorage.getItem('custosClientId'),
          code: code,
        });
        console.log('User data:', response.data);
        setUserInfo(response.data); // Store the user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUserInfo();
  }, [accessToken, code]);

  return (
    <div>
      {userInfo && (
        <div>
          <h2>Welcome: {userInfo.given_name}</h2>
          <p>User Name: {userInfo.name}</p>
          <p>User Email: {userInfo.email}</p>
          <p>Preferred Username: {userInfo.preferred_username}</p>
        </div>
      )}
    </div>
  );
};

export default Callback;
