import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile:true,
      // debug: false,
      // playground: false,
    }),
    LessonModule,
    StudentModule
  ],
})
export class AppModule {}
