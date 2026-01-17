import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../../middlewares/token";
import { validate } from "../../middlewares/validate";
import { postSchema } from "../../validations/post";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  updatePost,
} from "./post.service";
import { upload } from "../../middlewares/multer";

const router = Router();

// Create post
router.post(
  "/post",
  authenticate,
  upload.single("image"),
  validate(postSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = req.file?.filename;
      const post = await createPost(req.body, (req as any).user.id, image);
      res.status(201).json({ message: "New post created", data: post });
    } catch (err) {
      next(err);
    }
  },
);

// Display all posts
router.get(
  "/posts",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await getPosts();
      res.status(200).json({ message: "Fetch all posts", data: posts });
    } catch (err) {
      next(err);
    }
  },
);

// Post Detail
router.get(
  "/post/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const post = await getPost(id);
      res.status(200).json({ message: "Fetch post", data: post });
    } catch (err) {
      next(err);
    }
  },
);

// Display all user posts
router.get(
  "/post",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await getUserPosts((req as any).user.id);
      res.status(200).json({ message: "Fetch all user posts", data: posts });
    } catch (err) {
      next(err);
    }
  },
);

// Update user post
router.put(
  "/post/:id",
  authenticate,
  upload.single("image"),
  validate(postSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = Number(req.params.id);
      const image = req.file?.filename;
      const post = await updatePost((req as any).user.id, postId, req.body, image);
      res.status(200).json({ message: "Update post success", data: post });
    } catch (err) {
      next(err);
    }
  },
);

// Delete post
router.delete(
  "/post/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = Number(req.params.id);
      await deletePost((req as any).user.id, postId);
      res.status(200).json({ message: "Delete post success" });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
