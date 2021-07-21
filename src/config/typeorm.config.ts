  
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

require('dotenv').config()
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb' ,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) ,
    database: process.env.DB_NAME ,    
    username: process.env.DB_USERNAME ,
    password: process.env.DB_PASSWORD ,
    synchronize: Boolean(process.env.DB_SYNC) ,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    useUnifiedTopology:true,
}