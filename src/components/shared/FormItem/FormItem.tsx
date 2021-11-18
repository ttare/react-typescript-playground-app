import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Field, FieldProps } from 'formik';
import FormField from './FormField';
import './FormItem.scss';

export type InputSizes = 'sm' | 'lg';

export interface FormItemProps {
  className?: string;
  id: string;
  label?: string | ReactNode;
  name: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  size?: InputSizes;
}

const FormItem: React.FC<FormItemProps> = props => {
  const { className, id, label, name, type } = props;
  return (
    <Field type={type} name={name}>
      {(fieldProps: FieldProps) => {
        const { field, meta } = fieldProps;
        const { touched, error } = meta;
        const hasError = touched && error;
        return (
          <div className={classNames('form-group', className)}>
            {label && <label htmlFor={id}>{label}</label>}
            <FormField {...props} field={field} meta={meta} />
            <div className="invalid-feedback">{hasError ? error : ''}</div>
          </div>
        );
      }}
    </Field>
  );
};

export default FormItem;
