import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Lesson {
    @ObjectIdColumn() 
    _id: ObjectID
    
    @PrimaryColumn()
    id:string

    @Column()
    name:string

    @Column()
    startDate:string

    @Column()
    endDate:string

    @Column()
    studentIds:string[]

    constructor(data?: Partial<Lesson>) {
        Object.assign(this, data);
    }
}