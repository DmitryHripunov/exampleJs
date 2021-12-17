import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppLogger } from './utils';

declare const module: any;

async function bootstrap() {
  console.log('bootstrap');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');
  // const keyFile = fs.readFileSync(join(__dirname, '..', 'ssl/server.key'));
  // const certFile = fs.readFileSync(join(__dirname, '..', 'ssl/server.crt'));
  console.log('certs ready');
  const app = await NestFactory.create<NestExpressApplication>(AppModule
    // {
    //   // logger: new AppLogger(),
    //   httpsOptions: {
    //     key: keyFile,
    //     cert: certFile,
    //   },
    // }
  );
  console.log('cors enabled');
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/assets',
    dotfiles: 'ignore',
    setHeaders: (res, path, stat) => {
      const filename = path
        .split('/')
        .slice(-1)
        .pop();
      res.set({
        'X-Powered-By': `NestJS`,
        'Content-Disposition': `attachment; filename=${filename}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Expose-Headers': 'Content-Disposition',
      });
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`  Listening on http://localhost:${port}/api/products`);
  // await app.listen(3000);
  // console.log('listen app ')

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
