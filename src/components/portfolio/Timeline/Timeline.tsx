import { EventProps } from 'src/types';
import { TimelineAddEventForm } from './TimelineAddEventForm';
import { Box } from '@mui/material';
import { TimelineCard } from '@/components/portfolio/Timeline/TimelineCard';
import { useSession } from 'next-auth/react';

interface TimelineProps {
  events: EventProps[];
  setEvents: (events: EventProps[]) => void;
  deleteEventHandler: (eventId: string) => void;
  createEventFormHandler: (newEvent: EventProps) => void;
  isLoadingMutate: boolean;
  isSuccessMutate: boolean;
}

export const Timeline = (props: TimelineProps) => {
  const { data: session }: any = useSession();
  const isAdmin = session?.user?.role === 'admin';

  const {
    events,
    setEvents,
    deleteEventHandler,
    createEventFormHandler,
    isLoadingMutate,
    isSuccessMutate,
  } = props;

  return (
    <Box
      sx={{
        padding: {
          xs: '60px 30px 40px',
          sm: '60px 50px 40px',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { md: '55%' },
        backgroundColor: '#f9f9f9',
        position: {
          xs: 'relative',
        },
      }}
    >
      {isAdmin && (
        <TimelineAddEventForm
          createEventFormHandler={createEventFormHandler}
          isLoadingMutate={isLoadingMutate}
          isSuccessMutate={isSuccessMutate}
        />
      )}
      <Box
        sx={{
          transition: 'all 0.3s',
          marginTop: !isAdmin
            ? {
                xs: '-100px',
                md: '40px',
              }
            : {},
          marginBottom: '300px',
        }}
      >
        {events &&
          events.map((event: EventProps, index: number) => {
            const addJoinerLine = index !== 0;
            return (
              <TimelineCard
                key={event.eventId}
                event={event}
                deleteEventHandler={deleteEventHandler}
                addJoinerLine={addJoinerLine}
              />
            );
          })}
      </Box>
    </Box>
  );
};
