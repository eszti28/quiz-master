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
  db.removeForeignKey('questions', 'questions_userId_fk');
  db.removeColumn('questions', 'userId');
  db.removeColumn('questions', 'category');
  return db.removeColumn('questions', 'title');
};

exports.down = function (db) {
  db.addForeignKey(
    'questions',
    'users',
    'questions_userId_fk',
    {
      userId: 'id',
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    },
  );
  db.addColumn('questions', 'userId', {
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
  });
  db.addColumn('questions', 'category', {
    type: 'string',
    notNull: true,
  });
  return db.addColumn('questions', 'title', {
    type: 'string',
    notNull: true,
  });
};

exports._meta = {
  version: 1,
};
