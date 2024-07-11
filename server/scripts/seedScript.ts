import prisma from "..";

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: "user1",
      email: "user1@example.com",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "user2",
      email: "user2@example.com",
    },
  });

  // Create items
  const item1 = await prisma.item.create({
    data: {
      title: "Item 1",
      description: "Description for item 1",
      ownerId: user1.id,
    },
  });

  const item2 = await prisma.item.create({
    data: {
      title: "Item 2",
      description: "Description for item 2",
      ownerId: user2.id,
    },
  });

  // Create offers
  const offer1 = await prisma.offer.create({
    data: {
      itemOfferedId: item1.id,
      itemRequestedId: item2.id,
      offeredById: user1.id,
      requestedFromId: user2.id,
      status: "Pending",
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
