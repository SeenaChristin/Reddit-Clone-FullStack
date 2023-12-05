import React, { useState } from "react";
import { Container, TextField, Typography, Button } from "@mui/material";
import { useAuth } from "../utils/AuthContext";
import { useContext } from "react";
import { PostContext } from "../utils/PostContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import CommentCard from "./CommentCard";
import { fetchCollection } from "../utils/helper";

const CommentsContainer = (props) => {
  const [userComment, setUserComment] = useState("");
  const { currentUser } = useAuth();
  const { id } = props;
  const { postData, setPostData } = useContext(PostContext);
  const selectedPost = postData.filter((data) => data.id === id);
  const { comments } = selectedPost[0];

  const handleAddComment = async () => {
    const dbRef = doc(db, "Posts", id);
    let userName = currentUser?.displayName;
    await updateDoc(dbRef, {
      [`comments.${userName}`]: userComment,
    });
    setUserComment("");
    fetchData();
  };
  const fetchData = async () => {
    let result = await fetchCollection([], "", "Posts");
    setPostData(result);
  };
  return (
    <div>
      {currentUser && (
        <Container
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ textAlign: "start", mb: "1%", pl: "2%" }}>
            Comment as : {currentUser?.displayName}
          </Typography>
          <TextField
            id="filled-multiline-flexible"
            label={"What are your thoughts"}
            multiline
            rows={5}
            maxRows={5}
            variant="filled"
            onChange={(event) => {
              setUserComment(event.target.value);
            }}
            value={userComment}
          ></TextField>
          <Button
            sx={{ bgcolor: "#dae0e6" }}
            onClick={() => {
              handleAddComment();
            }}
          >
            Comment
          </Button>
        </Container>
      )}
      <CommentCard comments={comments}></CommentCard>
    </div>
  );
};

export default CommentsContainer;
