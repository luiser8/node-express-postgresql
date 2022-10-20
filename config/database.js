import { Sequelize }  from 'sequelize';
import dotenv from 'dotenv';

    dotenv.config();
    const pg_host = process.env.NODE_ENV === "development" ? process.env.PG_HOST : process.env.PG_HOST;

     const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
         host: pg_host,
         port: process.env.PG_PORT,
         dialect: process.env.PG_DIALECT,
         ssl: process.env.PG_SSL,
       });

export default sequelize;