import { Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

interface TimelineCardSkillsProps {
  skills: string;
}

export const TimelineCardSkills = (props: TimelineCardSkillsProps) => {
  const { skills } = props;
  const skillsArray = skills.split(',');

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: {
          xs: '20px',
          sm: '10px',
        },
      }}
    >
      {skillsArray.map((skill) => {
        return (
          <Box
            key={skill.trim()}
            sx={{
              margin: '5px',
            }}
          >
            <Tooltip title={skill.trim()} placement='top'>
              <Image
                src={`/assets/images/tech-${skill.trim()}.png`}
                alt={skill.trim()}
                width={50}
                height={50}
              />
            </Tooltip>
          </Box>
        );
      })}
    </Box>
  );
};
