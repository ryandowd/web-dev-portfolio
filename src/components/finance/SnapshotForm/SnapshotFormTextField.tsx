import { TextField } from '@mui/material';
import { useState } from 'react';
import { FieldDetail, SnapshotWithTotals } from '../global/types';
import { toKebabCase } from '@/utils';

type SnapshotFormTextFieldProps = {
  field: [string, string];
  fieldDetail: FieldDetail;
  rowIndex: number;
  setSnapshotState: (snapshot: SnapshotWithTotals) => void;
};

export const SnapshotFormTextField = (props: SnapshotFormTextFieldProps) => {
  const { field, fieldDetail, rowIndex, setSnapshotState } = props;
  const valueIsNumber = typeof field[1] === 'number';
  const fieldValueSanitized = valueIsNumber
    ? field[1]?.toString()
    : (field[1]?.length > 0 && field[1]) || '';

  function formInputChangeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log('event', event);
    // @ts-ignore
    setSnapshotState((prevState: SnapshotWithTotals) => {
      const updatedAssets = prevState.snapshotAssets.map(
        (asset, index: number) => {
          if (index === rowIndex) {
            return {
              ...asset,
              [field[0]]: event.target.value,
            };
          }
          return asset;
        }
      );

      const updatedSnapshot = {
        ...prevState,
        snapshotAssets: [...updatedAssets],
      };

      console.log('updatedSnapshot', updatedSnapshot);
      // return prevState;
      return updatedSnapshot;
    });
  }

  return (
    <TextField
      InputLabelProps={{
        shrink: fieldValueSanitized?.length > 0,
      }}
      key={field[0]}
      margin='normal'
      value={fieldValueSanitized}
      required
      fullWidth
      type={(field[0] === 'assetValue' && 'number') as 'text'}
      id={field[0]}
      label={fieldDetail.name}
      name={field[0]}
      onChange={(event) => formInputChangeHandler(event)}
    />
  );
};
