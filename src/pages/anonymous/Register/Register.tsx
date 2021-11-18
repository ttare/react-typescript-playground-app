import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, FormItem } from 'components/shared';
import useApi from 'hooks/useApi';
import { UserService } from 'services';
import { TemplateHelper, TEMPLATES } from 'templates';
import { RegisterFormValues } from 'types/auth';
import { useAuthState } from 'context/AuthProvider';
import { LOGIN_URL } from '../../routeNames';
import registerSchema from './registerSchema';
import './Register.scss';

const Register: React.FC = () => {
  const authState = useAuthState();
  const createApi = useApi(UserService.register, { skipOnLoad: true });

  const onSubmit = (values: RegisterFormValues) => {
    createApi.fetch(values).then(response => {
      if (response.data && response.data.id) {
        authState.setAuthState(response.data);
      }
    });
  };

  if (createApi.data) return <div className="text-center">{TemplateHelper.format(TEMPLATES.SIGN_UP_SUCCESS)}</div>;

  return (
    <div>
      <div className="panel">
        <h2>Register new account</h2>
        <p>Please enter your details below.</p>
      </div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          username: '',
          password: '',
          verifyPassword: '',
        }}
        validateOnMount
        validationSchema={registerSchema}
        onSubmit={onSubmit}>
        {({ errors }): JSX.Element => (
          <Form>
            {console.log(errors)}
            {createApi.error && (
              <div className="text-center">
                {TemplateHelper.format(TEMPLATES.SIGN_UP_ERROR)} <br />
                {createApi.error.detail}
                <br />
              </div>
            )}
            <FormItem id="name" name="name" placeholder="Name" />
            <FormItem id="email" type="email" name="email" placeholder="Email" />
            <FormItem id="username" type="text" name="username" placeholder="Username" />
            <FormItem id="password" type="password" name="password" placeholder="Password" />
            <FormItem id="verifyPassword" type="password" name="verifyPassword" placeholder="Verify Password" />
            <br />
            <Button fluid color="primary" type="submit" loading={createApi.isLoading}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <br />

      <div className="no-account">
        Already have an Account! &nbsp;
        <Link to={LOGIN_URL}>Sign In Here</Link>
      </div>
    </div>
  );
};

export default Register;
