import * as Yup from 'yup';
import { LoginFormValues } from 'types/auth';
import { TEMPLATES } from 'templates';

const loginSchema = Yup.object().shape<LoginFormValues>({
  username: Yup.string().label('Username or email').required(TEMPLATES.REQUIRED),
  password: Yup.string().label('Password').required().min(2, TEMPLATES.SHORT),
});

export default loginSchema;
