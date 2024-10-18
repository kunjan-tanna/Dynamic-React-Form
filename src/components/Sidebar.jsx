import React from "react";
import { Box, List, ListItem, ListItemText, Divider } from "@mui/material";

function Sidebar({ groups, setActiveGroupIndex }) {
  return (
    <>
      <Box
        sx={{ width: 250, backgroundColor: "#f4f4f4", p: 2, height: "100vh" }}
      >
        {groups?.map((group, index) => (
          <List key={index}>
            <ListItem
              button
              sx={{ cursor: "pointer" }}
              onClick={() => setActiveGroupIndex(index)}
            >
              <ListItemText primary={group.title} />
            </ListItem>
            <Divider />
          </List>
        ))}
      </Box>
    </>
  );
}

export default Sidebar;
