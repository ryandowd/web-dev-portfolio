import { Box } from '@mui/system';
import { useEffect, useMemo, useRef } from 'react';
import * as echarts from 'echarts';
import { Snapshot } from '../global/types';
import { convertAssetToCurrentCurrency } from '../global/utils';
import { formatNumberWithCommas } from '../utils';

type SnapshotAssetBarChartProps = {
  snapshot: Snapshot;
};

export const SnapshotAssetBarChart = (props: SnapshotAssetBarChartProps) => {
  const { snapshot } = props;
  const chartRef = useRef(null);

  console.log('snapshot', snapshot);

  const dataSource = snapshot.snapshotAssets
    .map((asset) => {
      let assetValue: string | number = asset.assetValue;

      if (asset.assetCurrency !== 'gbp') {
        assetValue = convertAssetToCurrentCurrency(asset).toFixed();
      }

      return [asset.assetName, assetValue];
    })
    .filter((asset) => asset[1] > 1000);

  const chartOptions = useMemo(
    () => ({
      legend: {
        data: dataSource.map((source) => source[0]),
      },
      label: {
        show: true,
      },
      dataset: [
        {
          dimensions: ['name', 'value'],
          source: dataSource,
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'value', order: 'asc' },
          },
        },
      ],
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: 20, overflow: 'break' },
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
        encode: { x: 'name', y: 'value' },
        datasetIndex: 1,
        colorBy: 'data',
      },
    }),
    [dataSource]
  );

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Draw the chart
      myChart.clear();
      myChart.setOption(chartOptions);

      myChart.on('click', function (params) {
        console.log('123', params);
      });
    }
  }, [chartRef, chartOptions]);

  return (
    <Box id='main' style={{ width: '100%', height: 600 }} ref={chartRef}></Box>
  );
};
