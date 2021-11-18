import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button } from 'reactstrap';
import FormItem from 'components/shared/FormItem';
import { UserService } from 'services';
import useApi from 'hooks/useApi';
import { TemplateHelper, TEMPLATES } from 'templates';
import { LOGIN_URL } from '../../routeNames';
import resetPasswordSchema from './resetPasswordSchema';
import './ResetPassword.scss';

const ResetPassword: React.FC<RouteComponentProps<{ token: string }>> = ({ match }) => {
  const { token } = match.params;
  const forgotPasswordApi = useApi(UserService.updatePassword, { skipOnLoad: true });

  if (forgotPasswordApi.data)
    return (
      <div className="text-center">
        {TemplateHelper.format(TEMPLATES.RESET_PASSWORD_SUCCESS)}
        <br />
        <Link to={LOGIN_URL}>Go to login page</Link>
      </div>
    );

  return (
    <div>
      <div className="panel">
        <h2>Reset your password</h2>
        <p>Please enter new password in details below.</p>
      </div>
      <Formik
        initialValues={{ password: '', verifyPassword: '', token }}
        validateOnMount
        validationSchema={resetPasswordSchema}
        onSubmit={forgotPasswordApi.fetch}>
        {({ isValid }): JSX.Element => (
          <Form>
            {forgotPasswordApi.error && <div className="text-center">{TEMPLATES.RESET_PASSWORD_ERROR}</div>}
            <FormItem id="password" type="password" name="password" placeholder="Password" />
            <FormItem id="verifyPassword" type="password" name="verifyPassword" placeholder="Verify Password" />
            <Button color="primary" block type="submit" disabled={!isValid} loading={forgotPasswordApi.isLoading}>
              Set new password
            </Button>
          </Form>
        )}
      </Formik>
      <div className="no-account">
        Already have an Account! &nbsp;
        <Link to={LOGIN_URL}>Sing in</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
