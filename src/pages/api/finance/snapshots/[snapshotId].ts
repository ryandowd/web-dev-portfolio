import {
  appendMonthTotalDifference,
  appendSnapshotTotal,
  deleteMongoId,
  getAssetDifferences,
  getAssetsTotals,
  getTotalAssetTypeDifferences,
  orderSnapshotsByDate,
} from '@/sites/finance/global/server-utils';
import {
  connectToDatabase,
  getAllDocuments,
  getDocument,
} from '@/utils/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const snapshotId = req.body.snapshotId;
    const client = await connectToDatabase('finance');
    const db = client.db();

    const result = await db.collection('snapshots').deleteOne({ snapshotId });

    res.status(200).json({ message: 'Successfully deleted snapshot', result });
  }

  if (req.method === 'PUT') {
    const updatedSnapshot = req.body.updatedSnapshot;
    const snapshotId = req.body.updatedSnapshot.snapshotId;
    const client = await connectToDatabase('finance');
    const db = client.db();

    const result = await db
      .collection('snapshots')
      .updateOne({ snapshotId }, { $set: { ...updatedSnapshot } });

    res.status(200).json({ message: 'Successfully updated event', result });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase('finance');
    const snapshotId = req.query.snapshotId;
    // const snapshot = await getDocument(
    //   'snapshotId',
    //   snapshotId,
    //   client,
    //   'snapshots'
    // );

    const snapshots = await getAllDocuments(client, 'snapshots');
    // @ts-ignore
    const orderedSnapshots = orderSnapshotsByDate(snapshots);

    client.close();

    // @ts-ignore
    const currSnapshotIndex = snapshots.findIndex((currSnapshot: Snapshot) => {
      return currSnapshot.snapshotId === snapshotId;
    });

    const currSnapshot = orderedSnapshots[currSnapshotIndex];
    const currDeleteMongoId = deleteMongoId(currSnapshot);
    const currSnapshotWithAssetTotals = getAssetsTotals(currDeleteMongoId);
    const currSnapshotWithTotal = appendSnapshotTotal(
      currSnapshotWithAssetTotals
    );

    // @TODO: This is horrible. Figure out a better way to skip over this
    // if there is no previous snapshot.
    const prevSnapshot =
      orderedSnapshots[currSnapshotIndex + 1] || currSnapshotWithTotal;

    const prevSnapshotWithAssetTotals = getAssetsTotals(prevSnapshot);
    const prevSnapshotTotal = appendSnapshotTotal(prevSnapshotWithAssetTotals);

    const currSnapshotWithMonthTotalDifference = appendMonthTotalDifference(
      currSnapshotWithTotal,
      prevSnapshotTotal.total
    );

    const snapshotTotalsWithDifferences = getTotalAssetTypeDifferences(
      currSnapshotWithMonthTotalDifference,
      prevSnapshotWithAssetTotals
    );

    const snapshotAssetsWithDifferences = getAssetDifferences(
      currSnapshotWithMonthTotalDifference,
      prevSnapshot
    );

    const snapshot = {
      ...currSnapshotWithMonthTotalDifference,
      snapshotTotals: snapshotTotalsWithDifferences,
      snapshotAssets: snapshotAssetsWithDifferences,
    };

    if (snapshot) {
      res.status(200).json({ snapshot });
    } else {
      res.status(404).json({ message: 'Could not find snapshot' });
    }
  }
}
