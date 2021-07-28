import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { MainTopicModule } from './main-topic/main-topic.module';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { TagModule } from './tag/tag.module';
import { QuestionModule } from './question/question.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile:true,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: false,
      // playground: false,
    }),
    // LessonModule,
    // StudentModule,
    MainTopicModule,
    CommonModule,
    TagModule,
    QuestionModule
  ],
})
export class AppModule {}
