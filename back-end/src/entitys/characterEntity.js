import { sequelize } from "./index";
import { INTEGER, STRING, BLOB } from "sequelize";

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
      type: BLOB("medium"),
      allowNull: false,
    },
    name: {
      type: STRING(100),
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
