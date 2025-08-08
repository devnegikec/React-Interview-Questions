// hooks/useDebounce.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('should debounce the updated value', () => {
    let value = 'initial';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    // Change value
    value = 'updated';
    rerender();

    // Still returns old value
    expect(result.current).toBe('initial');

    // Fast forward timers
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset the timer if value changes quickly', () => {
    let value = 'a';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    // change to 'b'
    value = 'b';
    rerender();
    act(() => jest.advanceTimersByTime(300)); // Not yet elapsed

    // change to 'c'
    value = 'c';
    rerender();
    act(() => jest.advanceTimersByTime(300)); // Still not enough

    // Not yet updated
    expect(result.current).toBe('a');

    // Finish remaining time
    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe('c');
  });
});
