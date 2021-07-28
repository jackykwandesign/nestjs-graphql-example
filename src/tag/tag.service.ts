import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { TagCreateInput } from './dto/tag-create.input';
import { Tag } from './tag.entity';
import { v4 as uuid } from 'uuid'
import { TagUpdateInput } from './dto/tag-update.input';
import { CombineLocale } from 'src/common/locale-string/locale-string';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository:MongoRepository<Tag>
    ){}

    async tagGetById(id:string):Promise<Tag>{
        return this.tagRepository.findOne({id})
    }

    async tagGetByIds(tagIds: string[]):Promise<Tag[]>{
        return this.tagRepository.find({
            where:{
                id:{
                    $in:tagIds
                }
            }
        })
    }

    async tagGetAll():Promise<Tag[]>{
        return this.tagRepository.find()
    }

    async tagDeleteById(id: string):Promise<null>{
        const result = await this.tagRepository.findOneAndDelete({id})
        return result.value
    }

    async tagCreate(tagCreateInput:TagCreateInput){
        const { name } = tagCreateInput
        const newTag = new Tag({
            id:uuid(),
            name
        })
        return this.tagRepository.save(newTag)
    }

    async tagUpdateById(tagUpdateInput:TagUpdateInput){
        const found = await this.tagRepository.findOne({id:tagUpdateInput.id})
        if(found){
            // update language field is not null in update input
            const updatedName = CombineLocale(tagUpdateInput.name, found.name)
            found.name = updatedName
            const result = await this.tagRepository.findOneAndUpdate({id:tagUpdateInput.id},{
                $set:found
            })
            return found
        }
        return new NotFoundException()
    }
}
