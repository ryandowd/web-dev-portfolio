import Head from 'next/head';
import { FinanceDashboardPage } from '@/sites/finance/components/FinanceDashboardPage';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import { Snapshot } from '@/sites/finance/global/types';
import { transformSnapshots } from '@/sites/finance/global/server-utils';
import { getSession } from 'next-auth/react';
import type { GetServerSidePropsContext } from 'next';

type FinancePageProps = {
  snapshots: Snapshot[];
};

export default function FinancePage(props: FinancePageProps) {
  const { snapshots } = props;

  return (
    <>
      <Head>
        <title>Finance App</title>
        <meta name='description' content='Finance app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hello</h1>
      {/* <FinanceDashboardPage snapshots={snapshots} /> */}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('here');

  // const session = await getSession({ req: context.req });
  // const user = session?.user as any;
  // const role = user?.role;

  // if (!role) {
  //   return {
  //     redirect: {
  //       destination: '/auth/signin',
  //     },
  //   };
  // }

  // const client = await connectToDatabase('finance');
  // const allSnapshots = await getAllDocuments(client, 'snapshots');
  // @ts-ignore
  // const transformedSnapshots = transformSnapshots(allSnapshots);

  // client.close();

  return {
    props: {
      snapshots: [],
      // snapshots: transformedSnapshots,
    },
  };
}
