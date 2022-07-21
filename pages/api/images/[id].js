import { Image } from "entities/image.entity.ts";
import { db, initDb } from "../../../db";

export default async function handler(req, res) {
  await initDb();

  try {
    const { method } = req;

    if (method === "GET") {
      const image = await db.manager.findOneBy(Image, { id: req.query.id });
      return res.status(200).json(image);
    }
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
