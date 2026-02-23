import { promises as fs } from "fs";
import path from "path";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readProducts(): Promise<Product[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  const products = await readProducts();
  return products.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addProduct(
  product: Omit<Product, "id" | "createdAt">
): Promise<Product> {
  const { v4: uuid } = await import("uuid");
  const products = await readProducts();
  const newProduct: Product = {
    ...product,
    id: uuid(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  await ensureDataDir();
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  return newProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await readProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  await ensureDataDir();
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "createdAt">>
): Promise<Product | null> {
  const products = await readProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const current = products[idx];
  products[idx] = {
    ...current,
    ...(updates.name !== undefined && { name: String(updates.name).trim() }),
    ...(updates.description !== undefined && {
      description: String(updates.description).trim(),
    }),
    ...(updates.category !== undefined && {
      category: String(updates.category).trim(),
    }),
    ...(updates.imageUrl !== undefined && {
      imageUrl: updates.imageUrl ? String(updates.imageUrl).trim() : undefined,
    }),
  };
  await ensureDataDir();
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  return products[idx];
}
