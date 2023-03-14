import { EventProps } from 'src/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { TimelineCardJoiner } from './TimelineCardJoiner';
import { TimelineCardSkills } from './TimelineCardSkils';

interface TimelineCardContentProps {
  event: EventProps;
  // cardIsVisible: boolean;
  // addJoinerLine: boolean;
  removeEventHandler: (eventId: string) => void;
}

export const TimelineCardContent = (props: TimelineCardContentProps) => {
  const theme = useTheme();
  const { data: session } = useSession();
  const { event, removeEventHandler } = props;
  const { skills } = event;
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mr: 4 }}>
          <Image
            src={`/assets/images/logo-atd.png`}
            alt={event.title}
            width={100}
            height={100}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h4'>{event.title}</Typography>
          <Typography variant='body1'>
            {event.startDate} - {event.endDate}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.secondary.main }}
          >
            {event.location}
          </Typography>
        </Box>
      </Box>
      {/* {skills && <TimelineCardSkills skills={skills} />} */}
      {/* <p>{event.description}</p> */}
      {session && (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <Button
            variant='outlined'
            onClick={() => removeEventHandler(event.eventId)}
          >
            Delete event
          </Button>
          <Button variant='outlined'>
            <Link href={`/portfolio/events/${event.eventId}`}>Edit event</Link>
          </Button>
        </Box>
      )}
    </>
  );
};
