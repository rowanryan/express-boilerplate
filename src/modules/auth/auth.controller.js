const router = require("express").Router();

const {
	asyncHandler,
	ErrorHandler,
	handleResponse,
} = require("../../util/request-handler");

const { rateLimiter, validateBody } = require("../../util/middleware");
const validation = require("./auth.validation");

router.use(rateLimiter());

router.post(
	"/register",
	validateBody(validation.registerAccount),
	asyncHandler(async (req, res, next) => {
		// Code
		const foo = true;

		if (!foo) throw new ErrorHandler(400, "Try again.");

		return handleResponse(res, 200);
	})
);

module.exports = router;
