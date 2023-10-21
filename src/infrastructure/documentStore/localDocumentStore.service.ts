import { DocumentStoreService } from '~/infrastructure/documentStore/documentStore.service';
import { Result } from '@leejuyoung/result';
import * as fs from 'fs/promises';
import { join } from 'path';

export class LocalDocumentStoreService extends DocumentStoreService {
  constructor(private readonly basePath: string = '') {
    super();
  }
  async putObject(key: string, buffer: Uint8Array): Promise<Result<void>> {
    try {
      await fs.writeFile(join(this.basePath, key), buffer);
      return Result.success();
    } catch (e) {
      return Result.failure(e as Error);
    }
  }
  async deleteObject(key: string): Promise<Result<void>> {
    try {
      await fs.unlink(join(this.basePath, key));
      return Result.success();
    } catch (e) {
      return Result.failure(e as Error);
    }
  }

  async exists(key: string): Promise<Result<boolean>> {
    try {
      await fs.stat(join(this.basePath, key));
      return Result.of(true);
    } catch (e) {
      return Result.of(false);
    }
  }

  async getObject(key: string): Promise<Result<Uint8Array>> {
    try {
      const file = await fs.readFile(join(this.basePath, key));
      return Result.of(file);
    } catch (e) {
      return Result.failure(e as Error);
    }
  }
}
