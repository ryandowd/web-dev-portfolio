import { Box } from '@mui/system';
import { SnapshotFormTextField } from './SnapshotFormTextField';
import { SnapshotFormSelectField } from './SnapshotFormSelectField';
import { fieldDetails, FieldDetails, Snapshot } from '../global/constants';

type SnapshotFormFieldProps = {
  field: [string | number, string | number];
  rowIndex: number;
  setSnapshotState: (snapshot: Snapshot) => void;
};

export const SnapshotFormField = (props: SnapshotFormFieldProps) => {
  const { field, rowIndex, setSnapshotState } = props;
  const fieldDetail = fieldDetails[field[0] as keyof FieldDetails];
  const largeField = field[0] === 'assetName' ? '40%' : '20%';

  let fieldType = fieldDetail.selectOptions ? (
    <SnapshotFormSelectField
      field={field}
      fieldDetail={fieldDetail}
      setSnapshotState={setSnapshotState}
      rowIndex={rowIndex}
    />
  ) : (
    <SnapshotFormTextField
      field={field}
      fieldDetail={fieldDetail}
      setSnapshotState={setSnapshotState}
      rowIndex={rowIndex}
    />
  );

  return (
    <Box sx={{ display: 'flex', marginRight: '10px', flex: largeField }}>
      {fieldType}
    </Box>
  );
};
