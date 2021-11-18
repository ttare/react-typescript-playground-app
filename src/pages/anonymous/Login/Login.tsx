import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'context/AuthProvider';
import { Form, Formik } from 'formik';
import { TemplateHelper, TEMPLATES } from 'templates';
import { Button, FormItem } from 'components/shared';
import useApi from 'hooks/useApi';
import { AuthService } from 'services';
import { LoginFormValues } from 'types/auth';
import loginSchema from './loginSchema';
import { FORGOT_PASSWORD_URL, REGISTER_URL } from '../../routeNames';
import './Login.scss';

const Login: React.FC = () => {
  const authState = useAuthState();
  const loginApi = useApi(AuthService.loginAndProfile, { skipOnLoad: true });

  const onSubmit = (values: LoginFormValues) => {
    loginApi.fetch(values).then(response => {
      if (response.data) {
        authState.setAuthState(response.data);
      }
    });
  };

  return (
    <div>
      <h2 className="ui teal image header">Login</h2>
      <div className="panel">
        <p>Please enter your email and password</p>

        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validateOnMount
          validationSchema={loginSchema}
          onSubmit={onSubmit}>
          {(): JSX.Element => (
            <Form>
              {loginApi.error && (
                <div className="ui error message">{TemplateHelper.format(TEMPLATES.SIGN_UP_ERROR)}</div>
              )}
              <FormItem id="username" type="text" name="username" placeholder="Username or email" />
              <FormItem id="password" type="password" name="password" placeholder="Password" />
              <Button fluid loading={loginApi.isLoading} type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>

        <br />
        <div className="text-center">
          <Link to={FORGOT_PASSWORD_URL}>Forgot your password?</Link>
        </div>
      </div>

      <div>
        {`Don't have an Account!`} &nbsp;
        <Link to={TemplateHelper.route(REGISTER_URL, '')}>Sign Up Here</Link>
      </div>
    </div>
  );
};

export default Login;
