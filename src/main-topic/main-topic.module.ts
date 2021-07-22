import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainTopic } from './main-topic.entity';
import { MainTopicResolver } from './main-topic.resolver';
import { MainTopicService } from './main-topic.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([MainTopic]),
  ],
  providers: [MainTopicResolver, MainTopicService]
})
export class MainTopicModule {}
