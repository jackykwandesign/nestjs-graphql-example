import { Field, InputType } from "@nestjs/graphql"
import { MinLength } from "class-validator"

@InputType()
export class LocaleStringCreateInput {

    @MinLength(1)
    @Field()
    en?: string

    @Field({nullable:true})
    zh?: string
  
}