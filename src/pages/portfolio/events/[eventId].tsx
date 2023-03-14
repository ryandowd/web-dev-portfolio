import { EventUpdatePage } from '@/components/pages/EventUpdatePage';
import { getEvent, connectToDatabase } from '@/utils/db-util';

export default function EventPage(props) {
  return <EventUpdatePage {...props} />;
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const eventId = params.eventId;
  const client = await connectToDatabase();
  const event = await getEvent(eventId, client);

  delete event._id;

  return {
    props: {
      eventDetail: event,
    },
  };
}
