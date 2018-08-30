const transaction = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transaction", {
    total: {
      type: DataTypes.FLOAT,
      validate: { notEmpty: true }
    },
    subTotal: {
      type: DataTypes.FLOAT,
      validate: { notEmpty: true }
    }
  });

  Transaction.associate = models => {
    Transaction.belongsTo(models.User);
  };

  return Transaction;
};

export default transaction;
