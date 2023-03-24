import Head from 'next/head';
import { FinanceDashboardPage } from '@/components/finance/FinanceDashboardPage';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import { getAllTotals } from './utils';

export default function FinancePage(props) {
  const { snapshotsTotals } = props;
  return (
    <>
      <Head>
        <title>Finance App</title>
        <meta name='description' content='Finance app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FinanceDashboardPage snapshotsTotals={snapshotsTotals} />
    </>
  );
}

export async function getStaticProps() {
  const client = await connectToDatabase('finance');
  const allSnapshots = await getAllDocuments(client, 'snapshots');

  const snapshots = allSnapshots.map((snapshot: any) => {
    const updatedSnapshot = {
      ...snapshot,
    };

    delete updatedSnapshot._id;
    return updatedSnapshot;
  });

  snapshots.sort((a: any, b: any) => {
    return (
      new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
    );
  });

  const snapshotsTotals = snapshots.map((snapshot) => {
    return getAllTotals(snapshot);
  });

  client.close();

  return {
    props: {
      snapshotsTotals,
    },
    revalidate: 10,
  };
}
