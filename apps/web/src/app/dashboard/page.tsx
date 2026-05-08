import { apiClient } from '@/lib/api-client';
import type { HealthStatus } from '@app/shared-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

async function getHealth(): Promise<HealthStatus | null> {
  try {
    return await apiClient<HealthStatus>('/health');
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const health = await getHealth();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">Creator Dashboard</h1>

      {/* API Status */}
      <Card className="mb-12 border-border dark:border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">API Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          {health ? (
            <div className="space-y-2">
              <StatusRow label="Overall" value={health.status} />
              <StatusRow label="App" value={health.services.app} />
              <StatusRow label="Database" value={health.services.database} />
              <StatusRow label="Redis" value={health.services.redis} />
              <p className="mt-3 text-sm text-muted-foreground">
                Checked at {health.timestamp}
              </p>
            </div>
          ) : (
            <p className="text-destructive font-medium">
              ⚠️ Unable to reach the API. Is the backend running on{' '}
              <code className="rounded bg-muted px-1">
                {process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000'}
              </code>
              ?
            </p>
          )}
        </CardContent>
      </Card>

      {/* Placeholder panels */}
      <div className="grid gap-6 sm:grid-cols-2">
        <DashboardCard title="My Automations" count={0} />
        <DashboardCard title="Total Revenue" count="$0.00" />
        <DashboardCard title="Active Deployments" count={0} />
        <DashboardCard title="API Calls (30d)" count={0} />
      </div>
    </div>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  const isGood = value === 'ok' || value === 'up';
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-medium">{label}</span>
      <Badge variant={isGood ? 'default' : 'destructive'}>
        {value}
      </Badge>
    </div>
  );
}

function DashboardCard({ title, count }: { title: string; count: number | string }) {
  return (
    <Card className="border-border dark:border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{count}</p>
      </CardContent>
    </Card>
  );
}
