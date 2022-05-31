import useSWR from "swr";
import { fetchAPI } from "../utils/api";
import { ErrorRequest } from "../types/common";
import { BrandWithCount } from "../types/brand";

export default function useBrandsWithProducts() {
  const { data, error, isValidating } = useSWR<
    BrandWithCount[] | ErrorRequest,
    unknown,
    string
  >("/brands-with-counts", fetchAPI, {
    shouldRetryOnError: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    brandsWithCounts: data as BrandWithCount[],
    isLoading: isValidating,
  };
}
