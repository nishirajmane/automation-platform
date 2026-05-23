const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Product {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  pricingModel: 'FREE' | 'ONE_TIME' | 'SUBSCRIPTION' | 'USAGE_BASED';
  thumbnailUrl?: string;
  category?: string;
  version?: string;
  features?: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  pricingModel: 'FREE' | 'ONE_TIME' | 'SUBSCRIPTION' | 'USAGE_BASED';
  thumbnailUrl?: string;
  category?: string;
  version?: string;
  features?: string[];
}

export const api = {
  getProducts: async (tenantId?: string): Promise<Product[]> => {
    const url = new URL(`${API_BASE_URL}/products`);
    if (tenantId) {
      url.searchParams.append('tenantId', tenantId);
    }
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    return res.json();
  },

  getProduct: async (id: string): Promise<Product> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }
    return res.json();
  },

  createProduct: async (payload: CreateProductPayload): Promise<Product> => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Failed to create product: ${res.statusText}`);
    }
    return res.json();
  },
};
