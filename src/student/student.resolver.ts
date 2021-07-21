
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonService } from "src/lesson/lesson.service";
import { StudentCreateInput } from "./dto/create-student.input";
import { Student } from "./student.entity";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(() => StudentType)
export class StudentResolver{
    constructor(
        private studentService:StudentService,
        private lessonService:LessonService
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

    @ResolveField()
    lessons(@Parent() student:Student){
        return this.lessonService.lessonsGetByStudentId(student.id)
    }
}