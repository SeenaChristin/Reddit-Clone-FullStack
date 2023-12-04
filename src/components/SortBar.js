import React from "react";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { PostContext } from "../utils/PostContext";
import { SortContext } from "../utils/SortContext";

const SortBar = () => {
  const { postData, setPostData } = useContext(PostContext);
  const { setSortLatest, setSortOldest, setSortPopular } =
    useContext(SortContext);
  const sortByLatest = () => {
    const sortedByLatest = postData
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt);
    setPostData(sortedByLatest);
    setSortLatest(true);
  };
  const sortByOldest = () => {
    const sortedByLatest = postData
      .slice()
      .sort((a, b) => a.createdAt - b.createdAt);
    setPostData(sortedByLatest);
    setSortOldest(true);
  };
  const sortByPopular = () => {
    const sortedByLatest = postData
      .slice()
      .sort((a, b) => b.upVote - b.downVote - (a.upVote - a.downVote));
    setPostData(sortedByLatest);
    setSortPopular(true);
  };
  return (
    <div
      style={{
        padding: "0% 1% 1% 1%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "1px solid #1976d2",
          mx: "2%",
          "&:hover": {
            bgcolor: "#a3c7eb",
          },
        }}
      >
        <Button onClick={() => sortByLatest()}>Latest</Button>
      </Box>
      <Box
        sx={{
          border: "1px solid #1976d2",
          mx: "2%",
          "&:hover": {
            bgcolor: "#a3c7eb",
          },
        }}
      >
        <Button onClick={() => sortByOldest()}>Oldest</Button>
      </Box>
      <Box
        sx={{
          border: "1px solid #1976d2",
          mx: "2%",
          "&:hover": {
            bgcolor: "#a3c7eb",
          },
        }}
      >
        <Button onClick={() => sortByPopular()}>Popular</Button>
      </Box>
    </div>
  );
};

export default SortBar;
