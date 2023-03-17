import { FormInput } from '@/components/ui/FormInput';
import { EventProps } from '@/types';
import { LoadingButton } from '@mui/lab';
import { Button, TextareaAutosize, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { MutableRefObject, useRef, useState } from 'react';

type EventUpdateFormProps = {
  updateEventFormHandler: (event: EventProps) => void;
};

export const EventUpdateForm = (props: EventUpdateFormProps) => {
  const { updateEventFormHandler } = props;
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const {
    data: eventDetailData,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ['event-detail', router.query.eventId || ''],
    queryFn: async () => {
      if (router.query.eventId) {
        const response = await axios.get(
          `/api/portfolio/events/${router.query.eventId}`
        );
        return response.data;
      }
    },
    refetchOnWindowFocus: false,
  });

  const eventDetail = eventDetailData?.event || null;

  const titleRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const skillsRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const formTextFields: {
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

    const title = titleRef.current?.value.trim();
    const startDate = startDateRef.current?.value.trim();
    const endDate = endDateRef.current?.value.trim();
    const location = locationRef.current?.value.trim();
    const skills = skillsRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();

    if (title && startDate && endDate && location && skills && description) {
      const updatedEvent: EventProps = {
        eventId: eventDetail?.eventId,
        title,
        startDate,
        endDate,
        location,
        skills,
        description,
      };

      setIsUpdating(true);
      updateEventFormHandler(updatedEvent);
    } else {
      setFormError('Please fill out all fields');
    }
  }

  return (
    <Container
      component='form'
      onSubmit={(event: any) => submitFormHandler(event)}
    >
      <>
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
        <TextareaAutosize
          required
          defaultValue={eventDetail?.description}
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
      </>
    </Container>
  );
};
