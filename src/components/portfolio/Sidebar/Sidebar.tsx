import { useContext } from 'react';
import { SidebarNav } from './SidebarNav';
import { SidebarIntro } from './SidebarIntro';
import { AuthContext } from '@/global/providers/use-auth';

import { useSidebar } from './use-sidebar';

import classes from './Sidebar.module.scss';
import { SkillsListUpdateForm } from './SkillsListUpdateForm';
import { SkillsList } from './SkillsList';

interface SidebarProps {
  skillsList: string[];
  setSkillsList: React.Dispatch<React.SetStateAction<string[]>>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
}

export const Sidebar = (props: SidebarProps) => {
  const { skillsList, setSkillsList, handleInputChange } = props;
  const { isEditing, toggleIsEditingHandler } = useContext(AuthContext);

  const { formSubmitHandler } = useSidebar();

  return (
    <div className={classes.sidebar}>
      <SidebarNav />
      <button onClick={toggleIsEditingHandler}>
        {isEditing ? 'Finish editing' : 'Go to edit mode'}
      </button>
      {/* <SidebarIntro /> */}

      {skillsList && !isEditing && <SkillsList skillsList={skillsList} />}

      {isEditing && (
        <SkillsListUpdateForm
          skillsList={skillsList}
          setSkillsList={setSkillsList}
          formSubmitHandler={formSubmitHandler}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};
