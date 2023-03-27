import { Box } from '@mui/system';
import * as echarts from 'echarts';
import { useEffect, useMemo, useRef } from 'react';
import type { SnapshotWithTotals } from '@/components/finance/global/types';
import { unformatNumberWithCommas } from '@/global/utils';
import dayjs from 'dayjs';

type FinanceDashboardAreaChartProps = {
  snapshotsWithTotals: SnapshotWithTotals[];
};

export const FinanceDashboardAreaChart = (
  props: FinanceDashboardAreaChartProps
) => {
  const { snapshotsWithTotals } = props;
  const chartRef = useRef(null);

  const totals = snapshotsWithTotals
    .map((snapshot) => {
      return unformatNumberWithCommas(snapshot.total);
    })
    .reverse();

  const dates = snapshotsWithTotals
    .map((snapshot) => {
      return dayjs(snapshot.snapshotDate).format('DD MMM YYYY');
    })
    .reverse();

  const owners = ['Ryan', 'Kay', 'Joint'];
  const ownersArray = owners.map((owner) => {
    const _owner = owner.toLowerCase();
    return {
      name: _owner,
      data: snapshotsWithTotals
        .map((snapshot) => {
          return snapshot.snapshotTotals.owners
            ? snapshot.snapshotTotals.owners[_owner]
            : '';
        })
        .reverse(),
    };
  });

  const chartStacks = ownersArray.map((owner) => {
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
    [totals, dates]
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
