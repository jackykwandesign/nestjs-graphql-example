import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from 'src/question/question.module';
import { MainTopic } from './main-topic.entity';
import { MainTopicResolver, SubTopicResolver } from './main-topic.resolver';
import { MainTopicService } from './main-topic.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([MainTopic]),
    QuestionModule
  ],
  providers: [MainTopicResolver, SubTopicResolver, MainTopicService]
})
export class MainTopicModule {}
