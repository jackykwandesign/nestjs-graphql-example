import { Field, ID, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, ValidateNested, IsString, IsArray } from 'class-validator'
import { LocaleStringCreateInput } from "src/common/locale-string/locale-string-create.input";

@InputType()
export class SubTopicCreateInput {

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => LocaleStringCreateInput)
    @Field( type => LocaleStringCreateInput)
    name: LocaleStringCreateInput
}

@InputType()
export class MainTopicCreateInput {

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => LocaleStringCreateInput)
    @Field(type => LocaleStringCreateInput)
    name: LocaleStringCreateInput

    @IsNumber()
    @IsNotEmpty()
    @Field()
    studyYear: number

    @IsString()
    @IsNotEmpty()
    @Field()
    subject: string

    @Type(() => SubTopicCreateInput)
    @IsArray()
    @ValidateNested({ each: true })
    @Field(type => [SubTopicCreateInput], {defaultValue:[]})
    subTopics: SubTopicCreateInput[]

    // @IsNumber()
    // @IsNotEmpty()
    // orderSequence: number
    
}