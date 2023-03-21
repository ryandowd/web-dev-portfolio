import { createContext, useState } from 'react';

export const IsEditingContext = createContext();

export const IsEditingProvider = (props) => {
  const { children } = props;
  const [isEditing, setIsEditing] = useState(false);

  function toggleIsEditingHandler() {
    setIsEditing(!isEditing);
  }

  const context = { isEditing, setIsEditing, toggleIsEditingHandler };

  return (
    <IsEditingContext.Provider value={context}>
      {children}
    </IsEditingContext.Provider>
  );
};
