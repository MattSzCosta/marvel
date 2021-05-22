const { config } = require('dotenv');

config({
  path: '.env',
});

const configDatabase = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_DB,
  dialect: 'mariadb',
  seederStorage: 'sequelize',
  seederStorageTableName: 'SequelizeMetaSeeder',
};

module.exports = configDatabase;
