interface SkillsFormInputProps {
  index: number;
  skillItem: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
  removeSkillHandler: (index: number) => void;
}

export const SkillsFormInput = (props: SkillsFormInputProps) => {
  const { index, skillItem, handleInputChange, removeSkillHandler } = props;
  return (
    <li>
      <input
        value={skillItem}
        onChange={(event) => handleInputChange(event, index)}
      />
      <button type='button' onClick={() => removeSkillHandler(index)}>
        X
      </button>
    </li>
  );
};
