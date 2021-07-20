
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentCreateInput } from "./dto/create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver()
export class StudentResolver{
    constructor(
        private studentService:StudentService,
    ){}

    @Query(returns => [StudentType])
    students(){
        return this.studentService.studentGetAll()
    }

    @Query(returns => StudentType)
    student(
        @Args('id') id:string
    ){
        return this.studentService.studentGetById(id)
    }

    @Mutation(returns => StudentType)
    studentCreate(
        @Args('studentCreateInput') studentCreateInput:StudentCreateInput
    ){
        return this.studentService.studentCreate(studentCreateInput)
    }
}