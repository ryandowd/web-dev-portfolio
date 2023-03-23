import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from '@mui/material';
import { useState } from 'react';
import { FieldDetail, Snapshot } from '../global/constants';
import type { SelectChangeEvent } from '@mui/material';
import { toKebabCase } from '@/utils';

type AssetFormSelectFieldProps = {
  field: [string | number, string | number];
  fieldDetail: FieldDetail;
  rowIndex: number;
  setSnapshotState: (snapshot: Snapshot) => void;
};

export const AssetFormSelectField = (props: AssetFormSelectFieldProps) => {
  const { field, fieldDetail, setSnapshotState, rowIndex } = props;
  // const [chosenValue, setChosenValue] = useState<string | unknown>(field[1]);

  function formSelectChangeHandler(
    event: SelectChangeEvent<HTMLSelectElement>
  ) {
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
    // setChosenValue(event.target.value);
  }

  return (
    <FormControl required sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{fieldDetail.name}</InputLabel>
      <Select
        labelId='demo-simple-select-helper-label'
        id={field[0]}
        value={field[1] || ''}
        label={fieldDetail.name}
        onChange={(event) =>
          formSelectChangeHandler(event as SelectChangeEvent<HTMLSelectElement>)
        }
      >
        {Object.entries(fieldDetail.selectOptions)?.map((option) => {
          return (
            <MenuItem key={option[0]} value={option[0]}>
              {option[1]}
            </MenuItem>
          );
        })}
      </Select>

      {/* <NativeSelect
        defaultValue={field[1]}
        inputProps={{
          id: field[0],
          // name: field[1],
        }}
      >
        {Object.entries(fieldDetail.selectOptions)?.map((option) => {
          console.log('option', option);
          return (
            <option key={option[0]} value={option[1]}>
              {option[1]}
            </option>
          );
        })}
      </NativeSelect> */}
    </FormControl>
  );
};
