'use strict';

// var dbm;
// var type;
// var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
// exports.setup = function(options, seedLink) {
//   dbm = options.dbmigrate;
//   type = dbm.dataType;
//   seed = seedLink;
// };

exports.up = function (db, callback) {
  db.createTable(
    'customer',
    {
      columns: {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        billing_street: 'string',
        billing_state: 'string',
        billing_zip: 'string',
        billing_city: 'string',
        phone_number: 'string',
      },
      ifNotExists: true,
    },
    callback
  )

  db.createTable(
    'job',
    {
      columns: {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        display_id: { type: 'string', unique: true },
        name: 'string',
        customer_id: {
          type: 'int',
          foreignKey: {
            name: 'job_customer_id_fk',
            table: 'customer',
            rules: { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
            mapping: 'id'
          }
        }
      },
      ifNotExists: true,
    },
    callback
  )

  db.createTable(
    'job_site',
    {
      columns: {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        street: 'string',
        state: 'string',
        zip: 'string',
        city: 'string',
      }
    }
  )

  db.createTable(
    'task',
    {
      columns: {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        job_id: {
          type: 'int',
          foreignKey: {
            name: 'task_job_id_fk',
            table: 'job',
            rules: { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
            mapping: 'id'
          }
        },
        job_site_id: {
          type: 'int',
          foreignKey: {
            name: 'task_job_site_id_fk',
            table: 'job_site',
            rules: { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
            mapping: 'id'
          }
        },
        start_date: 'timestamp',
        end_date: 'timestamp',
        division_id: {
          type: 'int',
          foreignKey: {
            name: 'task_division_id_fk',
            table: 'division',
            rules: { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
            mapping: 'id'
          }
        },
      },
      ifNotExists: true,
    },
    callback
  )

  db.createTable(
    'division',
    {
      columns: {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
      },
      ifNotExists: true,
    },
    callback
  )
}

exports.down = function (db, callback) {
  db.dropTable('customer', callback);
  db.dropTable('division', callback);
  db.dropTable('job', callback);
  db.dropTable('job_site', callback);
  db.dropTable('task', callback);
};

exports._meta = {
  "version": 1
};
