import { Box } from '@mui/system';
import { useEffect, useMemo, useRef } from 'react';
import * as echarts from 'echarts';
import { Snapshot } from '../global/types';

import { normaliseSnapshotAssetsToGBP } from '../global/utils';
import { Typography } from '@mui/material';
import { formatAssetDifferencesForBarChart } from '../utils';

type SnapshotAssetBarChartProps = {
  snapshot: Snapshot;
};

export const SnapshotDifferenceTotals = (props: SnapshotAssetBarChartProps) => {
  const { snapshot } = props;
  const chartRef = useRef(null);

  const snapshotDifferences = useMemo(() => {
    const normalisedAssets = normaliseSnapshotAssetsToGBP(
      snapshot.snapshotAssets
    );
    return formatAssetDifferencesForBarChart(normalisedAssets);
  }, [snapshot]);

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
        label: {
          fontSize: 30,
          formatter: '£{c}',
        },
        data: [
          {
            value: totals[0].toFixed(2),
            itemStyle: {
              color: '#00b144',
            },
          },
          {
            value: totals[1].toFixed(2),
            itemStyle: {
              color: '#a90000',
            },
          },
        ],
        colorBy: 'data',
      },
    }),
    [snapshotDifferences, dataSourceXAxis, totals]
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
