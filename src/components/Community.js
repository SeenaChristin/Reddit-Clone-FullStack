import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../utils/PostContext";
import { fetchCollection } from "../utils/helper";
import { useAuth } from "../utils/AuthContext";
import Main from "./Main";

const Community = () => {
  const { postData, setPostData } = useContext(PostContext);
  const type = useParams("id");
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = async () => {
    let result = await fetchCollection(postData, currentUser, "Posts");
    setPostData(result);
  };
  return (
    <div>
      <Main />
      <div
        style={{
          backgroundColor: "#dae0e6",
          display: "flex",
          flexDirection: "column",
          rowGap: "2%",
          height: "100vh",
        }}
      >
        {postData.map((data) =>
          data.subReddit === type.id ? (
            <PostCard
              name={data.name}
              id={data.id}
              description={data.description}
              community={data.subReddit}
              userName={data.userName}
              createdAt={data.createdAt}
              upVote={data.upVote}
              downVote={data.downVote}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Community;
