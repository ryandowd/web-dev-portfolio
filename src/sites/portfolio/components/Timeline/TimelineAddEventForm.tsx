import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { EventProps, FormFieldProps } from '@/sites/portfolio/types';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import { EventForm } from '../EventForm/EventForm';
import { LoadingButton } from '@mui/lab';

interface TimelineAddEventFormProps {
  createEventFormHandler: (newEvent: EventProps) => void;
  isLoadingMutate: boolean;
  isSuccessMutate: boolean;
}

export const TimelineAddEventForm = (props: TimelineAddEventFormProps) => {
  const [hideForm, setHideForm] = useState<boolean>(true);
  const theme = useTheme();
  const { createEventFormHandler, isLoadingMutate, isSuccessMutate } = props;

  useEffect(() => {
    if (isSuccessMutate) {
      setHideForm(true);
    }
  }, [isSuccessMutate]);

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
    event.preventDefault();

    const formData = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    );

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

    createEventFormHandler(newEvent);
  }

  function closeFormHandler() {
    setHideForm(true);
  }

  if (hideForm || isLoadingMutate) {
    return (
      <LoadingButton
        variant='contained'
        loading={isLoadingMutate}
        loadingPosition='center'
        onClick={() => setHideForm(false)}
        sx={{ marginBottom: '60px' }}
      >
        Add new event
      </LoadingButton>
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
      <IconButton onClick={closeFormHandler}>
        <CancelIcon />
      </IconButton>
      <Typography variant='h5' sx={{ mb: 1, textAlign: 'center' }}>
        Add new event
      </Typography>
      <EventForm
        submitFormHandler={submitFormHandler}
        formFields={formFields}
      />
    </Box>
  );
};
