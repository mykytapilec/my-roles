import { useState, useCallback } from 'react';

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning';
}

export function useSnackbar(initialState?: Partial<SnackbarState>) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
    ...initialState,
  });

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarState['severity'] = 'info') => {
      setSnackbar({ open: true, message, severity });
    },
    []
  );

  const closeSnackbar = useCallback(() => {
    setSnackbar({ open: false, message: '', severity: 'info' });
  }, []);

  return { snackbar, showSnackbar, closeSnackbar };
}
