import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordHidden(!passwordHidden);
  };

  return {
    passwordHidden,
    handlePasswordVisibility,
  };
};
