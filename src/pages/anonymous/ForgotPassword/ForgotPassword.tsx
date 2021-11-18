import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, FormItem } from 'components/shared';
import { UserService } from 'services';
import useApi from 'hooks/useApi';
import { TemplateHelper, TEMPLATES } from 'templates';
import forgotPasswordSchema from './forgotPasswordSchema';
import { REGISTER_URL } from '../../routeNames';
import './ForgotPassword.scss';

const ForgotPassword: React.FC = () => {
  const forgotPasswordApi = useApi(UserService.forgotPassword, { skipOnLoad: true });

  if (forgotPasswordApi.data)
    return <div className="text-center">{TemplateHelper.format(TEMPLATES.FORGOT_PASSWORD_SUCCESS)}</div>;

  return (
    <div>
      <div className="panel">
        <h2>Forget your password?</h2>
        <p>Please enter your email</p>
      </div>
      <Formik
        initialValues={{
          email: '',
        }}
        validateOnMount
        validationSchema={forgotPasswordSchema}
        onSubmit={forgotPasswordApi.fetch}>
        {(): JSX.Element => (
          <Form>
            {forgotPasswordApi.error && (
              <div className="text-center">{TemplateHelper.format(TEMPLATES.FORGOT_PASSWORD_ERROR)}</div>
            )}
            <FormItem id="email" type="email" name="email" placeholder="Email" />
            <Button fluid color="primary" type="submit" loading={forgotPasswordApi.isLoading}>
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
      <br />
      <div className="no-account">
        {`Don't have an Account!`} &nbsp;
        <Link to={TemplateHelper.route(REGISTER_URL, '')}>Sign Up Here</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
