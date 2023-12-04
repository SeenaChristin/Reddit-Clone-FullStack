import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import PostCard from "./PostCard";
import Header from "./Header";
import CommentsContainer from "./CommentsContainer";

const SinglePostPage = () => {
  const postId = useParams("id");
  const id = postId.id;

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
