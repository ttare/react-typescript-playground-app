import * as Yup from 'yup';
import { ForgotPasswordValues } from 'types/auth';
import { TemplateHelper, TEMPLATES } from 'templates';

const forgotPasswordSchema = Yup.object().shape<ForgotPasswordValues>({
  email: Yup.string().email(TemplateHelper.format(TEMPLATES.INVALID, 'email')).required(TEMPLATES.REQUIRED),
});

export default forgotPasswordSchema;
