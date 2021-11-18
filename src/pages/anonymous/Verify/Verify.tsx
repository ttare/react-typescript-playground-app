import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AuthService } from 'services';
import useApi from 'hooks/useApi';
import { LOGIN_URL } from '../../routeNames';

const Verify: React.FC<RouteComponentProps<{ token: string }>> = props => {
  const { token } = props.match.params;
  const verifyApi = useApi(AuthService.verify, {
    params: token,
  });

  if (verifyApi.error) return <div className="text-center">{verifyApi.error.detail}</div>;

  return (
    <div className="text-center">
      <div>Email verified</div>
      <Link to={LOGIN_URL}>Go to login page</Link>
    </div>
  );
};

export default Verify;
