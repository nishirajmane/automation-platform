import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * GET /products
   * Lists products for a tenant.
   * TODO: Extract tenantId from authenticated user's JWT.
   */
  @Get()
  async list(@Query('tenantId') tenantId?: string) {
    // For now, list all products or filter by tenantId query param
    if (tenantId) {
      return this.productService.findByTenant(tenantId);
    }
    return this.productService.findAll();
  }

  /**
   * POST /products
   * Creates a product with a hardcoded tenant for now.
   * TODO: Extract tenantId from authenticated user context.
   */
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
}
