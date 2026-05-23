'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Compass, Tag, Zap } from 'lucide-react';
import { api, Product } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!params.id) return;
      try {
        const data = await api.getProduct(params.id as string);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/dashboard">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Navbar Minimal */}
      <header className="h-16 border-b border-white/10 flex items-center px-8 bg-black sticky top-0 z-10 justify-between">
        <Link href="/dashboard" className="text-xl font-extrabold tracking-tighter lowercase text-white">
          flowmart
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost" className="text-sm font-medium hover:bg-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Left Col: Main Info & Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="w-full h-80 md:h-[400px] bg-black rounded-2xl border border-white/10 overflow-hidden relative">
              {product.thumbnailUrl ? (
                <img src={product.thumbnailUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass className="w-16 h-16 text-zinc-700" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                {product.category && (
                  <span className="flex items-center text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    <Tag className="w-3 h-3 mr-1.5" />
                    {product.category}
                  </span>
                )}
                {product.version && (
                  <span className="text-xs font-medium text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/10">
                    v{product.version}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight mb-6">{product.name}</h1>
              
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 shrink-0" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Col: Checkout / Pricing Panel */}
          <div className="md:col-span-1">
            <div className="bg-black border border-white/10 rounded-2xl p-6 sticky top-24">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  ${product.price}
                </h2>
                <p className="text-sm text-zinc-400 font-medium">
                  {product.pricingModel === 'FREE' ? 'Free Access' : 
                   product.pricingModel === 'ONE_TIME' ? 'One-time Payment' : 
                   product.pricingModel === 'SUBSCRIPTION' ? 'Monthly Subscription' : 'Pay Per Use'}
                </p>
              </div>
              
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base font-bold mb-4 shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                Purchase & Download
              </Button>
              
              <div className="text-xs text-zinc-500 text-center flex flex-col gap-2">
                <p>Secure payment powered by Flowmart.</p>
                <p>Created on {new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
