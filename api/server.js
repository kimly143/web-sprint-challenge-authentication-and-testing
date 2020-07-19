const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-sessions');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//session
app.use(
	session({
		name: 'sid',
		secret: 'correct horse battery staple!',
		cookie: {
			maxAge: 1 * 24 * 60 * 60 * 1000,
			secure: process.env.NODE_ENV === 'production'
		},
		httpOnly: true,
		resave: false,
		saveUninitialized: false
	})
);

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
