import { prisma } from "../../prisma/client";
import { PostDTO } from "../../types/post";

// Create post
export async function addPost(post: PostDTO, id: number) {
  const { title, content } = post;

  return await prisma.post.create({
    data: {
      title,
      content: content ?? null,
      author: {
        connect: { id },
      },
    },
  });
}

// Display all posts
export async function allPosts() {
  return await prisma.post.findMany();
}

// Find post
export async function findPost(id: number) {
  return await prisma.post.findUnique({
    where: { id },
  });
}

// Display all user posts
export async function allUserPosts(id: number) {
  return await prisma.post.findMany({
    where: { authorId: id },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
}

// Update post
export async function modifyPost(id: number, post: PostDTO) {
  return await prisma.post.update({
    where: { id },
    data: {
      title: post.title,
      content: post.content,
    },
  });
}

// Delete post
export async function postDelete(id: number) {
  await prisma.post.delete({ where: { id } });
}
