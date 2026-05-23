'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { api, Product } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function DashboardMarketplace() {
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
    <div className="max-w-6xl mx-auto space-y-10 py-4">
      {/* Hero Banner - Clean & Professional */}
      <div className="rounded-2xl overflow-hidden bg-black border border-white/10">
        <div className="p-10 md:p-14 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
            Discover <span className="text-primary">Automations</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mb-8">
            Explore cutting-edge AI bots, workflows, and tools built by top creators. Supercharge your productivity today.
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard/products/new">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 h-12">
                Publish a Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories/Trending Section */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-semibold text-white">
          Latest Products
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 bg-white/5 animate-pulse rounded-xl border border-white/10"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 px-4 bg-black rounded-2xl border border-white/10">
          <Compass className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No products found</h3>
          <p className="text-zinc-400 max-w-sm mx-auto mb-6 text-sm">
            The marketplace is currently empty. Be the first to publish a product.
          </p>
          <Link href="/dashboard/products/new">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Publish Now
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-black rounded-xl border border-white/10 hover:border-white/20 transition-all flex flex-col overflow-hidden"
            >
              <div className="h-40 bg-zinc-900 relative overflow-hidden">
                {product.thumbnailUrl ? (
                  <img src={product.thumbnailUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                    <Compass className="w-6 h-6 text-zinc-700" />
                  </div>
                )}
                {product.category && (
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                    {product.category}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                  ${product.price}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white truncate pr-2">{product.name}</h3>
                </div>
                
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>
                
                <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium">
                    {product.pricingModel.replace('_', ' ')}
                  </span>
                  <Link href={`/marketplace/${product.id}`}>
                    <span className="text-sm text-primary hover:underline flex items-center">
                      Details <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
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
