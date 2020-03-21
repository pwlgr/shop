const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send(`
    <div>
        hello
    </div>
    `);
});

app.post('/', (req, res) => {
	res.send('Account gooood');
});

app.listen(3000, () => {
	console.log('Listening...');
});
