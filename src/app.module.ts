import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RouterModule} from "@nestjs/core";
import {UsersModule} from "./users/users.module";
import {TypeOrmModule} from "./datasource/typeorm.module";


@Module({
    imports: [
        TypeOrmModule,
        UsersModule,
        RouterModule.register([
            {
                path: 'api/v1/User',
                module: UsersModule,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
