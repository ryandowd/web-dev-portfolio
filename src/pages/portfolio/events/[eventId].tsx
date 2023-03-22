import { EventUpdatePage } from '@/components/portfolio/EventUpdatePage';
import { EventProps } from '@/types';
import { connectToDatabase, getAllEvents } from '@/utils/db-util';
import type { GetStaticPropsContext } from 'next';

type EventPageProps = {
  eventId: string;
};

export default function EventPage(props: EventPageProps) {
  const { eventId } = props;
  return <EventUpdatePage eventId={eventId} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      eventId: context.params?.eventId,
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase('portfolio');
  const events = await getAllEvents(client);

  const paths = events.map((event: EventProps) => ({
    params: { eventId: event.eventId },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
