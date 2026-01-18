import { PostDTO } from "../../types/post";
import AppError from "../../utils/error";
import { toImageUrl } from "../../utils/imageUrl";
import {
  addPost,
  allPosts,
  allUserPosts,
  findPost,
  modifyPost,
  postDelete,
} from "./post.repository";

// Create post
export async function createPost(
  post: PostDTO,
  userId: number,
  image?: string,
) {
  const { title } = post;
  if (!title) throw new AppError(400, "At least write the title");
  return await addPost(post, userId, image);
}

// Display all posts
export async function getPosts() {
  const posts = await allPosts();
  return posts.map((post) => ({
    ...post,
    image: toImageUrl(post.image),
  }));
}

// Display post
export async function getPost(id: number) {
  const post = await findPost(id);
  if (!post) throw new AppError(404, "Post not found");
  return {
    ...post,
    image: toImageUrl(post.image),
  };
}

// Display all user posts
export async function getUserPosts(userId: number) {
  const posts = await allUserPosts(userId);
  if (!posts || posts.length === 0)
    throw new AppError(404, "You haven't post yet");
  return posts.map((post) => ({
    ...post,
    image: toImageUrl(post.image),
  }));
}

// Update post
export async function updatePost(
  userId: number,
  postId: number,
  updatePost: PostDTO,
  image?: string,
) {
  const post = await getPost(postId);
  if (post.authorId !== userId)
    throw new AppError(403, "This is not your post");

  return await modifyPost(postId, updatePost, image);
}

// Delete post
export async function deletePost(userId: number, postId: number) {
  const post = await findPost(postId);
  if (!post) throw new AppError(404, "Post not found");
  if (post.authorId !== userId)
    throw new AppError(403, "This is not your post");

  await postDelete(postId);
}
