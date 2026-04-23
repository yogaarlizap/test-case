const { DataTypes } = require('sequelize')
const relationModel = require("../../../helpers/relational-model")

module.exports = (sequelize, withRelation = ["*"]) => {
  const Score = sequelize.define(
    'Score',
    {
      // Model attributes are defined here
      studentCourseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      score: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
      tableName: 'scores',
      uniqueKeys: {
        unique_student_course: {
          fields: ["studentCourseId"],
        },
      }
    }
  );

  relationModel(withRelation, "studentCourse", () => {
    Score.belongsTo(require("./studentCourse")(sequelize, []), {
      foreignKey: "studentCourseId",
      as: "studentCourse"
    })
  })

  return Score
}
