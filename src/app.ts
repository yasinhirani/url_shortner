import Express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import urlRoutes from "./routes/url.routes";
import { errorHandler } from "./utilities/errorHandler";
import { redirectToUrl } from "./controllers/url.controllers";
import rateLimit from "express-rate-limit";
import ApiError from "./utilities/apiError";
import helmet from "helmet";
import morgan from "morgan";

const app = Express();

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(
      new ApiError(
        "You have reached the daily app request limit for today.",
        429
      )
    );
  },
});

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/users", authRoutes);
app.use("/api/url", limiter, urlRoutes);
app.get("/:shortCode", redirectToUrl);

app.use("*", (req: Request, res: Response, next: NextFunction) =>
  next(new ApiError(`Could not ${req.method} ${req.baseUrl}`, 404))
);

app.use(errorHandler);

export default app;
