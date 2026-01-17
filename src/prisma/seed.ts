import { prisma } from "./client";
import bcrypt from "bcrypt";

async function main() {
  const rofiqpw = await bcrypt.hash("rofiq123", 10);
  const rtapw = await bcrypt.hash("admin123", 10);

  const rofiq = await prisma.user.upsert({
    where: { email: "rofiq@prisma.io" },
    update: {},
    create: {
      email: "rofiq@prisma.io",
      name: "Ainur Rofiq",
      password: rofiqpw,
      posts: {
        create: {
          title: "Check out Prisma with Next.js",
          content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do",
          categories: {
            create: [
              {
                category: {
                  create: {
                    name: "Tech",
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
  const rahmat = await prisma.user.upsert({
    where: { email: "rta@prisma.io" },
    update: {},
    create: {
      email: "rta@prisma.io",
      name: "Rahmat",
      password: rtapw,
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            content:
              "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do",
          },
          {
            title: "Follow Nexus on Twitter",
            content:
              "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do",
            categories: {
              create: [
                {
                  category: {
                    create: {
                      name: "Tool",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log({ rofiq, rahmat });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
