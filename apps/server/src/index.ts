import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import Config from "./config";
import { prepareQuizForClient } from "./mappers";
import { questions } from "./mock/questions";
import { fetchRandomQuestion } from "./utils/helpers";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

const router = express.Router();

router.get("/quiz", (req: Request, res: Response) => {
  const size = Number(req.query?.size || Config.defaultQuizSize);
  const shuffled = fetchRandomQuestion(questions, size);
  const _questions = prepareQuizForClient(shuffled);
  return res.send(_questions);
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`==========================================`);
  console.log(`Server is Fire at http://localhost:${port}`);
  console.log(`==========================================`);
});
