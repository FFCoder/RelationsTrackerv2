import {transports, format, createLogger} from 'winston';
const { File } = transports;

export default createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'contact-service' },

  transports: [
    new File({ filename: 'error.log', level: 'error' }),
    new File({ filename: 'combined.log' }),
  ],
});