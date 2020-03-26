const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
	return layout({
		content: `
            <form method="POST">
                <input name="email" type="text" placeholder="Login">
                ${getError(errors, 'email')}
                <input name="password" type="password" placeholder="Password">
                ${getError(errors, 'password')}
                <button type="submit">Sign in</button>
            </form>
    `
	});
};
