import { TextField } from '@mui/material';
import { useState } from 'react';
import { FieldDetail, Snapshot } from '../../global/types';

type SnapshotFormTextFieldProps = {
  field: [string, string];
  fieldDetail: FieldDetail;
  rowIndex: number;
  setSnapshotState: (snapshot: Snapshot) => void;
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
    // @ts-ignore
    setSnapshotState((prevState: Snapshot) => {
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
