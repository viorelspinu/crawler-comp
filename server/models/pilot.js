'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pilot = sequelize.define(
    'Pilot',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      lastRaceIndex: {
        type: DataTypes.INTEGER,
        field: 'last_race_index'
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'pilot'
    }
  );
  Pilot.associate = function(models) {
    Pilot.belongsTo(models.Tournament);
  };
  return Pilot;
};
