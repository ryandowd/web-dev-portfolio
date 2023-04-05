import { Box } from '@mui/system';
import { useEffect, useMemo, useRef } from 'react';
import * as echarts from 'echarts';
import { Snapshot } from '../global/types';

import { convertAssetToGBPCurrency } from '../global/utils';
import { Typography } from '@mui/material';

type SnapshotAssetBarChartProps = {
  snapshot: Snapshot;
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

  const dataSourceNames = normalisedAssets.map((asset) => asset.name);
  const dataSourceValues = normalisedAssets.map((asset) => asset.value);

  const chartOptions = useMemo(
    () => ({
      grid: { containLabel: true },
      legend: {},
      label: {
        show: true,
      },
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: 20 },
        data: dataSourceNames,
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
        data: dataSourceValues,
        colorBy: 'data',
      },
    }),
    [dataSourceNames, dataSourceValues]
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
        Assets
      </Typography>
      <Box id='main' style={{ height: '500px' }} ref={chartRef}></Box>
    </Box>
  );
};
