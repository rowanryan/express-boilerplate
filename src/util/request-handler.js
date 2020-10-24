const logger = require("./logger");

class ErrorHandler extends Error {
	constructor(statusCode, customMessage, errors = undefined) {
		super();
		this.statusCode = statusCode;
		this.customMessage = customMessage;
		this.errors = errors;
	}
}

const asyncHandler = fn => (req, res, next) => {
	return Promise.resolve(fn(req, res, next)).catch(next);
};

const handleError = (err, req, res) => {
	const status = err.statusCode || 500;
	const message = err.customMessage || "Something went wrong.";
	const errors = err.errors || {};
	let ok = true;

	if (status === 500) {
		logger.error(message, {
			status,
			date: new Date(),
			stack: err.stack,
			url: req.url,
		});
	}

	if (status >= 400 && status <= 600) ok = false;

	return res.status(status).json({ status, ok, message, errors });
};

const handleResponse = (res, status, data = {}) => {
	return res.status(status).json({ status, ok: true, ...data });
};

module.exports = {
	ErrorHandler,
	asyncHandler,
	handleError,
	handleResponse,
};
