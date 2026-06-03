"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// STUB — replaced by the layout-chrome build step.
export default function Footer() {
  return (
    <Box component="footer" sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        Garlemald
      </Typography>
    </Box>
  );
}
