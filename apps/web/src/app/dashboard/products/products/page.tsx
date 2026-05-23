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
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">My Products</h1>
          <p className="text-zinc-400 mt-2">Manage your published automations and track their performance.</p>
        </div>
        <Link href="/products/new">
          <Button className="bg-[#C8F04D] text-black hover:bg-[#b0d83a] hover:scale-105 active:scale-95 transition-all duration-300 font-bold px-6 py-5 rounded-xl shadow-[0_0_20px_rgba(200,240,77,0.3)] hover:shadow-[0_0_35px_rgba(200,240,77,0.5)]">
            <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
            Publish New Product
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white/5 animate-pulse rounded-2xl border border-white/10"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 px-4 bg-zinc-900/40 rounded-3xl border border-white/10 border-dashed">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
            <Package className="w-10 h-10 text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No products yet</h3>
          <p className="text-zinc-400 max-w-md mx-auto mb-8 text-lg">
            You haven't published any automations. Get started by uploading your first product.
          </p>
          <Link href="/products/new">
            <Button className="bg-white text-black hover:bg-zinc-200 px-8 py-6 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
              Publish Your First Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#C8F04D]/50 transition-all duration-300 flex flex-col group overflow-hidden hover:shadow-[0_10px_30px_-15px_rgba(200,240,77,0.2)]"
            >
              <div className="p-6 flex flex-col flex-grow relative">
                {product.category && (
                  <span className="absolute top-6 right-6 text-[10px] uppercase font-bold tracking-wider text-zinc-500 bg-white/5 px-2 py-1 rounded-md">
                    {product.category}
                  </span>
                )}
                
                <h3 className="font-bold text-xl text-white pr-16 mb-2 group-hover:text-[#C8F04D] transition-colors">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 rounded-lg bg-[#C8F04D]/10 text-[#C8F04D] font-bold">
                    ${product.price}
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-white/5 text-zinc-300 text-sm font-medium">
                    {product.pricingModel.replace('_', ' ')}
                  </div>
                </div>
                
                <p className="text-zinc-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto">
                  <div className="flex items-center text-sm text-zinc-500 font-medium">
                    <Activity className="w-4 h-4 mr-1.5 text-blue-400" /> Active
                  </div>
                  <Link href={`/marketplace/${product.slug}`}>
                    <Button variant="ghost" size="sm" className="text-[#C8F04D] hover:bg-[#C8F04D]/10 hover:text-[#b0d83a]">
                      View Store Page <ExternalLink className="w-4 h-4 ml-2" />
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
