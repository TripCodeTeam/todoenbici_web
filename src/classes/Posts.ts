import { prisma } from "@/prisma/db";
import { ScalarPost, Like, Dislike, ScalarUser } from "@/types/User";
import { Post, Prisma } from "@prisma/client";

class PostService {
  // Create post method
  static async create(data: ScalarPost): Promise<Post> {
    const { content, images, video, location, userId } = data;

    return prisma.post.create({
      data: {
        content,
        images,
        video,
        location,
        userId,
      },
    });
  }

  // Get post by ID method
  static async get(id: string): Promise<Post | null> {
    return prisma.post.findUnique({
      where: { id },
    });
  }

  static async getAll(): Promise<Post[]> {
    return prisma.post.findMany();
  }

  // Update post method
  static async update(
    id: string,
    data: Omit<Prisma.PostUpdateInput, "userId">
  ): Promise<Post> {
    return prisma.post.update({ where: { id }, data });
  }

  // Delete post method
  static async delete(id: string): Promise<Post> {
    return prisma.post.delete({ where: { id } });
  }

  // Método para obtener todos los posts de un usuario específico
  static async getAllByUserId(userId: string): Promise<Post[]> {
    return prisma.post.findMany({
      where: { userId },
    });
  }
}

export default PostService;
