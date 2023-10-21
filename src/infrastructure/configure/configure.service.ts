import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import merge from 'ts-deepmerge';

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

/**
 * src/@config 내의 yaml을 바탕으로 configuration을 불러온다
 */
@Injectable()
export class ConfigureService {
  private readonly config: Record<string, unknown>;

  constructor() {
    const defaultConfig = yaml.load(
      readFileSync(join(__dirname, `../../@config/@default.yaml`), 'utf8'),
    ) as Record<string, unknown>;
    this.config = merge(
      defaultConfig,
      yaml.load(
        readFileSync(
          join(__dirname, `../../@config/${process.env.PROFILE || 'dev'}.yaml`),
          'utf8',
        ),
      ) as unknown as object,
    ) as Record<string, unknown>;
  }

  get typeORMConfig(): TypeOrmModuleOptions {
    return this.config.typeORM as unknown as TypeOrmModuleOptions;
  }
  get jwtConfig(): JwtModuleOptions {
    return this.config.jwt as unknown as JwtModuleOptions;
  }
}
