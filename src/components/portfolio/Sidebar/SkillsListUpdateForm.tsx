interface SkillsListUpdateFormProps {
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

export const SkillsListUpdateForm = (props: SkillsListUpdateFormProps) => {
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

  return (
    <form onSubmit={(event) => formSubmitHandler(event, skillsList)}>
      <ul>
        {skillsList.map((skillItem: string, index: number) => {
          return (
            <li key={index}>
              <input
                value={skillItem}
                onChange={(event) => handleInputChange(event, index)}
              />
              <button type='button' onClick={() => removeSkillHandler(index)}>
                X
              </button>
            </li>
          );
        })}
      </ul>
      <button type='submit'>Save skills</button>
      <button type='button' onClick={addNewSkillHandler}>
        Add new skill
      </button>
    </form>
  );
};
