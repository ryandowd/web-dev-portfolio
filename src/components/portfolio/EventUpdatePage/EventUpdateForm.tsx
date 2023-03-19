import { FormInput } from '@/components/ui/FormInput';
import { EventProps } from '@/types';
import { LoadingButton } from '@mui/lab';
import { Button, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { MutableRefObject, useRef, useState } from 'react';

type EventUpdateFormProps = {
  updateEventFormHandler: (event: EventProps) => void;
  eventId: string;
};

export const EventUpdateForm = (props: EventUpdateFormProps) => {
  const { updateEventFormHandler, eventId } = props;
  // const [formError, setFormError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const {
    data: eventDetailData,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ['event-detail', eventId],
    queryFn: async () => {
      const response = await axios.get(`/api/portfolio/events/${eventId}`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const eventDetail = eventDetailData?.event || null;

  // const titleRef = useRef<HTMLInputElement | null>(null);
  // const logoRef = useRef<HTMLInputElement | null>(null);
  // const startDateRef = useRef<HTMLInputElement | null>(null);
  // const endDateRef = useRef<HTMLInputElement | null>(null);
  // const locationRef = useRef<HTMLInputElement | null>(null);
  // const skillsRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const formTextFields: {
    name: string;
    label: string;
  }[] = [
    { name: 'title', label: 'Title' },
    { name: 'logo', label: 'Logo' },
    { name: 'startDate', label: 'Start date' },
    { name: 'endDate', label: 'End date' },
    { name: 'location', label: 'Location' },
    { name: 'skills', label: 'Skills' },
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
    const description = descriptionRef.current?.value?.trim();

    // console.log('description', descriptionRef);

    console.log('formData.title', formData.title);

    const updatedEvent: EventProps = {
      eventId: eventDetail?.eventId,
      title: formData.title as string,
      logo: formData.logo as string,
      startDate: formData.startDate as string,
      endDate: formData.title as string,
      location: formData.location as string,
      skills: formData.skills as string,
      description: formData.description as string,
    };

    // if (title && startDate && endDate && location && skills && description) {
    //   const updatedEvent: EventProps = {
    //     eventId: eventDetail?.eventId,
    //     title,
    //     logo,
    //     startDate,
    //     endDate,
    //     location,
    //     skills,
    //     description,
    //   };

    setIsUpdating(true);
    updateEventFormHandler(updatedEvent);
    // } else {
    //   setFormError('Please fill out all fields');
    // }
  }

  return (
    <Container
      component='form'
      onSubmit={(event: any) => submitFormHandler(event)}
    >
      <Typography variant='h5' sx={{ mb: 1, textAlign: 'center' }}>
        {isLoading || !eventDetail
          ? 'Loading event details...'
          : `Update event for '${eventDetail?.title}'`}
      </Typography>
      {formTextFields.map((field) => {
        const fieldValue = eventDetail?.[field.name];

        return (
          <FormInput
            key={field.name}
            field={field}
            value={fieldValue}
            isRefetching={isRefetching}
          />
        );
      })}
      <TextField
        key='description'
        multiline
        InputLabelProps={{
          shrink: !!eventDetail?.description,
        }}
        required
        minRows={7}
        id='description'
        label='Description'
        name='description'
        ref={descriptionRef}
        style={{ margin: '15px 0 5px', width: '100%' }}
      />
      {/* {formError && <Typography variant='body1'>{formError}</Typography>} */}
      <LoadingButton
        type='submit'
        disabled={isLoading}
        loading={isUpdating}
        variant='contained'
        fullWidth
        sx={{ mt: 2 }}
      >
        Update Event
      </LoadingButton>
    </Container>
  );
};
