import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EventProps } from '@/sites/portfolio/types';
import { SnapshotWithTotals } from '../../sites/finance/global/types';
// import { dateFormat } from './global/constants';
// import { v4 as uuid } from 'uuid';
// import dayjs from 'dayjs';

export const useSnapshots = () => {
  // const [snapshots, setSnapshots] = useState<Snapshot[]>([defaultSnapshot]);
  const router = useRouter();

  // Create
  const {
    mutate: createSnapshotMutate,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
  } = useMutation({
    mutationFn: async (AddSnapshot: EventProps) => {
      const response = await axios.post('/api/finance/snapshots', {
        AddSnapshot,
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

  // Update
  const {
    mutate: updateSnapshotMutate,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useMutation({
    mutationFn: async (updatedSnapshot: SnapshotWithTotals) => {
      const response = await axios.put(
        `/api/finance/snapshots/${updatedSnapshot.snapshotId}`,
        {
          updatedSnapshot,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      router.replace('/finance-tracker');
    },
  });

  // Delete
  const {
    mutate: deleteSnapshotMutate,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
  } = useMutation({
    mutationFn: async (snapshotId: string) => {
      axios({
        method: 'delete',
        url: `/api/finance/snapshots/${snapshotId}`,
        data: {
          snapshotId,
        },
      });
    },
  });

  function createAddSnapshotHandler(AddSnapshot: EventProps) {
    createSnapshotMutate(AddSnapshot);

    // setSnapshots((prevState) => {
    //   return [AddSnapshot, ...prevState];
    // });
  }

  function deleteSnapshotHandler(snapshotId: string) {
    deleteSnapshotMutate(snapshotId);
  }

  function updateSnapshotFormHandler(updatedSnapshot: SnapshotWithTotals) {
    updateSnapshotMutate(updatedSnapshot);
  }

  return {
    // events,
    // isLoadingGet,
    // setEvents,
    // snapshots,
    isCreateLoading,
    isCreateSuccess,
    createAddSnapshotHandler,
    isUpdateLoading,
    isUpdateSuccess,
    updateSnapshotFormHandler,
    isDeleteLoading,
    isDeleteSuccess,
    deleteSnapshotHandler,
    // deleteEventHandler,
    // updateEventFormHandler,
    // isLoadingMutate,
    // isSuccessMutate,
  };
};
