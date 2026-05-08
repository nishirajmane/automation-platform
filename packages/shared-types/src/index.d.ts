export interface Tenant {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    ADMIN = "ADMIN",
    CREATOR = "CREATOR",
    VIEWER = "VIEWER"
}
export interface User {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum PricingModel {
    FREE = "FREE",
    ONE_TIME = "ONE_TIME",
    SUBSCRIPTION = "SUBSCRIPTION",
    USAGE_BASED = "USAGE_BASED"
}
export declare enum ProductStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED"
}
export interface Product {
    id: string;
    tenantId: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    pricingModel: PricingModel;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    pricingModel: PricingModel;
}
export interface HealthStatus {
    status: 'ok' | 'error';
    timestamp: string;
    services: {
        app: 'up' | 'down';
        database: 'up' | 'down';
        redis: 'up' | 'down';
    };
}
export interface SignInDto {
    email: string;
    password: string;
}
export interface AuthResponse {
    accessToken: string;
    user: Omit<User, 'createdAt' | 'updatedAt'>;
}
export interface AutomationJobPayload {
    automationId: string;
    tenantId: string;
    payload: Record<string, unknown>;
}
export interface AutomationJobResult {
    success: boolean;
    executionTimeMs: number;
    output?: Record<string, unknown>;
    error?: string;
}
//# sourceMappingURL=index.d.ts.map