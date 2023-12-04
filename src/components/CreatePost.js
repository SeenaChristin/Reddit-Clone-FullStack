import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  Tab,
  Button,
  Input,
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
import PostBody from "./PostBody";
import { storage } from "../services/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

const CreatePost = () => {
  const { currentUser } = useAuth();
  const [value, setValue] = React.useState("1");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { communityData } = useContext(CollectionContext);
  const { selectedComm, setSelectedComm } = useContext(CommunityContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      let name = title.replace(" ", "");
      const imageRef = ref(storage, "img" + name);
      const metadata = {
        contentType: "image",
      };
      const uploadTask = uploadBytes(imageRef, selectedImage, metadata);
      console.log(uploadTask);
    } else {
      console.error("No image selected");
    }
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
      comments: {},
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
                  <Tab label="Image" value="3" />
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
                <PostBody
                  content="Enter Url"
                  title={title}
                  setTitle={setTitle}
                  body={body}
                  setBody={setBody}
                />
              </TabPanel>
              <TabPanel value="3" sx={{ pl: "0px" }}>
                <PostBody
                  content="Whats this image about?"
                  title={title}
                  setTitle={setTitle}
                  body={body}
                  setBody={setBody}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    sx={{ p: "1%" }}
                  />
                  <Button
                    onClick={handleUpload}
                    sx={{
                      width: "20%",
                      bgcolor: theme.palette.primary.dark,
                      color: "white",
                      mt: "1.5%",
                      mx: "1%",
                      height: "2%",
                    }}
                  >
                    Upload
                  </Button>
                  {selectedImage && (
                    <div>
                      <p>Selected Image Preview:</p>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </Box>
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
