import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Replace this with a strong secret key

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password)
      return Response.json(
        { message: "All fields are required!" },
        { status: 400 }
      );

    // Find user in the database
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user)
      return Response.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return Response.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    return Response.json(
      { message: "Sign-in successful!", token },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
