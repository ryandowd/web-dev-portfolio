import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EventProps } from '@/sites/portfolio/types';

export const useTimeline = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const router = useRouter();

  // Create
  const {
    mutate: createEventMutate,
    isLoading: isLoadingMutate,
    isSuccess: isSuccessMutate,
  } = useMutation({
    mutationFn: async (newEvent: EventProps) => {
      const response = await axios.post('/api/portfolio/events', {
        newEvent,
      });
      return response.data;
    },
  });

  // Read
  const { isLoading: isLoadingGet } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axios.get('/api/portfolio/events');
      return response.data;
    },
    onSuccess: (data) => {
      setEvents(data.events);
    },
    refetchOnWindowFocus: false,
  });

  // Update
  const { mutate: updateEventMutate } = useMutation({
    mutationFn: async (updatedEvent: EventProps) => {
      const response = await axios.put(
        `/api/portfolio/events/${updatedEvent.eventId}`,
        {
          updatedEvent,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      router.replace('/portfolio');
    },
  });

  // Delete
  const { mutate: removeEventMutate } = useMutation({
    mutationFn: async (eventId: string) => {
      const response = axios({
        method: 'delete',
        url: `/api/portfolio/events/${eventId}`,
        data: {
          eventId,
        },
      });
    },
  });

  function createEventFormHandler(newEvent: EventProps) {
    createEventMutate(newEvent);

    setEvents((prevState) => {
      return [newEvent, ...prevState];
    });
  }

  function deleteEventHandler(eventId: string) {
    setEvents((prevEvents: EventProps[]) => {
      const updatedEvents = prevEvents.filter(
        (event) => event.eventId !== eventId
      );
      return updatedEvents;
    });
    removeEventMutate(eventId);
  }

  function updateEventFormHandler(updatedEvent: EventProps) {
    updateEventMutate(updatedEvent);
  }

  return {
    events,
    isLoadingGet,
    setEvents,
    createEventFormHandler,
    deleteEventHandler,
    updateEventFormHandler,
    isLoadingMutate,
    isSuccessMutate,
  };
};
