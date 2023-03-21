import { useSession } from 'next-auth/react';
import { EventProps } from 'src/types';
import { TimelineAddEventForm } from './TimelineAddEventForm';
import { Box } from '@mui/material';
import { TimelineCard } from '@/components/portfolio/Timeline/TimelineCard';
import { useState } from 'react';

interface TimelineProps {
  events: EventProps[];
  setEvents: (events: EventProps[]) => void;
  deleteEventHandler: (eventId: string) => void;
  createEventFormHandler: (newEvent: EventProps) => void;
  isLoadingMutate: boolean;
  isSuccessMutate: boolean;
}

export const Timeline = (props: TimelineProps) => {
  const { data: session } = useSession();
  // const [cardExpandedId, setCardExpandedId] = useState<string | null>(null);

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
      {session && (
        <TimelineAddEventForm
          createEventFormHandler={createEventFormHandler}
          isLoadingMutate={isLoadingMutate}
          isSuccessMutate={isSuccessMutate}
          setEvents={setEvents}
        />
      )}
      <Box
        sx={{
          transition: 'all 0.3s',
          marginTop: !session
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
                // cardExpandedId={cardExpandedId}
                // setCardExpandedId={setCardExpandedId}
              />
            );
          })}
      </Box>
    </Box>
  );
};
