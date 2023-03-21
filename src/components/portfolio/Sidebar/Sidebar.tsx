import { useContext } from 'react';
import { SidebarNav } from './SidebarNav';
import { IsEditingContext } from '@/global/context/use-is-editing-provider';
import { useSidebar } from './use-sidebar';
import { useTheme } from '@mui/material/styles';
import { SkillsListForm } from './SkillsListForm';
import { SkillsList } from './SkillsList';
import { Button, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSession } from 'next-auth/react';
import type { AuthSession } from '@/types';

interface SidebarProps {
  skillsList: string[];
  setSkillsList: React.Dispatch<React.SetStateAction<string[]>>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index?: number
  ) => void;
}

export const Sidebar = (props: SidebarProps) => {
  const theme = useTheme();
  const { data: session }: any = useSession();
  const { skillsList, setSkillsList, handleInputChange } = props;
  const { isEditing, toggleIsEditingHandler } = useContext(IsEditingContext);

  const { formSubmitHandler } = useSidebar();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.light,
        padding: {
          xs: '30px 20px 100px',
          md: '60px 50px 40px',
          lg: '60px 70px 40px;',
        },
        width: {
          md: '45%',
        },
      }}
    >
      <SidebarNav />
      <Typography
        variant='h4'
        sx={{
          fontSize: {
            xs: '1.2rem',
            sm: '1.6rem',
            marginBottom: '30px',
          },
          fontWeight: 600,
          lineHeight: 1.3,
          textAlign: { sm: 'center', lg: 'left' },
        }}
      >
        I'm a web developer with over ten years experience building websites,
        widgets and web applications. I love developing intuitive interfaces.
      </Typography>

      {session?.user?.isAdmin && !isEditing && (
        <Tooltip title='Edit'>
          <Button
            type='button'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={toggleIsEditingHandler}
          >
            Edit skills list
          </Button>
        </Tooltip>
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
    </Box>
  );
};
