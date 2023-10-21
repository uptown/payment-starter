import { Module } from '@nestjs/common';
import { DocumentStoreService } from '~/infrastructure/documentStore/documentStore.service';
import { LocalDocumentStoreService } from '~/infrastructure/documentStore/localDocumentStore.service';

@Module({
  providers: [
    {
      provide: DocumentStoreService,
      useFactory: () => {
        return new LocalDocumentStoreService();
      },
    },
  ],
})
export class DocumentStoreModule {}
