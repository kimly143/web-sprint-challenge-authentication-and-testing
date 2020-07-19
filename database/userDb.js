const db = require('./dbConfig');

function getUserById(id) {
	return db('users').where('id', id).first();
}

module.exports = { getUserById };
