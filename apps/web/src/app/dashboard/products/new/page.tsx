'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, Tag, List, ArrowLeft, Zap, Plus } from 'lucide-react';
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
      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link href="/dashboard/products" className="inline-flex items-center text-sm text-primary hover:underline mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
      </Link>
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
          Upload New Product
        </h1>
        <p className="text-zinc-400">Provide detailed information to make your product stand out in the marketplace.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-black border border-white/10 rounded-xl p-8">
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-start gap-3">
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">Product Name</Label>
              <Input 
                id="name"
                required
                placeholder="e.g. Enterprise Discord Bot"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-zinc-900 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-zinc-300 flex items-center gap-2">
                <Tag className="w-4 h-4 text-zinc-500" /> Category
              </Label>
              <Input 
                id="category"
                placeholder="e.g. Chatbots, Scraping, Workflow"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="bg-zinc-900 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-zinc-300">Detailed Description</Label>
            <Textarea 
              id="description"
              required
              placeholder="Explain what your automation does, how it works, and why users need it..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="h-32 bg-zinc-900 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Media & Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl" className="text-zinc-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-zinc-500" /> Thumbnail URL
              </Label>
              <Input 
                id="thumbnailUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                className="bg-zinc-900 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="version" className="text-zinc-300">Version</Label>
              <Input 
                id="version"
                placeholder="1.0.0"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                className="bg-zinc-900 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="features" className="text-zinc-300 flex items-center gap-2">
              <List className="w-4 h-4 text-zinc-500" /> Key Features
            </Label>
            <p className="text-xs text-zinc-500 mb-1">Separate features with commas</p>
            <Input 
              id="features"
              placeholder="Real-time analytics, Webhook integration, 24/7 Uptime"
              value={featuresStr}
              onChange={(e) => setFeaturesStr(e.target.value)}
              className="bg-zinc-900 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary h-12"
            />
          </div>

          {/* Pricing Section */}
          <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5 grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-zinc-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-zinc-500" /> Price ($)
              </Label>
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
                  className="bg-zinc-950 border-white/10 pl-8 focus:border-primary focus:ring-1 focus:ring-primary h-12 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Pricing Model</Label>
              <Select 
                value={formData.pricingModel} 
                onValueChange={(val: any) => setFormData(prev => ({ ...prev, pricingModel: val }))}
              >
                <SelectTrigger className="bg-zinc-950 border-white/10 focus:ring-1 focus:ring-primary h-12">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FREE">Free</SelectItem>
                  <SelectItem value="ONE_TIME">One-Time Payment</SelectItem>
                  <SelectItem value="SUBSCRIPTION">Monthly Subscription</SelectItem>
                  <SelectItem value="USAGE_BASED">Pay Per Use</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 flex items-center justify-end gap-3 border-t border-white/10">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => router.push('/dashboard/products')}
              className="hover:bg-white/10 h-11"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-medium px-8"
            >
              {loading ? 'Publishing...' : 'Publish Product'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
