import { useContext } from 'react';
import AuthContext from './AuthContext';
import { AuthState } from 'types/auth';

export default function useAuthState(): AuthState {
  return useContext(AuthContext);
}
