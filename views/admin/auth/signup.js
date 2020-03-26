const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ req, errors }) => {
	return layout({
		content: `
        <div>
        Your id: ${req.session.userId}
            <form method="POST">
                <input name="email" type="text" placeholder="Login">
                ${getError(errors, 'email')}
                <input name="password" type="password" placeholder="Password">
                ${getError(errors, 'password')}
                <input name="passwordConfirm" type="password" placeholder="Password">
                ${getError(errors, 'passwordConfirm')}
                <button type="submit">Sign up</button>
            </form>
        </div>
    `
	});
};
