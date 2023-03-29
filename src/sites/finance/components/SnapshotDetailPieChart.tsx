import { Box } from '@mui/system';
import * as echarts from 'echarts';
import { useEffect, useMemo, useRef } from 'react';

type SnapshotDetailPieChartProps = {
  owners: { name: string; value: number }[];
  types: { name: string; value: number }[];
  currencies: { name: string; value: number }[];
  showLegend: boolean;
};

export const SnapshotDetailPieChart = (props: SnapshotDetailPieChartProps) => {
  const { owners, types, currencies, showLegend } = props;
  const pieChartRef = useRef(null);

  const pieOptions = useMemo(
    () => ({
      type: 'pie',
      label: {
        position: 'outside',
        formatter: '{name|{b}}\n{percent|{d}%}\n£{value|{c}}',
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

  const titleOptions = useMemo(
    () => ({
      textAlign: 'center',
      textStyle: {
        fontSize: 25,
      },
    }),
    []
  );

  const pieChartOptions = useMemo(
    () => ({
      title: [
        {
          ...titleOptions,
          text: 'Asset',
          left: '25%',
          top: '27%',
        },
        {
          ...titleOptions,
          text: 'Currency',
          left: '74.5%',
          top: '27%',
        },
        {
          ...titleOptions,
          text: 'Owner',
          left: '49.5%',
          top: '72%',
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
          ...pieOptions,
          name: 'Types',
          center: ['25.5%', '30%'],
          data: types,
        },
        {
          ...pieOptions,
          name: 'Owners',
          center: ['50%', '75%'],
          data: owners,
        },
        {
          ...pieOptions,
          name: 'Currencies',
          center: ['75%', '30%'],
          data: currencies,
        },
      ],
    }),
    [showLegend, types, owners, currencies, pieOptions, titleOptions]
  );

  useEffect(() => {
    if (pieChartRef.current) {
      const myChart = echarts.init(pieChartRef.current);
      // Draw the chart
      myChart.clear();
      myChart.setOption(pieChartOptions);
    }
  }, [pieChartRef, showLegend, pieChartOptions]);

  return (
    <Box
      id='main'
      style={{ width: '100%', height: 800 }}
      ref={pieChartRef}
    ></Box>
  );
};
