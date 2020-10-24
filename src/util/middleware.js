const rateLimit = require("express-rate-limit");

const rateLimiter = (windowMs = 5 * 60 * 1000, max = 2500) =>
	rateLimit({
		windowMs,
		max,
	});

const validateBody = schema => async (req, res, next) => {
	const { error, value } = schema.validate(req.body);

	if (error)
		return res
			.status(400)
			.json({ status: 400, ok: false, message: "Bad request." });

	return next();
};

module.exports = {
	rateLimiter,
	validateBody,
};
