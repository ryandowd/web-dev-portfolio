import { Box } from '@mui/material';
import { EventProps } from 'src/types';
import { TimelineCardContent } from './TimelineCardContent';
import { useTheme } from '@mui/material/styles';

interface TimelineCardProps {
  event: EventProps;
  deleteEventHandler: (eventId: string) => void;
}

export const TimelineCard = (props: TimelineCardProps) => {
  const theme = useTheme();
  const { event, deleteEventHandler } = props;

  function removeEventHandler(eventId: string) {
    deleteEventHandler(eventId);
  }

  return (
    <Box sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
      <TimelineCardContent
        event={event}
        removeEventHandler={removeEventHandler}
      />
      {/* {addJoinerLine && <CardJoiner cardId={cardId} endDate={endDate} />}
      <CardContent
        cardClickedHandler={onCardClicked}
        cardClicked={cardIsClicked}
        {...props}
      /> */}
    </Box>
  );
};
