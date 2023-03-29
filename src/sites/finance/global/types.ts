export type SnapshotAssetsField = {
  assetId: string;
  assetName: string;
  assetType: string;
  assetValue: number;
  assetCurrency: string;
  assetOwner: string;
  difference: number;
};

export type SnapshotTotals = {
  owners?: {
    [key: string]: string;
  };
  types?: {
    [key: string]: string;
  };
  currencies?: {
    [key: string]: string;
  };
};

export type Snapshot = {
  total?: number;
  snapshotId: string;
  snapshotDate: string;
  snapshotAssets: SnapshotAssetsField[];
  snapshotTotals?: SnapshotTotals;
};

export type SnapshotWithTotals = {
  snapshotId: string;
  snapshotDate: string;
  snapshotAssets: SnapshotAssetsField[];
  snapshotTotals: SnapshotTotals;
  total?: number;
  monthDifference?: number;
};

export type FieldDetail = {
  name: string;
  hidden?: boolean;
  selectOptions?: {
    [key: string]: string;
  };
};

export type FieldDetails = {
  assetId: FieldDetail;
  assetName: FieldDetail;
  assetType: FieldDetail;
  assetValue: FieldDetail;
  assetCurrency: FieldDetail;
  assetOwner: FieldDetail;
};

export type Currencies = {
  [key: string]: number;
};
