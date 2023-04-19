import DeleteForever from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LoadingButton } from '@mui/lab';
import { IconButton, Paper, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useCallback, useEffect, useMemo } from 'react';
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

  const ownerNames = ['kay', 'ryan', 'joint'];

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

  const groupedAssetsByOwner = useMemo(() => {
    return snapshot?.snapshotAssets?.reduce((acc: any, asset: any) => {
      const { assetOwner } = asset;
      if (!acc[assetOwner]) {
        acc[assetOwner] = [];
      }
      acc[assetOwner].push(asset);
      return acc;
    }, {});
  }, [snapshot]);

  const getAssetsByOwner = useCallback(
    (ownerName: string) => {
      if (!groupedAssetsByOwner[ownerName]) {
        return null;
      }

      return groupedAssetsByOwner[ownerName].map((asset: any) => {
        const { assetId, difference, ...renderedAssetFields } = asset;
        return (
          <Box
            key={asset.assetId}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {Object.entries(renderedAssetFields)?.map((field: any) => {
              return (
                <SnapshotFormField
                  key={field[0]}
                  field={field}
                  setSnapshotState={setSnapshotState}
                  rowIndex={asset.assetId}
                />
              );
            })}
            <IconButton>
              <DeleteForever
                onClick={() => deleteAssetRowHandler(asset.assetId)}
              />
            </IconButton>
          </Box>
        );
      });
    },
    [groupedAssetsByOwner]
  );

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
        {ownerNames.map((ownerName) => {
          return (
            <Paper
              key={ownerName}
              sx={{
                margin: '20px',
                padding: '20px',
              }}
            >
              <Typography variant='h3' textAlign='center' marginBottom={4}>
                {`${ownerName[0].toUpperCase()}${ownerName.slice(1)}`}
              </Typography>
              {getAssetsByOwner(ownerName)}
            </Paper>
          );
        })}
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
          <IconButton onClick={addAssetRowHandler}>
            <AddCircleOutlineIcon
              color='primary'
              sx={{ width: '50px', height: '50px' }}
            />
          </IconButton>
        </Box>
      </Box>
      <LoadingButton
        fullWidth
        type='submit'
        loading={isLoading}
        variant='contained'
        sx={{ marginTop: '10px', padding: '20px', fontSize: '1.4rem' }}
      >
        {submitButtonText}
      </LoadingButton>
    </Container>
  );
};
