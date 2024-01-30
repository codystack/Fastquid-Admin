import useSWR from "swr";

export default function useAlltimeLoanUsecase(page, usecase) {
  const { data, mutate, error } = useSWR(usecase === "settled" ? "/loan/all-settled?page=" + page : "/loan/all-credited?page=" + page  );
  const loading = !data && !error;
  const loggedOut =
    (error && error?.message === "No token provided.") ||
    error?.response?.status === 401 ||
    error?.response?.status === 403 ||
    error?.response?.data?.message === "No user found!";

  return {
    loading,
    loggedOut,
    data,
    mutate,
  };
}
