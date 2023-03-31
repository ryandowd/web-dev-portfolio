import { Box } from '@mui/system';
import { SnapshotFormTextField } from './SnapshotFormTextField';
import { SnapshotFormSelectField } from './SnapshotFormSelectField';
import { fieldDetails } from '../../global/constants';
import { Snapshot, FieldDetails } from '../../global/types';

type SnapshotFormFieldProps = {
  field: [string, string];
  rowIndex: number;
  setSnapshotState: (snapshot: Snapshot) => void;
};

export const SnapshotFormField = (props: SnapshotFormFieldProps) => {
  const { field, rowIndex, setSnapshotState } = props;
  const fieldDetail = fieldDetails[field[0] as keyof FieldDetails];
  const largeField = field[0] === 'assetName' ? '40%' : '20%';

  // console.log('field[0]', field[0]);
  // console.log('fieldDetail', fieldDetail);

  let fieldType = fieldDetail?.selectOptions ? (
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
