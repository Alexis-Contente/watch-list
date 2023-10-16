// Route Get to have item list of a user with prisma
// Path: src/pages/api/listes/index.ts
// import { getSession } from "next-auth/client";
// import { PrismaClient } from "@prisma/client";
//
// const prisma = new PrismaClient();
//
// export default async function handler(req, res) {
//   const session = await getSession({ req });
//
//   if (!session) {
//     res.status(401).json({ message: "Not authenticated" });
//     return;
//   }
//
//   if (req.method === "GET") {
//     const lists = await prisma.list.findMany({
//       where: {
//         userId: session.user.id,
//       },
//       include: {
//         items: true,
//       },
//     });
//
//     res.status(200).json(lists);
//   }
// }
// Route Post to add item list of a user with prisma
// Path: src/pages/api/listes/index.ts
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  if (req.method === "POST") {
    try {
      const { id, user_id, name, title, poster_path } = req.body;
      const list = await prisma.item.create({
        data: {
          id,
          userId: user_id,
          name,
          title,
          poster_path,
        }
      });
      res.status(200).json(list);
    } catch (error) {
      console.log(error);
    }
  }
}
// Route Put to update item list of a user with prisma
// Path: src/pages/api/listes/index.ts
// import { getSession } from "next-auth/client";
// import { PrismaClient } from "@prisma/client";
//
// const prisma = new PrismaClient();
//
// export default async function handler(req, res) {
//   const session = await getSession({ req });
//
//   if (!session) {
//     res.status(401).json({ message: "Not authenticated" });
//     return;
//   }
//
//   if (req.method === "PUT") {
//     const { id, name } = req.body;
//
//     const list = await prisma.list.update({
//       where: {
//         id,
//       },
//       data: {
//         name,
//       },
//     });
//
//     res.status(200).json(list);
//   }
// }
// Route Delete to delete item list of a user with prisma
// Path: src/pages/api/listes/index.ts
// import { getSession } from "next-auth/client";
// import { PrismaClient } from "@prisma/client";
//
// const prisma = new PrismaClient();
//
// export default async function handler(req, res) {
//   const session = await getSession({ req });
//
//   if (!session) {
//     res.status(401).json({ message: "Not authenticated" });
//     return;
//   }
//
//   if (req.method === "DELETE") {
//     const { id } = req.body;
//
//     const list = await prisma.list.delete({
//       where: {
//         id,
//       },
//     });
//
//     res.status(200).json(list);
//   }
// }
// Route Post to add item of a list of a user with prisma
// Path: src/pages/api/listes/items/index.ts
// import { getSession } from "next-auth/client";
// import { PrismaClient } from "@prisma/client";
//
// const prisma = new PrismaClient();
//
// export default async function handler(req, res) {
//   const session = await getSession({ req });
//
//   if (!session) {
//     res.status(401).json({ message: "Not authenticated" });
//     return;
//   }
//
//   if (req.method === "POST") {
//     const { name, listId } = req.body;
//
//     const item = await prisma.item.create({
//       data: {
//         name,
//         list: {
//           connect: {
//             id: listId,
//           },
//         },
//       },
//     });
//
//     res.status(200).json(item);
//   }
// }
// Route Put to update item of a list of a user with prisma
// Path: src/pages/api/listes/items/index.ts
// import { getSession } from "next-auth/client";
// import { PrismaClient } from "@prisma/client";
//
// const prisma = new PrismaClient();
//
// export default async function handler(req, res) {
//   const session = await getSession({ req });
//
//   if (!session) {
//     res.status(401).json({ message: "Not authenticated" });
//     return;
//   }
//
//   if (req.method === "PUT") {
//     const { id, name } = req.body;
//
//     const item = await prisma.item.update({
//       where: {
//         id,
//       },
//       data: {
//         name,
//       },
//     });
//
//     res.status(200).json(item);
//   }
// }
// Route Delete to delete item of a list of a user with prisma