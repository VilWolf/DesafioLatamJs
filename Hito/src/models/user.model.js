import { DataTypes } from 'sequelize';
import sequelize from '../../src/database/sequelize.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const Users = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.beforeCreate(async (user) => {
  console.log('pass original: ', user.password);
  user.password = await bcrypt.hash(user.password, 8);
  console.log('pass hassed: ', user.password);
});

export default Users;
