const { DataTypes } = require('sequelize')
const relationModel = require("../../../helpers/relational-model")

module.exports = (sequelize, withRelation = ["*"]) => {
  const Student = sequelize.define(
    'Student',
    {
      // Model attributes are defined here
      fullName: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: true,
      tableName: 'students'
    }
  );

  relationModel(withRelation, "courses", () =>{
    Student.belongsToMany(require('./course')(sequelize, []), {
      through: 'student_courses',
      timestamps: true,
      foreignKey: 'studentId',
      as: "courses"
    })
  })

  return Student
}
