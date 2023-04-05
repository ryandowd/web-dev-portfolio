import {
  FormControl,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { Snapshot } from '../global/types';
import { convertAssetToGBPCurrency } from '../global/utils';
import { formatNumberWithCommas } from '../utils';

type MortgageDepositCalculatorProps = {
  snapshot: Snapshot;
};

export const MortgageDepositCalculator = (
  props: MortgageDepositCalculatorProps
) => {
  const { snapshot } = props;

  const normalisedAssets = useMemo(() => {
    return snapshot.snapshotAssets
      .map((asset) => {
        let assetValue: string | number = asset.assetValue;

        if (asset.assetCurrency !== 'gbp') {
          assetValue = convertAssetToGBPCurrency(asset).toFixed();
        }

        return {
          name: asset.assetName,
          owner: asset.assetOwner,
          value: Number(assetValue),
          checked: true,
        };
      })
      .sort((a: any, b: any) => a.value - b.value);
  }, [snapshot]);

  const [chosenAssets, setChosenAssets] = useState(normalisedAssets);

  const calculatorTotal = chosenAssets.reduce((acc, curr) => {
    return curr.checked ? acc + curr.value : acc;
  }, 0);

  function changeChosenAssetsHandler(event: any, name: string) {
    setChosenAssets((prevAssets) => {
      const updatedState = prevAssets.map((asset) => {
        const isMatch = asset.name === name;
        return {
          ...asset,
          checked: isMatch ? event.target.checked : asset.checked,
        };
      });
      return updatedState;
    });
  }

  function toggleAllOnOffHandler(event: any) {
    setChosenAssets((prevAssets) => {
      return prevAssets.map((asset) => {
        return {
          ...asset,
          checked: event.target.checked,
        };
      });
    });
  }

  const ownersAssets = useMemo(() => {
    return chosenAssets.reduce((acc: any, curr: any) => {
      if (!acc[curr.owner]) {
        acc[curr.owner] = [];
      }
      acc[curr.owner].push(curr);
      return acc;
    }, []);
  }, [chosenAssets]);

  const moreThanOneSelected =
    chosenAssets.filter((asset) => asset.checked).length > 0;
  const selectText = moreThanOneSelected ? 'Deselect all' : 'Select all';

  return (
    <Box
      sx={{
        margin: '40px 0 20px',
        padding: '20px 0 80px',
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '20px 0 30px',
        }}
      >
        <Typography variant='h4' marginBottom={2}>
          Mortgage deposit calculator: £
          {formatNumberWithCommas(calculatorTotal)}
        </Typography>
        <FormControlLabel
          sx={{
            margin: 0,
            padding: 0,
            transform: 'scale(1.3)',
            width: '150px',
          }}
          checked={moreThanOneSelected}
          label={selectText}
          control={
            <Switch
              defaultChecked
              onChange={(event) => toggleAllOnOffHandler(event)}
            />
          }
        />
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          {Object.keys(ownersAssets).map((owner) => {
            return (
              <Box key={owner}>
                <Typography
                  variant='h6'
                  sx={{
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    margin: '10px 0',
                  }}
                >
                  {owner}
                </Typography>
                <FormControl>
                  {ownersAssets[owner].map((asset: any) => {
                    return (
                      <FormControlLabel
                        checked={asset.checked}
                        key={asset.name}
                        sx={{ margin: 0, padding: 0 }}
                        label={`${asset.name} (£${formatNumberWithCommas(
                          asset.value
                        )})`}
                        control={
                          <Switch
                            onChange={(event) =>
                              changeChosenAssetsHandler(event, asset.name)
                            }
                          />
                        }
                      />
                    );
                  })}
                </FormControl>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
