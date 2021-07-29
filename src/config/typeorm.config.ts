  
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

require('dotenv').config()
export const typeOrmConfig: TypeOrmModuleOptions = process.env.DB_ISATLAS === "true" ? {
    type: 'mongodb' ,
    // url:`mongodb+srv://pidev_fantasktic_test:aAOrlSCShze8Xzuw@cluster0.nrffy.mongodb.net/test?authSource=admin&replicaSet=atlas-1r2whb-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // database: process.env.DB_NAME ,    
    // username: process.env.DB_USERNAME ,
    // password: process.env.DB_PASSWORD ,
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`,
    authSource:"admin",
    ssl:true,
    replicaSet:"atlas-1r2whb-shard-0",
    synchronize: Boolean(process.env.DB_SYNC) ,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    useUnifiedTopology:true,
    useNewUrlParser:true,
}:{
    type: 'mongodb' ,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME ,    
    username: process.env.DB_USERNAME ,
    password: process.env.DB_PASSWORD ,
    synchronize: Boolean(process.env.DB_SYNC) ,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    useUnifiedTopology:true,
    useNewUrlParser:true,
}