import {IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class LocaleString {

  en?: string

  zh?: string
  
  constructor(localeString?: Partial<LocaleString>) {
    Object.assign(this, localeString);
  }
}

export function CombineLocale(source:LocaleString, dest:LocaleString):LocaleString{
  // combine props exist in source to dest
  let _dest = dest
  for (const [key, value] of Object.entries(source)) {
    if(source[key] != null){
      _dest[key] = source[key]
    }
  }
  return _dest
}