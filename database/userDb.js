const db = require('./dbConfig');

function getUserById(id) {
	return db('users').where('id', id).first();
}

function createUser(userData) {
	return db('users').insert(userData).then(([ id ]) => 
		getUserById(id)
	);
}

function getUserByUsername(username) {
	return db('users').where('username', username).first();
}

module.exports = { getUserById, createUser, getUserByUsername };
