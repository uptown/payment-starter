import { Result } from '@leejuyoung/result';

export abstract class DocumentStoreService {
  abstract exists(key: string): Promise<Result<boolean>>;
  abstract getObject(key: string): Promise<Result<Uint8Array>>;
  abstract putObject(key: string, buffer: Uint8Array): Promise<Result<void>>;
  abstract deleteObject(key: string): Promise<Result<void>>;
}
