import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../utils/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateModal = ({ onClose, onCreate }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #eee",
    borderRadius: "2%",
    boxShadow: 24,
    px: "2%",
    py: "1%",
  };
  const { currentUser } = useAuth();
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleAddData = async () => {
    const dbRef = doc(db, "Subreddit", data);
    const subredditData = {
      name: data,
      userId: currentUser.uid,
    };
    try {
      setLoader(true);
      await setDoc(dbRef, subredditData);
      setLoader(false);
      onCreate();
      onClose();
      navigate("/" + data);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <div>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a Comunity
          </Typography>
          <CloseIcon onClick={() => onClose()} />
        </Box>
        <Box>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            Name
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            sx={{ width: "90%" }}
            onChange={(e) => setData(e.target.value)}
          />

          <Button sx={{ my: "4%" }} onClick={() => handleAddData()}>
            {loader ? (
              <CircularProgress sx={{ my: "4%" }} />
            ) : (
              "Create Community"
            )}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default CreateModal;
