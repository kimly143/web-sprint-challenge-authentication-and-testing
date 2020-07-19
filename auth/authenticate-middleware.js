/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const userDb = require('../database/userDb');

module.exports = async (req, res, next) => {
	if (!req.session.userId) {
		return res.status(401).json({ you: 'shall not pass!' });
	}
	try {
		const user = await userDb.getUserById(req.session.userId);
		if (!user) {
			return res.status(401).json({ you: 'shall not pass!' });
		}
		req.user = user;
		return next();
	} catch (ex) {
		console.error(ex);
		return res.status(401).json({ you: 'shall not pass!' });
	}
};
