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
  return db.createTable('answers', {
    columns: {
      id: {
        type: 'int',
        autoIncrement: true,
        notNull: true,
        primaryKey: true,
        unsigned: true,
      },
      correctAnswer: { type: 'int', notNull: true },
      answer: { type: 'string', notNull: true },
      quizId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'answers_quizId_fk',
          table: 'questions',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: {
            quizId: 'id',
          },
        },
      },
    },
    ifNotExists: true,
  });
};

exports.down = function (db) {
  return db.dropTable('answers');
};

exports._meta = {
  version: 1,
};
