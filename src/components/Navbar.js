import React from "react";
import { Typography, AppBar, Toolbar } from "@mui/material";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            sx={{
              fontFamily: "Aladin",
              fontWeight: "bold",
            }}
            variant="h4"
          >
            King Cars
          </Typography>
          <Typography variant="p">{user.username}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
