import { TextField } from '@mui/material';
import { useState } from 'react';
import { FieldDetail } from '../global/constants';
import { toKebabCase } from '@/utils';

type AssetFormTextFieldProps = {
  field: [string | number, string | number];
  fieldDetail: FieldDetail;
  rowIndex: number;
  setSnapshotState: (snapshot: Snapshot) => void;
};

export const AssetFormTextField = (props: AssetFormTextFieldProps) => {
  const { field, fieldDetail, rowIndex, setSnapshotState } = props;

  const valueIsNumber = typeof field[1] === 'number';
  const fieldValueSanitized = valueIsNumber
    ? field[1]?.toString()
    : (field[1]?.length > 0 && field[1]) || '';

  function formInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('event', event);
    setSnapshotState((prevState) => {
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
      type={field[0] === 'assetValue' && 'number'}
      fullWidth
      id={field[0]}
      label={fieldDetail.name}
      name={field[0]}
      onChange={(event) => formInputChangeHandler(event)}
    />
  );
};
