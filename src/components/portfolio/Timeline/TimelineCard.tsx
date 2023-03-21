import { useState, useRef } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Box } from '@mui/system';
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
  deleteEventHandler: (eventId: string) => void;
}

export const TimelineCard = (props: TimelineCardProps) => {
  const theme = useTheme();
  const cardRef = useRef<null | HTMLDivElement>(null);
  const { data: session }: any = useSession();
  const [cardIsVisible, setCardVisible] = useState<boolean>(false);
  const [cardIsExpanded, setCardIsExapanded] = useState<boolean>(false);

  const { event, addJoinerLine, deleteEventHandler } = props;

  function cardClickedHandler() {
    setCardIsExapanded((prevState: boolean) => !prevState);

    //       setTimeout(() => {
    //         if (!cardIsExpanded && cardRef.current) {
    //           cardRef.current.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'center',
    //           });
    //         }
    //       }, 200);
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
        {addJoinerLine && cardIsVisible && (
          <TimelineCardJoiner endDate={event.endDate} />
        )}
        <Box
          component='article'
          sx={{
            opacity: cardIsVisible ? 1 : 0,
            transition: 'width 0.3s',
            width: {
              xs: '100%',
              lg: cardIsExpanded ? '80%' : '420px',
            },
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={cardClickedHandler}
          ref={cardRef}
        >
          <Box
            sx={{
              transition: 'all 0.3s',
              minHeight: '180px',
              background: '#FFF',
              padding: {
                xs: '20px 10px 30px',
                sm: '20px 30px 40px',
              },
              position: 'relative',
              zIndex: 1,
              opacity: cardIsVisible ? 1 : 0,
              border: `1px solid ${theme.palette.secondary.main}`,
              boxShadow: '0 20px 2px -10px rgba(0 0 0 / 4%)',
              '&:hover': {
                boxShadow: '0 15px 10px -10px rgba(0 0 0 / 3%)',
                transform: 'scale(1.05)',
              },
            }}
          >
            <TimelineCardContent event={event} isExpanded={cardIsExpanded} />
            {session?.user?.isAdmin && (
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
