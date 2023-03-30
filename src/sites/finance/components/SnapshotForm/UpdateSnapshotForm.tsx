import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Snapshot, Snapshot } from '../../global/types';
import { SnapshotForm } from './SnapshotForm';

type UpdateSnapshotFormProps = {
  snapshot: Snapshot;
  isUpdateLoading: boolean;
  setSnapshotState: (snapshot: any) => void;
  updateSnapshotFormHandler: (snapshot: any) => void;
  deleteSnapshotHandler: (snapshotId: string) => void;
};

export const UpdateSnapshotForm = (props: UpdateSnapshotFormProps) => {
  const {
    snapshot,
    isUpdateLoading,
    setSnapshotState,
    updateSnapshotFormHandler,
    deleteSnapshotHandler,
  } = props;

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateSnapshotFormHandler(snapshot);
  }

  return (
    <Box sx={{ margin: '10px 0' }}>
      <SnapshotForm
        submitButtonText='Update Snapshot'
        isLoading={isUpdateLoading}
        snapshot={snapshot}
        setSnapshotState={setSnapshotState}
        submitFormHandler={submitFormHandler}
      />
      <Container sx={{ marginTop: '10px' }}>
        <Button
          fullWidth
          variant='contained'
          color='error'
          onClick={() => deleteSnapshotHandler(snapshot.snapshotId)}
        >
          Delete snapshot
        </Button>
      </Container>
    </Box>
  );
};
