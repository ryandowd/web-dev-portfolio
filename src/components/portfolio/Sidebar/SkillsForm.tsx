import { SkillsFormInput } from './SkillsFormInput';

interface SkillsFormProps {
  skillsList: string[];
  setSkillsList: React.Dispatch<React.SetStateAction<string[]>>;
  formSubmitHandler: (
    event: React.FormEvent<HTMLFormElement>,
    updatedSkillsList: string[]
  ) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
}

export const SkillsForm = (props: SkillsFormProps) => {
  const { skillsList, setSkillsList, formSubmitHandler, handleInputChange } =
    props;

  function addNewSkillHandler() {
    setSkillsList((prevState: string[]) => {
      const newState = [...prevState, 'New skill'];
      return newState;
    });
  }

  function removeSkillHandler(index: number) {
    setSkillsList((prevState: string[]) => {
      const newState = prevState.filter((_, itemIndex) => itemIndex !== index);
      return newState;
    });
  }

  const skillsListForm = skillsList.map((skillItem: string, index: number) => {
    return (
      <ul>
        <SkillsFormInput
          index={index}
          skillItem={skillItem}
          handleInputChange={handleInputChange}
          removeSkillHandler={removeSkillHandler}
        />
      </ul>
    );
  });

  return (
    <form onSubmit={(event) => formSubmitHandler(event, skillsList)}>
      {skillsList.length ? skillsListForm : <p>No skills added</p>}
      <button type='submit'>Save skills</button>
      <button type='button' onClick={addNewSkillHandler}>
        Add new skill
      </button>
    </form>
  );
};
