import { Typography } from "@mui/material";
import React from "react";

export default function Header() {
   return (
      <div className="Header__main">
         <Typography
            variant="h2"
            component="h2"
            className="Header__text"
            sx={{
               bgcolor: "secondary.main",
            }}
         >
            Covid-19 Tracker
         </Typography>
      </div>
   );
}
