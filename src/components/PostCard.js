import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import { formatDistanceToNow } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useContext } from "react";
import { PostContext } from "../utils/PostContext";
import { fetchCollection } from "../utils/helper";
import { useAuth } from "../utils/AuthContext";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router";
import { SortContext } from "../utils/SortContext";
import { storage } from "../services/firebaseConfig";
import { ref, getMetadata } from "firebase/storage";
const PATH =
  "https://firebasestorage.googleapis.com/v0/b/reddit-clone-609eb.appspot.com/o/";

const PostCard = (props) => {
  const { id } = props;
  const { postData, setPostData } = useContext(PostContext);
  const [imgPath, setImgPath] = useState("");
  const selectedPost = postData.filter((data) => data.id === id);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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
    comments,
  } = selectedPost[0];
  let title = name.replace(" ", "");
  const forestRef = ref(storage, "img" + title);
  getMetadata(forestRef)
    .then((metadata) => {
      setImgPath(metadata.fullPath);
    })
    .catch((error) => {
      // console.log("no such file");
    });

  let upVoteFlag = false;
  let downVoteFlag = false;
  let votesCount = upVote - downVote;
  if (upVoteUsers && upVoteUsers.indexOf(currentUser?.uid) !== -1) {
    upVoteFlag = true;
  }
  if (downVoteUsers && downVoteUsers.indexOf(currentUser?.uid) !== -1) {
    downVoteFlag = true;
  }
  const [userUpVote, setUserUpVote] = useState(upVoteFlag);
  const [userDownVote, setUserDownVote] = useState(downVoteFlag);
  const [totalVotes, setTotalVotes] = useState(votesCount);
  const { sortLatest, sortOldest, sortPopular } = useContext(SortContext);

  const dateObj = createdAt.toDate();
  const formattedDate = formatDistanceToNow(dateObj, { addSuffix: true });
  useEffect(() => {
    if (!(sortLatest || sortOldest || sortPopular)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalVotes]);
  const fetchData = async () => {
    let result = await fetchCollection([], currentUser, "Posts");
    setPostData(result);
  };
  const handleUpVote = async () => {
    if (!currentUser) {
      return;
    }
    const dbRef = doc(db, "Posts", id);
    if (!userUpVote && !userDownVote) {
      setUserUpVote(true);
      let updatedUpVote = upVote + 1;
      let updatedUpVoteUsers = [...upVoteUsers, currentUser.uid];
      await updateDoc(dbRef, {
        upVote: updatedUpVote,
        upVoteUsers: updatedUpVoteUsers,
      });
      let updatedTotalVotes = updatedUpVote - downVote;
      setTotalVotes(updatedTotalVotes);
    } else if (userUpVote && !userDownVote) {
      setUserUpVote(false);
      let updatedUpVote = upVote - 1;
      let updatedUpVoteUsers = upVoteUsers.filter(
        (userId) => userId !== currentUser.uid
      );
      await updateDoc(dbRef, {
        upVote: updatedUpVote,
        upVoteUsers: updatedUpVoteUsers,
      });
      let updatedTotalVotes = updatedUpVote - downVote;
      setTotalVotes(updatedTotalVotes);
    } else {
      setUserUpVote(true);
      setUserDownVote(false);
      let updatedUpVote = upVote + 1;
      let updatedDownVote = downVote - 1;
      let updatedUpVoteUsers = [...upVoteUsers, currentUser.uid];
      let updatedDownVoteUsers = downVoteUsers.filter(
        (userId) => userId !== currentUser.uid
      );
      await updateDoc(dbRef, {
        upVote: updatedUpVote,
        upVoteUsers: updatedUpVoteUsers,
        downVote: updatedDownVote,
        downVoteUsers: updatedDownVoteUsers,
      });
      let updatedTotalVotes = updatedUpVote - updatedDownVote;
      setTotalVotes(updatedTotalVotes);
    }
  };
  const handleDownVote = async () => {
    if (!currentUser) {
      return;
    }
    const dbRef = doc(db, "Posts", id);
    if (!userUpVote && !userDownVote) {
      setUserDownVote(true);
      let updatedDownVote = downVote + 1;
      let updatedUpDownUsers = [...downVoteUsers, currentUser.uid];
      await updateDoc(dbRef, {
        downVote: updatedDownVote,
        downVoteUsers: updatedUpDownUsers,
      });
      let updatedTotalVotes = upVote - updatedDownVote;
      setTotalVotes(updatedTotalVotes);
    } else if (!userUpVote && userDownVote) {
      setUserDownVote(false);
      let updatedDownVote = downVote - 1;
      let updatedDownVoteUsers = downVoteUsers.filter(
        (userId) => userId !== currentUser.uid
      );
      await updateDoc(dbRef, {
        downVote: updatedDownVote,
        downVoteUsers: updatedDownVoteUsers,
      });
      let updatedTotalVotes = upVote - updatedDownVote;
      setTotalVotes(updatedTotalVotes);
    } else {
      setUserDownVote(true);
      setUserUpVote(false);
      let updatedUpVote = upVote - 1;
      let updatedDownVote = downVote + 1;
      let updatedDownVoteUsers = [...downVoteUsers, currentUser.uid];
      let updatedUpVoteUsers = upVoteUsers.filter(
        (userId) => userId !== currentUser.uid
      );
      await updateDoc(dbRef, {
        upVote: updatedUpVote,
        upVoteUsers: updatedUpVoteUsers,
        downVote: updatedDownVote,
        downVoteUsers: updatedDownVoteUsers,
      });
      let updatedTotalVotes = updatedUpVote - updatedDownVote;
      setTotalVotes(updatedTotalVotes);
    }
  };
  // const updateUpVote = async () => {
  //   const dbRef = doc(db, "Posts", id);

  //   if (userUpVote) {
  //     let updatedVote = upVote + 1;
  //     let updatedUpVoteUsers = [...upVoteUsers, currentUser.uid];
  //     let updatedDownVoteUsers = downVoteUsers.filter(
  //       (userId) => userId !== currentUser.uid
  //     );
  //     await updateDoc(dbRef, {
  //       upVote: updatedVote,
  //       downVote: downVote,
  //       upVoteUsers: updatedUpVoteUsers,
  //       downVoteUsers: updatedDownVoteUsers,
  //     });
  //     setTotalVotes(upVote - downVote + 1);
  //   } else {
  //     let updatedUpVoteUsers = upVoteUsers.filter(
  //       (userId) => userId !== currentUser.uid
  //     );
  //     let updatedVote = upVote;
  //     await updateDoc(dbRef, {
  //       upVote: updatedVote,
  //       upVoteUsers: updatedUpVoteUsers,
  //     });
  //     setTotalVotes(upVote - downVote);
  //   }
  // };
  // const updateDownVote = async () => {
  //   const dbRef = doc(db, "Posts", id);

  //   if (userDownVote) {
  //     let updatedVote = downVote + 1;
  //     let updatedDownVoteUsers = [...downVoteUsers, currentUser.uid];
  //     let updatedUpVoteUsers = upVoteUsers.filter(
  //       (userId) => userId !== currentUser.uid
  //     );
  //     await updateDoc(dbRef, {
  //       downVote: updatedVote,
  //       upVote: upVote,
  //       upVoteUsers: updatedUpVoteUsers,
  //       downVoteUsers: updatedDownVoteUsers,
  //     });
  //     setTotalVotes(upVote - downVote - 1);
  //   } else {
  //     let updatedVote = downVote;
  //     let updatedDownVoteUsers = downVoteUsers.filter(
  //       (userId) => userId !== currentUser.uid
  //     );
  //     await updateDoc(dbRef, {
  //       downVote: updatedVote,
  //       downVoteUsers: updatedDownVoteUsers,
  //     });
  //     setTotalVotes(upVote - downVote);
  //   }
  // };
  // const handleUpvote = () => {
  //   setUserUpVote((prev) => !prev);
  //   setUserDownVote(true);
  //   updateUpVote();
  // };
  // const handleDownvote = () => {
  //   setUserDownVote((prev) => !prev);
  //   setUserUpVote(true);
  //   updateDownVote();
  // };
  const openSinglePost = (id) => {
    navigate("/Post/" + id);
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
          {!userUpVote || !currentUser ? (
            <UploadIcon
              sx={{ color: "grey", cursor: "pointer" }}
              onClick={() => handleUpVote()}
            />
          ) : (
            currentUser && (
              <UploadIcon
                sx={{ color: "#e65100", cursor: "pointer" }}
                onClick={() => handleUpVote()}
              />
            )
          )}

          <div style={{ padding: "10% 0" }}>{totalVotes}</div>
          {!userDownVote || !currentUser ? (
            <DownloadIcon
              sx={{ color: "grey", cursor: "pointer" }}
              onClick={() => handleDownVote()}
            />
          ) : (
            currentUser && (
              <DownloadIcon
                sx={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleDownVote()}
              />
            )
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
            {description.startsWith("http") ? (
              <a href={description} target="_blank" rel="noreferrer">
                {description}
              </a>
            ) : (
              <Typography>{description}</Typography>
            )}
          </Box>
          <Box>
            {imgPath ? (
              <img
                src={PATH + imgPath + "?&alt=media"}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            ) : null}
          </Box>
          <Box sx={{ display: "flex", width: "50%" }}>
            <ChatBubbleOutlineIcon
              sx={{ mr: "2%" }}
              onClick={() => openSinglePost(id)}
            ></ChatBubbleOutlineIcon>
            <Typography>
              {" "}
              {comments && Object.keys(comments).length + " Comments"}
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default PostCard;
