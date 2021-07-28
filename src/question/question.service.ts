import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, MongoRepository } from 'typeorm';
import { GraphContentCreateInput, LongQuestionContentCreateInput, MCContentCreateInput, QuestionCreateInput, ShortQuestionContentCreateInput } from './dto/question-create.input';
import { GraphContent, LongQuestionContent, MCContent, Question, ShortQuestionContent } from './question.entity';
import { v4 as uuid } from 'uuid'
import { QuestionInputTypes } from './question-input-type.enum';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository:MongoRepository<Question>
    ){}

    async questionGetById(id:string):Promise<Question>{
        return this.questionRepository.findOne({id})
    }

    async questionGetByIds(questionIds: string[]):Promise<Question[]>{
        return this.questionRepository.find({
            where:{
                id:{
                    $in:questionIds
                }
            }
        })
    }

    async questionsGetByMainTopicId(mainTopicId:string){

        // if(mainTopicId && subTopicId !== undefined){
        //     return this.questionRepository.find({
        //         where:{
        //             topicId:{
        //                 $eq:mainTopicId
        //             },
        //             subTopicId:{
        //                 $eq:subTopicId
        //             }
        //         }
        //     })
        // }
        return this.questionRepository.find({
            where:{
                topicId:{
                    $eq:mainTopicId
                }
            }
        })
    }

    async questionsGetBySubTopicId(subTopicId: string){

        return this.questionRepository.find({
            where:{
                subTopicId:{
                    $eq:subTopicId
                }
            }
        })
    }

    async questionGetAll():Promise<Question[]>{
        return this.questionRepository.find()
    }

    async questionDeleteById(id: string):Promise<null>{
        const result = await this.questionRepository.findOneAndDelete({id})
        return result.value
    }

    async questionCreate(questionCreateInput:QuestionCreateInput){
        const { level, groupId, topicId, subTopicId, inputType,  } = questionCreateInput
        console.log("questionCreateInput", questionCreateInput)
        let content:MCContent | ShortQuestionContent | LongQuestionContent | GraphContent = null
        switch(inputType){
            case QuestionInputTypes.MULTIPLE_CHOICE:
                if( questionCreateInput.contentMC === undefined ){
                    throw new BadRequestException(`contentMC is undefined.`)
                }
                content = {
                    ...questionCreateInput.contentMC,
                    inputType
                }
                break
            case QuestionInputTypes.LONG_QUESTION:
                if( questionCreateInput.contentLongQuestion === undefined ){
                    throw new BadRequestException(`contentLongQuestion is undefined.`)
                }
                content = {
                    ...questionCreateInput.contentLongQuestion,
                    inputType
                }
                break
            case QuestionInputTypes.SHORT_QUESTION:
                if( questionCreateInput.contentShortQuestion === undefined ){
                    throw new BadRequestException(`contentShortQuestion is undefined.`)
                }
                content = {
                    ...questionCreateInput.contentShortQuestion,
                    inputType
                }
                break
            case QuestionInputTypes.GRAPH:
                if(questionCreateInput.contentGraph === undefined){
                    throw new BadRequestException(`contentGraph is undefined.`)
                }
                content = {
                    ...questionCreateInput.contentGraph,
                    inputType
                }
                break
            default:
                throw new BadRequestException()
        }
        const newQuestion = new Question({
            id:uuid(),
            level,
            groupId,
            topicId,
            subTopicId,
            inputType,
            content
        })
        return this.questionRepository.save(newQuestion)
    }
}
