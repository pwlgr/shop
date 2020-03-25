const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
	requireEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must be a valid email')
		.custom(async (email) => {
			const existingUser = await usersRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error('Email in use');
			}
		}),
	requirePassword: check('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Must be between 4 and 20 characters.'),
	requirePasswordConfirm: check('passwordConfirm')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Must be between 4 and 20 characters.')
		.custom(async (passwordConfirm, { req }) => {
			if (passwordConfirm !== req.body.password) {
				console.log('but erro! :)');
				throw new Error('Passwords must match.');
			}
		})
};