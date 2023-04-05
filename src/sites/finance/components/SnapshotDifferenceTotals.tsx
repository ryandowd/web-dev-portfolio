import { Box } from '@mui/system';
import { useEffect, useMemo, useRef } from 'react';
import * as echarts from 'echarts';
import { Snapshot } from '../global/types';

import { convertAssetToGBPCurrency } from '../global/utils';
import { Typography } from '@mui/material';
import {
  formatAssetDifferencesForBarChart,
  formatAssetsForPieChart,
} from '../utils';

type SnapshotAssetBarChartProps = {
  snapshot: Snapshot;
};

export const SnapshotDifferenceTotals = (props: SnapshotAssetBarChartProps) => {
  const { snapshot } = props;
  const chartRef = useRef(null);

  const snapshotDifferences = useMemo(() => {
    return formatAssetDifferencesForBarChart(snapshot.snapshotAssets);
  }, [snapshot]);

  console.log('snapshotDifferences', snapshotDifferences);

  //   const normalisedAssets = useMemo(() => {
  //     return snapshot.snapshotAssets.map((asset) => {
  //       let assetValue: string | number = asset.assetValue;

  //       if (asset.assetCurrency !== 'gbp') {
  //         assetValue = convertAssetToGBPCurrency(asset).toFixed();
  //       }

  //       return {
  //         name: asset.assetName,
  //         value: Number(assetValue),
  //         checked: true,
  //       };
  //     });
  //   }, [snapshot]);

  // const dataSourceOwners = snapshotDifferences.map((asset) => asset.owner);
  //   const dataSourceOwners = snapshotDifferences.map((asset) => asset.owner);
  const dataSourceXAxis = Object.keys(snapshotDifferences).map((difference) =>
    difference.toUpperCase()
  );

  const totals = Object.keys(snapshotDifferences).map((difference) => {
    // @ts-ignore
    return snapshotDifferences[difference].reduce((acc, curr) => {
      return acc + Math.abs(curr.value);
    }, 0);
  });

  const chartOptions = useMemo(
    () => ({
      grid: { containLabel: true },
      legend: {},
      label: {
        show: true,
      },
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, fontSize: 30, padding: 30 },
        data: dataSourceXAxis,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: {},
      series: {
        type: 'bar',
        data: totals,
        colorBy: 'data',
      },
    }),
    [snapshotDifferences]
  );

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      myChart.clear();
      myChart.setOption(chartOptions);
    }
  }, [chartRef, chartOptions]);

  return (
    <Box
      sx={{
        margin: '30px 0',
        padding: '40px 0 20px',
        backgroundColor: 'white',
      }}
    >
      <Typography variant='h4' textAlign='center'>
        Income vs Expenses
      </Typography>
      <Box id='main' style={{ height: '500px' }} ref={chartRef}></Box>
    </Box>
  );
};
