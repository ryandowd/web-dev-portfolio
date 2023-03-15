import { Box } from '@mui/system';
import Image from 'next/image';

interface TimelineCardSkillsProps {
  skills: string;
}

export const TimelineCardSkills = (props: TimelineCardSkillsProps) => {
  const { skills } = props;
  const skillsArray = skills.split(',');

  return (
    <Box>
      {skillsArray.map((skill) => {
        return (
          <Image
            key={skill}
            src={`/assets/images/tech-${skill}.png`}
            alt={skill}
            width={50}
            height={50}
          />
        );
      })}
    </Box>
  );
};
