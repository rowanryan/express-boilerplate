const Joi = require("joi");

exports.registerAccount = Joi.object().keys({
	name: Joi.string().min(1).max(100).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(200).required(),
});
