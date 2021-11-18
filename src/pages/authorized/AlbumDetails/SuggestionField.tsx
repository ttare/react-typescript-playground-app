import React from 'react';
import AsyncCreatable from 'react-select/async-creatable';
import { Field, FieldProps } from 'formik';
import useApi from 'hooks/useApi';
import TagService from 'services/TagService';

type Props = {
  name: string;
};

const SuggestionField: React.FC<Props> = ({ name }) => {
  const suggestionsApi = useApi(TagService.suggestions, { skipOnLoad: true });

  return (
    <Field name={name}>
      {(fieldProps: FieldProps) => {
        const { meta, field, form } = fieldProps;
        const { error } = meta;
        return (
          <div>
            <AsyncCreatable
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={inputValue => {
                if (inputValue.length < 3) return new Promise(resolve => resolve([]));
                return suggestionsApi.fetch(inputValue).then(response => {
                  return new Promise(resolve => resolve(response.data));
                });
              }}
              isValidNewOption={inputValue => {
                if (!inputValue || inputValue.charAt(0) === '@') return false;
                if (inputValue.charAt(0) === '#') return inputValue.length > 1;
                return true;
              }}
              formatCreateLabel={inputValue => `Create "${inputValue}"`}
              getNewOptionData={(inputValue, optionLabel) => {
                let label, value;
                if (inputValue.charAt(0) === '#') {
                  label = (optionLabel as string).replace('#', '');
                  value = inputValue.substring(1);
                } else {
                  label = optionLabel;
                  value = inputValue;
                }
                return {
                  label,
                  value,
                  __isNew__: true,
                };
              }}
              onChange={value => form.setFieldValue(field.name, value || [])}
            />
            <div>{error}</div>
          </div>
        );
      }}
    </Field>
  );
};

export default SuggestionField;
