import { Box } from '@mui/system';
import { Snapshot } from '../../global/types';
import { SnapshotDatepicker } from './SnapshotDatepicker';
import { SnapshotForm } from './SnapshotForm';
import { uuid } from 'uuidv4';
import { DateLong } from '../ui/DateLong';

type AddSnapshotFormProps = {
  snapshotState: Snapshot;
  setSnapshotState: (snapshot: Snapshot) => void;
  isCreateLoading: boolean;
  isCreateSuccess: boolean;
  createAddSnapshotHandler: (snapshot: any) => void;
};

export const AddSnapshotForm = (props: AddSnapshotFormProps) => {
  const {
    snapshotState,
    setSnapshotState,
    isCreateLoading,
    createAddSnapshotHandler,
  } = props;

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newShapshot = {
      ...snapshotState,
      snapshotId: uuid(),
    };

    createAddSnapshotHandler(newShapshot);
  }

  return (
    <Box sx={{ margin: '10px 0' }}>
      <DateLong dateValue={snapshotState.snapshotDate} />
      <SnapshotDatepicker
        snapshot={snapshotState}
        setSnapshotState={setSnapshotState}
      />
      <SnapshotForm
        submitButtonText='Save new snapshot'
        isLoading={isCreateLoading}
        snapshot={snapshotState}
        setSnapshotState={setSnapshotState}
        submitFormHandler={submitFormHandler}
      />
    </Box>
  );
};
