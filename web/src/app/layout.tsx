import CustomThemeProvider from "@/context/ThemeContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Roles App",
  description: "React + MUI + Next.js project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
