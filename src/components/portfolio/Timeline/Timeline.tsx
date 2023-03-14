import { useSession } from 'next-auth/react';
import { EventProps } from 'src/types';
import { TimelineAddEventForm } from './TimelineAddEventForm';
import { Box } from '@mui/material';
import { TimelineCard } from '@/components/portfolio/Timeline/TimelineCard';

// import { TimelineCardVisibilityWrapper } from './_TimelineCardVisibilityWrapper';

interface TimelineProps {
  events: EventProps[];
  setEvents: (events: EventProps[]) => void;
  deleteEventHandler: (eventId: string) => void;
  createEventFormHandler: (newEvent: EventProps) => void;
}

export const Timeline = (props: TimelineProps) => {
  const { events, deleteEventHandler, createEventFormHandler } = props;
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
        <TimelineAddEventForm createEventFormHandler={createEventFormHandler} />
      )}
      <Box sx={{ width: '50%', mt: 5 }}>
        {events &&
          events.map((event: EventProps, index: number) => {
            const addJoinerLine = index !== 0;
            return (
              <TimelineCard
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
