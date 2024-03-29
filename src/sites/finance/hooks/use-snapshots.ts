import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Snapshot } from '@/sites/finance/global/types';

export const useSnapshots = () => {
  const router = useRouter();

  // Create
  const {
    mutate: createSnapshotMutate,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
  } = useMutation({
    mutationFn: async (newSnapshot: Snapshot) => {
      const response = await axios.post('/api/finance/snapshots', {
        newSnapshot,
      });
      return response.data;
    },
    onSuccess: () => {
      router.replace('/finance-tracker');
    },
  });

  // // Read
  // const { isLoading: isLoadingGet } = useQuery({
  //   queryKey: ['events'],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       `/api/finance/snapshots/${snapshotId}`
  //     );
  //     return response.data;
  //   },
  //   onSuccess: (data) => {
  //     setEvents(data.events);
  //   },
  //   refetchOnWindowFocus: false,
  // });

  // Update
  const {
    mutate: updateSnapshotMutate,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useMutation({
    mutationFn: async (updatedSnapshot: Snapshot) => {
      const trimmedSnapshot = {
        snapshotAssets: updatedSnapshot.snapshotAssets,
        snapshotDate: updatedSnapshot.snapshotDate,
        snapshotId: updatedSnapshot.snapshotId,
      };

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
    onSuccess: () => {
      router.replace('/finance-tracker');
    },
  });

  function createAddSnapshotHandler(newSnapshot: Snapshot) {
    createSnapshotMutate(newSnapshot);

    // setSnapshots((prevState) => {
    //   return [AddSnapshot, ...prevState];
    // });
  }

  function deleteSnapshotHandler(snapshotId: string) {
    deleteSnapshotMutate(snapshotId);
  }

  function updateSnapshotFormHandler(updatedSnapshot: Snapshot) {
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
