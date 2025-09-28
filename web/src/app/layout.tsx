import type { Metadata } from 'next';
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export const metadata: Metadata = {
  title: 'My Roles App',
  description: 'Manage user roles easily',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <ThemeProvider>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  My Roles
                </Typography>
                <ThemeToggle />
              </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ mt: 4 }}>
              {children}
            </Container>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
