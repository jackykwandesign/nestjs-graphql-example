import { LocaleString } from "src/common/locale-string/locale-string";
import { Column, Entity, Index, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { QuestionInputTypes } from "./question-input-type.enum";

export class MCContent{

    inputType:QuestionInputTypes
    
    body:LocaleString

    answers: MCAnswer[]
  
    correctAnswer: string
  
    solution : LocaleString
}

export class MCAnswer {

    optionName:string

    body:LocaleString

}

export class ShortQuestionContent{

    inputType:QuestionInputTypes

    body:LocaleString

    answer: string
}

export class LongQuestionContent{

    inputType:QuestionInputTypes

    body:LocaleString

    answer: string
}

export class GraphContent{

    inputType:QuestionInputTypes

    body:LocaleString

    answer: string
}

@Entity()
// @Index(["topicId", "subTopicId","groupId"])
export class Question{
    @ObjectIdColumn()
    _id: ObjectID

    @PrimaryColumn()
    id:string

    @Column()
    level: number
  
    @Index()
    @Column()
    groupId: string

    @Index()
    @Column()
    topicId: string

    @Index()
    @Column()
    subTopicId: string
    
    @Column()
    inputType:QuestionInputTypes

    @Column()
    content: MCContent | ShortQuestionContent | LongQuestionContent | GraphContent
    // @Column()
    // content:LocaleString

    // @Column()
    // answers: MCAnswer[]
  
    // @Column()
    // correctAnswer: string
  
    // @Column()
    // solution : LocaleString

    constructor(data?: Partial<Question>) {
        Object.assign(this, data);
    }
}