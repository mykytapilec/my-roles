"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Roles App
      </Typography>
      <Button variant="contained" color="primary">
        Hello Material UI
      </Button>
      <ThemeToggle />
    </Container>
  );
}
