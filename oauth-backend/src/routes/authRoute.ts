import { Request, Response, Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();
const authController = new AuthController();

authRouter.get("/", (req: Request, res: Response) => authController.SignIn(req, res));

export default authRouter;