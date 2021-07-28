import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Question]),
  ],
  providers: [QuestionService, QuestionResolver],
  exports:[
    QuestionService
  ]
})
export class QuestionModule {}
