import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";
import { StudentType } from "../student.type";

@InputType()
export class StudentCreateInput extends StudentType{

    @MinLength(1)
    @IsString()
    @Field()
    firstName:string

    @MinLength(1)
    @IsString()
    @Field()
    lastName:string
}