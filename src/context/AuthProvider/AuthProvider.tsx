import React, { Children, useState, useEffect } from 'react';
import UserService from 'services/UserService';
import AuthHelper from 'utils/authHelper/AuthHelper';
import ApiClient from 'utils/apiClient/ApiClient';
import { Profile } from 'types/user';
import { AuthState } from 'types/auth';
import AuthContext from './AuthContext';

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authState, setAuthState] = useState<Profile>();

  useEffect(() => {
    ApiClient.setAuthState = authStateModified => setAuthState(authStateModified);
    ApiClient.init();
    const token = AuthHelper.getAccessToken();
    if (!token) {
      return setLoading(false);
    }
    UserService.me()
      .then(response => {
        setAuthState(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const value = {
    user: authState,
    setAuthState,
  } as AuthState;

  return (
    <AuthContext.Provider value={value}>{loading ? <div>Loading</div> : Children.only(children)}</AuthContext.Provider>
  );
};

export default AuthProvider;
