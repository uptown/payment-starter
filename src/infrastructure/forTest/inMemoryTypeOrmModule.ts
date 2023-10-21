import { TypeOrmModule } from '@nestjs/typeorm';

export const InMemoryTypeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    entities: ['src/domain/**/*.entity.{ts,js}'],
  }),
});
