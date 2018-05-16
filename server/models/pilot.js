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
      },
      tournamentId: {
        type: DataTypes.INTEGER,
        field: 'tournament_id'
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'pilot'
    }
  );
  Pilot.associate = function(models) {};
  return Pilot;
};
