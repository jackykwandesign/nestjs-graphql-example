import { Field, ID, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { MinLength, IsDateString, IsUUID, IsNotEmpty, IsNotEmptyObject, IsNumber, ValidateNested, IsString } from 'class-validator'
import { LocaleString } from "src/common/locale-string/locale-string";
import { LocaleStringCreateInput } from "src/common/locale-string/locale-string-create.input";
import { LocaleStringType } from "src/common/locale-string/localeString.type";
import { MainTopicType } from "../main-topic.type";

@InputType()
export class MainTopicCreateInput extends MainTopicType{

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => LocaleStringCreateInput)
    @Field()
    name: LocaleStringCreateInput

    @IsNumber()
    @IsNotEmpty()
    @Field()
    studyYear: number

    @IsString()
    @IsNotEmpty()
    @Field()
    subject: string

    // @IsNumber()
    // @IsNotEmpty()
    // orderSequence: number
    
}