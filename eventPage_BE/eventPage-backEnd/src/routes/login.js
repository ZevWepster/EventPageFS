import { Router } from "express";
import login from "../services/auth/login.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);

    if (!result) {
      res.status(401).json({ message: "Invalid credentials!" });
    } else {
      res.status(200).json({
        message: "Successfully logged in!",
        token: result.token,
        userId: result.userId,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
