import { EventUpdatePage } from '@/components/pages/EventUpdatePage';
import { getEvent, connectToDatabase } from '@/utils/db-util';
import { EventProps } from '@/types';

interface EventPageProps {
  eventDetail: EventProps;
}

export default function EventPage(props: EventPageProps) {
  return <EventUpdatePage {...props} />;
}

export async function getServerSideProps(context: any) {
  const { params } = context;

  console.log('params', JSON.stringify(params, null, 2));
  const eventId = params.eventId;
  const client = await connectToDatabase();

  console.log('client', JSON.stringify(client, null, 2));

  const event = await getEvent(eventId, client);

  console.log('event', JSON.stringify(event, null, 2));

  delete event._id;

  return {
    props: {
      eventDetail: event,
    },
  };
}
