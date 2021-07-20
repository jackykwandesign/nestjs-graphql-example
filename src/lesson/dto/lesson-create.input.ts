import { Field, ID, InputType } from "@nestjs/graphql";
import { MinLength, IsDateString, IsUUID } from 'class-validator'
import { LessonType } from "../lesson.type";
@InputType()
export class lessonCreateInput extends LessonType{

    @MinLength(1)
    @Field()
    name:string

    @IsDateString()
    @Field()
    startDate:string

    @IsDateString()
    @Field()
    endDate:string

    @IsUUID("4", { each:true })
    @Field(type => [ID], { defaultValue:[]})
    studentIds:string[]
}