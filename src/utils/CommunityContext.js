import { createContext, useState } from "react";

export const CommunityContext = createContext();

export const CommunityProvider = (props) => {
  const [selectedComm, setSelectedComm] = useState("Home");
  return (
    <CommunityContext.Provider value={{ selectedComm, setSelectedComm }}>
      {props.children}
    </CommunityContext.Provider>
  );
};
