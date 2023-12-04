import { Box, TextField } from "@mui/material";

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
        onChange={(event) => {
          setBody(event.target.value);
        }}
        value={body}
      ></TextField>
    </Box>
  );
};

export default PostBody;
