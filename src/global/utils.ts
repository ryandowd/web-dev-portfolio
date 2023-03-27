import { exchangeRatesToGBP } from '@/components/finance/global/constants';
import {
  SnapshotTotals,
  SnapshotWithTotals,
} from '@/components/finance/global/types';

export const formatNumberWithCommas = (value: number | string) => {
  return value
    ? typeof value === 'number'
      ? value.toLocaleString()
      : value
    : 0;
};

export const unformatNumberWithCommas = (value: string) => {
  return value ? value.replaceAll(',', '') : 0;
};

export const convertAUDtoGBP = (value: number) => {
  return value * exchangeRatesToGBP.AUD;
};

export const convertEUROtoGBP = (value: number) => {
  return value * exchangeRatesToGBP.EURO;
};

export const getTotals = (snapshot: SnapshotWithTotals, objKey: string) => {
  const total = snapshot.snapshotAssets.reduce((acc, current) => {
    const { assetValue, assetCurrency } = current;
    const assetKey =
      current[objKey as keyof SnapshotWithTotals['snapshotAssets'][0]];
    let assetValueInGBP;
    const accValue = acc[assetKey as keyof typeof acc];

    switch (assetCurrency) {
      case 'aud':
        assetValueInGBP = convertAUDtoGBP(Number(assetValue));
        break;
      case 'euro':
        assetValueInGBP = convertEUROtoGBP(Number(assetValue));
        break;
      default:
        assetValueInGBP = Number(assetValue);
    }

    if (!accValue) {
      // @ts-ignore
      acc[assetKey] = assetValueInGBP;
    } else {
      // @ts-ignore
      acc[assetKey] += assetValueInGBP;
    }

    return acc;
  }, {});

  return total;
};

export const getAllTotals = (snapshot: SnapshotWithTotals) => {
  const assetOwnerTotals = getTotals(snapshot, 'assetOwner');
  const assetTypeTotals = getTotals(snapshot, 'assetType');
  const assetCurrencyTotals = getTotals(snapshot, 'assetCurrency');

  return {
    snapshotId: snapshot.snapshotId,
    snapshotDate: snapshot.snapshotDate,
    snapshotAssets: snapshot.snapshotAssets,
    snapshotTotals: {
      owners: assetOwnerTotals,
      types: assetTypeTotals,
      currencies: assetCurrencyTotals,
    },
  };
};

export const getMonthDifference = (
  currentSnapshot: SnapshotWithTotals,
  prevMonthTotal: string
) => {
  if (!prevMonthTotal) return 0;

  const currentDollarAmount: number = parseFloat(
    currentSnapshot.total.replaceAll(',', '')
  );
  const _prevMonthTotal = parseFloat(prevMonthTotal.replaceAll(',', ''));
  const difference = currentDollarAmount - _prevMonthTotal;
  console.log('difference', difference);

  return difference;
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
    (totalObj) => {
      return {
        value: Number(totalObj[1]).toFixed(2),
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

  return (audInGBPTotal + euroInGBPTotal + gbpTotal).toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
};
