import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    return app;
}

bootstrap().then((app) => {
    console.log("Listening...")
}).catch((err) => {
    console.log(err);
});
