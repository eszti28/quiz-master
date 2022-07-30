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
  return db.createTable('questions', {
    columns: {
      id: {
        type: 'int',
        autoIncrement: true,
        notNull: true,
        primaryKey: true,
        unsigned: true,
      },
      question: { type: 'string', notNull: true },
      category: { type: 'string', notNull: true },
      userId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'questions_userId_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: {
            userId: 'id',
          },
        },
      },
    },
    ifNotExists: true,
  });
};

exports.down = function (db) {
  return db.dropTable('questions');
};

exports._meta = {
  version: 1,
};
