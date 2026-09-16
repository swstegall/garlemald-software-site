"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DiscordButton from "@/components/DiscordButton";

// Site-wide transition notice: Bahamut is the new home of the maintainer's
// FFXIV 1.23b development, and its Discord replaces the Garlemald one.
export default function BahamutNotice() {
  return (
    <Box
      component="aside"
      aria-label="Bahamut announcement"
      sx={{
        bgcolor: "rgba(88,101,242,0.14)",
        borderBottom: "1px solid rgba(88,101,242,0.35)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 1.25 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1.25, md: 3 }}
          sx={{ alignItems: { xs: "flex-start", md: "center" } }}
        >
          <Typography variant="body2" sx={{ flex: 1, lineHeight: 1.6 }}>
            <Box component="strong" sx={{ color: "text.primary" }}>
              Bahamut is the new home of the FINAL FANTASY XIV 1.23b
              development I am working on moving forward.
            </Box>{" "}
            If you&apos;d like to participate as a developer or tester, or try
            our hosted server, join our Discord.
          </Typography>
          <Box sx={{ flexShrink: 0 }}>
            <DiscordButton
              variant="contained"
              size="small"
              label="Join the Bahamut Discord"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
