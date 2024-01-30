// Import statements
import { prisma } from "@/prisma/db";
import { ScalarUser, Role } from "@/types/User";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

// Class definition
class UserService {
  // Create user method
  static async create(
    data: ScalarUser
  ): Promise<User> {
    const existEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existEmail) {
      throw new Error("El correo electrónico ya está en uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  // Get user by ID method
  static async get(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  // // Get user with posts by ID method
  // static async getWithPosts(id: string): Promise<User | null> {
  //   return prisma.user.findUnique({
  //     where: { id },
  //     include: {
  //       posts: true,
  //     },
  //   });
  // }

  // Update user method
  static async update(
    id: string,
    data: Omit<ScalarUser, "password">
  ): Promise<User> {
    return await prisma.user.update({ where: { id }, data });
  }

  // Update user password method
  static async updatePassword(id: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  // Delete user method
  static async delete(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }

  // Sign in user method
  static async signin(email: string, password: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }

    return user;
  }

  // Change user role method
  static async changeRole(id: string, role: Role): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { rol: role },
    });
  }
}

// Export the UserService class
export default UserService;
