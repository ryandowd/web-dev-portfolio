export type SnapshotField = {
  assetId: string | null;
  assetName: string | null;
  assetType: string;
  assetValue: number | null;
  assetCurrency: string | null;
  assetOwner: string | null;
};

export type Snapshot = {
  snapshotId: string;
  snapshotDate: string;
  snapshotAssets: SnapshotField[];
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
