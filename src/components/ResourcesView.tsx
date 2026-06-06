"use client";

import Link from "next/link";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  RESOURCE_SECTIONS,
  RESOURCE_ATTRIBUTION,
  RESOURCES_COUNT,
} from "@/lib/resources";

export default function ResourcesView() {
  return (
    <Box>
      {/* Header band */}
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(88,166,255,0.10) 0%, transparent 70%)",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
            <Box
              aria-hidden
              sx={{
                flexShrink: 0,
                width: 56,
                height: 56,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(88,166,255,0.14)",
                border: "1px solid",
                borderColor: "rgba(88,166,255,0.4)",
              }}
            >
              <MenuBookIcon sx={{ fontSize: 32, color: "#58A6FF" }} />
            </Box>
            <Box>
              <Typography variant="h3" component="h1">
                Resources
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ color: "text.secondary", fontWeight: 400, mt: 0.5 }}
              >
                FFXIV 1.0 (v1.23b) reference — {RESOURCES_COUNT} pages across{" "}
                {RESOURCE_SECTIONS.length} sections.
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 760 }}>
            {RESOURCE_ATTRIBUTION}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={5}>
          {RESOURCE_SECTIONS.map((section) => (
            <Box key={section.slug} component="section">
              <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
                {section.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2.5 }}
              >
                {section.description}
              </Typography>

              <Grid container spacing={2}>
                {section.pages.map((page) => (
                  <Grid key={page.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardActionArea
                        component={Link}
                        href={`/resources/${section.slug}/${page.slug}/`}
                        sx={{
                          p: 2,
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 1,
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.25}
                          sx={{ alignItems: "center", minWidth: 0 }}
                        >
                          <DescriptionIcon
                            sx={{ color: "#58A6FF", flexShrink: 0 }}
                          />
                          <Typography
                            sx={{ fontWeight: 600, minWidth: 0 }}
                            noWrap
                          >
                            {page.title}
                          </Typography>
                        </Stack>
                        <ChevronRightIcon
                          sx={{ color: "text.secondary", flexShrink: 0 }}
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ mt: 6, mb: 3 }} />
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Each page links back to its original source on the FFXIV Classic wiki.
        </Typography>
      </Container>
    </Box>
  );
}
