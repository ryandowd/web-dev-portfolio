import { Snapshot } from '@/sites/finance/global/types';

type SnapshotTotalsListProps = {
  snapshots: Snapshot[];
};

export const SnapshotTotalsList = (props: SnapshotTotalsListProps) => {
  console.log('props', props);
  return <h1>Hello</h1>;
};
