import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

/**
 * Health check를 위한 endpoint. 대부분의 인프라에서 health check를 필수로 함.
 * @see https://docs.nestjs.com/recipes/terminus#healthchecks-terminus
 */
@Controller('_healthy')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthy(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
