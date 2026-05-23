'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Package, ExternalLink, Activity } from 'lucide-react';
import { api, Product } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">My Products</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your published automations and track their performance.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Product
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white/5 animate-pulse rounded-xl border border-white/10"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 px-4 bg-black rounded-xl border border-white/10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <Package className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No products yet</h3>
          <p className="text-zinc-400 max-w-sm mx-auto mb-6 text-sm">
            You haven't published any automations. Get started by uploading your first product.
          </p>
          <Link href="/dashboard/products/new">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Publish Your First Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-black rounded-xl border border-white/10 hover:border-white/20 transition-all flex flex-col group"
            >
              <div className="p-5 flex flex-col flex-grow relative">
                {product.category && (
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-900 px-2 py-1 rounded-md mb-3 border border-white/5 w-fit">
                    {product.category}
                  </span>
                )}
                
                <h3 className="font-semibold text-lg text-white mb-2">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-primary font-medium text-sm">
                    ${product.price}
                  </div>
                  <div className="px-2 py-0.5 rounded text-zinc-400 text-xs font-medium border border-white/5">
                    {product.pricingModel.replace('_', ' ')}
                  </div>
                </div>
                
                <p className="text-zinc-400 line-clamp-2 mb-6 flex-grow text-sm">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center text-xs text-zinc-500">
                    <Activity className="w-3 h-3 mr-1.5 text-primary" /> Active
                  </div>
                  <Link href={`/marketplace/${product.id}`}>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white h-8 px-2">
                      Manage <ExternalLink className="w-3 h-3 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
