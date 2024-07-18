import prisma from "..";

async function main() {
  const user1Id = "(google - oauth2) | 101185647605095174521";
  const user2Id = "test";
  // Create items
  const item1 = await prisma.item.create({
    data: {
      title: "Item 1",
      description: "Description for item 1",
      ownerId: user1Id,
    },
  });

  const item2 = await prisma.item.create({
    data: {
      title: "Item 2",
      description: "Description for item 2",
      ownerId: user2Id,
    },
  });

  // Create offers
  const offer1 = await prisma.offer.create({
    data: {
      itemOfferedId: item1.id,
      itemRequestedId: item2.id,
      offeredById: user1Id,
      requestedFromId: user2Id,
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
