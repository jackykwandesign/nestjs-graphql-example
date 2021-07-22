import { Field, ID, ObjectType } from "@nestjs/graphql";
import { LocaleStringType } from "src/common/locale-string/localeString.type";

@ObjectType('MainTopic')
export class MainTopicType {
    @Field(type =>ID) 
    id:string
  
    @Field(type => LocaleStringType)
    name: LocaleStringType
  
    @Field()
    studyYear:number
    
    @Field()
    subject:string
  
    @Field()
    orderSequence: number
  
    @Field()
    createAt: Date;
}