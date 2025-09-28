import { renderHook, act } from '@testing-library/react';
import { useSnackbar } from '../useSnackbar';

describe('useSnackbar', () => {
  it('shows and hides snackbar', () => {
    const { result } = renderHook(() => useSnackbar());

    expect(result.current.snackbar.open).toBe(false);
    expect(result.current.snackbar.message).toBe('');

    act(() => {
      result.current.showSnackbar('Test message', 'info');
    });

    expect(result.current.snackbar.open).toBe(true);
    expect(result.current.snackbar.message).toBe('Test message');
    expect(result.current.snackbar.severity).toBe('info');

    act(() => {
      result.current.closeSnackbar();
    });

    expect(result.current.snackbar.open).toBe(false);
    expect(result.current.snackbar.message).toBe('');
  });
});
