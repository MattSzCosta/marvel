import { sequelize } from "./index";
import { INTEGER, STRING, BLOB } from "sequelize";

const Comic = sequelize.define(
  "comics",
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
      type: BLOB("medium"),
      allowNull: false,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "comics",
  }
);

export { Comic };
