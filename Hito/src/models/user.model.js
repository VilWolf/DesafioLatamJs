import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';
import bcrypt from "bcryptjs/dist/bcryptjs.js"

const Users = sequelize.define('USer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 8);
});

export default Users;