import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AuthContext } from '@/global/providers/use-auth-provider';

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

  async function formSubmitHandler(
    event: React.FormEvent<HTMLFormElement>,
    updatedSkillsList: string[]
  ) {
    event.preventDefault();
    mutate(updatedSkillsList);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
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
    skillsList,
    setSkillsList,
    formSubmitHandler,
    handleInputChange,
  };
};
