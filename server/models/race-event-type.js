'use strict';
module.exports = (sequelize, DataTypes) => {
  var RaceEventType = sequelize.define(
    'RaceEventType',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      points: DataTypes.INTEGER,
      automatic: DataTypes.BOOLEAN,
      code: DataTypes.STRING
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'race_event_type'
    }
  );
  RaceEventType.associate = function(models) {};
  return RaceEventType;
};
