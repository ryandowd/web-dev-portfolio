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
  const [cardExpanded, setCardExpanded] = useState<boolean>(false);

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
        p: '60px 50px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { md: '55%' },
        backgroundColor: '#f9f9f9',
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
          width: {
            md: '60%',
            lg: '53%',
          },
          mt: 5,
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
                cardExpanded={cardExpanded}
              />
            );
          })}
      </Box>
    </Box>
  );
};
