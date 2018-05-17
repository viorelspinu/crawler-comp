'use strict';
module.exports = (sequelize, DataTypes) => {
  var Race = sequelize.define(
    'Race',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      index: {
        type: DataTypes.INTEGER
      },
      duration: {
        type: DataTypes.INTEGER
      },
      points: {
        type: DataTypes.INTEGER
      },
      finished: {
        type: DataTypes.BOOLEAN
      },
      tournamentId: {
        type: DataTypes.INTEGER,
        field: 'tournament_id'
      },
      pilotId: {
        type: DataTypes.INTEGER,
        field: 'pilot_id'
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'race'
    }
  );
  Race.associate = function(models) {};
  return Race;
};
