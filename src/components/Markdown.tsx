"use client";

import * as React from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { blobUrl, rawUrl } from "@/lib/github";
import CopyButton from "./CopyButton";

/** True for a same-site root-relative path like "/downloads/" (not "//cdn"). */
function isInternalPath(url: string): boolean {
  return url.startsWith("/") && !url.startsWith("//");
}

export interface MarkdownLinkBase {
  owner: string;
  repo: string;
  branch: string;
}

export interface MarkdownProps {
  /** First-party trusted GitHub-flavoured markdown. */
  markdown: string;
  /** When set, relative links/images resolve against this repo/branch. */
  linkBase?: MarkdownLinkBase;
}

/** True for absolute / protocol-relative / anchor / mailto-style URLs. */
function isAbsoluteUrl(url: string): boolean {
  return (
    /^[a-z][a-z0-9+.-]*:/i.test(url) || // scheme: (https:, mailto:, data:, …)
    url.startsWith("//") ||
    url.startsWith("#")
  );
}

/** Strip a leading "./" and any leading "/" so the path is repo-relative. */
function normalizeRelPath(url: string): string {
  return url.replace(/^\.\//, "").replace(/^\/+/, "");
}

/** Resolve a markdown href: relative → GitHub blob URL, else unchanged. */
function resolveHref(
  url: string | undefined,
  linkBase: MarkdownLinkBase | undefined,
): string | undefined {
  if (!url) return url;
  if (!linkBase || isAbsoluteUrl(url)) return url;
  return blobUrl(linkBase.owner, linkBase.repo, linkBase.branch, normalizeRelPath(url));
}

/** Resolve a markdown img src: relative → GitHub raw URL, else unchanged. */
function resolveSrc(
  url: string | undefined,
  linkBase: MarkdownLinkBase | undefined,
): string | undefined {
  if (!url) return url;
  if (!linkBase || isAbsoluteUrl(url)) return url;
  return rawUrl(linkBase.owner, linkBase.repo, linkBase.branch, normalizeRelPath(url));
}

/** Slugify heading text for an in-page anchor id. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Recursively collect the plain-text content of a React subtree. */
function nodeToText(node: React.ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return nodeToText(props.children);
  }
  return "";
}

/** Shared heading factory: renders the tag with a slug `id` anchor. */
function makeHeading(
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
): NonNullable<Components[typeof tag]> {
  const Heading: NonNullable<Components[typeof tag]> = ({
    children,
    node: _node,
    ...rest
  }) => {
    const id = slugify(nodeToText(children));
    return React.createElement(tag, { id: id || undefined, ...rest }, children);
  };
  Heading.displayName = `Markdown(${tag})`;
  return Heading;
}

export default function Markdown({ markdown, linkBase }: MarkdownProps) {
  const components: Components = React.useMemo(() => {
    return {
      h1: makeHeading("h1"),
      h2: makeHeading("h2"),
      h3: makeHeading("h3"),
      h4: makeHeading("h4"),
      h5: makeHeading("h5"),
      h6: makeHeading("h6"),

      a: ({ href, children, node: _node, ...rest }) => {
        const resolved = resolveHref(href, linkBase);
        // Same-site links must go through next/link so the GitHub Pages
        // basePath is prepended — a plain <a href="/start/"> 404s in prod.
        if (typeof resolved === "string" && isInternalPath(resolved)) {
          return (
            <Link href={resolved} {...rest}>
              {children}
            </Link>
          );
        }
        const external =
          typeof resolved === "string" && /^https?:\/\//i.test(resolved);
        return (
          <a
            href={resolved}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            {...rest}
          >
            {children}
          </a>
        );
      },

      img: ({ src, alt, node: _node, ...rest }) => {
        const resolved =
          typeof src === "string" ? resolveSrc(src, linkBase) : src;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resolved} alt={alt ?? ""} loading="lazy" {...rest} />
        );
      },

      hr: () => <Divider sx={{ my: 3, borderColor: "divider" }} />,

      table: ({ children, node: _node, ...rest }) => (
        <Box
          component="div"
          sx={{ overflowX: "auto", my: 2, borderRadius: 1 }}
        >
          <table {...rest}>{children}</table>
        </Box>
      ),

      // Fenced code blocks: a positioned wrapper with a pinned copy button.
      pre: ({ children, node: _node }) => {
        const code = nodeToText(children);
        return (
          <Box
            component="div"
            sx={{
              position: "relative",
              my: 2,
              "&:hover .md-copy-btn": { opacity: 1 },
            }}
          >
            <Box
              className="md-copy-btn"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                opacity: { xs: 1, md: 0 },
                transition: "opacity 120ms ease",
                zIndex: 1,
              }}
            >
              <CopyButton text={code} ariaLabel="Copy code" />
            </Box>
            <Box
              component="pre"
              sx={{
                m: 0,
                p: 2,
                pr: 6,
                overflowX: "auto",
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                bgcolor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1.5,
                "& code": {
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  background: "none",
                  p: 0,
                  border: 0,
                },
              }}
            >
              {children}
            </Box>
          </Box>
        );
      },

      // Inline code → a subtle chip. Block code (inside <pre>) passes through
      // so the `pre` renderer above owns the styling.
      code: ({ className, children, node: _node, ...rest }) => {
        const isBlock =
          typeof className === "string" && className.includes("language-");
        if (isBlock) {
          return (
            <code className={className} {...rest}>
              {children}
            </code>
          );
        }
        return (
          <Box
            component="code"
            sx={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: "0.86em",
              px: 0.6,
              py: 0.15,
              mx: "0.5px",
              bgcolor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 0.75,
              wordBreak: "break-word",
            }}
            {...rest}
          >
            {children}
          </Box>
        );
      },
    };
  }, [linkBase]);

  return (
    <Box
      sx={{
        color: "text.primary",
        fontSize: "0.975rem",
        lineHeight: 1.7,
        wordBreak: "break-word",

        // Headings
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          fontWeight: 700,
          lineHeight: 1.25,
          mt: 4,
          mb: 1.5,
          scrollMarginTop: "80px",
          color: "text.primary",
        },
        "& > :first-of-type": { mt: 0 },
        "& h1": {
          fontSize: { xs: "1.85rem", md: "2.1rem" },
          pb: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        },
        "& h2": {
          fontSize: { xs: "1.45rem", md: "1.6rem" },
          pb: 0.75,
          borderBottom: "1px solid",
          borderColor: "divider",
        },
        "& h3": { fontSize: "1.25rem" },
        "& h4": { fontSize: "1.08rem" },
        "& h5": { fontSize: "0.98rem" },
        "& h6": { fontSize: "0.9rem", color: "text.secondary" },

        // Paragraphs & text
        "& p": { my: 1.5 },
        "& strong": { fontWeight: 700 },
        "& em": { fontStyle: "italic" },
        "& del": { color: "text.secondary" },

        // Links
        "& a": {
          color: "primary.main",
          textDecoration: "none",
          fontWeight: 500,
          "&:hover": { textDecoration: "underline" },
        },

        // Lists
        "& ul, & ol": { my: 1.5, pl: 3.5 },
        "& li": { my: 0.5 },
        "& li > ul, & li > ol": { my: 0.5 },
        "& li::marker": { color: "text.secondary" },
        // GFM task lists
        "& li input[type='checkbox']": { mr: 1, verticalAlign: "middle" },

        // Blockquote
        "& blockquote": {
          my: 2,
          ml: 0,
          pl: 2,
          py: 0.5,
          borderLeft: "4px solid",
          borderColor: "divider",
          color: "text.secondary",
          fontStyle: "italic",
          "& p": { my: 0.75 },
        },

        // Images
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: 1.5,
          display: "inline-block",
        },

        // Tables (GFM)
        "& table": {
          borderCollapse: "collapse",
          width: "100%",
          fontSize: "0.9rem",
        },
        "& th, & td": {
          border: "1px solid",
          borderColor: "divider",
          px: 1.5,
          py: 1,
          textAlign: "left",
          verticalAlign: "top",
        },
        "& thead th": {
          bgcolor: "rgba(255, 255, 255, 0.05)",
          fontWeight: 700,
        },
        "& tbody tr:nth-of-type(even)": {
          bgcolor: "rgba(255, 255, 255, 0.02)",
        },

        // Keyboard
        "& kbd": {
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: "0.8em",
          px: 0.6,
          py: 0.15,
          bgcolor: "rgba(255, 255, 255, 0.08)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 0.75,
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        urlTransform={(u) => u}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}
