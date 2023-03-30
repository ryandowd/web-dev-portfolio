import { findGBPTotal } from '../utils';
import { exchangeRatesToGBP } from './constants';
import { Snapshot, SnapshotAssetsField } from './types';

export const deleteMongoIds = (documents: Snapshot[]) => {
  return documents.map((snapshot: any) => {
    return deleteMongoId(snapshot);
  });
};

export const deleteMongoId = (document: Snapshot) => {
  delete document._id;
  return document;
};

export const convertAUDtoGBP = (value: number) => {
  return value * exchangeRatesToGBP.AUD;
};

export const convertEUROtoGBP = (value: number) => {
  return value * exchangeRatesToGBP.EURO;
};

export const getAssetTypeTotals = (
  snapshot: Snapshot,
  assetTypeKey: string
) => {
  const total = snapshot.snapshotAssets.reduce((assetTypeTotal, asset) => {
    const { assetValue, assetCurrency } = asset;
    const assetKey = asset[assetTypeKey as keyof Snapshot['snapshotAssets'][0]];
    let assetValueInGBP;
    const accValue = assetTypeTotal[assetKey as keyof typeof acc];

    // Normalise currency to GBP
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
      assetTypeTotal[assetKey] = assetValueInGBP;
    } else {
      // @ts-ignore
      assetTypeTotal[assetKey] += assetValueInGBP;
    }

    return assetTypeTotal;
  }, {});

  return total;
};

export const getAssetsTotals = (snapshot: Snapshot) => {
  const assetOwnerTotals = getAssetTypeTotals(snapshot, 'assetOwner');
  const assetTypeTotals = getAssetTypeTotals(snapshot, 'assetType');
  const assetCurrencyTotals = getAssetTypeTotals(snapshot, 'assetCurrency');

  return {
    ...snapshot,
    snapshotTotals: {
      owners: assetOwnerTotals,
      types: assetTypeTotals,
      currencies: assetCurrencyTotals,
    },
  };
};

export const orderSnapshotsByDate = (snapshots: Snapshot[]) => {
  return snapshots.sort((a: any, b: any) => {
    return (
      new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
    );
  });
};

export const appendAllSnaphotTotals = (snapshots: Snapshot[]) => {
  return snapshots.map((snapshot: Snapshot) => {
    return appendSnapshotTotal(snapshot);
  });
};

export const appendSnapshotTotal = (snapshot: Snapshot) => {
  const snapshotWithTotals = getAssetsTotals(snapshot);

  // console.log(
  //   'snapshotWithTotals.snapshotTotals',
  //   snapshotWithTotals.snapshotTotals
  // );

  return {
    ...snapshotWithTotals,
    total: findGBPTotal(snapshotWithTotals.snapshotTotals),
  };
};

export const appendMonthTotalDifferences = (snapshots: Snapshot[]) => {
  return snapshots.map((snapshot: Snapshot, index: number) => {
    const prevMonthTotal = snapshots[index + 1]?.total;
    return appendMonthTotalDifference(snapshot, prevMonthTotal);
  });
};

export const appendMonthTotalDifference = (
  currSnapshot: Snapshot,
  prevMonthTotal: number
) => {
  return {
    ...currSnapshot,
    monthDifference: getMonthTotalDifference(currSnapshot, prevMonthTotal),
  };
};

export const getMonthTotalDifference = (
  currentSnapshot: Snapshot,
  prevMonthTotal: number
) => {
  const difference = currentSnapshot?.total - prevMonthTotal;
  return difference;
};

export const getAssetDifferences = (
  currSnapshot: Snapshot,
  prevSnapshot: Snapshot
): SnapshotAssetsField[] => {
  return currSnapshot.snapshotAssets.map((currSnapshotAsset: any) => {
    let difference = 0;
    const matchingAsset = prevSnapshot.snapshotAssets.find(
      (prevAsset: SnapshotAssetsField) => {
        return prevAsset.assetName === currSnapshotAsset.assetName;
      }
    );

    if (matchingAsset) {
      const isMatchingCurrency =
        currSnapshotAsset.assetCurrency === matchingAsset.assetCurrency;

      const prevAssetValue = matchingAsset.assetValue;
      const currAssetValue = currSnapshotAsset.assetValue;

      // isMatchingCurrency
      //   ? matchingAsset.assetValue
      //   : convertAssetToCurrentCurrency(
      //       matchingAsset,
      //       currSnapshotAsset.assetCurrency
      //     ).assetValue;

      difference = isMatchingCurrency
        ? currAssetValue - prevAssetValue
        : 'nomatch';
    }

    currSnapshotAsset.difference = difference;

    return currSnapshotAsset;
  });
};

export const getTotalAssetDifference = (
  prevSnapshot: Snapshot,
  assetTypeName: string,
  assetTypeValue: { [key: string]: string }
) => {
  let assetTypeObject = {};

  for (const [assetKey, assetValue] of Object.entries(assetTypeValue)) {
    const prevAssetValue = prevSnapshot.snapshotTotals[assetTypeName][assetKey];

    assetTypeObject[assetKey] = {
      current: assetValue,
      difference: prevAssetValue ? assetValue - prevAssetValue : 0,
    };
  }

  return assetTypeObject;
};

export const getTotalAssetTypeDifferences = (
  currSnapshot: Snapshot,
  prevSnapshot: Snapshot
) => {
  let assetTypesObject = {};

  if (!prevSnapshot) {
    return currSnapshot.snapshotTotals;
  }

  for (const [assetKey, assetValue] of Object.entries(
    currSnapshot.snapshotTotals
  )) {
    assetTypesObject[assetKey] = getTotalAssetDifference(
      prevSnapshot,
      assetKey,
      assetValue
    );
  }

  return assetTypesObject;
};
