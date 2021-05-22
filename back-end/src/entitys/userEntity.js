import { sequelize } from "./index";
import { INTEGER, STRING } from "sequelize";
import { Comic } from "./comicEntity";

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
    through: "user_comic",
    as: "comics",
    foreignKey: "user_id",
});

Comic.belongsToMany(User, {
    through: "user_comic",
    as: "users",
    foreignKey: "comic_id",
});

export { User };
