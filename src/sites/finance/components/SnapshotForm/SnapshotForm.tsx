import { Add, DeleteForever } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { IconButton } from '@mui/material';
import { Box, Container } from '@mui/system';
import { v4 as uuid } from 'uuid';
import { Snapshot } from '../../global/types';
import { SnapshotFormField } from './SnapshotFormField';

type SnapshotFormProps = {
  submitButtonText: string;
  isLoading: boolean;
  snapshot: Snapshot;
  setSnapshotState: (snapshot: Snapshot) => void;
  submitFormHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const SnapshotForm = (props: SnapshotFormProps) => {
  const {
    submitButtonText,
    isLoading,
    snapshot,
    setSnapshotState,
    submitFormHandler,
  } = props;

  function addAssetRowHandler() {
    // @ts-ignore
    setSnapshotState((prevState) => {
      const updatedSnapshot = {
        ...prevState,
        snapshotAssets: [
          ...prevState.snapshotAssets,
          {
            assetId: uuid(),
            assetName: null,
            assetType: 'money',
            assetValue: 0,
            assetCurrency: 'gbp',
            assetOwner: 'joint',
          },
        ],
      };
      return updatedSnapshot;
    });
  }

  function deleteAssetRowHandler(assetId: string) {
    if (confirm('Delete row?')) {
      // @ts-ignore
      setSnapshotState((prevState) => {
        const updatedSnapshot = {
          ...prevState,
          snapshotAssets: prevState.snapshotAssets.filter(
            (asset: any) => asset.assetId !== assetId
          ),
        };
        return updatedSnapshot;
      });
    }
  }

  return (
    <Container
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        submitFormHandler(event)
      }
      component='form'
      disableGutters
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {snapshot?.snapshotAssets?.map((asset: any, index: number) => {
          console.log('asset', asset);
          return (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              {Object.entries(asset)?.map((field: any) => {
                const notIgnoredFields =
                  field[0] !== 'assetId' && field[0] !== 'difference';

                console.log('snapshot field[0]', field[0]);
                console.log('snapshot notIgnoredFields', notIgnoredFields);
                return (
                  notIgnoredFields && (
                    <SnapshotFormField
                      key={field[0]}
                      field={field}
                      setSnapshotState={setSnapshotState}
                      rowIndex={index}
                    />
                  )
                );
              })}
              <IconButton>
                <DeleteForever
                  onClick={() => deleteAssetRowHandler(asset.assetId)}
                />
              </IconButton>
            </Box>
          );
        })}
        <IconButton onClick={addAssetRowHandler}>
          <Add />
        </IconButton>
      </Box>
      <LoadingButton
        fullWidth
        type='submit'
        loading={isLoading}
        loadingPosition='end'
        variant='contained'
        sx={{ marginTop: '10px' }}
      >
        {submitButtonText}
      </LoadingButton>
    </Container>
  );
};
