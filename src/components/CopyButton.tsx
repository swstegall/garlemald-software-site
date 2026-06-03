"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export interface CopyButtonProps {
  /** Raw text written to the clipboard on click. */
  text: string;
  /** Icon-button size. */
  size?: "small" | "medium";
  /** Tooltip text shown in the idle state (default: "Copy"). */
  tooltip?: string;
  /** Accessible label for the button. */
  ariaLabel?: string;
}

/**
 * A compact clipboard-copy button. Shows a check mark + "Copied!" tooltip for
 * ~1.5s after a successful copy, then reverts. Styled to sit unobtrusively on
 * top of code blocks. Fails soft when `navigator.clipboard` is unavailable.
 */
export default function CopyButton({
  text,
  size = "small",
  tooltip = "Copy",
  ariaLabel = "Copy to clipboard",
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = React.useCallback(async () => {
    if (
      typeof navigator === "undefined" ||
      !navigator.clipboard ||
      typeof navigator.clipboard.writeText !== "function"
    ) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard write can reject (permissions / insecure context); ignore.
    }
  }, [text]);

  return (
    <Tooltip title={copied ? "Copied!" : tooltip} arrow>
      <IconButton
        onClick={handleCopy}
        size={size}
        aria-label={copied ? "Copied" : ariaLabel}
        sx={{
          color: copied ? "success.main" : "text.secondary",
          bgcolor: "rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(2px)",
          border: "1px solid",
          borderColor: "divider",
          transition: "color 120ms ease, background-color 120ms ease",
          "&:hover": {
            color: copied ? "success.main" : "text.primary",
            bgcolor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {copied ? (
          <CheckIcon fontSize="inherit" />
        ) : (
          <ContentCopyIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
}
