import { LocaleString } from "src/common/locale-string/locale-string";
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Tag{
    @ObjectIdColumn()
    _id: ObjectID

    @PrimaryColumn()
    id:string

    @Column()
    name:LocaleString

    constructor(data?: Partial<Tag>) {
        Object.assign(this, data);
    }
}