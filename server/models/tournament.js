'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tournament = sequelize.define(
    'Tournament',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      createDate: {
        type: DataTypes.DATE,
        field: 'create_date',
        defaultValue: DataTypes.NOW
      },
      finished: DataTypes.BOOLEAN
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'tournament'
    }
  );
  Tournament.associate = function(models) {};
  return Tournament;
};
