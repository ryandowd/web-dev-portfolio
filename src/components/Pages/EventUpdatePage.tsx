import { useRef, useState } from 'react';
import { useTimeline } from '@/components/portfolio/Timeline/use-timeline';
import { EventProps } from '@/types';
import { Container } from '@mui/system';
import { Button, TextareaAutosize, TextField, Typography } from '@mui/material';
import { MutableRefObject } from 'react';
// import { GlobalNav } from '@/components/ui/GlobalNav';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';

interface EventUpdatePageProps {
  eventDetail: EventProps;
}

export const EventUpdatePage = (props: EventUpdatePageProps) => {
  const [formError, setFormError] = useState<string | null>(null);
  const { eventDetail } = props;
  const { updateEventFormHandler } = useTimeline();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const skillsRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const textFieldArray: {
    name: string;
    label: string;
    ref: MutableRefObject<HTMLInputElement | null>;
  }[] = [
    { name: 'title', label: 'Title', ref: titleRef },
    { name: 'startDate', label: 'Start date', ref: startDateRef },
    { name: 'endDate', label: 'End date', ref: endDateRef },
    { name: 'location', label: 'Location', ref: locationRef },
    { name: 'skills', label: 'Skills', ref: skillsRef },
  ];

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError(null);

    const title = titleRef.current?.value;
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;
    const location = locationRef.current?.value;
    const skills = skillsRef.current?.value;
    const description = descriptionRef.current?.value;

    if (title && startDate && endDate && location && skills && description) {
      const updatedEvent: EventProps = {
        eventId: eventDetail.eventId,
        title,
        startDate,
        endDate,
        location,
        skills,
        description,
      };

      updateEventFormHandler(updatedEvent);
    } else {
      setFormError('Please fill out all fields');
    }
  }

  return (
    <>
      {/* <GlobalNav>
        <Link style={{ color: 'white', display: 'flex' }} href='/portfolio'>
          <ArrowBack sx={{ mr: 1 }} />
          Back to Timeline
        </Link>
      </GlobalNav> */}
      <Container component='main' maxWidth='md' sx={{ my: 5 }}>
        <Container
          component='form'
          onSubmit={(event) => submitFormHandler(event)}
        >
          <Typography variant='h5' sx={{ mb: 1 }}>
            Update event for '{eventDetail.title}'
          </Typography>
          {textFieldArray.map((field) => (
            <TextField
              key={eventDetail[field.name]}
              InputLabelProps={{ shrink: !!eventDetail[field.name] }}
              defaultValue={eventDetail[field.name]}
              margin='normal'
              required
              fullWidth
              id={field.name}
              label={field.label}
              name={field.name}
              autoComplete={field.name}
              autoFocus
              inputRef={field.ref}
            />
          ))}
          <TextareaAutosize
            required
            defaultValue={eventDetail.description}
            minRows={7}
            id='description'
            placeholder='Description'
            name='description'
            autoComplete='description'
            autoFocus
            ref={descriptionRef}
            style={{ margin: '15px 0 5px', width: '100%', padding: '15px' }}
          />
          {formError && <Typography variant='body1'>{formError}</Typography>}
          <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
            Update Event
          </Button>
        </Container>
      </Container>
    </>
  );
};
