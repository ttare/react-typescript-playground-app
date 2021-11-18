import * as Yup from 'yup';
import { RegisterFormValues } from 'types/auth';
import { TemplateHelper, TEMPLATES } from 'templates';

const registerSchema = Yup.object().shape<RegisterFormValues>({
  email: Yup.string().email(TemplateHelper.format(TEMPLATES.INVALID, 'email')).required(TEMPLATES.REQUIRED),
  username: Yup.string().label('Name').required(),
  name: Yup.string().label('Name').required(),
  password: Yup.string().label('Password').required(),
  verifyPassword: Yup.string()
    .label('Verify Password')
    .required()
    .oneOf([Yup.ref('password'), null], TEMPLATES.PASSWORDS_MATCH),
});

export default registerSchema;
