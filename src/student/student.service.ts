import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { StudentCreateInput } from './dto/create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid'
@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository:MongoRepository<Student>
    ){}

    async studentGetById(id:string):Promise<Student>{
        return this.studentRepository.findOne({id})
    }

    async studentGetByIds(studentIds: string[]):Promise<Student[]>{
        return this.studentRepository.find({
            where:{
                id:{
                    $in:studentIds
                }
            }
        })
    }

    async studentGetAll():Promise<Student[]>{
        return this.studentRepository.find()
    }

    async studentCreate(studentCreateInput:StudentCreateInput):Promise<Student>{
        const { firstName, lastName } = studentCreateInput
        const newStudent = new Student({
            id:uuid(),
            firstName,
            lastName
        })
        return this.studentRepository.save(newStudent)
    }

}
