module.exports = ({ content }) => {
	return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>My App</title>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `;
};
