import { Container } from '@mui/system';
import dayjs from 'dayjs';
import { uuid } from 'uuidv4';
import { AssetForm } from './AssetForm/AssetForm';
import { SnapshotField, Snapshot, dateFormat } from './global/constants';
import { useSnapshots } from './use-snapshots';

export const NewSnapshotPage = () => {
  const {
    snapshots,
    createNewSnapshotHandler,
    isCreateLoading,
    isCreateSuccess,
  } = useSnapshots();

  return (
    <Container component='main'>
      <AssetForm
        snapshot={snapshots[0]}
        createNewSnapshotHandler={createNewSnapshotHandler}
        isCreateLoading={isCreateLoading}
        isCreateSuccess={isCreateSuccess}
      />
    </Container>
  );
};
