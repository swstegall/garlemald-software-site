"use client";

import * as React from "react";
import createCache from "@emotion/cache";
import type { EmotionCache, Options as EmotionOptions } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/lib/theme";

// App-Router-compatible emotion registry. Collects the style rules generated
// during the server prerender and flushes them into <head> before any markup
// that uses them, so the static export ships fully-styled HTML with no FOUC.
// Hand-rolled (rather than @mui/material-nextjs) to avoid any peer-dependency
// pin against this Next.js major.

export default function ThemeRegistry({
  children,
  options = { key: "mui" },
}: {
  children: React.ReactNode;
  options?: EmotionOptions;
}) {
  const [{ cache, flush }] = React.useState(() => {
    const cache: EmotionCache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert.bind(cache);
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
