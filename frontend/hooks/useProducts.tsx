import useSWR from "swr";
import { fetchAPI } from "../utils/api";
import { ErrorRequest } from "../types/common";
import { ProductInterface } from "../types/product";

export default function useProducts(query?: string, revalidateOnMount = true) {
  const {
    data,
    error,
    mutate: mutateProducts,
    isValidating,
  } = useSWR<ProductInterface[] | ErrorRequest, unknown, string>(
    `/products${query ? `?${query}` : ""}`,
    fetchAPI,
    {
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount,
    }
  );

  return {
    products: data as ProductInterface[],
    mutateProducts,
    isLoading: isValidating,
  };
}
