const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirm,
	requireEmailExist,
	requireValidPasswordForUser
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

router.post(
	'/signup',
	[ requireEmail, requirePassword, requirePasswordConfirm ],
	handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password, passwordConfirm } = req.body;
		const user = await usersRepo.create({ email, password });
		req.session.userId = user.id;
		res.send('Welcome');
	}
);

router.get('/signout', (req, res) => {
	req.session = null;
	res.send('Logged out.');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate({}));
});

router.post(
	'/signin',
	[ requireEmailExist, requireValidPasswordForUser ],
	handleErrors(signinTemplate),
	async (req, res) => {
		const { email } = req.body;
		const user = await usersRepo.getOneBy({ email });

		req.session.userId = user.id;
		res.send('Welcome.');
	}
);

module.exports = router;
