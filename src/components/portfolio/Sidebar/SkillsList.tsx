interface SkillsListProps {
  skillsList: string[];
}

export const SkillsList = (props: SkillsListProps) => {
  const { skillsList } = props;

  return (
    skillsList && (
      <ul>
        {skillsList.map((skillItem: string, index: number) => {
          return <li key={index}>{skillItem}</li>;
        })}
      </ul>
    )
  );
};
