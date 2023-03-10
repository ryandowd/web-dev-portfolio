import { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/react';
import classes from '@/components/Portfolio/Timeline/Timeline.module.scss';
import {
  EventProps,
  useTimeline,
} from '@/components/Portfolio/Timeline/use-timeline';
// import Link from 'next/link';
import { getEvent, connectToDatabase } from '@/lib/db-util';
import Link from 'next/link';

export default function EventPage(props) {
  const [formError, setFormError] = useState<string | null>(null);
  const { eventDetail } = props;
  const { data: session } = useSession();
  const { updateEventFormHandler } = useTimeline();

  console.log('event FROM SERVER RENDER', eventDetail);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const skillsRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError(null);

    const title = titleRef.current?.value;
    const date = dateRef.current?.value;
    const location = locationRef.current?.value;
    const skills = skillsRef.current?.value;
    const description = descriptionRef.current?.value;

    if (title && date && location && skills && description) {
      const updatedEvent = {
        eventId: eventDetail.eventId,
        title: title,
        date: date,
        location: location,
        skills: skills,
        description: description,
      };

      updateEventFormHandler(updatedEvent);
    } else {
      setFormError('Please fill out all fields');
    }
  }

  return (
    <main>
      <Link href='/portfolio'>Back to timeline</Link>
      <h1>Event Page</h1>
      <form
        className={classes.form}
        onSubmit={(event) => submitFormHandler(event)}
      >
        <h1 className={classes.title}>Add new event</h1>
        <div className={classes.formControl}>
          <label htmlFor='title'>Job Title</label>
          <input
            type='text'
            id='title'
            ref={titleRef}
            defaultValue={eventDetail.title}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor='date'>Date</label>
          <input
            type='text'
            id='date'
            ref={dateRef}
            defaultValue={eventDetail.date}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            id='location'
            ref={locationRef}
            defaultValue={eventDetail.location}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor='skills'>Skills</label>
          <input
            type='text'
            id='skills'
            ref={skillsRef}
            defaultValue={eventDetail.skills}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            rows={15}
            ref={descriptionRef}
            defaultValue={eventDetail.description}
          />
        </div>
        {formError && <p>{formError}</p>}
        <button type='submit'>Update Event</button>
      </form>
    </main>
  );
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
