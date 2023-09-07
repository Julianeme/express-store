const { Model, DataTypes, Sequelize } = require('sequelize')

//1-Table name
const ORDER_TABLE = 'orders'

//2-Schema

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'total_price',
    defaultValue: 0
  },
  item: {
    type: DataTypes.STRING,
  }
}

class Order extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

//module.exports

module.exports = { ORDER_TABLE, OrderSchema, Order }
