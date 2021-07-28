import { registerEnumType } from "@nestjs/graphql";

export enum QuestionInputTypes {
    SHORT_QUESTION="SHORT_QUESTION",
    LONG_QUESTION="LONG_QUESTION",
    MULTIPLE_CHOICE="MULTIPLE_CHOICE",
    GRAPH="GRAPH"
}

registerEnumType(QuestionInputTypes,{
    name:"QuestionInputTypes",
    description:"The supported Question Input types"
})