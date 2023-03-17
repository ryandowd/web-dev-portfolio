import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface SkillsListProps {
  skillsList: string[];
}

export const SkillsList = (props: SkillsListProps) => {
  const { skillsList } = props;
  return (
    skillsList && (
      <List sx={{ fontSize: 18, fontWeight: 400 }}>
        {skillsList.map((skillItem: string, index: number) => {
          return (
            <ListItem key={index} sx={{ p: 0, wordBreak: 'break-word' }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <ChevronRightIcon color='primary' />
              </ListItemIcon>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: '1.2rem',
                  fontFamily: 'sans-serif',
                }}
              >
                {skillItem}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    )
  );
};
