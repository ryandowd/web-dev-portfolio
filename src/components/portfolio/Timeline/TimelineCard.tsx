import { useState } from 'react';
import { useTheme } from '@mui/material';
import { Box, Container } from '@mui/system';
// import classes from './TimelineCard.module.scss';
import VisibilitySensor from 'react-visibility-sensor';
import { EventProps } from '@/types';
import { TimelineCardContent } from '@/components/portfolio/Timeline/TimelineCardContent';
import { TimelineCardJoiner } from './TimelineCardJoiner';

interface TimelineCardProps {
  event: EventProps;
  addJoinerLine: boolean;
  removeEventHandler: (eventId: string) => void;
}

export const TimelineCard = (props: TimelineCardProps) => {
  const theme = useTheme();
  const [cardIsVisible, setCardVisible] = useState<boolean>(false);
  const { event, addJoinerLine, removeEventHandler } = props;

  console.log('cardIsVisible', cardIsVisible);

  return (
    <VisibilitySensor
      partialVisibility={true}
      onChange={(isVisible: boolean) => setCardVisible(isVisible)}
      offset={{ bottom: 100 }}
      active={!cardIsVisible}
    >
      <Box
        component={'article'}
        sx={{
          opacity: cardIsVisible ? 1 : 0,
          transition: 'opacity 0.3s',
          cursor: 'pointer',
        }}
      >
        {addJoinerLine && <TimelineCardJoiner endDate={event.endDate} />}
        <Box
          sx={{
            opacity: cardIsVisible ? 1 : 0,
            transition: 'opacity 0.3s',
            border: `1px solid ${theme.palette.secondary.main}`,
            padding: 3,
          }}
        >
          <TimelineCardContent
            event={event}
            removeEventHandler={removeEventHandler}
            // cardIsVisible={cardIsVisible}
            // addJoinerLine={addJoinerLine}
          />
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
