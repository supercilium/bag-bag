import useSWR from "swr";
import { fetchAPI } from "../utils/api";
import { ErrorRequest, Filters } from "../types/common";

export default function useFilters() {
  const { data, error, isValidating } = useSWR<
    Filters | ErrorRequest,
    unknown,
    string
  >("/filters", fetchAPI, {
    shouldRetryOnError: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    filters: data as Filters,
    isLoading: isValidating,
  };
}
