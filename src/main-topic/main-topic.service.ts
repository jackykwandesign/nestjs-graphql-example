import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MainTopicCreateInput } from './dto/main-topic-create.input';
import { MainTopic, SubTopic } from './main-topic.entity';
import { v4 as uuid } from 'uuid'
import { MainTopicAssignSubTopicInput } from './dto/main-topic-assign-to-sub-topic.input';
import { MainTopicRemoveSubTopicInput } from './dto/main-topic-remove-sub-topic.input';
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

    async mainTopicAssignSubTopic(subTopicAssignToMainTopicInput:MainTopicAssignSubTopicInput){
        const found = await this.mainTopicRepository.findOne({id:subTopicAssignToMainTopicInput.mainTopicId})
        if(found){
            found.subTopics.push(new SubTopic({
                id:uuid(),
                name:subTopicAssignToMainTopicInput.subTopicCreateInput.name,    
            }))
            const result = await this.mainTopicRepository.findOneAndUpdate({id:found.id},{
                $set:found
            })
            return found
        }
        return new NotFoundException()
    }

    async mainTopicRemoveSubTopics(mainTopicRemoveSubTopicInput:MainTopicRemoveSubTopicInput){
        const found = await this.mainTopicRepository.findOne({id:mainTopicRemoveSubTopicInput.mainTopicId})
        if(found){
            let filteredSubTopic = found.subTopics.filter(e=> mainTopicRemoveSubTopicInput.subTopicIds.findIndex(id => id === e.id) === -1)
            found.subTopics = filteredSubTopic
            // let foundIndex = found.subTopics.findIndex(e=>e.id === mainTopicRemoveSubTopicInput.subTopicId)
            // if(foundIndex === -1){
            //     return new NotFoundException('SubTopic Not Found')
            // }
            // found.subTopics.splice(foundIndex, 1)
            const result = await this.mainTopicRepository.findOneAndUpdate({id:found.id},{
                $set:found
            })
            return found
        }
        return new NotFoundException()
    }
}
