import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [postData, setPostData] = useState([]);
  return (
    <PostContext.Provider value={{ postData, setPostData }}>
      {props.children}
    </PostContext.Provider>
  );
};
