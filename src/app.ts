import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server!");
});

export default app;
