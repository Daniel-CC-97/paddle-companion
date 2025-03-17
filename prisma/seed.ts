const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create two users
  const user1 = await prisma.user.create({
    data: { username: "alice", password: "password123" },
  });

  const user2 = await prisma.user.create({
    data: { username: "bob", password: "password123" },
  });

  // Add them as friends
  await prisma.user.update({
    where: { id: user1.id },
    data: {
      friends: {
        connect: { id: user2.id },
      },
    },
  });

  // Fetch and print
  const alice = await prisma.user.findUnique({
    where: { id: user1.id },
    include: { friends: true },
  });

  console.log("Alice's friends:", alice.friends);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
