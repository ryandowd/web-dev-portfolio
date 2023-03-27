export type SnapshotAssetsField = {
  assetId: string | null;
  assetName: string | null;
  assetType: string;
  assetValue: number | null;
  assetCurrency: string | null;
  assetOwner: string | null;
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
  total?: string;
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
  total: string;
  monthDifference: number;
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
