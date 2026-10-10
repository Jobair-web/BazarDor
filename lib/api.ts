import type { Category, Product } from "@/types";

const BASE_URL = "https://api.api-store.workers.dev";
const REVALIDATE = 300;

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: REVALIDATE } });
  } catch {
    throw new ApiError("নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন", 0);
  }
  if (!res.ok) throw new ApiError(`Request failed: ${path}`, res.status);
  return res.json() as Promise<T>;
}

// 404 -> null, so pages can call notFound()
async function requestOrNull<T extends object>(path: string): Promise<T | null> {
  try {
    const data = await request<T>(path);
    return data && Object.keys(data).length ? data : null;
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export const getCategories = () =>
  request<Category[]>("/api/bazardor/categories");

export const getCategory = (slug: string) =>
  requestOrNull<Category>(`/api/bazardor/categories/${encodeURIComponent(slug)}`);

export const getProducts = () =>
  request<Product[]>("/api/bazardor/products");

export const getProductsByCategory = (slug: string) =>
  request<Product[]>(`/api/bazardor/products?category=${encodeURIComponent(slug)}`);

export const getProduct = (id: string) =>
  requestOrNull<Product>(`/api/bazardor/products/${encodeURIComponent(id)}`);