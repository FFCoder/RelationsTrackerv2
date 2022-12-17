import orm from '../db';
import { DataTypes as dt, Model } from 'sequelize';
import crypto from "crypto";
import { Contact } from './Contact';

export class User extends Model {}

User.init({
  userName: {
    type: dt.STRING,
    allowNull: false,

  },
  password: {
    type: dt.STRING,
    allowNull: false,
    defaultValue: "",
    set(val: string) {
      const hash = crypto
        .pbkdf2Sync(
          val,
          <string>this.get("userName"),
          1000,
          64,
          "sha512"
        )
        .toString("hex");
      this.setDataValue('password', hash);
    }
  },
  firstName: {
    type: dt.STRING,
    allowNull: false,
  },
  lastName: {
    type: dt.STRING,
    allowNull: false,
  },
  email: {
    type: dt.STRING,
    allowNull: false,
    defaultValue: "",
  },
  googleId: {
    type: dt.STRING,
    allowNull: true,
  }
}, {
  sequelize: orm,
  modelName: 'User',
});

User.hasMany(Contact, {
  foreignKey: 'assignedUserId',
})


User.sync().then(() => {
  console.log('Users table created');
});