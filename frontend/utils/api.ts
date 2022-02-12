import { CommonProps } from "../types/common";
import { ProductInterface } from "../types/product";

export function getStrapiURL(path: RequestInfo) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}
export type FetchType = <JSON = unknown>(input: RequestInfo, init?: RequestInit, toBack?: boolean) => Promise<JSON>

// Helper to make GET requests to Strapi
export const fetchAPI: FetchType = async (input, init) => {
  const requestInfo: RequestInfo = typeof input === 'string' ? getStrapiURL(input) : { ...input, url: getStrapiURL(input.url) };
  const response = await fetch(requestInfo, init);
  const data = await response.json();
  return data;
}


export const fetchJson: FetchType = async (
  input,
  init
) => {

  const response = await fetch(input, init)

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json()

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  })
}

export class FetchError extends Error {
  response: Response
  data: {
    message: string
  }
  constructor({
    message,
    response,
    data,
  }: {
    message: string
    response: Response
    data: {
      message: string
    }
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
    this.data = data ?? { message: message }
  }
}

export async function getCategories() {
  const categories = await fetchAPI<CommonProps[]>("/categories");
  return categories;
}

export async function getCategory(slug: string) {
  const categories = await fetchAPI<CommonProps[]>(`/categories?slug=${slug}`);
  return categories?.[0];
}

export async function getProducts() {
  const products = await fetchAPI<ProductInterface[]>("/products");
  return products;
}

export async function getProduct(slug: string) {
  const products = await fetchAPI<ProductInterface[]>(`/products?slug=${slug}`);
  return products?.[0];
}
