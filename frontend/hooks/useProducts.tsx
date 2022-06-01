import useSWR from "swr";
import { fetchAPI } from "../utils/api";
import { ErrorRequest } from "../types/common";
import { ProductInterface } from "../types/product";

export default function useRecommendProducts() {
  const { data, error, isValidating } = useSWR<
    ProductInterface[] | ErrorRequest,
    unknown,
    string
  >("/products?_sort=created_at:DESC", fetchAPI, {
    shouldRetryOnError: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    products: data as ProductInterface[],
    isLoading: isValidating,
  };
}
