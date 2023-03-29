import { exchangeRatesToGBP } from '@/sites/finance/global/constants';
import {
  Currencies,
  SnapshotAssetsField,
  SnapshotTotals,
  SnapshotWithTotals,
} from '@/sites/finance/global/types';

export const formatNumberWithCommas = (value: number | string) => {
  return value
    ? typeof value === 'number'
      ? value.toLocaleString(undefined, { minimumFractionDigits: 2 })
      : value
    : 0;
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
  prevMonthTotal: number
) => {
  if (!prevMonthTotal) return 0;
  const difference = currentSnapshot.total - prevMonthTotal;
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

  return audInGBPTotal + euroInGBPTotal + gbpTotal;
};

export const convertAssetToCurrentCurrency = (
  asset: SnapshotAssetsField,
  assetCurrency: string
): SnapshotAssetsField => {
  const assetValueInCurrency =
    asset.assetValue *
    exchangeRatesToGBP[assetCurrency.toUpperCase() as keyof Currencies];

  console.log('assetValueInCurrency', assetValueInCurrency);

  const thingy = {
    ...asset,
    assetValue: assetValueInCurrency,
  };

  return thingy;
};
