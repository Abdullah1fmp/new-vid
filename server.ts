import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import rootRouter from "./router/root.routes";
import { getErrorResponse } from "./services/error.services";
import { CustomErrorType } from "./types";
import { engine } from "express-handlebars";

// To load environment variables
dotenv.config();

// Initialize express app with port 9292
// process.env.UV_THREADPOOL_SIZE = "12";

const app: Application = express();
const port = process.env.PORT || 9292;

const allowlist = [
	"http://localhost:3000",
	"https://vidhyala.com",
	"https://www.admin.vidhyala.com",
	"https://vidhyala.up.railway.app",
	"https://vidhyala-admin.up.railway.app",
];

/**
 * Root level middlewares
 * 1. cors: to allow cross-origin requests from the specified domains
 * 2. express.static: to serve static files from the public directory
 * 3. express.json: to parse incoming request with JSON payloads
 * 4. express.urlencoded: to parse incoming request with URL-encoded payloads
 * 5. Compression: Use the gzip to compress the req res payload, increase the server performance
 * 6. expresseLayouts: express ejs layouts
 */
app.use(cors({ origin: allowlist }));
app.use(express.static(path.join(path.resolve(), "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	compression({
		level: 6,
		threshold: 500,
		filter: (req, res) => {
			/**
			 * If the req has no compression in the header then don't compress
			 */
			if (req.headers?.["x-no-compression"]) {
				return false;
			}

			// fallback to standard filter function
			return compression.filter(req, res);
		},
	})
);
app.engine(
	".hbs",
	engine({
		extname: ".hbs",
		defaultLayout: false,
		layoutsDir: "views",
	})
);
app.set("view engine", "hbs");

/**
 * Root route
 * @method GET
 * @endpoint /
 * @description Check if the server is running
 */
app.get("/", (_req: Request, res: Response) => {
	res.status(200).json({ message: "Server is running" });
});

/**
 * MAIN API routes
 * @description All the API routes are prefixed with /api/v1
 */
app.use("/api", rootRouter);

/**
 * Catch all route
 * @description If the route is not found, it will return 404
 */
app.use("*", (_req: Request, res: Response) => {
	res.status(404).json({ message: "Route not found", status: 404 });
});

/**
 * GLOBAL Error handling middleware
 * @description If any error occurs, it will catch the error, and based on the error type and status, it will send the customized message and status
 */
app.use(
	(err: CustomErrorType, _req: Request, res: Response, next: NextFunction) => {
		// if headers already sent then skip
		if (res.headersSent) {
			return next(err);
		}

		const status = err?.status || 500;
		/**
		 * Get the appropiate error response message based on the error type and status
		 */
		const errorResponse = getErrorResponse(err, status);

		// Send the error response
		res
			.status(errorResponse.status)
			.json({ error: errorResponse.message, status: errorResponse.status });
	}
);

// Start the server at the specified port
app.listen(port, () => {
	console.log(`Server is Fire at ${port}`);
});
