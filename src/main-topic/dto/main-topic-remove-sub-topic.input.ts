import { InputType, Field, ID } from "@nestjs/graphql"
import { IsArray, IsUUID, ValidateNested } from "class-validator"


@InputType()
export class MainTopicRemoveSubTopicInput{
    @IsUUID("4")
    @Field(type => ID)
    mainTopicId: string

    @IsUUID("4", { each:true })
    @Field(type => [ID])
    subTopicIds:string[]

}