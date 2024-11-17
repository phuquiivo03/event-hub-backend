import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import * as path from "path"
export default (): PostgresConnectionOptions => {
    return {
        url: process.env.DATABASE_KEY,
        type: "postgres",
        port: 3306,
        entities: [path.resolve(__dirname, "..") + "/**/*.entity{.ts,.js}"],
        synchronize: true, //auto update database chema base on entities definition
    }
}