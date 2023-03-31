import { Box } from '@mui/system';
import * as echarts from 'echarts';
import { useEffect, useMemo, useRef } from 'react';
import type { Snapshot } from '@/sites/finance/global/types';
import dayjs from 'dayjs';

type FinanceDashboardAreaChartProps = {
  snapshots: Snapshot[];
};

export const FinanceDashboardAreaChart = (
  props: FinanceDashboardAreaChartProps
) => {
  const { snapshots } = props;
  const chartRef = useRef(null);

  const totals = snapshots
    .map((snapshot) => {
      return snapshot.total;
    })
    .reverse();

  const dates = snapshots
    .map((snapshot) => {
      return dayjs(snapshot.snapshotDate).format('DD MMM YYYY');
    })
    .reverse();

  const owners = ['Ryan', 'Kay', 'Joint'];

  // @ts-ignore
  const ownersArray = owners.map((owner) => {
    const _owner = owner.toLowerCase();
    return {
      name: _owner,
      data: snapshots
        .map((snapshot: Snapshot) => {
          // @ts-ignore
          const ownerTotal = snapshot.snapshotTotals.owners[_owner];
          return ownerTotal.current || ownerTotal;
        })
        .reverse(),
    };
  });

  const chartStacks = ownersArray.map((owner: any) => {
    return {
      name: owner.name.charAt(0).toUpperCase() + owner.name.slice(1),
      data: owner.data,
      stack: 'Total',
      type: 'line',
      areaStyle: {
        opacity: 0.8,
      },
    };
  });

  const chartOptions = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisTick: {
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
        interval: 10000,
        axisLabel: {
          formatter: '£{value}',
        },
      },
      legend: {
        data: ['Totals', ...owners],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      series: [
        {
          name: 'Totals',
          data: totals,
          type: 'line',
          areaStyle: {},
        },
        ...chartStacks,
      ],
    }),
    [totals, dates, chartStacks, owners]
  );

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.clear();
      myChart.setOption(chartOptions);
    }
  }, [chartRef, chartOptions]);

  return <Box style={{ width: '100%', height: 500 }} ref={chartRef}></Box>;
};
