import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuthState } from './context/AuthProvider';
import Navbar from 'components/Navbar';
import AuthHelper from 'utils/authHelper/AuthHelper';

const UnauthorizedRouter = lazy(() => import('./pages/anonymous'));
const AuthorizedRouter = lazy(() => import('./pages/authorized'));

const App: React.FC = () => {
  const authState = useAuthState();

  const logout = (): void => {
    AuthHelper.setUser();
    authState.setAuthState(undefined);
  };

  return (
    <Router>
      <Navbar user={authState?.user} logout={logout} />
      <Suspense fallback={<div>Loading...</div>}>
        {authState?.user ? <AuthorizedRouter /> : <UnauthorizedRouter />}
      </Suspense>
    </Router>
  );
};

export default App;
