const layout = require('../layout');

module.exports = () => {
	return layout({
		content: `
            <form method="POST">
                <input name="email" type="text" placeholder="Login">
                <input name="password" type="password" placeholder="Password">
                <button type="submit">Sign in</button>
            </form>
    `
	});
};
