import { Container, Typography, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import { PostContext } from "../utils/PostContext";

const CommentCard = (props) => {
  const { comments } = props;
  let commentsArr = Object.entries(comments);
  const { postData } = useContext(PostContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData]);

  return (
    <div style={{ margin: "1% 0" }}>
      <Container sx={{ width: "75%", mt: "1%" }}>
        {comments &&
          commentsArr.map((comment) => (
            <Box sx={{ bgcolor: "#dae0e6", mb: "1%" }}>
              <Typography
                sx={{
                  textAlign: "start",
                  px: "1%",
                  pb: "0.5%",
                  pt: "1%",
                  fontWeight: "500",
                }}
              >
                {comment[0]}
              </Typography>
              <Typography
                sx={{
                  textAlign: "start",
                  px: "2%",
                  pt: "0.5%",
                  pb: "1.5%",
                  fontWeight: "300",
                }}
              >
                {comment[1]}
              </Typography>
            </Box>
          ))}
      </Container>
    </div>
  );
};

export default CommentCard;
