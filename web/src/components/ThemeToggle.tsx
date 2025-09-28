"use client";

import { useContext } from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeContext } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { toggleTheme, mode } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}
