import React from 'react';
import classNames from 'classnames';
import { Input } from 'semantic-ui-react';
import { FieldInputProps, FieldMetaProps } from 'formik/dist/types';
import { FormItemProps } from './FormItem';

interface FormFieldProps extends FormItemProps {
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
}

const FormField: React.FC<FormFieldProps> = props => {
  const { id, disabled, size, placeholder, type, field, meta } = props;
  const { touched, error } = meta;
  return (
    <Input
      id={id}
      className={classNames('form-control', {
        [`form-control-${size}`]: Boolean(size),
        'is-invalid': touched && error,
      })}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      error={touched && !!error}
      {...field}
    />
  );
};

export default FormField;
