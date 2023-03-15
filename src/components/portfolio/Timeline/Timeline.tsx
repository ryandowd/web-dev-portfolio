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
  const [cardExpanded, setCardExpanded] = useState<boolean>(false);
  const {
    events,
    deleteEventHandler,
    createEventFormHandler,
    isLoadingMutate,
    isSuccessMutate,
  } = props;
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        p: '60px 50px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { lg: '55%' },
      }}
    >
      {session && (
        <TimelineAddEventForm
          createEventFormHandler={createEventFormHandler}
          isLoadingMutate={isLoadingMutate}
          isSuccessMutate={isSuccessMutate}
        />
      )}
      <Box sx={{ width: '50%', mt: 5 }}>
        {events &&
          events.map((event: EventProps, index: number) => {
            const addJoinerLine = index !== 0;
            return (
              <TimelineCard
                key={index}
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
