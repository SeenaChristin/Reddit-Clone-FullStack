import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import { format } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useContext } from "react";
import { PostContext } from "../utils/PostContext";
import { fetchCollection } from "../utils/helper";
import { useAuth } from "../utils/AuthContext";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const PostCard = (props) => {
  const { id } = props;
  const { postData, setPostData } = useContext(PostContext);
  const selectedPost = postData.filter((data) => data.id === id);
  const { currentUser } = useAuth();
  const {
    name,
    description,
    subReddit,
    userName,
    createdAt,
    upVote,
    downVote,
    upVoteUsers,
    downVoteUsers,
  } = selectedPost[0];
  if (id === "1701424321862") {
    console.log(upVote + " " + downVote);
  }
  let upVoteFlag = true;
  let downVoteFlag = true;
  let votesCount = upVote - downVote;
  if (upVoteUsers && upVoteUsers.indexOf(currentUser?.uid) !== -1) {
    upVoteFlag = false;
  }
  if (downVoteUsers && downVoteUsers.indexOf(currentUser?.uid) !== -1) {
    downVoteFlag = false;
  }
  const [userUpVote, setUserUpVote] = useState(upVoteFlag);
  const [userDownVote, setUserDownVote] = useState(downVoteFlag);
  const [totalVotes, setTotalVotes] = useState(votesCount);
  const dateObj = createdAt.toDate();
  const formattedDate = format(dateObj, "yyyy-MM-dd HH:mm:ss");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let result = await fetchCollection([], currentUser, "Posts");
    setPostData(result);
  };
  const updateUpVote = async () => {
    const dbRef = doc(db, "Posts", id);

    if (userUpVote) {
      let updatedVote = upVote + 1;
      let updatedUpVoteUsers = [...upVoteUsers, currentUser.uid];
      let updatedDownVoteUsers = downVoteUsers.filter(
        (userId) => userId !== currentUser.uid
      );
      await updateDoc(dbRef, {
        upVote: updatedVote,
        downVote: downVote,
        upVoteUsers: updatedUpVoteUsers,
        downVoteUsers: updatedDownVoteUsers,
      });
      setTotalVotes(upVote - downVote + 1);
    } else {
      let updatedUpVoteUsers = upVoteUsers.filter(
        (userId) => userId !== currentUser.uid
      );
      let updatedVote = upVote;
      await updateDoc(dbRef, {
        upVote: updatedVote,
        upVoteUsers: updatedUpVoteUsers,
      });
      setTotalVotes(upVote - downVote);
    }
  };
  const updateDownVote = async () => {
    const dbRef = doc(db, "Posts", id);

    if (userDownVote) {
      let updatedVote = downVote + 1;
      let updatedDownVoteUsers = [...downVoteUsers, currentUser.uid];
      let updatedUpVoteUsers = upVoteUsers.filter(
        (userId) => userId !== currentUser.uid
      );
      await updateDoc(dbRef, {
        downVote: updatedVote,
        upVote: upVote,
        upVoteUsers: updatedUpVoteUsers,
        downVoteUsers: updatedDownVoteUsers,
      });
      setTotalVotes(upVote - downVote - 1);
    } else {
      let updatedVote = downVote;
      let updatedDownVoteUsers = downVoteUsers.filter(
        (userId) => userId !== currentUser.uid
      );
      await updateDoc(dbRef, {
        downVote: updatedVote,
        downVoteUsers: updatedDownVoteUsers,
      });
      setTotalVotes(upVote - downVote);
    }
  };
  const handleUpvote = () => {
    setUserUpVote((prev) => !prev);
    setUserDownVote(true);
    updateUpVote();
  };
  const handleDownvote = () => {
    setUserDownVote((prev) => !prev);
    setUserUpVote(true);
    updateDownVote();
  };

  return (
    <div style={{ marginBottom: "1%" }}>
      <Container
        sx={{
          border: "1px solid #b1b6ba",
          maxWidth: "1200px",
          margin: "0% auto",
          width: "70%",
          bgcolor: "white",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "2%",
            bgcolor: "#dae0e6",
          }}
        >
          {userUpVote ? (
            <UploadIcon sx={{ color: "grey" }} onClick={() => handleUpvote()} />
          ) : (
            <UploadIcon
              sx={{ color: "#e65100" }}
              onClick={() => handleUpvote()}
            />
          )}

          <div style={{ padding: "10% 0" }}>{totalVotes}</div>
          {userDownVote ? (
            <DownloadIcon
              sx={{ color: "grey" }}
              onClick={() => handleDownvote()}
            />
          ) : (
            <DownloadIcon
              sx={{ color: "blue" }}
              onClick={() => handleDownvote()}
            />
          )}
        </Box>
        <Box
          sx={{
            p: "2%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              borderBottom: "1px solid grey",
              pb: "1.5%",
            }}
          >
            <Typography
              sx={{ mr: "5%", fontWeight: "500", fontSize: "1.2rem" }}
            >
              {subReddit}
            </Typography>
            <Typography sx={{ mr: "1%", color: "#383737" }}>
              Posted by:
            </Typography>
            <Typography sx={{ color: "grey", mr: "3%" }}>{userName}</Typography>
            <Typography sx={{ mr: "1%", color: "#383737" }}>
              Created at:{" "}
            </Typography>
            <Typography sx={{ color: "grey" }}>{formattedDate}</Typography>
          </Box>
          <Box sx={{ fontSize: "1.3rem", my: "2%", fontWeight: "500" }}>
            {name}
          </Box>
          <Box
            sx={{
              textAlign: "start",
              my: "2%",
              letterSpacing: "0.05rem",
              fontSize: "0.9rem",
              color: "#363535",
            }}
          >
            {description}
          </Box>
          <ChatBubbleOutlineIcon />
        </Box>
      </Container>
    </div>
  );
};

export default PostCard;
