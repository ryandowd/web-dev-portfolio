import { Box } from '@mui/system';
import { AssetFormTextField } from './AssetFormTextField';
import { AssetFormSelectField } from './AssetFormSelectField';
import { fieldDetails, FieldDetails, Snapshot } from '../global/constants';

type AssetFormFieldProps = {
  field: [string | number, string | number];
  rowIndex: number;
  setSnapshotState: (snapshot: Snapshot) => void;
};

export const AssetFormField = (props: AssetFormFieldProps) => {
  const { field, rowIndex, setSnapshotState } = props;
  const fieldDetail = fieldDetails[field[0] as keyof FieldDetails];

  let fieldType = fieldDetail.selectOptions ? (
    <AssetFormSelectField
      field={field}
      fieldDetail={fieldDetail}
      setSnapshotState={setSnapshotState}
      rowIndex={rowIndex}
    />
  ) : (
    <AssetFormTextField
      field={field}
      fieldDetail={fieldDetail}
      setSnapshotState={setSnapshotState}
      rowIndex={rowIndex}
    />
  );

  return <Box sx={{ display: 'flex', marginRight: '10px' }}>{fieldType}</Box>;
};
