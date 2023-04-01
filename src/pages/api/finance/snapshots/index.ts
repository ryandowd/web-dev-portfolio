import {
  appendAllSnaphotTotals,
  appendMonthTotalDifference,
  appendMonthTotalDifferences,
  appendSnapshotTotal,
  deleteMongoId,
  deleteMongoIds,
  getAssetDifferences,
  getAssetsTotals,
  getTotalAssetTypeDifferences,
  orderSnapshotsByDate,
} from '@/sites/finance/global/server-utils';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const AddSnapshot = req.body.AddSnapshot;
    const client = await connectToDatabase('finance');
    const db = client.db();

    await db.collection('snapshots').insertOne({ ...AddSnapshot });

    client.close();

    res.status(201).json({
      message: 'Successfully updated',
      AddSnapshot,
    });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase('finance');
    const allSnapshots = await getAllDocuments(client, 'snapshots');

    // @ts-ignore
    const deleteSnapshotIds = deleteMongoIds(allSnapshots);
    const orderedSnapshots = orderSnapshotsByDate(deleteSnapshotIds);
    const snapshotsWithTotals = appendAllSnaphotTotals(orderedSnapshots);

    const snapshotsWithTotalDifferences =
      appendMonthTotalDifferences(snapshotsWithTotals);

    const finalSnapshots = snapshotsWithTotalDifferences.map(
      (currSnapshot, snapshotIndex) => {
        const prevSnapshot = snapshotsWithTotalDifferences[snapshotIndex + 1];

        const snapshotTotalsWithDifferences = getTotalAssetTypeDifferences(
          currSnapshot,
          prevSnapshot
        );

        return {
          ...currSnapshot,
          snapshotTotals: snapshotTotalsWithDifferences,
        };
      }
    );

    if (finalSnapshots) {
      res.status(200).json({ snapshots: finalSnapshots });
    } else {
      res.status(404).json({ message: 'Could not find snapshot' });
    }
  }

  // if (req.method === 'GET') {
  //   const client = await connectToDatabase('portfolio');
  //   const db = client.db();
  //   const result = await db
  //     .collection('events')
  //     .find()
  //     .sort({ _id: -1 })
  //     .toArray();

  //   const snapshotsList = result.map((snapshot: any) => {
  //     const updatedSnapshot = {
  //       ...snapshot,
  //       id: snapshot._id.toString(),
  //     };

  //     delete updatedSnapshot._id;

  //     return updatedSnapshot;
  //   });

  //   res.status(200).json({ events: snapshotsList });

  //   client.close();
  // }
}
