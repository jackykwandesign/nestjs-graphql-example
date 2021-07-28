import { Field, ID, InterfaceType } from "@nestjs/graphql";

@InterfaceType('Node')
export abstract class NodeType{
    @Field(type => ID)
    id:string
}