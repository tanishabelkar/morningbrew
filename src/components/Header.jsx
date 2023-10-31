import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Header(params) {
  const today = new Date();
  const date = today.getDate();
  const day = today.getDay();
  const month = today.getMonth();
  const year = today.getFullYear();
  const dayDict = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthDict = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontFamily: "DM Serif Display", fontSize: "35px" }}>
            Your Morning Brew
          </Typography>
          <Box>
            <Typography sx={{fontFamily: 'Oswald', fontWeight: '100'}}>{dayDict[day] + ", " + date + " " + monthDict[month]+"' "+year.toString().slice(2)}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
