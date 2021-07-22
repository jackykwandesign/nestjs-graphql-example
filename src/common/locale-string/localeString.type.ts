import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('LocaleString')
export class LocaleStringType {

  @Field()
  en?: string

  @Field({nullable:true})
  zh?: string
  
}