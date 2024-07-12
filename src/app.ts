import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/GlobalErrorHandle";
import cookieParser from "cookie-parser";
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://nusery-frontend.vercel.app"],
  })
);
app.use(router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
