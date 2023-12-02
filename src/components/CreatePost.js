import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  Tab,
  TextField,
  Button,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../services/firebaseConfig";
import { useAuth } from "../utils/AuthContext";
import React, { useState } from "react";
import { theme } from "../utils/theme";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { CollectionContext } from "../utils/CollectionContext";
import { useNavigate } from "react-router-dom";
import { CommunityContext } from "../utils/CommunityContext";

const PostBody = (props) => {
  let { title, setTitle, body, setBody, content } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <TextField
        size="small"
        label="Enter title"
        sx={{ mb: "1%" }}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></TextField>
      <TextField
        id="filled-multiline-flexible"
        label={content}
        multiline
        rows={5}
        maxRows={5}
        variant="filled"
        onChange={(event) => setBody(event.target.value)}
        value={body}
      ></TextField>
    </Box>
  );
};

const CreatePost = () => {
  const { currentUser } = useAuth();
  const [value, setValue] = React.useState("1");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { communityData } = useContext(CollectionContext);
  const { selectedComm, setSelectedComm } = useContext(CommunityContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddData = async () => {
    let postId = new Date().getTime().toString();
    const dbRef = doc(db, "Posts", postId);
    let postData = {
      id: postId,
      name: title,
      description: body,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      subReddit: selectedComm,
      createdAt: new Date(),
      upVote: 0,
      downVote: 0,
      comments: [],
      upVoteUsers: [],
      downVoteUsers: [],
    };
    try {
      setLoader(true);
      await setDoc(dbRef, postData);
      setLoader(false);
      setTitle("");
      setBody("");
      navigate("/" + selectedComm);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#dae0e6",
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        rowGap: "1%",
      }}
    >
      <Container sx={{ mt: "3%", mx: "3%" }}>
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "white",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h5" sx={{ mb: "1%" }}>
            Create a Post
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mt: "2%" }}>
          <Typography sx={{ mr: "1%", fontSize: "1.2rem", pt: "0.5%" }}>
            Choose a Community
          </Typography>
          <Select
            value={selectedComm}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: "40%", bgcolor: "white" }}
            size="small"
            onChange={(event) => {
              setSelectedComm(event.target.value);
            }}
          >
            {communityData &&
              communityData.map((data) => (
                <MenuItem key={data.name} value={data.name}>
                  {data.name}
                </MenuItem>
              ))}
          </Select>
        </Box>
        {selectedComm && (
          <Box
            sx={{
              width: "70%",
              typography: "body1",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Post" value="1" />
                  <Tab label="URL" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ pl: "0px" }}>
                <PostBody
                  content="Enter text"
                  title={title}
                  setTitle={setTitle}
                  body={body}
                  setBody={setBody}
                />
              </TabPanel>
              <TabPanel value="2" sx={{ pl: "0px" }}>
                <PostBody content="Enter Url" />
              </TabPanel>
            </TabContext>
            <Button
              sx={{
                width: "20%",
                bgcolor: theme.palette.primary.dark,
                color: "white",
              }}
              onClick={() => handleAddData()}
            >
              {loader ? (
                <CircularProgress sx={{ my: "4%", color: "white" }} />
              ) : (
                "Post"
              )}
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default CreatePost;
