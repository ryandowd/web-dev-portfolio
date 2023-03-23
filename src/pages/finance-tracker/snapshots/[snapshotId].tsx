import { EventUpdatePage } from '@/components/portfolio/EventUpdatePage';
import { EventProps } from '@/types';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import type { GetStaticPropsContext } from 'next';
import { SnapshotDetailPage } from '@/components/finance/SnapshotDetailPage';

type SnapshotPageProps = {
  snapshotId: string;
};

export default function SnapshotPage(props: SnapshotPageProps) {
  const { snapshotId } = props;

  return <SnapshotDetailPage snapshotId={snapshotId} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      snapshotId: context.params?.snapshotId,
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase('portfolio');
  // const events = await getAllDocuments(client);
  const paths = [{ params: { snapshotId: '123' } }];

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
