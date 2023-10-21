import { Test } from '@nestjs/testing';
import { DocumentStoreModule } from '~/infrastructure/documentStore/documentStore.module';
import { DocumentStoreService } from '~/infrastructure/documentStore/documentStore.service';
import * as fs from 'fs/promises';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { join } from 'path';
import * as assert from 'assert';

describe('localDocumentStoreService', () => {
  let documentStoreService: DocumentStoreService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DocumentStoreModule],
    }).compile();

    documentStoreService = moduleRef.get(DocumentStoreService);
  });
  it('file test', async () => {
    const tempDir = await fs.mkdtemp(randomStringGenerator());
    const result1 = await documentStoreService.getObject(
      join(tempDir, 'testfile'),
    );
    assert.ok(result1.isFailure());

    const result2 = await documentStoreService.exists(
      join(tempDir, 'testfile'),
    );
    assert.equal(result2.getOrNull(), false);

    const enc = new TextEncoder(); // always utf-8
    const result3 = await documentStoreService.putObject(
      join(tempDir, 'testfile'),
      enc.encode('asdasd'),
    );
    result3.getOrThrow();

    const result4 = await documentStoreService.getObject(
      join(tempDir, 'testfile'),
    );
    const ret = result4.getOrThrow();
    const dec = new TextDecoder();

    assert.equal(dec.decode(ret), 'asdasd');
    const result5 = await documentStoreService.exists(
      join(tempDir, 'testfile'),
    );
    assert.equal(result5.getOrNull(), true);

    const result6 = await documentStoreService.deleteObject(
      join(tempDir, 'testfile'),
    );
    result6.getOrThrow();
    await fs.rmdir(tempDir);
  });
});
