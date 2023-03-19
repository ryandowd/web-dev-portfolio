import { MutableRefObject, useEffect, useState } from 'react';
import { TextField } from '@mui/material';

type FormInputProps = {
  field: {
    name: string;
    label: string;
  };
  value: string;
  isRefetching: boolean;
};

export const FormInput = (props: FormInputProps) => {
  const { field, value, isRefetching } = props;
  const [fieldValue, setFieldValue] = useState<string | null>(value);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const _fieldValue = isRefetching ? 'Refreshing...' : fieldValue || '';

  return (
    <TextField
      key={field.name}
      InputLabelProps={{
        shrink: !!fieldValue,
      }}
      margin='normal'
      value={_fieldValue}
      required
      fullWidth
      id={field.name}
      label={field.label}
      name={field.name}
      autoFocus
      onChange={(event) => setFieldValue(event.target.value)}
    />
  );
};
