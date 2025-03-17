import { prisma } from "@/prisma/prisma"; // Import the shared instance
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password)
      return Response.json(
        { message: "All fields are required!" },
        { status: 400 }
      );

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser)
      return Response.json(
        { message: "Username already in use!" },
        { status: 400 }
      );

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    return Response.json(
      { message: "User created!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
