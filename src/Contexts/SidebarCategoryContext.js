import { createContext, useContext, useState } from "react";

const SidebarCategory = createContext({});

export const SidebarCategoryProvider = ({ children, ...props }) => {
  const [focusOneCategory, setFocusOneCategory] = useState([0, 1, 1, 1]);
  return (
    <SidebarCategory.Provider
      value={{ focusOneCategory, setFocusOneCategory }}
      {...props}
    >
      {children}
    </SidebarCategory.Provider>
  );
};

export const useSidebarCategory = () => {
  const context = useContext(SidebarCategory);
  if (typeof context === "undefined")
    throw new Error(
      "useSidebarCategory must be used within SidebarCategoryProvider"
    );
  return context;
};
