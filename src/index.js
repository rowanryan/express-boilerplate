const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { handleError } = require("./util/request-handler");

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("combined"));
app.set("trust proxy", 1);

// Controllers
app.use("/auth", require("./modules/auth/auth.controller"));

// Error handling
app.use((err, req, res, next) => {
	handleError(err, req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
