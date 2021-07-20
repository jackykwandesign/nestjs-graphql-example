import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Student{
    @ObjectIdColumn()
    _id: ObjectID

    @PrimaryColumn()
    id:string

    @Column()
    firstName:string

    @Column()
    lastName: string

    constructor(data?: Partial<Student>) {
        Object.assign(this, data);
    }
}