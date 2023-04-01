import { Box } from '@mui/system';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Snapshot } from '../global/types';
import Switch from '@mui/material/Switch';

import { convertAssetToGBPCurrency } from '../global/utils';
import {
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { formatNumberWithCommas } from '../utils';

type SnapshotAssetBarChartProps = {
  snapshot: Snapshot;
};

type DataSource = {
  [key: string]: number;
};

export const SnapshotAssetBarChart = (props: SnapshotAssetBarChartProps) => {
  const { snapshot } = props;
  const chartRef = useRef(null);

  const normalisedAssets = useMemo(() => {
    return snapshot.snapshotAssets
      .map((asset) => {
        let assetValue: string | number = asset.assetValue;

        if (asset.assetCurrency !== 'gbp') {
          assetValue = convertAssetToGBPCurrency(asset).toFixed();
        }

        return {
          name: asset.assetName,
          value: Number(assetValue),
          checked: true,
        };
      })
      .filter((asset) => asset.value > 100)
      .sort((a: any, b: any) => a.value - b.value);
  }, [snapshot]);

  const [chosenAssets, setChosenAssets] = useState(normalisedAssets);

  const assetsToDisplay = chosenAssets.filter((asset) => asset.checked);
  const dataSourceNames = assetsToDisplay.map((asset) => asset.name);
  const dataSourceValues = assetsToDisplay.map((asset) => asset.value);

  const totalOnChart = chosenAssets.reduce((acc, curr) => {
    if (curr.checked) {
      return acc + curr.value;
    }
    return acc;
  }, 0);

  const chartOptions = useMemo(
    () => ({
      grid: { containLabel: true },
      legend: {},
      label: {
        show: true,
      },
      xAxis: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: {
        type: 'category',
        axisLabel: { interval: 0 },
        data: dataSourceNames,
      },
      series: {
        type: 'bar',
        data: dataSourceValues,
        colorBy: 'data',
      },
    }),
    [dataSourceNames, dataSourceValues]
  );

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Draw the chart
      myChart.clear();
      myChart.setOption(chartOptions);

      // myChart.on('click', function (params) {
      //   console.log('123', params);
      // });
    }
  }, [chartRef, chartOptions]);

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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h4'
          sx={{ margin: '100px 0 40px', textAlign: 'center' }}
        >
          Total Sum on Chart: £{formatNumberWithCommas(totalOnChart)}
        </Typography>
        <FormControlLabel
          sx={{
            margin: '0',
            padding: 0,
            justifyContent: 'center',
            transform: 'scale(1.3)',
            width: '200px',
            display: 'block',
          }}
          label={'Select all'}
          control={
            <Switch
              defaultChecked
              onChange={(event) => toggleAllOnOffHandler(event)}
            />
          }
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormGroup sx={{ flex: '0 0 30%' }}>
          {[...chosenAssets].reverse().map((asset) => {
            return (
              <FormControlLabel
                checked={asset.checked}
                key={asset.name}
                sx={{ margin: 0, padding: 0 }}
                label={`${asset.name} (${asset.value})`}
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
        </FormGroup>
        <Box
          id='main'
          style={{ height: '800px', flex: '0 0 70%' }}
          ref={chartRef}
        ></Box>
      </Box>
    </>
  );
};
