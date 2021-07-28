import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionCreateInput } from './dto/question-create.input';
import { QuestionService } from './question.service';
import { QuestionType } from './question.type';

@Resolver()
export class QuestionResolver {
    constructor(
        private readonly questionService:QuestionService,
    ){}

    @Query(returns => [QuestionType])
    questions(){
        return this.questionService.questionGetAll()
    }

    @Query(returns => QuestionType)
    question(
        @Args('id') id:string
    ){
        return this.questionService.questionGetById(id)
    }

    @Mutation(returns => QuestionType)
    questionCreate(
        @Args('questionCreateInput') questionCreateInput:QuestionCreateInput
    ){
        return this.questionService.questionCreate(questionCreateInput)
    }

    // @Mutation(returns => QuestionType)
    // questionUpdateById(
    //     @Args('questionUpdateInput') questionUpdateInput:QuestionUpdateInput
    // ){
    //     return this.questionService.questionUpdateById(questionUpdateInput)
    // }

    @Mutation(returns => QuestionType)
    questionDeleteById(
        @Args('id') id:string
    ){
        return this.questionService.questionDeleteById(id)
    }
}
