const bcrypt = require('bcrypt');
const userDb = require('../database/userDb');

const router = require('express').Router();

router.post('/register', async (req, res) => {
  if (!req.body.username || !req.body.password){
		return res.status(422).json({ error: 'username and password required to register!' });
  }
  try {
    const newUser = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    const user = await userDb.createUser(newUser);
    return res.status(201).json(user)
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: 'failed to register new user' });
  }
});

router.post('/login', async (req, res) => {
  // implement login
  res.end()
});

module.exports = router;
