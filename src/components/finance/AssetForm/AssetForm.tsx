import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Snapshot } from '../global/types';
import { AssetFormField } from './AssetFormField';
import { v4 as uuid } from 'uuid';
import { SnapshotDate } from './SnapshotDate';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';

type FormFieldGroupProps = {
  groupId: string;
  fields: FormFieldProps[];
};

type FormFieldProps = {
  label: string;
  type: string;
  value: string;
  fieldId: string;
  owner: string;
};

type AssetType = {
  label: string;
  name: string;
};

// type AssetTypes = {
//   money: AssetType;
//   shares: AssetType;
//   business: AssetType;
//   crypto: AssetType;
// };

type AssetFormProps = {
  snapshot: Snapshot;
  isCreateLoading: boolean;
  isCreateSuccess: boolean;
  createNewSnapshotHandler: (snapshot: any) => void;
};

export const AssetForm = (props: AssetFormProps) => {
  const { snapshot, isCreateLoading, createNewSnapshotHandler } = props;
  // const [isLoading, setIsLoading] = useState(false);
  const [snapshotDate, setSnapshotDate] = useState<any>(snapshot.snapshotDate);
  const [snapshotState, setSnapshotState] = useState(snapshot);

  console.log('isCreateLoading', isCreateLoading);

  // useEffect(() => {
  //   console.log('yep');
  //   setSnapshotState(snapshot);
  // }, [snapshot]);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newShapshot = {
      ...snapshotState,
      snapshotId: uuid(),
      snapshotDate: snapshotDate,
    };

    console.log('newShapshot', newShapshot);
    // setIsLoading(true);
    createNewSnapshotHandler(newShapshot);
  }

  function addNewAssetHandler() {
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

  return (
    <Box sx={{ margin: '10px 0' }}>
      <SnapshotDate
        snapshotState={snapshotState}
        snapshotDate={snapshotDate}
        setSnapshotDate={setSnapshotDate}
      />
      <Container
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          submitFormHandler(event)
        }
        component='form'
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {snapshotState?.snapshotAssets?.map((asset: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {Object.entries(asset)?.map((field) => {
                  const isNotAssetId = field[0] !== 'assetId';
                  return (
                    isNotAssetId && (
                      <AssetFormField
                        key={field[0]}
                        field={field}
                        setSnapshotState={setSnapshotState}
                        rowIndex={index}
                      />
                    )
                  );
                })}
              </Box>
            );
          })}
          <Button onClick={addNewAssetHandler} variant='outlined'>
            Add new asset
          </Button>
        </Box>
        <LoadingButton
          type='submit'
          fullWidth
          loading={isCreateLoading}
          loadingPosition='end'
          variant='contained'
        >
          Save new snapshot
        </LoadingButton>
      </Container>
    </Box>
  );
};

// return (
//   <Box sx={{ display: 'flex' }}>
//     <TextField
//       key={field.id}
//       margin='normal'
//       value={field.value}
//       required
//       fullWidth
//       id={field.groupId}
//       onChange={(event) =>
//         formInputChangeHandler(field.id, event.target.value)
//       }
//       label={field.label}
//       name={field.id}
//     />
//     <TextField
//       key={field.id}
//       margin='normal'
//       value={field.value}
//       required
//       fullWidth
//       id={field.id}
//       onChange={(event) =>
//         formInputChangeHandler(field.id, event.target.value)
//       }
//       label={field.label}
//       name={field.id}
//     />
//   </Box>
// );
