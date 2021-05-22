import { Sequelize, Transaction } from 'sequelize';
import config from '../config/database';

let sequelize;

if (!sequelize) {
  sequelize = new Sequelize({
    ...config,
  });
}

const executeTransaction = (callBack) => {
  return sequelize.transaction(
    {
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    },
    (t) => callBack(t)
  );
};

export { sequelize, executeTransaction };
