import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { EventProps, FormFieldProps } from 'src/types';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import { EventForm } from '../EventForm/EventForm';

interface TimelineAddEventFormProps {
  createEventFormHandler: (newEvent: EventProps) => void;
  isLoadingMutate: boolean;
  isSuccessMutate: boolean;
  setEvents: (events: EventProps[]) => void;
}

export const TimelineAddEventForm = (props: TimelineAddEventFormProps) => {
  const [hideForm, setHideForm] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | null>(null);
  const theme = useTheme();
  const {
    setEvents,
    createEventFormHandler,
    isLoadingMutate,
    isSuccessMutate,
  } = props;

  useEffect(() => {
    if (isSuccessMutate) {
      setHideForm(true);
    }
  }, [isSuccessMutate]);

  // const titleRef = useRef<HTMLInputElement | null>(null);
  // const logoRef = useRef<HTMLInputElement | null>(null);
  // const startDateRef = useRef<HTMLInputElement | null>(null);
  // const endDateRef = useRef<HTMLInputElement | null>(null);
  // const locationRef = useRef<HTMLInputElement | null>(null);
  // const skillsRef = useRef<HTMLInputElement | null>(null);
  // const descriptionRef = useRef<HTMLInputElement | null>(null);

  const formFields: FormFieldProps[] = [
    { name: 'title', label: 'Title' },
    { name: 'logo', label: 'Logo' },
    { name: 'startDate', label: 'Start date' },
    { name: 'endDate', label: 'End date' },
    { name: 'location', label: 'Location' },
    { name: 'skills', label: 'Skills' },
    {
      name: 'description',
      label: 'Description',
      extraProps: {
        minRows: 7,
        style: { margin: '15px 0 5px', width: '100%' },
        multiline: true,
      },
    },
  ];

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    const formData = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    );

    event.preventDefault();

    // setFormError(null);

    // const title = titleRef.current?.value?.trim();
    // const logo = logoRef.current?.value?.trim();
    // const startDate = startDateRef.current?.value?.trim();
    // const endDate = endDateRef.current?.value?.trim();
    // const location = locationRef.current?.value?.trim();
    // const skills = skillsRef.current?.value?.trim();
    // const description = descriptionRef.current?.value?.trim();

    const newEvent: EventProps = {
      eventId: uuid(),
      title: formData.title as string,
      logo: formData.logo as string,
      startDate: formData.startDate as string,
      endDate: formData.endDate as string,
      location: formData.location as string,
      skills: formData.skills as string,
      description: formData.description as string,
    };

    // setIsUpdating(true);
    createEventFormHandler(newEvent);
  }

  // async function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   setFormError(null);

  //   const title = titleRef.current?.value;
  //   const logo = logoRef.current?.value;
  //   const startDate = startDateRef.current?.value;
  //   const endDate = endDateRef.current?.value;
  //   const location = locationRef.current?.value;
  //   const skills = skillsRef.current?.value;
  //   const description = descriptionRef.current?.value;

  //   if (title && startDate && endDate && location && skills && description) {
  //     const newEvent: EventProps = {
  //       eventId: uuid(),
  //       title,
  //       logo,
  //       startDate,
  //       endDate,
  //       location,
  //       skills,
  //       description,
  //     };
  //     createEventFormHandler(newEvent);
  //   }
  // }

  function closeFormHandler() {
    setHideForm(true);
  }

  if (hideForm || isLoadingMutate) {
    return (
      <Button
        variant='contained'
        onClick={() => setHideForm(false)}
        disabled={isLoadingMutate}
        sx={{ marginBottom: '60px' }}
      >
        Add new event
      </Button>
    );
  }

  return (
    <Box
      sx={{
        width: '80%',
        mb: 10,
        border: `1px solid ${theme.palette.primary.main}`,
        padding: '30px 20px 40px',
      }}
    >
      <IconButton>
        <CancelIcon onClick={closeFormHandler} />
      </IconButton>
      <Typography variant='h5' sx={{ mb: 1, textAlign: 'center' }}>
        Add new event
      </Typography>
      <EventForm
        submitFormHandler={submitFormHandler}
        formFields={formFields}
      />
      {/* <Container
        component='form'
        onSubmit={(event: any) => submitFormHandler(event)}
      >
        
        <Typography variant='h5' sx={{ mb: 1 }}>
          Add new event
        </Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='title'
          label='Job Title'
          name='title'
          autoFocus
          inputRef={titleRef}
        />
        <TextField
          margin='normal'
          fullWidth
          id='logo'
          label='Logo name'
          name='logo'
          autoFocus
          inputRef={logoRef}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='startDate'
          label='Start Date'
          name='startDate'
          autoFocus
          inputRef={startDateRef}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='endDate'
          label='End Date'
          name='endDate'
          autoFocus
          inputRef={endDateRef}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='location'
          label='Location'
          name='location'
          autoFocus
          inputRef={locationRef}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='skills'
          label='Skills'
          name='skills'
          autoFocus
          inputRef={skillsRef}
        />
        <TextField
          multiline
          required
          minRows={7}
          id='description'
          label='Description'
          name='description'
          autoFocus
          ref={descriptionRef}
          style={{ margin: '15px 0 5px', width: '100%' }}
        />
        {formError && <Typography variant='body1'>{formError}</Typography>}
        <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
          Add Event
        </Button>
      </Container> */}
    </Box>
  );
};
