import { Image } from "entities/image.entity.ts";
import { db, initDb } from "../../../db";

export default async function handler(req, res) {
  await initDb();

  try {
    const { method } = req;

    if (method === "GET") {
      const {
        sortBy = "id",
        orderBy = "DESC",
        page = 1,
        limit = 10,
      } = req.query;

      const skippedItems = (+page - 1) * +limit;
      const queryBuilder = db.manager
        .createQueryBuilder(Image, "image")
        .orderBy(`image.${sortBy}`, orderBy)
        .skip(skippedItems)
        .take(limit);

      const [imageData, imageCount] = await Promise.all([
        queryBuilder.getMany(),
        queryBuilder.getCount(),
      ]);

      return res.status(200).json({
        page: +page,
        limit: +limit,
        totalCount: imageCount,
        data: imageData,
      });
    }

    if (method === "POST") {
      const { originalUrl, name, compressedUrl, size } = JSON.parse(req.body);
      let image = new Image();
      image.name = name;
      image.originalUrl = originalUrl;
      image.compressedUrl = compressedUrl;
      image.size = size;

      image = await db.manager.save(image);
      return res.status(200).json(image);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
