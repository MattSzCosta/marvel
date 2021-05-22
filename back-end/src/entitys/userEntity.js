import { sequelize } from "./index";
import { INTEGER, STRING } from "sequelize";
import { Comic } from "./comicEntity";
import { Character } from "./characterEntity";

const User = sequelize.define(
  "users",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type:STRING,
      allowNull: false,
    },
    email: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "users", 
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  
  }
);

User.belongsToMany(Comic, {
    through: "user_comics",
    as: "comics",
    foreignKey: "userId",
});

Comic.belongsToMany(User, {
    through: "user_comics",
    as: "users",
    foreignKey: "comicId",
});

User.belongsToMany(Character, {
  through: "user_characters",
  as: "characters",
  foreignKey: "userId",
});

Character.belongsToMany(User, {
  through: "user_characters",
  as: "users",
  foreignKey: "charId",
});

export { User };
