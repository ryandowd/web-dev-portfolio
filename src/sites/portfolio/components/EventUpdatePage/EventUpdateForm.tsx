import { FormInput } from '@/sites/main/components/ui/FormInput';
import { EventProps, FormFieldProps } from '@/sites/portfolio/types';
import { LoadingButton } from '@mui/lab';
import { Button, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { MutableRefObject, useRef, useState } from 'react';
import { EventForm } from '../EventForm/EventForm';

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

    const updatedEvent: EventProps = {
      eventId: eventDetail?.eventId,
      title: formData.title as string,
      logo: formData.logo as string,
      startDate: formData.startDate as string,
      endDate: formData.endDate as string,
      location: formData.location as string,
      skills: formData.skills as string,
      description: formData.description as string,
    };

    setIsUpdating(true);
    updateEventFormHandler(updatedEvent);
  }

  return (
    <>
      <Typography variant='h5' sx={{ mb: 1, textAlign: 'center' }}>
        {isLoading || !eventDetail
          ? 'Loading event details...'
          : `Update event for '${eventDetail?.title}'`}
      </Typography>
      <EventForm
        eventDetail={eventDetail}
        formFields={formFields}
        isLoading={isLoading}
        isRefetching={isRefetching}
        isUpdating={isUpdating}
        submitFormHandler={submitFormHandler}
      />
    </>
  );
};
