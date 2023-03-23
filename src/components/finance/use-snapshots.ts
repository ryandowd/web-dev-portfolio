import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EventProps } from '@/types';
import { dateFormat } from './global/constants';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { Snapshot, SnapshotField } from './global/types';

const defaultSnapshotField: SnapshotField = {
  assetId: null,
  assetName: null,
  assetType: 'money',
  assetValue: 0,
  assetCurrency: 'gbp',
  assetOwner: 'joint',
};

const defaultSnapshot: Snapshot = {
  snapshotId: uuid(),
  snapshotDate: dayjs(new Date()).format(dateFormat),
  snapshotAssets: [defaultSnapshotField],
};

export const useSnapshots = () => {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([defaultSnapshot]);
  const router = useRouter();

  // Create
  const {
    mutate: createSnapshotMutate,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
  } = useMutation({
    mutationFn: async (newSnapshot: EventProps) => {
      const response = await axios.post('/api/finance/snapshots', {
        newSnapshot,
      });
      return response.data;
    },
    onSuccess: () => {
      router.replace('/finance-tracker');
    },
  });

  //   // Read
  //   const { isLoading: isLoadingGet } = useQuery({
  //     queryKey: ['events'],
  //     queryFn: async () => {
  //       const response = await axios.get('/api/portfolio/events');
  //       return response.data;
  //     },
  //     onSuccess: (data) => {
  //       setEvents(data.events);
  //     },
  //     refetchOnWindowFocus: false,
  //   });

  //   // Update
  //   const { mutate: updateEventMutate } = useMutation({
  //     mutationFn: async (updatedEvent: EventProps) => {
  //       const response = await axios.put(
  //         `/api/portfolio/events/${updatedEvent.eventId}`,
  //         {
  //           updatedEvent,
  //         }
  //       );
  //       return response.data;
  //     },
  //     onSuccess: () => {
  //       router.replace('/portfolio');
  //     },
  //   });

  //   // Delete
  //   const { mutate: removeEventMutate } = useMutation({
  //     mutationFn: async (eventId: string) => {
  //       const response = axios({
  //         method: 'delete',
  //         url: `/api/portfolio/events/${eventId}`,
  //         data: {
  //           eventId,
  //         },
  //       });
  //     },
  //   });

  function createNewSnapshotHandler(newSnapshot: EventProps) {
    createSnapshotMutate(newSnapshot);

    setSnapshots((prevState) => {
      return [newSnapshot, ...prevState];
    });
  }

  //   function deleteEventHandler(eventId: string) {
  //     setEvents((prevEvents: EventProps[]) => {
  //       const updatedEvents = prevEvents.filter(
  //         (event) => event.eventId !== eventId
  //       );
  //       return updatedEvents;
  //     });
  //     removeEventMutate(eventId);
  //   }

  //   function updateEventFormHandler(updatedEvent: EventProps) {
  //     updateEventMutate(updatedEvent);
  //   }

  return {
    // events,
    // isLoadingGet,
    // setEvents,
    isCreateLoading,
    isCreateSuccess,
    snapshots,
    createNewSnapshotHandler,
    // deleteEventHandler,
    // updateEventFormHandler,
    // isLoadingMutate,
    // isSuccessMutate,
  };
};
