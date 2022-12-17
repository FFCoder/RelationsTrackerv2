import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import logger from './logger';

const engine = process.env.DB_ENGINE || 'sqlite';
const path = process.env.DB_PATH || ':memory:';

logger.info(`Connecting to ${engine} database at ${path}`);
const DB = new Sequelize(`${engine}:${path}`);

export default DB;