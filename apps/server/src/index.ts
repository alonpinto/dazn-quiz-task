import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import Config from "./config";
import { questions } from "./mock/questions";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const router = express.Router();

router.get("/quiz", (req: Request, res: Response) => {
  const size = Number(req.query?.size || Config.defaultQuizSize);
  return res.send(questions.slice(0, size));
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`==========================================`);
  console.log(`Server is Fire at http://localhost:${port}`);
  console.log(`==========================================`);
});
