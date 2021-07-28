import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('LocaleString')
export class LocaleStringType {

  @Field({nullable:true})
  en?: string

  @Field({nullable:true})
  zh?: string
  
}