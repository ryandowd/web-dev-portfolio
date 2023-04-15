import { exchangeRatesToGBP } from './constants';
import { Snapshot } from './types';

export const appendAssetTypeTotalsDifferences = (snapshots: Snapshot[]) => {
  return snapshots.map((currSnapshot, snapshotIndex) => {
    const prevSnapshot: Snapshot = snapshots[snapshotIndex + 1];

    if (!prevSnapshot) {
      return currSnapshot;
    }

    return {
      ...currSnapshot,
      snapshotTotals: getTotalAssetTypeDifferences(currSnapshot, prevSnapshot),
    };
  });
};

export const getTotalForAssetType = (
  snapshot: Snapshot,
  assetTypeKey: string
) => {
  const total = snapshot.snapshotAssets.reduce((assetTypeTotal, asset) => {
    const assetKey = asset[assetTypeKey as keyof Snapshot['snapshotAssets'][0]];
    let assetValueInGBP = covertCurrencyToGBP(asset);
    // @ts-ignore
    const accValue = assetTypeTotal[assetKey as keyof typeof acc];

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

export const getAssetTotals = (snapshot: Snapshot) => {
  const assetOwnerTotals = getTotalForAssetType(snapshot, 'assetOwner');
  const assetTypeTotals = getTotalForAssetType(snapshot, 'assetType');
  const assetCurrencyTotals = getTotalForAssetType(snapshot, 'assetCurrency');

  return {
    owners: assetOwnerTotals,
    types: assetTypeTotals,
    currencies: assetCurrencyTotals,
  };
};

export const appendAssetTypeTotals = (snapshots: Snapshot[]) => {
  return snapshots.map((snapshot) => {
    return {
      ...snapshot,
      snapshotTotals: getAssetTotals(snapshot),
    };
  });
};

export const appendAssetDifferences = (snapshots: Snapshot[]) => {
  return snapshots.map((currSnapshot, snapshotIndex) => {
    const prevSnapshot: Snapshot = snapshots[snapshotIndex + 1];

    if (!prevSnapshot) {
      return currSnapshot;
    }

    return {
      ...currSnapshot,
      snapshotAssets: getAssetDifferences(prevSnapshot, currSnapshot),
    };
  });
};

export const covertCurrencyToGBP = (asset: any) => {
  const { assetCurrency, assetValue } = asset;
  let assetValueInGBP;

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

  return assetValueInGBP;
};

export const getAssetDifferences = (
  prevSnapshot: Snapshot,
  currSnapshot: Snapshot
) => {
  const prevSnapshotAssets = prevSnapshot.snapshotAssets;
  const currSnapshotAssets = currSnapshot.snapshotAssets;

  const assetDifferences = currSnapshotAssets.map((currAsset) => {
    const prevAsset = prevSnapshotAssets.find(
      (asset) => asset.assetName === currAsset.assetName
    );

    if (!prevAsset) {
      return {
        ...currAsset,
        difference: 0,
      };
    }

    const isCurrencyDifference =
      prevAsset.assetCurrency !== currAsset.assetCurrency;
    const prevAssetValueGBP = covertCurrencyToGBP(prevAsset);
    const currAssetValueGBP = covertCurrencyToGBP(currAsset);

    return {
      ...currAsset,
      difference: isCurrencyDifference
        ? 'currencychange'
        : currAssetValueGBP - prevAssetValueGBP,
    };
  });

  return assetDifferences;
};

export const appendMonthTotalDifference = (snapshots: Snapshot[]) => {
  return snapshots.map((snapshot: Snapshot, index: number) => {
    const prevMonthTotal = snapshots[index + 1]?.total;
    const currMonthTotal = snapshot.total;

    if (!currMonthTotal || !prevMonthTotal) {
      return snapshot;
    }

    return {
      ...snapshot,
      monthDifference: Number(currMonthTotal) - Number(prevMonthTotal),
    };
  });
};

export const getGBPTotal = (snapshotTotals: any) => {
  const audInGBPTotal = Number(snapshotTotals.currencies?.aud) || 0;
  const euroInGBPTotal = Number(snapshotTotals.currencies?.euro) || 0;
  const gbpTotal = Number(snapshotTotals.currencies?.gbp) || 0;

  return audInGBPTotal + euroInGBPTotal + gbpTotal;
};

export const appendSnapshotTotal = (snapshots: Snapshot[]) => {
  return snapshots.map((snapshot) => {
    return {
      ...snapshot,
      total: getGBPTotal(snapshot.snapshotTotals),
    };
  });
};

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

export const orderSnapshotsByDate = (snapshots: Snapshot[]) => {
  return snapshots.sort((a: any, b: any) => {
    return (
      new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
    );
  });
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
    // @ts-ignore
    assetTypesObject[assetKey] = getTotalAssetDifference(
      prevSnapshot,
      assetKey,
      // @ts-ignore
      assetValue
    );
  }

  return assetTypesObject;
};

export const getTotalAssetDifference = (
  prevSnapshot: Snapshot,
  assetTypeName: string,
  assetTypeValue: { [key: string]: string }
) => {
  let assetTypeObject = {};

  for (const [assetKey, assetValue] of Object.entries(assetTypeValue)) {
    // @ts-ignore
    const prevAssetValue = prevSnapshot.snapshotTotals[assetTypeName][assetKey];

    // @ts-ignore
    assetTypeObject[assetKey] = {
      current: assetValue,
      // @ts-ignore
      difference: prevAssetValue ? assetValue - prevAssetValue : 0,
    };
  }

  return assetTypeObject;
};

export const transformSnapshots = (snapshots: Snapshot[]) => {
  let allSnapshots = deleteMongoIds(snapshots);
  allSnapshots = orderSnapshotsByDate(allSnapshots);
  allSnapshots = appendAssetDifferences(allSnapshots);
  allSnapshots = appendAssetTypeTotals(allSnapshots);
  allSnapshots = appendSnapshotTotal(allSnapshots);
  allSnapshots = appendMonthTotalDifference(allSnapshots);
  allSnapshots = appendAssetTypeTotalsDifferences(allSnapshots);

  return allSnapshots;
};
