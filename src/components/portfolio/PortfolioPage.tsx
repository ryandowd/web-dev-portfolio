import { useTimeline } from '@/components/portfolio/use-timeline';
import { useSidebar } from '@/components/portfolio/Sidebar/use-sidebar';

import { Sidebar } from '@/components/portfolio/Sidebar/Sidebar';
import { Timeline } from '@/components/portfolio/Timeline/Timeline';

import { EventProps } from '@/types';
import { Box } from '@mui/material';
import { useEffect } from 'react';

interface PortfolioProps {
  staticSkillsList: string[];
  staticEvents: EventProps[];
  // isAdmin: boolean;
}

export const PortfolioPage = (props: PortfolioProps) => {
  const { staticSkillsList, staticEvents } = props;

  const { skills, setSkills, handleInputChange } = useSidebar();
  const {
    events,
    setEvents,
    deleteEventHandler,
    createEventFormHandler,
    isLoadingMutate,
    isSuccessMutate,
  } = useTimeline();

  useEffect(() => {
    if (staticSkillsList) {
      setSkills(staticSkillsList);
    }
  }, [staticSkillsList, setSkills]);

  useEffect(() => {
    if (staticEvents) {
      setEvents(staticEvents);
    }
  }, [staticEvents, setEvents]);

  const boxStyles = {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    textAlign: { xs: 'center', sm: 'left' },
  };

  return (
    <Box sx={boxStyles} component='main'>
      <Sidebar
        skillsList={skills}
        setSkillsList={setSkills}
        handleInputChange={handleInputChange}
        // isAdmin={isAdmin}
      />
      <Timeline
        events={events}
        setEvents={setEvents}
        deleteEventHandler={deleteEventHandler}
        createEventFormHandler={createEventFormHandler}
        isLoadingMutate={isLoadingMutate}
        isSuccessMutate={isSuccessMutate}
        // isAdmin={isAdmin}
      />
    </Box>
  );
};
