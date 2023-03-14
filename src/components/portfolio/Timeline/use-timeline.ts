import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useTimeline = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const router = useRouter();

  const addNewEventMutation = useMutation({
    mutationFn: async (newEvent: EventProps) => {
      const response = await axios.post('/api/portfolio/events', {
        newEvent,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log('data', data);
      //   setSkillsList(data.skillsList);
    },
  });

  const updateEventMutation = useMutation({
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

  const removeEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const response = axios({
        method: 'delete',
        url: `/api/portfolio/events/${eventId}`,
        data: {
          eventId,
        },
      });
      //   const response = axios.delete(`/api/portfolio/events/${eventId}`, {
      //     eventId,
      //   });
      //   return response.data;
    },
    onSuccess: (data) => {
      console.log('data', data);
      //   setSkillsList(data.skillsList);
    },
  });

  const { isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log('yep');
      const response = await axios.get('/api/portfolio/events');
      return response.data;
    },
    onSuccess: (data) => {
      setEvents(data.events);
    },
  });

  function createEventFormHandler(newEvent: EventProps) {
    addNewEventMutation.mutate(newEvent);
    setEvents((prevState) => {
      return [newEvent, ...prevState];
    });
  }

  function deleteEventHandler(eventId: string) {
    removeEventMutation.mutate(eventId);
  }

  function updateEventFormHandler(updatedEvent: EventProps) {
    updateEventMutation.mutate(updatedEvent);
  }

  return {
    events,
    isLoading,
    setEvents,
    createEventFormHandler,
    deleteEventHandler,
    updateEventFormHandler,
  };
};
