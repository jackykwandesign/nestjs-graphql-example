import { Field, ID, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNotEmptyObject, IsUUID, ValidateNested } from "class-validator";
import { LocaleStringCreateInput } from "src/common/locale-string/locale-string-create.input";

@InputType()
export class TagUpdateInput{
    @Field(type => ID)
    @IsUUID("4")
    id:string

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => LocaleStringCreateInput)
    @Field(type => LocaleStringCreateInput)
    name: LocaleStringCreateInput
}

