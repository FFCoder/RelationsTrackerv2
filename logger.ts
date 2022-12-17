import * as winston from 'winston';

export default winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'contact-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log.json', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log.json' }),
  ],
});