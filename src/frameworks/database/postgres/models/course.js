const { DataTypes } = require('sequelize')
const relationModel = require('../../../helpers/relational-model')

module.exports = (sequelize, withRelation = ["*"]) => {
  const Course = sequelize.define(
    'Course',
    {
      // Model attributes are defined here
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: true,
      tableName: 'courses'
    }
  )

  relationModel(withRelation, "students", () =>{
    Course.belongsToMany(require('./student')(sequelize, []), {
      through: 'student_courses',
      timestamps: true,
      foreignKey: 'courseId',
      otherKey: 'studentId',
      as: 'students'
    })
  })

  return Course
}
