import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { User } from "../types/user";
import { fetchWithToken } from "../utils/api";
import { ErrorRequest } from "../types/common";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const {
    data,
    error,
    mutate: mutateUser,
    isValidating,
  } = useSWR<User | ErrorRequest, unknown, string>("/profile", fetchWithToken, {
    shouldRetryOnError: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    // if (!redirectTo || !data) return;
    if (!redirectTo || (isValidating && !data)) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data)
    ) {
      Router.push(redirectTo);
    }
  }, [data, redirectIfFound, redirectTo, isValidating]);

  return { user: data as User, mutateUser, isLoading: isValidating };
}
