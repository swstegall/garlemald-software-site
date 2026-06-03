"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// STUB — replaced by the layout-chrome build step.
export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">Garlemald</Typography>
      </Toolbar>
    </AppBar>
  );
}
