import { Field, ID, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { LocaleStringType } from "src/common/locale-string/localeString.type";
import { NodeType } from "src/common/node-interface/node-interface.type";
import { QuestionType } from "src/question/question.type";

@ObjectType('SubTopic',{
    implements: () => [NodeType]
})
export class SubTopicType {
    @Field(type =>ID) 
    id:string
  
    @Field(type => LocaleStringType)
    name: LocaleStringType
  
    @Field(type => [QuestionType])
    questions:QuestionType[]
}

@ObjectType('MainTopic',{
    implements: () => [NodeType]
})
export class MainTopicType {
    @Field(type =>ID) 
    id:string
  
    @Field(type => LocaleStringType)
    name: LocaleStringType
  
    @Field()
    studyYear:number
    
    @Field()
    subject:string

    @Field(type => [SubTopicType], {nullable:true})
    subTopics:SubTopicType[]
  
    @Field(type => [QuestionType])
    questions:QuestionType[]

    @Field()
    orderSequence: number
  
    @Field()
    createAt: Date;
}