import { RoomModule } from './Room/room.module';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { QuestionModule } from './Question/question.module';
import { AnswerModule } from './answer/answer.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { ChatGateway } from './chat.gateway';
import { TagModule } from './tag/tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/common';

@Module({
  imports: [
    RoomModule,
    AuthModule,
    UserModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [ormConfig, ormConfigProd],
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd
    }),
    CacheModule.register({
      Store: redisStore,
      host: 'localhost',
      port: 6379
    }),
    MailModule,
    QuestionModule,
    AnswerModule,
    TagModule
  ],

  controllers: [AppController],
  providers: [AppService, ChatGateway]
})
export class AppModule {}
