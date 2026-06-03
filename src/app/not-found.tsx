"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";

import { withBase } from "@/lib/projects";
import DiscordButton from "@/components/DiscordButton";

export default function NotFound() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 10, md: 16 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={withBase("/brand/garlemald-emblem.png")}
        alt=""
        aria-hidden
        sx={{
          height: 72,
          width: "auto",
          mb: 3,
          opacity: 0.55,
          filter: "drop-shadow(0 6px 20px rgba(63,185,80,0.18))",
        }}
      />

      <Typography
        component="p"
        sx={{
          fontWeight: 800,
          lineHeight: 1,
          fontSize: { xs: "5rem", sm: "7rem" },
          letterSpacing: "-0.04em",
          background: "linear-gradient(135deg, #3FB950, #1CC8B6)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        404
      </Typography>

      <Typography variant="h5" component="h1" sx={{ mt: 1, mb: 1.5 }}>
        This page warped to a zone that doesn&apos;t exist.
      </Typography>

      <Typography
        sx={{ color: "text.secondary", lineHeight: 1.7, maxWidth: "46ch", mb: 4 }}
      >
        The link may be broken, or the page may have moved. Let&apos;s get you
        back to Eorzea.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          width: { xs: "100%", sm: "auto" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          component={Link}
          href="/"
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Back to Home
        </Button>
        <Button
          component={Link}
          href="/#projects"
          variant="outlined"
          size="large"
          startIcon={<GridViewIcon />}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Browse Projects
        </Button>
        <DiscordButton variant="outlined" size="large" />
      </Stack>
    </Container>
  );
}
