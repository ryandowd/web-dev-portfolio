import { TextareaAutosize, ListItem, ListItemIcon } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface SkillsFormInputProps {
  index: number;
  skillItem: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index?: number
  ) => void;
  removeSkillHandler: (index: number) => void;
}

export const SkillsFormInput = (props: SkillsFormInputProps) => {
  const { index, skillItem, handleInputChange, removeSkillHandler } = props;
  return (
    <ListItem>
      <ListItemIcon>
        <ArrowRightIcon />
      </ListItemIcon>
      <TextareaAutosize
        value={skillItem}
        onChange={(event) => handleInputChange(event, index)}
      />
      <button type='button' onClick={() => removeSkillHandler(index)}>
        X
      </button>
    </ListItem>
  );
};
