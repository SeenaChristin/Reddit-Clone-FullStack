import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Modal,
  Select,
  MenuItem,
} from "@mui/material";
import logo from "../images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { theme } from "../utils/theme";
import { signInWithGoogle, signOutAcc } from "../services/authentication";
import { useAuth } from "../utils/AuthContext";
import CreateModal from "./CreateModal";
import HomeIcon from "@mui/icons-material/Home";
import { fetchCollection } from "../utils/helper";
import { useContext } from "react";
import { CollectionContext } from "../utils/CollectionContext";
import { CommunityContext } from "../utils/CommunityContext";
import { useParams } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const type = useParams("id");
  const { communityData, setCommunityData } = useContext(CollectionContext);
  const { selectedComm, setSelectedComm } = useContext(CommunityContext);

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }

    if (type.id) {
      setSelectedComm(type.id);
    } else {
      setSelectedComm("Home");
    }
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    let result = await fetchCollection(communityData, currentUser, "Subreddit");
    setCommunityData(result);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "1% auto",
        height: "40px",
      }}
    >
      <Box sx={{ textAlign: "start", width: "10%" }}>
        <img alt="logo" src={logo} style={{ width: "100%" }}></img>
      </Box>
      <HomeIcon sx={{ width: "3%", height: "100%" }} />
      <Select
        value={selectedComm}
        inputProps={{ "aria-label": "Without label" }}
        sx={{ width: "10%" }}
        onChange={(event) => {
          setSelectedComm(event.target.value);
        }}
      >
        <MenuItem value="Home">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </MenuItem>

        {communityData &&
          communityData.map((data) => (
            <MenuItem key={data.name} value={data.name}>
              <Link
                to={"/" + data.name}
                key={data.name}
                style={{ textDecoration: "none", color: "black" }}
              >
                {data.name}
              </Link>
            </MenuItem>
          ))}
      </Select>
      <TextField
        size="small"
        sx={{ width: "25%", height: "0.5%" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      >
        {" "}
      </TextField>
      {currentUser ? (
        <Button
          sx={{
            bgcolor: theme.palette.secondary.main,
            color: "white",
            "&:hover": {
              bgcolor: theme.palette.secondary.dark,
            },
          }}
          onClick={handleOpen}
        >
          Create a SubReddit
        </Button>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateModal onClose={handleClose} onCreate={fetchCollection} />
      </Modal>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22%",
        }}
      >
        {currentUser ? (
          <img
            alt="user"
            src={currentUser.photoURL}
            style={{ height: "80%", width: "15%" }}
          ></img>
        ) : (
          <PersonIcon sx={{ mx: "5%" }} />
        )}
        {currentUser ? (
          <Typography sx={{ mx: "5%" }}>{currentUser.displayName}</Typography>
        ) : null}

        <Button
          sx={{
            bgcolor: theme.palette.secondary.main,
            color: "white",
            "&:hover": {
              bgcolor: theme.palette.secondary.dark,
            },
          }}
          onClick={() => (currentUser ? signOutAcc() : signInWithGoogle())}
        >
          {currentUser ? " LogOut" : "LogIn"}
        </Button>
      </Box>
    </Container>
  );
};

export default Header;
