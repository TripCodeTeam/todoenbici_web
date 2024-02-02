import { prisma } from "@/prisma/db";
import { ScalarUser } from "@/types/User";
import { Comment, Dislike, Like } from "@prisma/client";

class Interaction {
  // Add comment to post method
  static async addComment(
    postId: string,
    data: { content: string; userId: string }
  ): Promise<Comment> {
    return prisma.comment.create({
      data: {
        content: data.content,
        postId,
        userId: data.userId,
      },
    });
  }

  // Add like to post method
  static async addLike(
    postId: string,
    user: ScalarUser,
    commentId: string
  ): Promise<Like> {
    if (user.id === undefined) {
      throw new Error("El ID de usuario no está definido.");
    }

    return prisma.like.create({
      data: {
        postId,
        commentId,
        userId: user.id,
      },
    });
  }

  // Add dislike to post method
  static async addDislike(
    postId: string,
    user: ScalarUser,
    commentId: string
  ): Promise<Dislike> {
    if (user.id === undefined) {
      throw new Error("El ID de usuario no está definido.");
    }
    return prisma.dislike.create({
      data: {
        postId,
        commentId,
        userId: user.id,
      },
    });
  }

  // Obtener todos los comentarios de un post específico
  static async getComments(postId: string): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: {
        postId,
      },
    });
  }

  // Obtener todos los likes de un post específico
  static async getLikes(postId: string): Promise<Like[]> {
    return prisma.like.findMany({
      where: {
        postId,
      },
    });
  }

  // Obtener todos los dislikes de un post específico
  static async getDislikes(postId: string): Promise<Dislike[]> {
    return prisma.dislike.findMany({
      where: {
        postId,
      },
    });
  }

  // Obtener el número de likes de un post específico
  static async countLikes(postId: string): Promise<number> {
    return prisma.like.count({
      where: {
        postId,
      },
    });
  }

  // Obtener el número de dislikes de un post específico
  static async countDislikes(postId: string): Promise<number> {
    return prisma.dislike.count({
      where: {
        postId,
      },
    });
  }

  // Eliminar un like
  static async deleteLike(likeId: string): Promise<Like> {
    return prisma.like.delete({
      where: {
        id: likeId,
      },
    });
  }

  // Add reply to a comment
  static async addReply(
    postId: string,
    parentId: string,
    data: { content: string; userId: string }
  ): Promise<Comment> {
    return prisma.comment.create({
      data: {
        content: data.content,
        parentId,
        userId: data.userId,
        postId,
      },
    });
  }

  // Get all replies of a comment
  static async getReplies(commentId: string): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: {
        parentId: commentId,
      },
    });
  }

  // Obtener todos los likes de un reply
  static async getReplyLikes(replyId: string): Promise<Like[]> {
    return prisma.like.findMany({
      where: {
        commentId: replyId,
      },
    });
  }
}

export default Interaction;
