import { createContext, useState } from "react";

export const CollectionContext = createContext();

export const CollectionProvider = (props) => {
  const [communityData, setCommunityData] = useState([]);
  return (
    <CollectionContext.Provider value={{ communityData, setCommunityData }}>
      {props.children}
    </CollectionContext.Provider>
  );
};
