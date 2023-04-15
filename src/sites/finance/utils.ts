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

export const formatTotalsForPieChart = (
  snapshotTotals: { [key: string]: any },
  valueKey: string
): PieChartData[] => {
  const pieChartData = Object.entries(snapshotTotals[valueKey]).map(
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

export const formatAssetsForPieChart = (
  snapshotAssets: any
): {
  ryan: any;
  kay: any;
  joint: any;
} => {
  let assetsByOwner = {};

  // @ts-ignore
  snapshotAssets.forEach((ownerAssets) => {
    // @ts-ignore
    if (!assetsByOwner[ownerAssets.assetOwner]) {
      // @ts-ignore
      assetsByOwner[ownerAssets.assetOwner] = [];
    }
    // @ts-ignore
    assetsByOwner[ownerAssets.assetOwner].push({
      name: ownerAssets.assetName.toUpperCase(),
      value: Number(ownerAssets.assetValue).toFixed(2),
    });
  });

  // @ts-ignore
  return assetsByOwner;
};

export const formatAssetDifferencesForBarChart = (snapshotAssets: any) => {
  let assetIncomeAndExpenses = {};

  // @ts-ignore
  snapshotAssets.forEach((ownerAssets) => {
    // @ts-ignore
    if (!assetIncomeAndExpenses['income']) {
      // @ts-ignore
      assetIncomeAndExpenses['income'] = [];
    } else if (Number(ownerAssets.difference) > 0) {
      // @ts-ignore
      assetIncomeAndExpenses['income'].push({
        name: ownerAssets.assetName.toUpperCase(),
        value: Number(ownerAssets.difference).toFixed(2),
        owner: ownerAssets.assetOwner,
      });
    }

    // @ts-ignore
    if (!assetIncomeAndExpenses['expenses']) {
      // @ts-ignore
      assetIncomeAndExpenses['expenses'] = [];
    } else if (Number(ownerAssets.difference) < 0) {
      // @ts-ignore
      assetIncomeAndExpenses['expenses'].push({
        name: ownerAssets.assetName.toUpperCase(),
        value: Number(ownerAssets.difference).toFixed(2),
        owner: ownerAssets.assetOwner,
      });
    }
  });

  return assetIncomeAndExpenses;
};

export const findGBPTotal = (snapshotTotals: SnapshotTotals) => {
  const audInGBPTotal = Number(snapshotTotals.currencies?.aud) || 0;
  const gbpTotal = Number(snapshotTotals.currencies?.gbp) || 0;
  const euroInGBPTotal = Number(snapshotTotals.currencies?.euro) || 0;

  return audInGBPTotal + euroInGBPTotal + gbpTotal;
};
