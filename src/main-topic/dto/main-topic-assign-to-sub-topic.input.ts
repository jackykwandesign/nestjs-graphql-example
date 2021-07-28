import { InputType, Field, ID } from "@nestjs/graphql"
import { Type } from "class-transformer"
import { IsUUID, ValidateNested } from "class-validator"
import { SubTopicCreateInput } from "./main-topic-create.input"

@InputType()
export class MainTopicAssignSubTopicInput{
    
    @IsUUID()
    @Field(type => ID)
    mainTopicId: string

    @ValidateNested()
    @Type(() => SubTopicCreateInput)
    @Field( type => SubTopicCreateInput)
    subTopicCreateInput:SubTopicCreateInput
}