import { Box } from '@mui/system';
import * as echarts from 'echarts';
import { useEffect, useMemo, useRef } from 'react';
import type { SnapshotWithTotals } from '@/components/finance/global/types';

type FinanceDashboardAreaChartProps = {
  snapshotsWithTotals: SnapshotWithTotals[];
};

export const FinanceDashboardAreaChart = (
  props: FinanceDashboardAreaChartProps
) => {
  const { snapshotsWithTotals } = props;

  const totals = snapshotsWithTotals
    .map((snapshot) => parseInt(snapshot.total))
    .reverse();
  const dates = snapshotsWithTotals
    .map((snapshot) => snapshot.snapshotDate)
    .reverse();

  const chartRef = useRef(null);

  const chartOptions = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: totals,
          type: 'line',
          areaStyle: {},
        },
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
