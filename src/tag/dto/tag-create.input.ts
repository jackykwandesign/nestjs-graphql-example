import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { LocaleStringCreateInput } from "src/common/locale-string/locale-string-create.input";

@InputType()
export class TagCreateInput{
    
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => LocaleStringCreateInput)
    @Field(type => LocaleStringCreateInput)
    name: LocaleStringCreateInput
}

