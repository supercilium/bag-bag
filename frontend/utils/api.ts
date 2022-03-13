import { parseCookies, setCookie } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { BrandWithCount } from "../types/brand";
import { CollectionInterface } from "../types/collection";
import { CommonProps, ErrorRequest, Filters } from "../types/common";
import { OrderInterface } from "../types/order";
import { ProductInterface } from "../types/product";
import { PromocodeInterface } from "../types/promocode";
import { AuthResponse, User } from "../types/user";
import { getAsString } from "./formatters";

export function getStrapiURL(path: RequestInfo) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}
export type FetchType = <JSON = unknown>(input: RequestInfo, init?: RequestInit) => Promise<JSON | ErrorRequest>

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
  const requestInfo: RequestInfo = typeof input === 'string' ? getStrapiURL(input) : { ...input, url: getStrapiURL(input.url) };

  const response = await fetch(requestInfo, init)

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

export const fetchWithToken: FetchType = async (input) => {
  const { token } = parseCookies();
  const requestInfo: RequestInfo = typeof input === 'string' ? getStrapiURL(input) : { ...input, url: getStrapiURL(input.url) };

  const response = await fetch(requestInfo, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } })

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
  return categories as CommonProps[];
}

export async function getFilters() {
  const categories = await fetchAPI<Filters>("/filters");
  return categories as Filters;
}

export async function getBrandsWithCounts() {
  const categories = await fetchAPI<BrandWithCount[]>("/brands-with-counts");
  return categories as BrandWithCount[];
}

export async function getCategory(slug: string) {
  const categories = await fetchAPI<CommonProps[]>(`/categories?slug=${slug}`);
  return categories?.[0] as CommonProps[];
}

export async function getProducts(query?: ParsedUrlQuery) {
  const querystring = getAsString(query)
  const products = await fetchAPI<ProductInterface[]>(`/products${querystring}`);
  return products as ProductInterface[];
}

export async function getProduct(slug: string) {
  const products = await fetchAPI<ProductInterface>(`/products/${slug}`);
  return products as ProductInterface;
}

export async function getCollection(slug: string) {
  const res = await fetchAPI<CollectionInterface>(`/collections/${slug}`);
  return res as CollectionInterface;
}

export async function getCollections(query?: ParsedUrlQuery) {
  const querystring = getAsString(query)
  const res = await fetchAPI<CollectionInterface[]>(`/collections${querystring}`);
  return res as CollectionInterface[];
}

export async function getProfile(token: string) {
  const profile = await fetchAPI<User>('/profile', {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return profile;
}

export async function putProfile(profile: User & { password?: string }) {
  const { token } = parseCookies()

  const res = await fetchAPI<User>('/profile', {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(profile),
  });
  return res;
}

interface LoginParams {
  password: string;
  identifier: string;
}

export const login = async (body: LoginParams) => {
  const {
    user, jwt
  } = (await fetchAPI<AuthResponse>("/auth/local", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as AuthResponse);
  setCookie(null, 'token', jwt, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  return user
}

export interface LoginFormInterface extends User {
  password: string;
  identifier: string;
  username?: string;
}

export const register = async (body: LoginFormInterface) => {
  const {
    user, jwt
  } = (await fetchAPI<AuthResponse>("/auth/local/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as AuthResponse);
  setCookie(null, 'token', jwt, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  return user
}

export const addToFavorite = async (id: number) => {
  const { token } = parseCookies()
  const user = await fetchAPI<User>(`/profile/add-to-favorite?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  });
  return user
}

export const removeFromFavorite = async (id: number) => {
  const { token } = parseCookies()
  const user = await fetchAPI<User>(`/profile/remove-from-favorite?id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  });
  return user
}

export const addToShoppingBag = async (id: number) => {
  const { token } = parseCookies()
  const user = await fetchAPI<User>(`/profile/add-to-shopping-bag?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  });
  return user
}

export const removeFromShoppingBag = async (id: number) => {
  const { token } = parseCookies()
  const user = await fetchAPI<User>(`/profile/remove-from-to-shopping-bag?id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  });
  return user
}

export const clearShoppingBag = async () => {
  const { token } = parseCookies()
  const user = await fetchAPI<User>('/profile/clear-shopping-bag', {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  });
  return user
}

export interface OrderFormValues extends Partial<OrderInterface>, Pick<User, 'last_name' | 'email' | 'phone' | 'address'> {
  shipping_date?: Date;
  shipping_time?: Date;
  commentary?: string;
}

export const createOrder = async (values: OrderFormValues) => {
  const { token } = parseCookies()

  const order = await fetchAPI<OrderInterface>('/orders', {
    method: 'POST',
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(values)
  })

  return order;
}

export const createRequest = async (values: FormData) => {
  const { token } = parseCookies()
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const order = await fetchAPI<OrderInterface>('/requests', {
    method: 'POST',
    headers,
    body: values,
  })

  return order;
}

export interface SubscriberInterface {
  email: string;
}

export const createSubscriber = async (values: SubscriberInterface) => {
  const res = await fetchAPI<{ subscribe: string }>('/subscribers', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
  return res;
}

export const checkPromoCode = async (code: string) => {
  const { token } = parseCookies()
  const res = await fetchAPI<PromocodeInterface>(`/promocodes/check/${code}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  });
  return res
}
