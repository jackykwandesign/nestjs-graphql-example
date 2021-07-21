import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid'
import { lessonCreateInput } from './dto/lesson-create.input';
import { LessonAssignToStudentsInput } from './dto/lesson-asign-to-students.input';
@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private readonly lessonRepository:MongoRepository<Lesson>,
    ){}

    async lessonGetById(id: string):Promise<Lesson>{
        return this.lessonRepository.findOne({id})
    }

    async lessonsGetByStudentId(studentId: string):Promise<Lesson[]>{
        return this.lessonRepository.find({
            where:{
                studentIds:{
                    $elemMatch:{
                        $eq:studentId
                    }
                }
            }
        })
    }

    async lessonGetAll():Promise<Lesson[]>{
        return this.lessonRepository.find()
    }

    async lessonCreate(lessonCreateInput:lessonCreateInput):Promise<Lesson>{
        const { name, startDate, endDate, studentIds } = lessonCreateInput
        const lesson = this.lessonRepository.create({
            id:uuid(),
            name,
            startDate,
            endDate,
            studentIds
        })
        return this.lessonRepository.save(lesson)
    }

    async lessonAssignToStudents(lessonAssignToStudentsInput:LessonAssignToStudentsInput){
        const {lessonId, studentIds } = lessonAssignToStudentsInput
        const lesson = await this.lessonRepository.findOne({
            id:lessonId
        })
        lesson.studentIds = [... new Set([...lesson.studentIds, ...studentIds])]
        return this.lessonRepository.save(lesson)
    }
}
