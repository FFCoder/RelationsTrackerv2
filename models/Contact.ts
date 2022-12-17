import orm from '../db';
import { DataTypes as dt } from 'sequelize';

export const Contact = orm.define('Contact', {
  firstName: {
    type: dt.STRING,
    allowNull: false,
    defaultValue: 'John',
  },
  lastName: {
    type: dt.STRING,
    allowNull: false,
    defaultValue: 'Doe',
  },
  email: {
    type: dt.STRING,
    allowNull: true,
  },
});
