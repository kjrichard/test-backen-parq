import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'J@ir0425',
      database: 'parq',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
   
    UserModule,
    HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
