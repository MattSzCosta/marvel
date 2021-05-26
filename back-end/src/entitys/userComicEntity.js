import { sequelize } from './index';
import { INTEGER, STRING, TEXT } from 'sequelize';

const UserComics = sequelize.define(
  'user_comics',
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
    comicId: {
      type: STRING,
    },
  },
  {
    tableName: 'user_comics',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { UserComics };
