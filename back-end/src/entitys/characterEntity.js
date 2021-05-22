import { sequelize } from "./index";
import { INTEGER, STRING, TEXT } from "sequelize";

const Character = sequelize.define(
  "characters",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    apiId: {
      type: STRING(100),
      allowNull: false,
      unique: true
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
    tableName: "characters",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Character };
