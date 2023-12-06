import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

app.use(router);

app.listen(port, () => {
  console.log(`==========================================`);
  console.log(`Server is Fire at http://localhost:${port}`);
  console.log(`==========================================`);
});
