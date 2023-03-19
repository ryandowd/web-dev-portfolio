import { EventProps } from 'src/types';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { TimelineCardSkills } from './TimelineCardSkils';

interface TimelineCardContentProps {
  event: EventProps;
  isExpanded: boolean;
}

export const TimelineCardContent = (props: TimelineCardContentProps) => {
  const theme = useTheme();
  const { event, isExpanded } = props;

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
              sx={{ color: theme.palette.secondary.light }}
            >
              {event.location}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: isExpanded ? '300px' : '0px',
            opacity: isExpanded ? '1' : '0',
            overflow: 'hidden',
            transitionProperty: 'opacity, height',
            transitionDuration: '0.2s, 0.5s',
          }}
        >
          {event.skills && <TimelineCardSkills skills={event.skills} />}
          <Typography sx={{ marginTop: '20px' }}>
            {event.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
