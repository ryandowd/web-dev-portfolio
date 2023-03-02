import axios from 'axios';
import { FunctionComponent, useRef, useState } from 'react';
import { SidebarNav } from './SidebarNav';
import { SidebarIntro } from './SidebarIntro';

import classes from './Sidebar.module.scss';
import { useQuery, useMutation } from '@tanstack/react-query';

export const Sidebar: FunctionComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillsList, setSkillsList] = useState<string[]>([]);

  const getSkillsQuery = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const response = await axios.get('/api/portfolio/skills');
      return response.data;
    },
    onSuccess: (data) => {
      setSkillsList(data.skillsList);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (updatedSkills: string[]) => {
      setIsEditing(false);
      const response = await axios.post('/api/portfolio/skills', updatedSkills);
      return response.data;
    },
    onSuccess: (data) => {
      setSkillsList(data.skillsList);
    },
  });

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(skillsList);
  };

  const toggleIsEditingHandler = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const element = event.target as HTMLInputElement;

    setSkillsList((prevState) => {
      return prevState.map((skillItem, itemIndex) => {
        return itemIndex === index ? element.value : skillItem;
      });
    });
  };

  return (
    <div className={classes.sidebar}>
      <SidebarNav />
      <button onClick={toggleIsEditingHandler}>
        {isEditing ? 'In edit mode' : 'Go to edit mode'}
      </button>
      {/* <SidebarIntro /> */}

      {getSkillsQuery.isLoading && <h1>Loading...</h1>}
      {!getSkillsQuery.isLoading &&
        (isEditing ? (
          <>
            <h1>Blah Blah</h1>
            <form onSubmit={formSubmitHandler}>
              <ul>
                {skillsList.map((skillItem: string, index: number) => {
                  return (
                    <li key={index}>
                      <label>{index}</label>
                      <input
                        value={skillItem || skillItem}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </li>
                  );
                })}
              </ul>
              <button type='submit'>Update skills</button>
            </form>
          </>
        ) : (
          <ul>
            {skillsList.map((skillItem, index) => {
              return <li key={index}>{skillItem}</li>;
            })}
          </ul>
        ))}
    </div>
  );
};
