import { NestApplication, NestFactory } from '@nestjs/core';
import { SpelunkerModule } from 'nestjs-spelunker';
import { MainModule } from '~/main.module';

/**
 * Mermaid graph를 만들어줌
 * @see https://mermaid.live/
 */
describe('generateModuleDepsGraph', () => {
  it('show', async () => {
    async function bootstrap() {
      const app = await NestFactory.create<NestApplication>(MainModule);

      // 1. Generate the tree as text
      const tree = SpelunkerModule.explore(app);
      const root = SpelunkerModule.graph(tree);
      const edges = SpelunkerModule.findGraphEdges(root);
      const mermaidEdges = edges
        .filter(
          // I'm just filtering some extra Modules out
          ({ from, to }) =>
            !(
              from.module.name === 'ConfigureModule' ||
              to.module.name === 'ConfigureModule' ||
              from.module.name === 'DatabaseModule' ||
              to.module.name === 'DatabaseModule' ||
              from.module.name === 'TypeOrmCoreModule' ||
              to.module.name === 'TypeOrmCoreModule'
            ),
        )
        .map(({ from, to }) => `${from.module.name}-->${to.module.name}`);
      console.log(`graph TD\n\t${mermaidEdges.join('\n\t')}`);

      // 2. Copy and paste the log content in "https://mermaid.live/"
    }

    await bootstrap();
  });
});
