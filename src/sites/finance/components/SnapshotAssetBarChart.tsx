import { Box } from '@mui/system';
import { useEffect, useMemo, useRef } from 'react';
import * as echarts from 'echarts';
import { Snapshot } from '../global/types';
import { convertAssetToGBPCurrency } from '../global/utils';

type SnapshotAssetBarChartProps = {
  snapshot: Snapshot;
};

export const SnapshotAssetBarChart = (props: SnapshotAssetBarChartProps) => {
  const { snapshot } = props;
  const chartRef = useRef(null);

  const dataSource = snapshot.snapshotAssets
    .map((asset) => {
      let assetValue: string | number = asset.assetValue;

      if (asset.assetCurrency !== 'gbp') {
        assetValue = convertAssetToGBPCurrency(asset).toFixed();
        console.log('assetValue', assetValue);
      }

      return [asset.assetName, assetValue];
    })
    .filter((asset) => asset[1] > 1000);

  const legendsData = dataSource.map((source) => source[0]);

  console.log('dataSource', dataSource);
  console.log('legendsData', legendsData);

  const chartOptions = useMemo(
    () => ({
      legend: {
        data: legendsData,
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

  console.log('123', JSON.stringify(chartOptions));

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
