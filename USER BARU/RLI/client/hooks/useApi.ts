import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  autoFetch?: boolean;
  cacheTime?: number;
}

/**
 * Custom hook for API data fetching
 * Works with any backend (Laravel, Express, Next.js, etc.)
 * Supports MySQL, PostgreSQL, or any database
 */
export function useApi<T>(
  url: string,
  options: UseApiOptions = { autoFetch: true, cacheTime: 5000 }
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
    }
  }, [url]);

  useEffect(() => {
    if (options.autoFetch) {
      fetchData();
    }
  }, [fetchData, options.autoFetch]);

  return { ...state, refetch: fetchData };
}

/**
 * Hook for POST/PUT/DELETE operations
 */
export function useMutation<T>(url: string, method: 'POST' | 'PUT' | 'DELETE' = 'POST') {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (payload?: any) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload ? JSON.stringify(payload) : undefined,
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
        throw err;
      }
    },
    [url, method]
  );

  return { ...state, mutate };
}
