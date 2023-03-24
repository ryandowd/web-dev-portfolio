export const getTotals = (snapshot, objKey) => {
  const total = snapshot.snapshotAssets.reduce((acc, current) => {
    const { assetValue } = current;
    const valueKey = current[objKey];

    if (!acc[valueKey]) {
      acc[valueKey] = Number(assetValue);
    } else {
      acc[valueKey] += Number(assetValue);
    }
    return acc;
  }, {});

  return total;
};

export const getAllTotals = (snapshot) => {
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
