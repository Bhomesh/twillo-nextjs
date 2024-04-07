import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    // add your entity paths here
  ],
  migrations: [
    // add your migration paths here
  ],
  subscribers: [
    // add your subscriber paths here
  ],
});

export default AppDataSource;
