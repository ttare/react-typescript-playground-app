import { createContext } from 'react';
import { AuthState } from 'types/auth';

const AuthContext = createContext<AuthState>({} as AuthState);

export default AuthContext;
