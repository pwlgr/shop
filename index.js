const express = require('express');
const bodyParser = require('body-parser');
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

app.post('/', (req, res) => {
	res.send('Account gooood');
});

app.listen(3000, () => {
	console.log('Listening...');
});
