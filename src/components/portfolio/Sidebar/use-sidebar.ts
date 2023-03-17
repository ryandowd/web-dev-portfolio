import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '@/global/context/use-auth-provider';

export const useSidebar = () => {
  const [skills, setSkills] = useState<string[]>([]);
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
      setSkills(data.skillsList);
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
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index?: number
  ) {
    const element = event.target;

    setSkills((prevState) => {
      return prevState.map((skillItem, itemIndex) => {
        return itemIndex === index ? element.value : skillItem;
      });
    });
  }

  return {
    skills,
    setSkills,
    formSubmitHandler,
    handleInputChange,
  };
};
