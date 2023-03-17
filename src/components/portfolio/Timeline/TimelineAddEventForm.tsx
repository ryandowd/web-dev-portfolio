import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { EventProps } from 'src/types';
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

  const titleRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const skillsRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  async function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError(null);

    const title = titleRef.current?.value;
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;
    const location = locationRef.current?.value;
    const skills = skillsRef.current?.value;
    const description = descriptionRef.current?.value;

    if (title && startDate && endDate && location && skills && description) {
      const newEvent: EventProps = {
        eventId: uuid(),
        title,
        startDate,
        endDate,
        location,
        skills,
        description,
      };
      createEventFormHandler(newEvent);
    } else {
      setFormError('Please fill out all fields');
    }
  }

  function closeFormHandler() {
    setHideForm(true);
  }

  if (hideForm || isLoadingMutate) {
    return (
      <Button
        variant='contained'
        onClick={() => setHideForm(false)}
        disabled={isLoadingMutate}
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
      <Container
        component='form'
        onSubmit={(event: any) => submitFormHandler(event)}
      >
        <IconButton>
          <CancelIcon onClick={closeFormHandler} />
        </IconButton>
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
          autoComplete='title'
          autoFocus
          inputRef={titleRef}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='startDate'
          label='Start Date'
          name='startDate'
          autoComplete='startDate'
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
          autoComplete='endDate'
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
          autoComplete='location'
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
          autoComplete='skills'
          autoFocus
          inputRef={skillsRef}
        />
        <TextareaAutosize
          required
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
          Add Event
        </Button>
      </Container>
    </Box>
  );
};
