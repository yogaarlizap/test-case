const { DataTypes } = require('sequelize')
const relationModel = require("../../../helpers/relational-model")

module.exports = (sequelize, withRelation = ["*"]) => {
  const studentCourse = require('./studentCourse')(sequelize, [])

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
      through: studentCourse,
      timestamps: true,
      foreignKey: 'studentId',
      otherKey: 'courseId',
      as: 'courses'
    })
  })

  return Student
}
