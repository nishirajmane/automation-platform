'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Image as ImageIcon, Tag, List, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { api, CreateProductPayload } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [featuresStr, setFeaturesStr] = useState('');
  const [formData, setFormData] = useState<CreateProductPayload>({
    name: '',
    description: '',
    price: 0,
    pricingModel: 'FREE',
    category: '',
    version: '1.0.0',
    thumbnailUrl: '',
    features: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const features = featuresStr.split(',').map(f => f.trim()).filter(f => f.length > 0);
      await api.createProduct({
        ...formData,
        features,
        price: Number(formData.price),
      });
      router.push('/products');
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link href="/products" className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to My Products
      </Link>
      
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
          <Sparkles className="text-[#C8F04D] w-8 h-8" />
          Publish a New Automation
        </h1>
        <p className="text-zinc-400 text-lg">Provide detailed information to make your product stand out in the marketplace.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow effect background */}
        <div className="absolute -inset-0.5 bg-gradient-to-b from-[#C8F04D]/20 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        
        <div className="relative bg-black/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm flex items-start gap-3">
              <div className="p-1 bg-red-500/20 rounded-full shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="pt-0.5">{error}</p>
            </div>
          )}

          <div className="space-y-8">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-zinc-300 font-semibold">Product Name</Label>
                <Input 
                  id="name"
                  required
                  placeholder="e.g. Enterprise Discord Bot"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-zinc-900/50 border-white/10 focus:border-[#C8F04D] focus:ring-[#C8F04D]/20 transition-all rounded-xl h-12 px-4"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-zinc-300 font-semibold flex items-center gap-2">
                  <Tag className="w-4 h-4 text-zinc-500" /> Category
                </Label>
                <Input 
                  id="category"
                  placeholder="e.g. Chatbots, Scraping, Workflow"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="bg-zinc-900/50 border-white/10 focus:border-[#C8F04D] focus:ring-[#C8F04D]/20 transition-all rounded-xl h-12 px-4"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-zinc-300 font-semibold">Detailed Description</Label>
              <Textarea 
                id="description"
                required
                placeholder="Explain what your automation does, how it works, and why users need it..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="h-40 bg-zinc-900/50 border-white/10 focus:border-[#C8F04D] focus:ring-[#C8F04D]/20 transition-all rounded-xl p-4 resize-none"
              />
            </div>

            {/* Media & Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="thumbnailUrl" className="text-zinc-300 font-semibold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-zinc-500" /> Thumbnail URL
                </Label>
                <Input 
                  id="thumbnailUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                  className="bg-zinc-900/50 border-white/10 focus:border-[#C8F04D] focus:ring-[#C8F04D]/20 transition-all rounded-xl h-12 px-4"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="version" className="text-zinc-300 font-semibold">Version</Label>
                <Input 
                  id="version"
                  placeholder="1.0.0"
                  value={formData.version}
                  onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                  className="bg-zinc-900/50 border-white/10 focus:border-[#C8F04D] focus:ring-[#C8F04D]/20 transition-all rounded-xl h-12 px-4"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="features" className="text-zinc-300 font-semibold flex items-center gap-2">
                <List className="w-4 h-4 text-zinc-500" /> Key Features
              </Label>
              <p className="text-xs text-zinc-500 mb-2">Separate features with commas</p>
              <Input 
                id="features"
                placeholder="Real-time analytics, Webhook integration, 24/7 Uptime"
                value={featuresStr}
                onChange={(e) => setFeaturesStr(e.target.value)}
                className="bg-zinc-900/50 border-white/10 focus:border-[#C8F04D] focus:ring-[#C8F04D]/20 transition-all rounded-xl h-12 px-4"
              />
            </div>

            {/* Pricing Section */}
            <div className="p-6 bg-zinc-900/30 rounded-xl border border-white/5 grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="price" className="text-zinc-300 font-semibold">Price ($)</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">$</span>
                  <Input 
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="bg-black/50 border-white/10 pl-8 focus:border-[#C8F04D] focus:ring-[#C8F04D]/20 transition-all rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-zinc-300 font-semibold">Pricing Model</Label>
                <Select 
                  value={formData.pricingModel} 
                  onValueChange={(val: any) => setFormData(prev => ({ ...prev, pricingModel: val }))}
                >
                  <SelectTrigger className="bg-black/50 border-white/10 focus:ring-[#C8F04D]/20 transition-all rounded-xl h-12 px-4">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 rounded-xl shadow-2xl">
                    <SelectItem value="FREE">Free</SelectItem>
                    <SelectItem value="ONE_TIME">One-Time Payment</SelectItem>
                    <SelectItem value="SUBSCRIPTION">Monthly Subscription</SelectItem>
                    <SelectItem value="USAGE_BASED">Pay Per Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 flex justify-end gap-4 border-t border-white/10 mt-8">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => router.push('/products')}
                className="hover:bg-white/5 rounded-xl px-6 h-12 transition-colors"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-[#C8F04D] text-black hover:bg-[#b0d83a] rounded-xl px-10 h-12 font-bold text-base shadow-[0_0_20px_rgba(200,240,77,0.3)] hover:shadow-[0_0_35px_rgba(200,240,77,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Publishing...' : 'Publish Automation'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
