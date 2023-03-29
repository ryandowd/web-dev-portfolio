import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FieldDetail, SnapshotWithTotals } from '../../global/types';
import type { SelectChangeEvent } from '@mui/material';

type SnapshotFormSelectFieldProps = {
  field: [string, string];
  fieldDetail: FieldDetail;
  rowIndex: number;
  setSnapshotState: (snapshot: SnapshotWithTotals) => void;
};

export const SnapshotFormSelectField = (
  props: SnapshotFormSelectFieldProps
) => {
  const { field, fieldDetail, setSnapshotState, rowIndex } = props;
  // const [chosenValue, setChosenValue] = useState<string | unknown>(field[1]);

  function formSelectChangeHandler(
    event: SelectChangeEvent<HTMLSelectElement>
  ) {
    // @ts-ignore
    setSnapshotState((prevState: SnapshotWithTotals) => {
      const updatedAssets = prevState.snapshotAssets.map(
        (asset: object, index: number) => {
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

  // @ts-ignore
  const menuItem = Object.entries(fieldDetail.selectOptions)?.map((option) => {
    console.log('option', option);
    return (
      <MenuItem key={option[0]} value={option[0]}>
        {option[1]}
      </MenuItem>
    );
  });

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
        {menuItem}
      </Select>
    </FormControl>
  );
};
