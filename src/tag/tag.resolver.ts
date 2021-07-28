import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagCreateInput } from './dto/tag-create.input';
import { TagUpdateInput } from './dto/tag-update.input';
import { TagService } from './tag.service';
import { TagType } from './tag.type';

@Resolver()
export class TagResolver {
    constructor(
        private readonly tagService:TagService,
    ){}

    @Query(returns => [TagType])
    tags(){
        return this.tagService.tagGetAll()
    }

    @Query(returns => TagType)
    tag(
        @Args('id') id:string
    ){
        return this.tagService.tagGetById(id)
    }

    @Mutation(returns => TagType)
    tagCreate(
        @Args('tagCreateInput') tagCreateInput:TagCreateInput
    ){
        return this.tagService.tagCreate(tagCreateInput)
    }

    @Mutation(returns => TagType)
    tagUpdateById(
        @Args('tagUpdateInput') tagUpdateInput:TagUpdateInput
    ){
        return this.tagService.tagUpdateById(tagUpdateInput)
    }

    @Mutation(returns => TagType)
    tagDeleteById(
        @Args('id') id:string
    ){
        return this.tagService.tagDeleteById(id)
    }

}
