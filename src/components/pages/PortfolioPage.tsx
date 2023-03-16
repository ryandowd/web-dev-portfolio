import { useTimeline } from '@/components/portfolio/Timeline/use-timeline';
import { useSidebar } from '@/components/portfolio/Sidebar/use-sidebar';

import { Sidebar } from '@/components/portfolio/Sidebar/Sidebar';
import { Timeline } from '@/components/portfolio/Timeline/Timeline';

import { EventProps } from '@/types';
import { Box } from '@mui/material';
import { useEffect } from 'react';

interface PortfolioProps {
  staticSkillsList: string[];
  staticEvents: EventProps[];
}

export const PortfolioPage = (props: PortfolioProps) => {
  const { skillsList, setSkillsList, handleInputChange } = useSidebar();
  const {
    events,
    setEvents,
    deleteEventHandler,
    createEventFormHandler,
    isLoadingMutate,
    isSuccessMutate,
    // eventQuerySuccess,
    // setEventQuerySuccess,
  } = useTimeline();

  const { staticSkillsList, staticEvents } = props;

  useEffect(() => {
    if (staticSkillsList) {
      setSkillsList(staticSkillsList);
    }
  }, [staticSkillsList, setSkillsList]);

  let eventsList = events;

  if (events.length === 0) {
    eventsList = staticEvents;
  }

  const boxStyles = {
    display: 'flex',
    flexDirection: { sm: 'column', md: 'row' },
    textAlign: { xs: 'center', sm: 'left' },
  };

  return (
    <Box sx={boxStyles} component='main'>
      <Sidebar
        skillsList={skillsList}
        setSkillsList={setSkillsList}
        handleInputChange={handleInputChange}
      />
      <Timeline
        events={eventsList}
        setEvents={setEvents}
        deleteEventHandler={deleteEventHandler}
        createEventFormHandler={createEventFormHandler}
        isLoadingMutate={isLoadingMutate}
        isSuccessMutate={isSuccessMutate}
        // eventQuerySuccess={eventQuerySuccess}
        // setEventQuerySuccess={setEventQuerySuccess}
      />
    </Box>
  );
};
