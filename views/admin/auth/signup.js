const layout = require('../layout');

module.exports = ({ req }) => {
	return layout({
		content: `
        <div>
        Your id: ${req.session.userId}
            <form method="POST">
                <input name="email" type="text" placeholder="Login">
                <input name="password" type="password" placeholder="Password">
                <input name="passwordConfirm" type="password" placeholder="Password">
                <button type="submit">Sign up</button>
            </form>
        </div>
    `
	});
};
