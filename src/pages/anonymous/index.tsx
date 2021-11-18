import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { LOGIN_URL, RESET_PASSWORD_URL, FORGOT_PASSWORD_URL, REGISTER_URL, VERIFY_EMAIL_URL } from '../routeNames';
import Verify from './Verify';
import Home from '../shared/Home';
import './Anonymous.scss';

const Anonymous: React.FC = () => (
  <div className="anonymous-page ui middle aligned center aligned grid">
    <div className="column">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={LOGIN_URL} component={Login} />
        <Route exact path={REGISTER_URL} component={Register} />
        <Route exact path={FORGOT_PASSWORD_URL} component={ForgotPassword} />
        <Route exact path={RESET_PASSWORD_URL} component={ResetPassword} />
        <Route exact path={VERIFY_EMAIL_URL} component={Verify} />
        <Redirect from="/" to={LOGIN_URL} />
      </Switch>
    </div>
  </div>
);

export default Anonymous;
