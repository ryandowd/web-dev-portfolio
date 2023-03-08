import { useContext } from 'react';
import { SidebarNav } from './SidebarNav';
import { useSession } from 'next-auth/react';
// import { SidebarIntro } from './SidebarIntro';
import { AuthContext } from '@/global/providers/use-auth';

import { useSidebar } from './use-sidebar';

import classes from './Sidebar.module.scss';
import { SkillsForm } from './SkillsForm';
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
  const { data: session, status } = useSession();
  const { skillsList, setSkillsList, handleInputChange } = props;
  const { isEditing, toggleIsEditingHandler } = useContext(AuthContext);

  const { formSubmitHandler } = useSidebar();

  return (
    <div className={classes.sidebar}>
      <SidebarNav />
      {session && (
        <button onClick={toggleIsEditingHandler}>
          {isEditing ? 'Finish editing' : 'Go to edit mode'}
        </button>
      )}
      {/* <SidebarIntro /> */}

      {skillsList && !isEditing && <SkillsList skillsList={skillsList} />}

      {isEditing && (
        <SkillsForm
          skillsList={skillsList}
          setSkillsList={setSkillsList}
          formSubmitHandler={formSubmitHandler}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};
