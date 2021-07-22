
import { LocaleString } from 'src/common/locale-string/locale-string';
import { Entity, ObjectIdColumn, Column, CreateDateColumn, ObjectID, PrimaryColumn } from 'typeorm';
// import { LocaleString } from '../config/locale-string/localeString';


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
  orderSequence: number

  @CreateDateColumn()
  createAt: Date;
  
  constructor(mathMC?: Partial<MainTopic>) {
    Object.assign(this, mathMC);
  }
}