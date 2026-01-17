import { Router, Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "./auth.service";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "../../validations/auth";
import { authenticate } from "../../middlewares/token";

const router = Router();

// Create User
router.post(
  "/register",
  validate(registerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createUser(req.body);

      res.status(201).json({ message: "Register successful, please login" });
    } catch (err) {
      next(err);
    }
  },
);

// Login
router.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await loginUser(req.body);

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 30 * 60 * 1000,
      });

      res.status(200).json({ message: "Logged in" });
    } catch (err) {
      next(err);
    }
  },
);

// Send user id and role
router.get("/me", authenticate, async (req: Request, res: Response) => {
  res.status(200).json({ user: (req as any).user });
});

// Logout
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out" });
});

export default router;
