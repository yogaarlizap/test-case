const { DataTypes } = require('sequelize')
const relationModel = require("../../../helpers/relational-model");

module.exports = (sequelize, withRelation = ["*"]) => {
    const StudentCourse = sequelize.define(
        'StudentCourse',
        {
        // Model attributes are defined here
            id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            studentId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            courseId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: true,
            tableName: 'student_courses'
        }
    )

    relationModel(withRelation, "score", () =>{
        StudentCourse.hasOne(require('./score')(sequelize, []), {
          foreignKey: "studentCourseId",
          as: "score"
        })
    })

  return StudentCourse
}
