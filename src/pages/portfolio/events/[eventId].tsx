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
  const { params, res } = context;

  let client;
  let event;

  try {
    client = await connectToDatabase();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

  try {
    const eventId = params.eventId;
    event = await getEvent(eventId, client);
    delete event._id;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

  return {
    props: {
      eventDetail: event,
    },
  };
}
