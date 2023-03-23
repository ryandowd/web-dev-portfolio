import { SkillsFormInput } from './SkillsFormInput';
import { Button, Container, Box, List } from '@mui/material';

interface SkillsListFormProps {
  skillsList: string[];
  setSkillsList: React.Dispatch<React.SetStateAction<string[]>>;
  formSubmitHandler: (
    event: React.FormEvent<HTMLFormElement>,
    updatedSkillsList: string[]
  ) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index?: number
  ) => void;
}

export const SkillsListForm = (props: SkillsListFormProps) => {
  const { skillsList, setSkillsList, formSubmitHandler, handleInputChange } =
    props;

  function addNewSkillHandler() {
    setSkillsList((prevState: string[]) => [...prevState, 'New skill']);
  }

  function removeSkillHandler(index: number) {
    setSkillsList((prevState: string[]) =>
      prevState.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  return (
    <Container
      component='form'
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        formSubmitHandler(event, skillsList)
      }
    >
      {skillsList.length ? (
        <List sx={{ fontSize: 18, fontWeight: 400 }}>
          {skillsList.map((skillItem: string, index: number) => {
            return (
              <SkillsFormInput
                key={index}
                index={index}
                skillItem={skillItem}
                handleInputChange={handleInputChange}
                removeSkillHandler={removeSkillHandler}
              />
            );
          })}
        </List>
      ) : (
        <p>No skills added</p>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Button fullWidth variant='contained' type='submit' sx={{ mr: 1 }}>
          Save skills
        </Button>
        <Button
          fullWidth
          variant='contained'
          type='button'
          onClick={addNewSkillHandler}
        >
          Add new skill
        </Button>
      </Box>
    </Container>
  );
};
