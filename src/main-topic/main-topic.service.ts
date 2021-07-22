import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MainTopicCreateInput } from './dto/main-topic-create.input';
import { MainTopic } from './main-topic.entity';
import { v4 as uuid } from 'uuid'
@Injectable()
export class MainTopicService {
    constructor(
        @InjectRepository(MainTopic)
        private readonly mainTopicRepository:MongoRepository<MainTopic>,
    ){}

    async mainTopicGetById(id: string):Promise<MainTopic>{
        return this.mainTopicRepository.findOne({id})
    }

    async mainTopicGetAll():Promise<MainTopic[]>{
        return this.mainTopicRepository.find()
    }

    async mainTopicCreate(mainTopicCreateInput:MainTopicCreateInput):Promise<MainTopic>{
        // return 
        const {subject, studyYear, name, } = mainTopicCreateInput
        const newMainTopic = new MainTopic({
            id: uuid(),
            subject,
            studyYear,
            name

        })
        return this.mainTopicRepository.save(newMainTopic)

    }
}
