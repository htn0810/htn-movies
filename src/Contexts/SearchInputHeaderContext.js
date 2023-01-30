import { createContext, useContext, useState } from "react";

const SearchInputHeader = createContext({});

export const SearchInputHeaderProvider = ({ children, ...props }) => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [dropdownName, setDropdownName] = useState("Kind...?");
  // useEffect(() => {}, []);
  return (
    <SearchInputHeader.Provider
      value={{
        inputSearchValue,
        setInputSearchValue,
        dropdownName,
        setDropdownName,
      }}
      {...props}
    >
      {children}
    </SearchInputHeader.Provider>
  );
};

export const useSearchInput = () => {
  const context = useContext(SearchInputHeader);
  if (typeof context === "undefined")
    throw new Error(
      "useSearchInput must be used within SearchInputHeaderProvider"
    );
  return context;
};
