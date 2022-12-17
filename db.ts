import { Sequelize } from 'sequelize';
import * as models from './models';

import logger from './logger';

const engine = process.env.DB_ENGINE || 'sqlite';
const path = process.env.DB_PATH || ':memory:';

logger.info(`Connecting to ${engine} database at ${path}`);
const DB = new Sequelize(`${engine}:${path}`);

DB.sync({ force: false }).then(() => {
  console.log('Database & tables created!')
});

export default DB;