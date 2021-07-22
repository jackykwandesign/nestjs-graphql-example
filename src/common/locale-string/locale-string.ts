import {IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class LocaleString {

  // @IsString()
  // @IsOptional()
  en?: string = ""

  // @IsString()
  // @IsOptional()
  zh?: string = ""
  
  constructor(localeString?: Partial<LocaleString>) {
    Object.assign(this, localeString);
  }
}