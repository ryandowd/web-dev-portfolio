import { SnapshotAssetsField } from './types';

export const sortByString = (
  array: SnapshotAssetsField[],
  valueKey: string
) => {
  console.log('array', array);
  const sortedArray = array.sort(function (rowA, rowB) {
    const nameA = rowA[valueKey as keyof SnapshotAssetsField];
    const nameB = rowB[valueKey as keyof SnapshotAssetsField];

    const nameAString = typeof nameA === 'string' ? nameA.toLowerCase() : nameA;
    const nameBString = typeof nameB === 'string' ? nameB.toLowerCase() : nameB;

    if (nameAString && nameBString) {
      if (nameAString > nameBString) {
        return -1;
      }
      if (nameAString < nameBString) {
        return 1;
      }
    }
    return 0;
  });

  return sortedArray;
};

export const sortByNumber = (
  array: SnapshotAssetsField[],
  valueKey: string
) => {
  const sortedArray = array.sort(function (rowA, rowB) {
    return (
      Number(rowA[valueKey as keyof SnapshotAssetsField]) -
      Number(rowB[valueKey as keyof SnapshotAssetsField])
    );
  });
  return sortedArray;
};

export const sortArrayByValue = (
  array: SnapshotAssetsField[],
  valueKey: string
) => {
  const thingy = array[0][valueKey as keyof SnapshotAssetsField] as any;
  return isNaN(thingy)
    ? sortByString(array, valueKey)
    : sortByNumber(array, valueKey);
};

export const formatNumber = (string: string) => {
  const number = Number(string).toFixed(2);
  return Number(number).toLocaleString();
};
