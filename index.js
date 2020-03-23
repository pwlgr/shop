const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send(`
    <div>
        <form method="POST">
            <input name="email" type="text" placeholder="Login">
            <input name="password" type="password" placeholder="Password">
            <input name="passwordConfirm" type="password" placeholder="Password">
            <button type="submit">Sign up</button>
        </form>
    </div>
    `);
});

app.post('/', async (req, res) => {
	const { email, password, passwordConfirm } = req.body;
	const existingUser = await usersRepo.getOneBy({ email });
	console.log(existingUser);
	if (existingUser) {
		return res.send('Email already exists in base.');
	}
	if (password !== passwordConfirm) {
		return res.send('Password must match.');
	}
	res.send('Welcome');
});

app.listen(3000, () => {
	console.log('Listening...');
});
