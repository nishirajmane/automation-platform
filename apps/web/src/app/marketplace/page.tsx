import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MarketplacePage() {
  // Placeholder products
  const products = [
    {
      id: '1',
      name: 'Email Responder Bot',
      description: 'Automatically drafts and sends contextual email replies using GPT-4.',
      price: 29,
      pricingModel: 'SUBSCRIPTION',
    },
    {
      id: '2',
      name: 'Slack Summariser',
      description: 'Summarises long Slack threads into bullet points and action items.',
      price: 0,
      pricingModel: 'FREE',
    },
    {
      id: '3',
      name: 'Lead Qualifier',
      description: 'Scores and routes inbound leads based on custom AI criteria.',
      price: 99,
      pricingModel: 'ONE_TIME',
    },
    {
      id: '4',
      name: 'Invoice Processor',
      description: 'Extracts line items from PDF invoices and syncs to your ERP.',
      price: 49,
      pricingModel: 'SUBSCRIPTION',
    },
    {
      id: '5',
      name: 'Social Scheduler',
      description: 'AI-generated social media posts scheduled across platforms.',
      price: 19,
      pricingModel: 'SUBSCRIPTION',
    },
    {
      id: '6',
      name: 'Code Review Assistant',
      description: 'Automated PR reviews with style, security and performance insights.',
      price: 0,
      pricingModel: 'FREE',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold">Marketplace</h1>
      <p className="mb-10 text-muted-foreground">
        Discover production-ready AI automations and bots.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Card key={p.id} className="group flex flex-col transition hover:shadow-lg border-border dark:border-border">
            <CardHeader>
              <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                {p.name}
              </CardTitle>
              <CardDescription className="flex-1 text-sm">
                {p.description}
              </CardDescription>
            </CardHeader>
            <div className="flex-1" />
            <CardFooter className="flex items-center justify-between pb-6">
              <span className="text-xl font-extrabold">
                {p.price === 0 ? 'Free' : `$${p.price}`}
              </span>
              <Badge variant="secondary" className="font-semibold">
                {p.pricingModel.replace('_', ' ')}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
