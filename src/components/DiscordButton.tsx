"use client";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { DISCORD_INVITE_URL } from "@/lib/projects";

const DISCORD_BLURPLE = "#5865F2";

/** Discord's brand glyph as an inline SVG (MUI ships no Discord icon). */
function DiscordLogo(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 127.14 96.36" {...props}>
      <path
        fill="currentColor"
        d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z"
      />
    </SvgIcon>
  );
}

export interface DiscordButtonProps {
  variant?: "contained" | "outlined" | "chip" | "icon";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  label?: string;
}

export default function DiscordButton({
  variant = "contained",
  size = "medium",
  fullWidth = false,
  label = "Join the Discord",
}: DiscordButtonProps) {
  if (variant === "icon") {
    const iconSize: "small" | "medium" | "large" =
      size === "large" ? "large" : size;
    return (
      <Tooltip title={label}>
        <IconButton
          component="a"
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          size={iconSize}
          sx={{ color: DISCORD_BLURPLE }}
        >
          <DiscordLogo fontSize={iconSize === "large" ? "medium" : "small"} />
        </IconButton>
      </Tooltip>
    );
  }

  if (variant === "chip") {
    const chipSize: "small" | "medium" = size === "small" ? "small" : "medium";
    return (
      <Chip
        component="a"
        href={DISCORD_INVITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        clickable
        size={chipSize}
        variant="outlined"
        icon={
          <DiscordLogo
            sx={{ color: `${DISCORD_BLURPLE} !important`, ml: 0.5 }}
            fontSize="small"
          />
        }
        label={label}
        aria-label={label}
        sx={{
          borderColor: DISCORD_BLURPLE,
          color: "text.primary",
          "&:hover": { bgcolor: "rgba(88,101,242,0.12)" },
        }}
      />
    );
  }

  // "contained" | "outlined" — MUI Button.
  const buttonSize: "small" | "medium" | "large" = size;
  const isOutlined = variant === "outlined";
  return (
    <Button
      component="a"
      href={DISCORD_INVITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      variant={isOutlined ? "outlined" : "contained"}
      size={buttonSize}
      fullWidth={fullWidth}
      startIcon={<DiscordLogo fontSize="small" />}
      sx={
        isOutlined
          ? {
              borderColor: DISCORD_BLURPLE,
              color: DISCORD_BLURPLE,
              "&:hover": {
                borderColor: DISCORD_BLURPLE,
                bgcolor: "rgba(88,101,242,0.12)",
              },
            }
          : {
              bgcolor: DISCORD_BLURPLE,
              color: "#fff",
              "&:hover": { bgcolor: "#4752C4" },
            }
      }
    >
      {label}
    </Button>
  );
}
