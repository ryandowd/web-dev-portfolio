import { FinanceDashboardPage } from '@/components/finance/FinanceDashboardPage';
import { AssetForm } from '@/components/finance/AssetForm/AssetForm';
import Head from 'next/head';
import { connectToDatabase } from '@/utils/db-util';

export default function FinancePage(props) {
  const { snapshots } = props;
  return (
    <>
      <Head>
        <title>Finance App</title>
        <meta name='description' content='Finance app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FinanceDashboardPage snapshots={snapshots} />
    </>
  );
}

export async function getStaticProps() {
  const client = await connectToDatabase('finance');
  const allSnapshots = await client
    .db()
    .collection('snapshots')
    .find()
    .toArray();
  // const db = client.db();

  // const resultSkills = await db.collection('skills').find().toArray();
  // const skillsList = resultSkills[0]?.skillsList;

  // const resultEvents = await db
  //   .collection('events')
  //   .find()
  //   .sort({ _id: -1 })
  //   .toArray();

  // const eventsList = resultEvents.map((event: any) => {
  //   const updatedEvent = {
  //     ...event,
  //   };

  //   delete updatedEvent._id;
  //   return updatedEvent;
  // });

  console.log('allSnapshots', allSnapshots);

  client.close();

  return {
    props: {
      snapshots: allSnapshots,
    },
    revalidate: 10,
  };
}
