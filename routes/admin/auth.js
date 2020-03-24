const express = require('express');
const usersRepo = require('../../repositories/users');

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(`
    <div>
    Your id: ${req.session.userId}
        <form method="POST">
            <input name="email" type="text" placeholder="Login">
            <input name="password" type="password" placeholder="Password">
            <input name="passwordConfirm" type="password" placeholder="Password">
            <button type="submit">Sign up</button>
        </form>
    </div>
    `);
});

router.post('/signup', async (req, res) => {
	const { email, password, passwordConfirm } = req.body;
	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send('Email already exists in base.');
	}
	if (password !== passwordConfirm) {
		return res.send('Password must match.');
	}
	const user = await usersRepo.create({ email, password });
	req.session.userId = user.id;
	res.send('Welcome');
});

router.get('/signout', (req, res) => {
	req.session = null;
	res.send('Logged out.');
});

router.get('/signin', (req, res) => {
	res.send(`
    <form method="POST">
        <input name="email" type="text" placeholder="Login">
        <input name="password" type="password" placeholder="Password">
        <button type="submit">Sign in</button>
    </form>
    `);
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	const user = await usersRepo.getOneBy({ email });
	if (!user) {
		return res.send('Email not found.');
	}

	const validPassword = await usersRepo.comparePassword(user.password, password);

	if (!validPassword) {
		return res.send('Invalid password.');
	}
	req.session.userId = user.id;
	res.send('Welcome.');
});

module.exports = router;
