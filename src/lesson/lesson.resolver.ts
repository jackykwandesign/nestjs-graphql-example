import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "../student/student.service";
import { LessonAssignToStudentsInput } from "./dto/lesson-asign-to-students.input";
import { lessonCreateInput } from "./dto/lesson-create.input";
import { Lesson } from "./lesson.entity";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of=>LessonType)
export class LessonResolver{

    constructor(
        private readonly lessonService:LessonService,
        private readonly studentService:StudentService
    ){}

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ){
        return this.lessonService.lessonGetById(id)
    }

    @Query(returns => [LessonType])
    lessons(
        // @Args('id') id: string,
    ){
        return this.lessonService.lessonGetAll()
    }

    @Mutation(returns => LessonType)
    lessonCreate(
        @Args('lessonCreateInput') lessonCreateInput:lessonCreateInput
    ){
        return this.lessonService.lessonCreate(lessonCreateInput)
    }

    @Mutation(returns => LessonType)
    lessonAssignToStudents(
        @Args('lessonAssignToStudentsInput') lessonAssignToStudentsInput:LessonAssignToStudentsInput
    ){
        return this.lessonService.lessonAssignToStudents(lessonAssignToStudentsInput)
    }

    @ResolveField()
    async students(@Parent() lesson:Lesson){
        return this.studentService.studentGetByIds(lesson.studentIds)
    }
}