import { createContext, useState } from "react";

export const VotesContext = createContext();

export const VotesProvider = (props) => {
  const [userUpVote, setUserUpVote] = useState(true);
  const [userDownVote, setUserDownVote] = useState(true);
  return (
    <VotesContext.Provider
      value={{ userUpVote, setUserUpVote, userDownVote, setUserDownVote }}
    >
      {props.children}
    </VotesContext.Provider>
  );
};
