'use strict';
module.exports = (sequelize, DataTypes) => {
  var RaceEvent = sequelize.define(
    'RaceEvent',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tournamentId: {
        type: DataTypes.INTEGER,
        field: 'tournament_id'
      },
      pilotId: {
        type: DataTypes.INTEGER,
        field: 'pilot_id'
      },
      raceEventTypeId: {
        type: DataTypes.INTEGER,
        field: 'race_event_type_id'
      },
      raceIndex: {
        type: DataTypes.INTEGER,
        field: 'race_index'
      },
      seconds: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'race_event'
    }
  );
  RaceEvent.associate = function(models) {};
  return RaceEvent;
};
