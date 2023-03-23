import { useTimeline } from '@/components/portfolio/use-timeline';
import { Container } from '@mui/system';
import { GlobalNav } from '@/components/ui/GlobalNav';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import { EventUpdateForm } from '@/components/portfolio/EventUpdatePage/EventUpdateForm';
import { Typography } from '@mui/material';

type EventUpdatePageProps = {
  eventId: string;
};

export const EventUpdatePage = (props: EventUpdatePageProps) => {
  const { eventId } = props;
  const { updateEventFormHandler, isLoadingMutate } = useTimeline();

  return (
    <>
      <GlobalNav>
        <Link style={{ color: 'white', display: 'flex' }} href='/portfolio'>
          <ArrowBack sx={{ mr: 1 }} />
          Back to Timeline
        </Link>
      </GlobalNav>
      <Container component='main' maxWidth='md' sx={{ my: 5 }}>
        {isLoadingMutate ? (
          <Typography variant='h4'>Loading...</Typography>
        ) : (
          <EventUpdateForm
            updateEventFormHandler={updateEventFormHandler}
            eventId={eventId}
          />
        )}
      </Container>
    </>
  );
};
