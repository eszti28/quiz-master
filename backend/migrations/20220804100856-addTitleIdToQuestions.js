'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.addColumn('questions', 'titleId', {
    type: 'int',
    unsigned: true,
    notNull: true,
    foreignKey: {
      name: 'questions_titleId_fk',
      table: 'titles',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      },
      mapping: {
        titleId: 'id',
      },
    },
  });
};

exports.down = function (db) {
  return db.removeColumn('questions', 'titleId');
};

exports._meta = {
  version: 1,
};
