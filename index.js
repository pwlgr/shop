const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');
const cookieSession = require('cookie-session');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'asdfasdflkj' ]
	})
);

app.get('/signup', (req, res) => {
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

app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
	req.session = null;
	res.send('Logged out.');
});

app.get('/signin', (req, res) => {
	res.send(`
    <form method="POST">
        <input name="email" type="text" placeholder="Login">
        <input name="password" type="password" placeholder="Password">
        <button type="submit">Sign in</button>
    </form>
    `);
});

app.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	const user = await usersRepo.getOneBy({ email });
	if (!user) {
		return res.send('Email not found.');
	}
	if (user.password !== password) {
		return res.send('Invalid password.');
	}
	req.session.userId = user.id;
	res.send('Welcome.');
});

app.listen(3000, () => {
	console.log('Listening...');
});
