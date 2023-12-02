import { Container, Box, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { theme } from "../utils/theme";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import SortBar from "./SortBar";
import { fetchCollection } from "../utils/helper";
import { useContext } from "react";
import { PostContext } from "../utils/PostContext";
import { useParams } from "react-router-dom";

const Body = () => {
  const { currentUser } = useAuth();
  const { postData, setPostData } = useContext(PostContext);
  const type = useParams("id");
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = async () => {
    let result = await fetchCollection(postData, currentUser, "Posts");
    setPostData(result);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#dae0e6",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          rowGap: "2%",
        }}
      >
        <Container
          sx={{
            maxWidth: "1200px",
            margin: "0% auto",
            display: "flex",
            flexDirection: "column",
            rowGap: "2%",
          }}
        >
          {currentUser ? (
            <Box
              sx={{
                bgcolor: "white",
                border: "0.5px solid",
                borderColor: theme.palette.secondary.light,
                borderRadius: "2%",
                width: "75%",
                margin: "2% auto",
                py: "1%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <img
                alt="user"
                src={currentUser?.photoURL}
                style={{ width: "4%", height: "2%", borderRadius: "50%" }}
              ></img>
              <Link
                to="/submit"
                style={{ display: "inline-block", width: "75%" }}
              >
                <TextField
                  size="small"
                  placeholder="Create a Post"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      borderColor: theme.palette.secondary.light,
                    },
                  }}
                ></TextField>
              </Link>
              <AddLinkIcon sx={{ color: "grey", width: "4%", height: "2%" }} />
            </Box>
          ) : null}
          <SortBar />
          {!type.id &&
            postData.map((data) => (
              <PostCard
                key={data.name}
                id={data.id}
                name={data.name}
                description={data.description}
                community={data.subReddit}
                userName={data.userName}
                createdAt={data.createdAt}
                upVote={data.upVote}
                downVote={data.downVote}
              />
            ))}
        </Container>
      </div>
    </>
  );
};

export default Body;
