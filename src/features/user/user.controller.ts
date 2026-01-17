import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../../middlewares/token";
import { deleteUser, getUser, updateUser } from "./user.service";
import { validate } from "../../middlewares/validate";
import { deleteSchema, updateSchema } from "../../validations/user";

const router = Router();

// Get user
router.get(
  "/user",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUser((req as any).user!.id);
      res.status(200).json({ message: "Fetch user", data: user });
    } catch (err) {
      next(err);
    }
  },
);

// Update user
router.put(
  "/user",
  authenticate,
  validate(updateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user!.id;

      const update = await updateUser(userId, req.body);

      res.status(200).json({ message: "Update user success", data: update });
    } catch (err) {
      next(err);
    }
  },
);

// Delete user
router.delete(
  "/user",
  authenticate,
  validate(deleteSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user!.id;
      const password = req.body.password;

      await deleteUser(userId, password);

      res.clearCookie("access_token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
