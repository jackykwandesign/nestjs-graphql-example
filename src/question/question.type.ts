import { Field, ID, InterfaceType, ObjectType, ResolveField } from "@nestjs/graphql";
import { LocaleStringType } from "src/common/locale-string/localeString.type";
import { NodeType } from "src/common/node-interface/node-interface.type";
import { QuestionInputTypes } from "./question-input-type.enum";

@ObjectType('Question',{
    implements: () => [NodeType],
})
export class QuestionType{
    @Field(type => ID)
    id:string

    @Field()
    level: number
  
    @Field({nullable:true})
    groupId: string

    @Field()
    topicId: string

    @Field({nullable:true})
    subTopicId: string
    
    @Field(type => QuestionInputTypes)
    inputType:QuestionInputTypes
    
    @Field(type => QuestionContentType)
    content: MCContentType | ShortQuestionContentType | LongQuestionContentType | GraphContentType

    
}

@InterfaceType({
    resolveType(value:QuestionType) {
        console.log("resolving value", value)
        switch(value.inputType){
            case QuestionInputTypes.MULTIPLE_CHOICE:
                return MCContentType
            case QuestionInputTypes.LONG_QUESTION:
                return LongQuestionContentType
            case QuestionInputTypes.SHORT_QUESTION:
                return ShortQuestionContentType
            case QuestionInputTypes.GRAPH:
                return GraphContentType
            default:
                return null
        }
    },
})
export abstract class QuestionContentType{
    @Field(type => QuestionInputTypes)
    inputType:QuestionInputTypes
}

// export const QuestionContentUnionType = createUnionType({
//     name: 'QuestionContentUnionType',
//     types: () => [MCContentType, ShortQuestionContentType, LongQuestionContentType, GraphContentType],
//     resolveType(value:QuestionType) {
//         console.log("resolving value", value)
//         switch(value.inputType){
//             case QuestionInputTypes.MULTIPLE_CHOICE:
//                 return MCContentType
//             case QuestionInputTypes.LONG_QUESTION:
//                 return LongQuestionContentType
//             case QuestionInputTypes.SHORT_QUESTION:
//                 return ShortQuestionContentType
//             case QuestionInputTypes.GRAPH:
//                 return GraphContentType
//             default:
//                 return null
//         }
//     },
// })
  
@ObjectType('MCContent',{
    implements: () => [QuestionContentType],
})
export class MCContentType implements QuestionContentType{

    @Field(type => QuestionInputTypes)
    inputType:QuestionInputTypes
    
    @Field(type => LocaleStringType)
    body: LocaleStringType

    @Field(type => [MCAnswerType])
    answers: MCAnswerType[]
  
    @Field()
    correctAnswer: string
  
    @Field(type => LocaleStringType)
    solution : LocaleStringType
}

@ObjectType('MCAnswer')
export class MCAnswerType {

    @Field()
    optionName:string

    @Field(type => LocaleStringType)
    body: LocaleStringType

}

@ObjectType('ShortQuestionContent',{
    implements: () => [QuestionContentType],
})
export class ShortQuestionContentType{

    @Field(type => QuestionInputTypes)
    inputType:QuestionInputTypes

    @Field(type => LocaleStringType)
    body: LocaleStringType

    @Field()
    answer: string

    @Field(type => LocaleStringType)
    solution : LocaleStringType
}

@ObjectType('LongQuestionContent',{
    implements: () => [QuestionContentType],
})
export class LongQuestionContentType{

    @Field(type => QuestionInputTypes)
    inputType:QuestionInputTypes

    @Field(type => LocaleStringType)
    body: LocaleStringType

    @Field()
    answer: string

    @Field(type => LocaleStringType)
    solution : LocaleStringType
}

@ObjectType('GraphContent',{
    implements: () => [QuestionContentType],
})
export class GraphContentType{

    @Field(type => QuestionInputTypes)
    inputType:QuestionInputTypes

    @Field(type => LocaleStringType)
    body: LocaleStringType

    @Field()
    answer: string

    @Field(type => LocaleStringType)
    solution : LocaleStringType
}

