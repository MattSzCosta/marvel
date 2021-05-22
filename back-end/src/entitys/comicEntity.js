import { sequelize } from './index';
import { INTEGER, STRING, TEXT } from 'sequelize';

const Comic = sequelize.define(
  'comics',
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    apiId: {
      type: STRING(100),
      allowNull: false,
    },
    thumb: {
      type: TEXT,
      allowNull: false,
    },
    name: {
      type: TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'comics',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Comic };
