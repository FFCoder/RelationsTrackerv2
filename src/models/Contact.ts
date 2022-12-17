import orm from '../db';
import { DataTypes as dt, Model } from 'sequelize';

export class Contact extends Model {}
Contact.init({
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
    defaultValue: "",
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  blocked: {
    type: dt.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  blockNotes: {
    type: dt.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      max: 255,
    }
  },
  assignedUserId: {
    type: dt.INTEGER,
    allowNull: true,
    defaultValue: null
  }
},{
  sequelize: orm,
  modelName: 'Contact',
})

Contact.sync({ alter: true }).then(() => {
  console.log('Contacts table created/updated');
});