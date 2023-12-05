import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import PostCard from "./PostCard";
import Header from "./Header";
import CommentsContainer from "./CommentsContainer";
import { fetchCollection } from "../utils/helper";
import { useAuth } from "../utils/AuthContext";
import { useContext } from "react";
import { PostContext } from "../utils/PostContext";

const SinglePostPage = () => {
  const postId = useParams("id");
  const { currentUser } = useAuth();
  const { postData, setPostData } = useContext(PostContext);
  const id = postId.id;
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData]);
  const fetchData = async () => {
    let result = await fetchCollection([], currentUser, "Posts");
    setPostData(result);
  };
  return (
    <div>
      <Header></Header>
      <Container sx={{ mt: "2%" }}>
        <PostCard id={id}></PostCard>
        <CommentsContainer id={id} />
      </Container>
    </div>
  );
};

export default SinglePostPage;
