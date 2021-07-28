import { createUnionType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsUUID, Max, Min } from "class-validator";
import { LocaleStringCreateInput } from "src/common/locale-string/locale-string-create.input";
import { QuestionInputTypes } from "../question-input-type.enum";

@InputType()
export class MCContentCreateInput{

    @Field(type => LocaleStringCreateInput)
    body: LocaleStringCreateInput

    @Field(type => [MCAnswerCreateInput])
    answers: MCAnswerCreateInput[]
  
    @Field()
    correctAnswer: string
  
    @Field(type => LocaleStringCreateInput)
    solution: LocaleStringCreateInput
}

@InputType()
export class MCAnswerCreateInput {

    @Field(type => LocaleStringCreateInput)
    body: LocaleStringCreateInput

    @Field()
    optionName:string

}

@InputType()
export class ShortQuestionContentCreateInput{
    @Field(type => LocaleStringCreateInput)
    body: LocaleStringCreateInput

    @Field()
    answer: string

    @Field(type => LocaleStringCreateInput)
    solution: LocaleStringCreateInput
}

@InputType()
export class LongQuestionContentCreateInput{
    @Field(type => LocaleStringCreateInput)
    body: LocaleStringCreateInput

    @Field()
    answer: string

    @Field(type => LocaleStringCreateInput)
    solution: LocaleStringCreateInput
}

@InputType()
export class GraphContentCreateInput{
    @Field(type => LocaleStringCreateInput)
    body: LocaleStringCreateInput

    @Field()
    answer: string

    @Field(type => LocaleStringCreateInput)
    solution: LocaleStringCreateInput
}

@InputType()
export class QuestionCreateInput{

    @Field()
    @Min(0)
    @Max(3)
    level: number
  
    @IsUUID()
    @IsOptional()
    @Field({nullable:true})
    groupId: string

    @IsUUID()
    @Field()
    topicId: string

    @IsUUID()
    @IsOptional()
    @Field({nullable:true})
    subTopicId: string
    
    @Field(type => QuestionInputTypes)
    inputType:QuestionInputTypes

    @Field(type => MCContentCreateInput, {nullable:true})
    contentMC: MCContentCreateInput

    @Field(type => ShortQuestionContentCreateInput, {nullable:true})
    contentShortQuestion: ShortQuestionContentCreateInput

    @Field(type => LongQuestionContentCreateInput, {nullable:true})
    contentLongQuestion: LongQuestionContentCreateInput

    @Field(type => GraphContentCreateInput, {nullable:true})
    contentGraph: GraphContentCreateInput
}

// export const QuestionContentUnionCreateInput = createUnionType({
//     name: 'QuestionContentUnionCreateInput',
//     types: () => [MCContentCreateInput, ShortQuestionContentCreateInput, LongQuestionContentCreateInput, GraphContentCreateInput],
// })

