import { MutableRefObject, useEffect, useState } from 'react';
import { TextField } from '@mui/material';

type FormInputProps = {
  field: {
    name: string;
    label: string;
    extraProps?: {
      minRows: number;
      style: object;
      multiline: boolean;
    };
  };
  value: string;
  isRefetching?: boolean | undefined;
  autofocus?: boolean;
};

export const FormInput = (props: FormInputProps) => {
  const { field, value, isRefetching, autofocus } = props;
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
      onChange={(event) => setFieldValue(event.target.value)}
      {...field.extraProps}
      autoFocus={autofocus}
    />
  );
};
