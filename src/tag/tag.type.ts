import { Field, ID, ObjectType } from "@nestjs/graphql";
import { LocaleStringType } from "src/common/locale-string/localeString.type";
import { NodeType } from "src/common/node-interface/node-interface.type";

@ObjectType('Tag',{
    implements: () => [NodeType]
})
export class TagType{
    @Field(type => ID)
    id:string

    @Field(type => LocaleStringType)
    name:LocaleStringType
}