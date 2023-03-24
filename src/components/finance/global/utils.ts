export const findGBPTotal = (snapshotTotals) => {
  const audTotal = snapshotTotals.currencies.aud || 0;
  const gbpTotal = snapshotTotals.currencies.gbp || 0;
  const euroTotal = snapshotTotals.currencies.euro || 0;

  const audToGBP = audTotal * 0.54;
  const euroToGBP = euroTotal * 0.88;

  return audToGBP + euroToGBP + gbpTotal;
};

export const sortByString = (array, valueKey) => {
  const sortedArray = array.sort(function (rowA, rowB) {
    const nameA = rowA[valueKey].toUpperCase();
    const nameB = rowB[valueKey].toUpperCase();

    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });

  return sortedArray;
};

export const sortByNumber = (array, valueKey) => {
  const sortedArray = array.sort(function (rowA, rowB) {
    // console.log('rowA[valueKey]', rowA[valueKey]);
    // console.log('rowB[valueKey]', rowB[valueKey]);
    return Number(rowA[valueKey]) - Number(rowB[valueKey]);
  });
  return sortedArray;
};

export const sortArrayByValue = (array, valueKey) => {
  return isNaN(array[0][valueKey])
    ? sortByString(array, valueKey)
    : sortByNumber(array, valueKey);
};
