
import { LocaleString } from 'src/common/locale-string/locale-string';
import { Entity, ObjectIdColumn, Column, CreateDateColumn, ObjectID, PrimaryColumn } from 'typeorm';

export class SubTopic {

  id:string

  name:LocaleString

  constructor(data?: Partial<SubTopic>) {
    Object.assign(this, data);
  }
}

@Entity()
export class MainTopic {
  @ObjectIdColumn() _id: ObjectID

  @PrimaryColumn() id:string
  
  @Column()
  name: LocaleString

  @Column()
  studyYear:number
  
  @Column()
  subject:string

  @Column()
  subTopics:SubTopic[]

  @Column()
  orderSequence: number

  @CreateDateColumn()
  createAt: Date;
  
  constructor(mathMC?: Partial<MainTopic>) {
    Object.assign(this, mathMC);
  }
}