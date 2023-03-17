import { EventProps } from 'src/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

interface TimelineCardContentProps {
  event: EventProps;
  isExpanded: boolean;
}

export const TimelineCardContent = (props: TimelineCardContentProps) => {
  const theme = useTheme();
  const { event, isExpanded } = props;

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
          <Box
            sx={{
              height: isExpanded ? '300px' : '0px',
              transition: 'all 0.5s',
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 1s' }}
            >
              {event.description}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* {skills && <TimelineCardSkills skills={skills} />} */}
    </>
  );
};
