import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

export const Usuario = sequelize.define('usuarios', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(15) },
  password: { type: DataTypes.STRING(15) },
  email: { type: DataTypes.STRING(100) },
});
