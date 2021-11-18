import * as Yup from 'yup';
import { ResetPasswordValues } from 'types/auth';
import { TEMPLATES } from 'templates';

const resetPasswordSchema = Yup.object().shape<ResetPasswordValues>({
  password: Yup.string().label('Password').required(),
  verifyPassword: Yup.string().oneOf([Yup.ref('password'), null], TEMPLATES.PASSWORDS_MATCH),
  token: Yup.string().required(),
});

export default resetPasswordSchema;
