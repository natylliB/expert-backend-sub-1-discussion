/* istanbul ignore file */

const { Pool } = require('pg');

const config = require('../../../Commons/config');

const pool = new Pool(config.database);

pool.on('error', (err) => console.error(err));

module.exports = pool;