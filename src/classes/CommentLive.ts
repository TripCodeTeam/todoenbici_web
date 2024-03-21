import { prisma } from "@/prisma/db";
import { StreamComments, Prisma } from "@prisma/client";
import { ScalarStreamComments } from "@/types/User";

class CommentService {
  // Método para crear un comentario
  static async create(
    data: ScalarStreamComments
  ): Promise<StreamComments> {
    return prisma.streamComments.create({ data });
  }

  // Método para obtener un comentario por ID
  static async get(id: string): Promise<StreamComments | null> {
    return prisma.streamComments.findUnique({ where: { id } });
  }

  // Método para obtener todos los comentarios de una transmisión específica
  static async getAllByStreamId(streamId: string): Promise<StreamComments[]> {
    return prisma.streamComments.findMany({ where: { streamId } });
  }
}

export default CommentService;
