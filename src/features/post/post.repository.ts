import { prisma } from "../../prisma/client";
import { PostDTO } from "../../types/post";

// Create post
export async function addPost(post: PostDTO, id: number, image?: string) {
  const { title, content } = post;

  return await prisma.post.create({
    data: {
      title,
      content: content ?? null,
      image,
      author: {
        connect: { id },
      },
    },
  });
}

// Display all posts
export async function allPosts() {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      categories: {
        select: {
          catefgoryId: true,
        },
      },
    },
  });
}

// Find post
export async function findPost(id: number) {
  return await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      authorId: true,
      categories: {
        select: {
          catefgoryId: true,
        },
      },
    },
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
      image: true,
      categories: {
        select: {
          catefgoryId: true,
        },
      },
    },
  });
}

// Update post
export async function modifyPost(id: number, post: PostDTO, image?: string) {
  return await prisma.post.update({
    where: { id },
    data: {
      title: post.title,
      content: post.content,
      image,
    },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      updatedAt: true,
      categories: {
        select: {
          catefgoryId: true,
        },
      },
    },
  });
}

// Delete post
export async function postDelete(id: number) {
  await prisma.post.delete({ where: { id } });
}
