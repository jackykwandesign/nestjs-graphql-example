import { Field, InputType } from "@nestjs/graphql"
import { IsOptional, MinLength } from "class-validator"

@InputType()
export class LocaleStringCreateInput {

    // can input any language, but at least lenth > 1 

    @IsOptional()
    @MinLength(1)
    @Field({nullable:true})
    en?: string

    @IsOptional()
    @MinLength(1)
    @Field({nullable:true})
    zh?: string

}