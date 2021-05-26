import { sequelize } from './index';
import { INTEGER, STRING, TEXT } from 'sequelize';

const UserChar = sequelize.define(
  'user_characters',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    userId: {
      type: STRING,
    },
    charId: {
      type: STRING,
    },
  },
  {
    tableName: 'user_characters',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { UserChar };
