const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define(
    'User',
    {
      // Model attributes are defined here
      username: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      tableName: 'users'
    }
  )
}
