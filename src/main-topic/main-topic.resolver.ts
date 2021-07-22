import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainTopicCreateInput } from './dto/main-topic-create.input';
import { MainTopicService } from './main-topic.service';
import { MainTopicType } from './main-topic.type';

@Resolver(() => MainTopicType)
export class MainTopicResolver {
    constructor(
        private readonly mainTopicService:MainTopicService
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
}

