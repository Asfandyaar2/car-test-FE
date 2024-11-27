import React, { ReactNode } from "react";
import { CssBaseline, Container } from "@mui/material";

interface RootLayoutProps {
  children: ReactNode; // Define the type for the children prop
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <CssBaseline />
        <Container maxWidth="sm">{children}</Container>
      </body>
    </html>
  );
}
