import useSWR from 'swr';

export default function useAllAdmins() {
  const { data, mutate, error } = useSWR('/admin/allAdmins');
  // console.log('response', error);
  const loading = !data && !error;
  const loggedOut =
    (error && error?.message === 'No token provided.') ||
    error?.response?.status === 401 ||
    error?.response?.status === 403 ||
    error?.response?.data?.message === 'No user found!';

  return {
    loading,
    loggedOut,
    data,
    mutate,
  };
}
