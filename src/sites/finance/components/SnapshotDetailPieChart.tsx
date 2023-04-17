import { Box } from '@mui/system';
import * as echarts from 'echarts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Snapshot } from '../global/types';
import {
  formatAssetsForPieChart,
  formatTotalsForPieChart,
} from '@/sites/finance/utils';
import { Button } from '@mui/material';
import { normaliseSnapshotAssetsToGBP } from '../global/utils';

type SnapshotDetailPieChartProps = {
  snapshot: Snapshot;
};

export const SnapshotDetailPieChart = (props: SnapshotDetailPieChartProps) => {
  const { snapshot } = props;
  const chartRef = useRef(null);
  const [showLegend, setShowLegend] = useState(false);

  const normalisedAssets = normaliseSnapshotAssetsToGBP(
    snapshot.snapshotAssets
  );

  const owners = formatTotalsForPieChart(snapshot.snapshotTotals, 'owners');
  const types = formatTotalsForPieChart(snapshot.snapshotTotals, 'types');
  const currencies = formatTotalsForPieChart(
    snapshot.snapshotTotals,
    'currencies'
  );

  const ryan = formatAssetsForPieChart(normalisedAssets).ryan;
  const kay = formatAssetsForPieChart(normalisedAssets).kay;

  const seriesOptions = useMemo(
    () => ({
      type: 'pie',
      label: {
        position: 'outside',
        formatter: `{name|{b}}\n{percent|{d}%}\n£{value|{c}}`,
        rich: {
          name: {
            fontSize: '1.3rem',
          },
          value: {
            fontSize: '1rem',
          },
          percent: {
            fontSize: '1rem',
            fontWeight: 'bold',
          },
        },
      },
      radius: ['90px', '150px'],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    }),
    []
  );

  const titleOptions = {
    textAlign: 'center',
    textStyle: {
      fontSize: 25,
    },
  };

  const chartOptions = useMemo(
    () => ({
      title: [
        {
          ...titleOptions,
          text: 'Asset',
          left: '24.5%',
          top: '13%',
        },
        {
          ...titleOptions,
          text: 'Currency',
          left: '75%',
          top: '13%',
        },
        {
          ...titleOptions,
          text: 'Owner',
          left: '49.5%',
          top: '43%',
        },
        {
          ...titleOptions,
          text: 'Kay',
          left: '24.5%',
          top: '78.5%',
        },
        {
          ...titleOptions,
          text: 'Ryan',
          left: '74.5%',
          top: '78.5%',
        },
      ],
      tooltip: {
        trigger: 'item',
      },
      legend: showLegend
        ? [
            {
              data: types,
              orient: 'horizontal',
              top: 0,
              left: 0,
            },
            {
              data: owners,
              orient: 'horizontal',
              left: '38%',
              bottom: 0,
            },
            {
              data: currencies,
              orient: 'horizontal',
              left: 'right',
            },
          ]
        : [],
      series: [
        {
          ...seriesOptions,
          name: 'Types',
          center: ['25%', '15%'],
          data: types,
        },
        {
          ...seriesOptions,
          name: 'Currencies',
          center: ['75%', '15%'],
          data: currencies,
        },
        {
          ...seriesOptions,
          name: 'Owners',
          center: ['50%', '45%'],
          data: owners,
        },
        {
          ...seriesOptions,
          name: 'Currencies',
          center: ['75%', '80%'],
          data: ryan,
        },
        {
          ...seriesOptions,
          name: 'Currencies',
          center: ['25%', '80%'],
          data: kay,
        },
      ],
    }),
    [
      showLegend,
      types,
      owners,
      currencies,
      seriesOptions,
      kay,
      ryan,
      titleOptions,
    ]
  );

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.clear();
      myChart.setOption(chartOptions);
    }
  }, [chartRef, showLegend, chartOptions]);

  return (
    <Box
      sx={{
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Button
        variant='contained'
        onClick={() => setShowLegend((prevState) => !prevState)}
        sx={{ width: '200px' }}
      >
        Toggle Legend
      </Button>
      <Box
        id='main'
        style={{ width: '100%', height: 1200 }}
        ref={chartRef}
      ></Box>
    </Box>
  );
};
