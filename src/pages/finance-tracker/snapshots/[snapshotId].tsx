import {
  connectToDatabase,
  getAllDocuments,
  getDocument,
} from '@/utils/db-util';
import type { GetStaticPropsContext } from 'next';
import {
  SnapshotAssetsField,
  SnapshotWithTotals,
} from '@/sites/finance/global/types';
import { SnapshotDetailPage } from '@/sites/finance/components/SnapshotDetailPage';
import {
  convertAssetToCurrentCurrency,
  findGBPTotal,
  getAllTotals,
  getMonthDifference,
} from '@/sites/finance/utils';

type SnapshotPageProps = {
  snapshot: SnapshotWithTotals;
};

export default function SnapshotPage(props: SnapshotPageProps) {
  const { snapshot } = props;

  return <SnapshotDetailPage snapshot={snapshot} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const snapshotId = context.params?.snapshotId;

  const client = await connectToDatabase('finance');
  const snapshots = await getAllDocuments(client, 'snapshots');
  const snapshot = await getDocument(
    'snapshotId',
    snapshotId,
    client,
    'snapshots'
  );

  client.close();

  const currSnapshotIndex = snapshots.findIndex(
    (currSnapshot: SnapshotWithTotals) => {
      return currSnapshot.snapshotId === snapshotId;
    }
  );

  const prevSnapshot = snapshots[currSnapshotIndex + 1];
  // const prevMonthWithTotal = {
  //   ...prevSnapshot,
  //   total: findGBPTotal(prevSnapshot.snapshotTotals),
  // };

  const snapshotWithTotalAssets: SnapshotWithTotals = getAllTotals(snapshot);
  const prevMonthWithTotalAssets: SnapshotWithTotals =
    getAllTotals(prevSnapshot);

  const assetsWithDifferences = snapshotWithTotalAssets.snapshotAssets.map(
    (currSnapshotAsset: any) => {
      let difference = 0;
      const matchingAsset = prevSnapshot.snapshotAssets.find(
        (prevAsset: SnapshotAssetsField) => {
          return prevAsset.assetName === currSnapshotAsset.assetName;
        }
      );

      if (matchingAsset) {
        const isMatchingCurrency =
          currSnapshotAsset.assetCurrency === matchingAsset.assetCurrency;

        const prevAssetValue = isMatchingCurrency
          ? matchingAsset.assetValue
          : convertAssetToCurrentCurrency(
              matchingAsset,
              currSnapshotAsset.assetCurrency
            ).assetValue;

        const currAssetValue = currSnapshotAsset.assetValue;

        difference = currAssetValue - prevAssetValue;
      }

      currSnapshotAsset.difference = difference;

      return currSnapshotAsset;
    }
  );

  const currentSnapshot = {
    ...snapshotWithTotalAssets,
    snapshotAssets: assetsWithDifferences,
    total: findGBPTotal(snapshotWithTotalAssets.snapshotTotals),
  };

  const finalSnapshot = {
    ...currentSnapshot,
    monthDifference: getMonthDifference(
      currentSnapshot,
      findGBPTotal(prevMonthWithTotalAssets.snapshotTotals)
    ),
  };

  //  owners: {
  //   '0': { kay: 46014 },
  //   '1': { joint: 45011 },
  //   '2': { ryan: 48282.15 }
  // },
  // types: { money: 98160.88, shares: 13827, crypto: 5594.27, business: 21725 },
  // currencies: { gbp: 139307.15000000002 }

  const updatedOwnerTotals = finalSnapshot.snapshotTotals.owners
    ? Object.entries(finalSnapshot.snapshotTotals.owners).map((owner: any) => {
        return {
          [owner[0]]: owner[1],
        };
      })
    : {};

  console.log('updatedOwnerTotals', updatedOwnerTotals);

  const updatedSnapshot = {
    ...finalSnapshot,
    snapshotTotals: {
      ...finalSnapshot.snapshotTotals,
      // owners: { updatedOwnerTotals },
      // ...Object.entries(finalSnapshot.snapshotTotals).map((total: any) => {
      //   return {
      //     ...Object.entries(total[1]).map((currTotal: any) => {
      //       return {
      //         current: currTotal,
      //         difference: currTotal.current - currTotal.prev || 0,
      //       };
      //     }),

      //     // current: ,
      //     // difference:
      //     //   prevSnapshot.snapshotTotals[total[0]][1] - total[1] || 0,
      //     // },
      //   };
      // }),
    },
  };

  // console.log('updatedSnapshot', updatedSnapshot.snapshotTotals);
  // console.log('finalSnapshot', finalSnapshot);

  return {
    props: {
      snapshot: finalSnapshot,
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase('finance');
  const snapshots = await getAllDocuments(client, 'snapshots');

  client.close();

  const paths = snapshots.map((snapshot: SnapshotWithTotals) => ({
    params: { snapshotId: snapshot.snapshotId },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
