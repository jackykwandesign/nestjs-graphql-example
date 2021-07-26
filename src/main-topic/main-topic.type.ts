import { Field, ID, ObjectType } from "@nestjs/graphql";
import { LocaleStringType } from "src/common/locale-string/localeString.type";

@ObjectType('SubTopic')
export class SubTopicType {
    @Field(type =>ID) 
    id:string
  
    @Field(type => LocaleStringType)
    name: LocaleStringType
  
}

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

    @Field(type => [SubTopicType])
    subTopics:SubTopicType[]
  
    @Field()
    orderSequence: number
  
    @Field()
    createAt: Date;
}