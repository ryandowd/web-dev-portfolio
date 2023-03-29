import {
  TextareaAutosize,
  ListItem,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
    <ListItem sx={{ p: 0, my: 1 }}>
      <ListItemIcon sx={{ minWidth: 30 }}>
        <ArrowRightIcon />
      </ListItemIcon>
      <TextareaAutosize
        value={skillItem}
        onChange={(event) => handleInputChange(event, index)}
        style={{ width: '100%', marginRight: '10px' }}
      />
      <IconButton>
        <DeleteForeverIcon onClick={() => removeSkillHandler(index)} />
      </IconButton>
    </ListItem>
  );
};
