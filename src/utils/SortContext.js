import { createContext, useState } from "react";

export const SortContext = createContext();

export const SortProvider = (props) => {
  const [sortLatest, setSortLatest] = useState(false);
  const [sortOldest, setSortOldest] = useState(false);
  const [sortPopular, setSortPopular] = useState(false);
  return (
    <SortContext.Provider
      value={{
        sortLatest,
        setSortLatest,
        sortOldest,
        setSortOldest,
        sortPopular,
        setSortPopular,
      }}
    >
      {props.children}
    </SortContext.Provider>
  );
};
