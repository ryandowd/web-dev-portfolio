import { useState, useCallback } from 'react';
import { Button, IconButton, useTheme } from '@mui/material';
import { Box, Container } from '@mui/system';
import classes from './TimelineCard.module.scss';
import VisibilitySensor from 'react-visibility-sensor';
import { EventProps } from '@/types';
import { TimelineCardContent } from '@/components/portfolio/Timeline/TimelineCardContent';
import { TimelineCardJoiner } from './TimelineCardJoiner';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { LoadingButton } from '@mui/lab';
import { DeleteForever, Edit } from '@mui/icons-material';

interface TimelineCardProps {
  event: EventProps;
  addJoinerLine: boolean;
  cardExpanded: boolean;
  deleteEventHandler: (eventId: string) => void;
}

export const TimelineCard = (props: TimelineCardProps) => {
  const theme = useTheme();
  const { data: session } = useSession();
  const [cardIsVisible, setCardVisible] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { event, addJoinerLine, cardExpanded, deleteEventHandler, setEvents } =
    props;

  const deleteButtonHandler = (eventId: string) => {
    deleteEventHandler(eventId);
    setIsDeleting(true);
    // setEvents((prevEvents: EventProps[]) => {
    //   const updatedEvents = prevEvents.filter(
    //     (event) => event.eventId !== eventId
    //   );
    //   console.log('updatedEvents', updatedEvents);
    //   return updatedEvents;
    // });
  };

  // function cardExpandHandler() {
  //   console.log('log here');
  //   setCardExpanded((prevState) => !prevState);
  // }

  // const cardCloseHandler = useCallback(() => {
  //   if (cardExpanded) {
  //     setCardExpanded(false);
  //   }
  // }, [cardExpanded]);

  // const ref = useDetectClickOutside(cardCloseHandler);

  return (
    <VisibilitySensor
      partialVisibility={true}
      onChange={(isVisible: boolean) => setCardVisible(isVisible)}
      offset={{ bottom: 100 }}
      active={!cardIsVisible}
    >
      <Box>
        {addJoinerLine && <TimelineCardJoiner endDate={event.endDate} />}
        <Box
          component='article'
          className={`${classes['timeline-card']} ${
            cardExpanded ? classes['timeline-card--expanded'] : ''
          }`}
          sx={{
            opacity: cardIsVisible ? 1 : 0,
          }}
          // onClick={cardExpandHandler}
          // ref={ref}
        >
          <Box
            className={classes['timeline-card__foreground']}
            sx={{
              opacity: cardIsVisible ? 1 : 0,
              border: `1px solid ${theme.palette.secondary.main}`,
              // transition: 'opacity 0.3s',
              // padding: 3,
            }}
          >
            <TimelineCardContent
              event={event}
              // deleteEventHandler={deleteEventHandler}
              // cardIsVisible={cardIsVisible}
              // addJoinerLine={addJoinerLine}
            />
            {session && (
              <Box sx={{ position: 'absolute', top: 0, right: '-90px' }}>
                <Link href={`/portfolio/events/${event.eventId}`}>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Link>
                <IconButton onClick={() => deleteButtonHandler(event.eventId)}>
                  <DeleteForever />
                </IconButton>
                {/* <Button
                  variant='outlined'
                  onClick={() => deleteButtonHandler(event.eventId)}
                >
                  Delete event
                </Button> */}
                {/* <Button variant='outlined'>
                  <Link href={`/portfolio/events/${event.eventId}`}>
                    Edit event
                  </Link>
                </Button> */}
              </Box>
            )}
          </Box>
          {/* <Box
            className={classes['timeline-card__background']}
            sx={{
              border: `1px solid ${theme.palette.secondary.main}`,
            }}
          >
            Hello
          </Box> */}
        </Box>
      </Box>
    </VisibilitySensor>
  );
};
// import React from 'react';
// import classnames from 'classnames';

// import CardContent from '../CardContent';
// import CardJoiner from '../CardJoiner';

// import './TimelineCard.scss';

// type TimelineCardProps = {
//   cardIsClicked: boolean;
//   cardIsVisible: boolean;
//   onCardClicked: React.MouseEventHandler<HTMLElement>;
//   addJoinerLine: boolean;
//   cardId: string;
//   endDate: string;
//   logoImage: string;
//   title: string;
//   startDate: string;
//   location: string;
//   techlist: Array<string>;
//   description: string;
//   websiteDomain: string;
// };

// export const TimelineCard = (props: TimelineCardProps) => {
//   const {
//     cardIsClicked,
//     cardIsVisible,
//     onCardClicked,
//     addJoinerLine,
//     cardId,
//     endDate,
//   } = props;
//   let cardClasses: Array<string> = [];

//   cardClasses = [
//     ...(cardIsClicked ? ['js-expand-card'] : []),
//     ...(cardIsVisible ? ['js-show-card'] : []),
//   ];

//   return (
//     <div className={classnames(['TimelineCard__container', cardClasses])}>
//       {addJoinerLine && <CardJoiner cardId={cardId} endDate={endDate} />}
//       <CardContent
//         cardClickedHandler={onCardClicked}
//         cardClicked={cardIsClicked}
//         {...props}
//       />
//     </div>
//   );
// };

// export default TimelineCard;
