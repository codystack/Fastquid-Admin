import useSWR from 'swr';

export default function useSWRFetch(url) {
  const { data, mutate, error } = useSWR(url);

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
}
