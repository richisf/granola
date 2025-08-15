import { z } from "zod";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const User = createTRPCRouter({
  post: publicProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }),
}); 