import { useContext } from 'react';
import { SidebarNav } from './SidebarNav';
import { useSession } from 'next-auth/react';
import { AuthContext } from '@/global/providers/use-auth-provider';

import { useSidebar } from './use-sidebar';

import classes from './Sidebar.module.scss';
import { SkillsListForm } from './SkillsListForm';
import { SkillsList } from './SkillsList';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';

interface SidebarProps {
  skillsList: string[];
  setSkillsList: React.Dispatch<React.SetStateAction<string[]>>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
}

export const Sidebar = (props: SidebarProps) => {
  const { data: session } = useSession();
  const { skillsList, setSkillsList, handleInputChange } = props;
  const { isEditing, toggleIsEditingHandler } = useContext(AuthContext);

  const { formSubmitHandler } = useSidebar();

  return (
    <div className={classes.sidebar}>
      <SidebarNav />

      <Typography paragraph sx={{ fontSize: 24, fontWeight: 500 }}>
        I'm a web developer with over ten years experience building websites,
        widgets and web applications. I love developing intuitive interfaces.
      </Typography>

      {session && !isEditing && (
        <Button
          type='button'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={toggleIsEditingHandler}
        >
          Edit skills list
        </Button>
      )}

      {skillsList && !isEditing && <SkillsList skillsList={skillsList} />}

      {isEditing && (
        <SkillsListForm
          skillsList={skillsList}
          setSkillsList={setSkillsList}
          formSubmitHandler={formSubmitHandler}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};
