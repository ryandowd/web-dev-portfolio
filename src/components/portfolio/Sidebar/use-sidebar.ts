import { useState, useContext } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AuthContext } from '@/global/providers/use-auth';

export const useSidebar = () => {
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const { setIsEditing } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationFn: async (updatedSkills: string[]) => {
      setIsEditing(false);
      const response = await axios.post('/api/portfolio/skills', {
        skillsList: updatedSkills,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setSkillsList(data.skillsList);
    },
  });

  // const getSkillsQuery = useQuery({
  //   queryKey: ['skills'],
  //   queryFn: async () => {
  //     if (!staticSkillsList.length) {
  //       console.log('calling fetch');
  //       const response = await axios.get('/api/portfolio/skills');
  //       return response.data;
  //     }
  //   },
  //   onSuccess: (data) => {
  //     setSkillsList(data.skillsList);
  //   },
  //   refetchOnWindowFocus: false,
  // });

  async function formSubmitHandler(
    event: React.FormEvent<HTMLFormElement>,
    updatedSkillsList: string[]
  ) {
    event.preventDefault();
    mutate(updatedSkillsList);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    // inputSkillsList: string[], // FIX THIS BULLSHIT. REMEMBER: CUstom use hooks are NEW state, not shared state each time they are called. https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks#custom-hooks-let-you-share-stateful-logic-not-state-itself
    index?: number
  ) {
    const element = event.target as HTMLInputElement;

    setSkillsList((prevState) => {
      return prevState.map((skillItem, itemIndex) => {
        return itemIndex === index ? element.value : skillItem;
      });
    });
  }

  return {
    // isEditing,
    skillsList,
    // getSkillsQuery,
    setSkillsList,
    formSubmitHandler,
    // toggleIsEditingHandler,
    handleInputChange,
  };
};
