import { Args, Mutation, Parent, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Question } from 'src/question/question.entity';
import { QuestionService } from 'src/question/question.service';
import { MainTopicAssignSubTopicInput } from './dto/main-topic-assign-to-sub-topic.input';
import { MainTopicCreateInput } from './dto/main-topic-create.input';
import { MainTopicRemoveSubTopicInput as MainTopicRemoveSubTopicsInput } from './dto/main-topic-remove-sub-topic.input';
import { MainTopic, SubTopic } from './main-topic.entity';
import { MainTopicService } from './main-topic.service';
import { MainTopicType, SubTopicType } from './main-topic.type';

@Resolver(() => MainTopicType)
export class MainTopicResolver {
    constructor(
        private readonly mainTopicService:MainTopicService,
        private readonly questionService:QuestionService
    ){}
    
    @Query(returns => MainTopicType)
    mainTopic(
        @Args('id') id:string
    ){
        return this.mainTopicService.mainTopicGetById(id)
    }

    @Query(returns => [MainTopicType])
    mainTopics(
    ){
        return this.mainTopicService.mainTopicGetAll()
    }

    @Mutation(returns => MainTopicType)
    mainTopicCreate(
        @Args('mainTopicCreateInput') mainTopicCreateInput:MainTopicCreateInput
    ){
        return this.mainTopicService.mainTopicCreate(mainTopicCreateInput)
    }

    @Mutation(returns => MainTopicType)
    mainTopicDeleteById(
        @Args('id') id:string
    ){
        // need to clear question' topic id under this topic
        return this.mainTopicService.mainTopicDeleteById(id)
    }

    @Mutation(returns => MainTopicType)
    mainTopicAssignSubTopic(
        @Args('mainTopicAssignSubTopicInput') mainTopicAssignSubTopicInput:MainTopicAssignSubTopicInput
    ){
        return this.mainTopicService.mainTopicAssignSubTopic(mainTopicAssignSubTopicInput)
    }

    @Mutation(returns => MainTopicType)
    mainTopicRemoveSubTopics(
        @Args('mainTopicRemoveSubTopicsInput') mainTopicRemoveSubTopicsInput: MainTopicRemoveSubTopicsInput
    ){
        return this.mainTopicService.mainTopicRemoveSubTopics(mainTopicRemoveSubTopicsInput)
    }

    @ResolveField()
    async questions(
        @Parent() mainTopic:MainTopic,
        @Root() root
    ){
        return this.questionService.questionsGetByMainTopicId(mainTopic.id)
    }
}

@Resolver(() => SubTopicType)
export class SubTopicResolver {
    constructor(
        private readonly questionService:QuestionService
    ){}

    @ResolveField()
    async questions(
        @Parent() subTopic:SubTopic,
    ){
        return this.questionService.questionsGetBySubTopicId(subTopic.id)
    }
}
