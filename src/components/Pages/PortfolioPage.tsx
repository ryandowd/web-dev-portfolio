import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import { createTheme } from '@mui/material/styles';
import {
  EventProps,
  useTimeline,
} from '@/components/portfolio/Timeline/use-timeline';
import { useSidebar } from '@/components/portfolio/Sidebar/use-sidebar';

import { Sidebar } from '@/components/portfolio/Sidebar/Sidebar';
import { Timeline } from '@/components/portfolio/Timeline/Timeline';
import { Box } from '@mui/material';

interface PortfolioProps {
  staticSkillsList: string[];
  staticEvents: EventProps[];
}

export const PortfolioPage = (props: PortfolioProps) => {
  const { skillsList, setSkillsList, handleInputChange } = useSidebar();
  const { events, setEvents, deleteEventHandler, createEventFormHandler } =
    useTimeline();

  const { staticSkillsList, staticEvents } = props;

  let eventsList = events;

  if (events.length === 0) {
    eventsList = staticEvents;
  }

  const boxStyles = {
    display: 'flex',
    flexDirection: { sm: 'column', md: 'row' },
    textAlign: { xs: 'center', sm: 'left' },
  };

  useEffect(() => {
    setSkillsList(staticSkillsList);
  }, []);

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
      />
    </Box>
  );
};
