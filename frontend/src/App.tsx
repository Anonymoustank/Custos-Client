import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// inspiration for this comes from Georgia Tech student Kevin Yan
// repo I used for inspiration: https://github.com/KevinYan2025/custos/blob/main/src/pages/LoginPage.jsx
// I used a different UI entirely and different ways for generating the code verifier, code challenge, and generating state

// Login function
const login = (custosClientId: string, redirectUrl: string) => {
  const generateCodeVerifier = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let codeVerifier = '';
    const length = 128;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeVerifier += characters[randomIndex];
    }
    return codeVerifier;
  };

  const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const generateState = (): string => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte: number) => ('0' + byte.toString(16)).slice(-2)).join('');
  };

  const codeVerifier = generateCodeVerifier();
  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    const state = generateState();

    const custosAuthUrl =
      `https://api.playground.usecustos.org/api/v1/identity-management/authorize?response_type=code&client_id=${custosClientId}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&scope=openid+profile+email&state=${encodeURIComponent(state)}&code_challenge=${encodeURIComponent(
        codeChallenge
      )}&code_challenge_method=S256`;

    localStorage.setItem('pkce_code_verifier', codeVerifier);
    localStorage.setItem('state', state);
    localStorage.setItem('redirectUrl', redirectUrl);
    localStorage.setItem('custosClientId', custosClientId);

    window.location.href = custosAuthUrl;
  });
};

const App: React.FC = () => {
  const [custosClientId, setCustosClientId] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('http://localhost:3000/callback');

  // Check admin status on load or login

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(custosClientId, redirectUrl);
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '20rem' }}>
        <h3 className="card-title text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="custosClientId" className="form-label">Custos Client ID</label>
            <input 
              type="text" 
              className="form-control" 
              id="custosClientId" 
              placeholder="Enter Custos Client ID" 
              value={custosClientId}
              onChange={(e) => setCustosClientId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="redirectUrl" className="form-label">Redirect URL</label>
            <input 
              type="url" 
              className="form-control" 
              id="redirectUrl" 
              placeholder="Enter Redirect URL" 
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;
