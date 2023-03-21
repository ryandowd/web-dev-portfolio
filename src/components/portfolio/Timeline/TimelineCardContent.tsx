import { EventProps } from 'src/types';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { TimelineCardSkills } from './TimelineCardSkils';
import type { MutableRefObject } from 'react';

interface TimelineCardContentProps {
  event: EventProps;
  isExpanded: boolean;
}

export const TimelineCardContent = (props: TimelineCardContentProps) => {
  const theme = useTheme();
  const { event, isExpanded } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        <Box
          sx={{
            display: {
              xs: 'flex',
            },
            justifyContent: {
              xs: 'center',
            },
            marginRight: {
              sm: '20px',
            },
            flex: {
              sm: '0 0 90px',
            },
            marginBottom: {
              xs: '20px',
              sm: '10px',
            },
          }}
        >
          <Image
            src={`/assets/images/logo-${event.logo}.png`}
            alt={event.title}
            width={90}
            height={90}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: {
              sm: '0 0 250px',
            },
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontSize: '1.8rem',
              marginBottom: {
                xs: '20px',
                sm: '10px',
              },
            }}
          >
            {event.title}
          </Typography>
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
          maxHeight: isExpanded ? '500px' : '0px',
          // opacity: isExpanded ? '1' : '0',
          overflow: 'hidden',
          transitionProperty: 'max-height',
          transitionDuration: '0.2s',
          // transitionDelay: '3s, 0',
        }}
      >
        {event.skills && <TimelineCardSkills skills={event.skills} />}
        <Typography
          sx={{
            marginTop: '25px',
            opacity: isExpanded ? '1' : '0',
            transitionTimingFunction: 'ease-in-out',
            transitionProperty: 'opacity',
            transitionDuration: '1s',
            transitionDelay: '0.3s',
            textAlign: {
              xs: 'left',
              sm: 'justify',
            },
            padding: {
              xs: '0 20px',
              sm: '0',
            },
          }}
        >
          {event.description}
        </Typography>
      </Box>
    </Box>
  );
};
