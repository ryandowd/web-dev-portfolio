import { useState, useRef } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import classes from './TimelineCard.module.scss';
import VisibilitySensor from 'react-visibility-sensor';
import { EventProps } from '@/types';
import { TimelineCardContent } from '@/components/portfolio/Timeline/TimelineCardContent';
import { TimelineCardJoiner } from './TimelineCardJoiner';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { DeleteForever, Edit } from '@mui/icons-material';

interface TimelineCardProps {
  event: EventProps;
  addJoinerLine: boolean;
  cardExpandedId: string | null;
  deleteEventHandler: (eventId: string) => void;
  setCardExpandedId: (eventId: string | null) => void;
}

export const TimelineCard = (props: TimelineCardProps) => {
  const theme = useTheme();
  const cardRef = useRef<null | HTMLDivElement>(null);
  const { data: session } = useSession();
  const [cardIsVisible, setCardVisible] = useState<boolean>(false);

  const {
    event,
    addJoinerLine,
    cardExpandedId,
    deleteEventHandler,
    setCardExpandedId,
  } = props;

  const cardIsExpanded = event.eventId === cardExpandedId;

  function cardClickedHandler() {
    setCardExpandedId(!cardIsExpanded ? event.eventId : null);

    setTimeout(() => {
      if (!cardIsExpanded && cardRef.current) {
        cardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 70);
  }

  return (
    <VisibilitySensor
      partialVisibility={true}
      onChange={(isVisible: boolean) => setCardVisible(isVisible)}
      offset={{ bottom: 100 }}
      active={!cardIsVisible}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {addJoinerLine && <TimelineCardJoiner endDate={event.endDate} />}
        <Box
          component='article'
          className={`${classes['timeline-card']} ${
            cardIsExpanded ? classes['timeline-card--expanded'] : ''
          }
          `}
          sx={{
            opacity: cardIsVisible ? 1 : 0,
            transition: 'width 0.3s',
            width: {
              xs: '100%',
              md: cardIsExpanded ? '90%' : '75%',
              lg: cardIsExpanded ? '80%' : '60%',
            },
          }}
          onClick={cardClickedHandler}
          ref={cardRef}
        >
          <Box
            className={classes['timeline-card__inner']}
            sx={{
              opacity: cardIsVisible ? 1 : 0,
              border: `1px solid ${theme.palette.secondary.main}`,
            }}
          >
            <TimelineCardContent event={event} isExpanded={cardIsExpanded} />
            {session && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '-45px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link href={`/portfolio/events/${event.eventId}`}>
                  <Tooltip title='Edit event' placement='left'>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title='Delete event' placement='left'>
                  <IconButton onClick={() => deleteEventHandler(event.eventId)}>
                    <DeleteForever />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </VisibilitySensor>
  );
};
