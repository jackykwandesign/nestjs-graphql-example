import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MainTopicCreateInput } from './dto/main-topic-create.input';
import { MainTopic, SubTopic } from './main-topic.entity';
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

    async mainTopicDeleteById(id: string):Promise<null>{
        const result = await this.mainTopicRepository.findOneAndDelete({id})
        return result.value
    }

    async mainTopicCreate(mainTopicCreateInput:MainTopicCreateInput):Promise<MainTopic>{
        // return 
        const {subject, studyYear, name, subTopics:subTopicInputs} = mainTopicCreateInput
        let subTopics:SubTopic[] = []
        for(const subTopicInput of subTopicInputs){
            subTopics.push(new SubTopic({
                id:uuid(),
                name:subTopicInput.name,    
            }))
        }   
        const newMainTopic = new MainTopic({
            id: uuid(),
            subject,
            studyYear,
            name,
            subTopics
        })
        return this.mainTopicRepository.save(newMainTopic)
    }
}
