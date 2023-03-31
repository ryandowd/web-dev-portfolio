import { SnapshotTotals } from '@/sites/finance/global/types';

export const formatNumberWithCommas = (value: number) => {
  const isFractional = Number(value) % 1 != 0;
  return isFractional
    ? (Number(value) || value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : (Number(value) || value).toLocaleString();
};

type PieChartData = {
  value: number;
  name: string;
};

export const formatPieChartData = (
  snapshot: { snapshotTotals: { [key: string]: any } },
  valueKey: string
): PieChartData[] => {
  const pieChartData = Object.entries(snapshot.snapshotTotals[valueKey]).map(
    // @ts-ignore
    (totalObj: { current: number; difference: number }[]) => {
      return {
        value: Number(totalObj[1].current).toFixed(2),
        // @ts-ignore
        name: totalObj[0].toUpperCase(),
      };
    }
  );
  // @ts-ignore
  return pieChartData;
};

export const findGBPTotal = (snapshotTotals: SnapshotTotals) => {
  const audInGBPTotal = Number(snapshotTotals.currencies?.aud) || 0;
  const gbpTotal = Number(snapshotTotals.currencies?.gbp) || 0;
  const euroInGBPTotal = Number(snapshotTotals.currencies?.euro) || 0;

  return audInGBPTotal + euroInGBPTotal + gbpTotal;
};
