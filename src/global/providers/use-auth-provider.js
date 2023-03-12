import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [isEditing, setIsEditing] = useState(false);

  function toggleIsEditingHandler() {
    setIsEditing(!isEditing);
  }

  const context = { isEditing, setIsEditing, toggleIsEditingHandler };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
