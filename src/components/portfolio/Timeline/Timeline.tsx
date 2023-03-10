import { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/react';
import classes from './Timeline.module.scss';
import { EventProps, useTimeline } from './use-timeline';
import Link from 'next/link';

interface TimelineProps {
  events: EventProps[];
  setEvents: (events: EventProps[]) => void;
  deleteEventHandler: (eventId: string) => void;
  createEventFormHandler: (newEvent: EventProps) => void;
}

export const Timeline = (props: TimelineProps) => {
  const [formError, setFormError] = useState<string | null>(null);
  const { events, deleteEventHandler, createEventFormHandler } = props;
  const { data: session } = useSession();

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
      const newEvent: EventProps = {
        eventId: uuid(),
        title: title,
        date: date,
        location: location,
        skills: skills,
        description: description,
      };

      createEventFormHandler(newEvent);
    } else {
      setFormError('Please fill out all fields');
    }
  }

  function removeEventHandler(eventId: string) {
    deleteEventHandler(eventId);
  }

  return (
    <div className={classes.timeline}>
      {session && (
        <form
          className={classes.form}
          onSubmit={(event) => submitFormHandler(event)}
        >
          <h1 className={classes.title}>Add new event</h1>
          <div className={classes.formControl}>
            <label htmlFor='title'>Job Title</label>
            <input type='text' id='title' ref={titleRef} />
          </div>
          <div className={classes.formControl}>
            <label htmlFor='date'>Date</label>
            <input type='text' id='date' ref={dateRef} />
          </div>
          <div className={classes.formControl}>
            <label htmlFor='location'>Location</label>
            <input type='text' id='location' ref={locationRef} />
          </div>
          <div className={classes.formControl}>
            <label htmlFor='skills'>Skills</label>
            <input type='text' id='skills' ref={skillsRef} />
          </div>
          <div className={classes.formControl}>
            <label htmlFor='description'>Description</label>
            <textarea id='description' rows={15} ref={descriptionRef} />
          </div>
          {formError && <p>{formError}</p>}
          <button type='submit'>Add Event</button>
        </form>
      )}
      <div>
        {events &&
          events.map((event: EventProps) => {
            return (
              <div key={event.eventId} className={classes.event}>
                <h1>{event.title}</h1>
                <h2>{event.eventId}</h2>
                <h2>{event.date}</h2>
                <h3>{event.location}</h3>
                <h4>{event.skills}</h4>
                <p>{event.description}</p>
                {session && (
                  <>
                    <button
                      type='button'
                      onClick={() => removeEventHandler(event.eventId)}
                    >
                      Delete event
                    </button>
                    <Link href={`/portfolio/events/${event.eventId}`}>
                      Edit event
                    </Link>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
