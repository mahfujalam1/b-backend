import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import notFound from "./app/middleware/notFoundRoute";
import router from "./app/routes";
import errorMiddleware from "./app/middleware/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: (origin: any, callback: any) => {
    callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hisab Nikash Pro Server is running Successfully.");
});

// error handling
app.use(errorMiddleware);
app.use(notFound);

export default app;
