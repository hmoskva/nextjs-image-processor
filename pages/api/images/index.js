export default async function handler(req, res) {
  try {
    const {
      // query: { id, name },
      method,
    } = req;

    if (method === "GET") {
      return res.status(200).json({ name: `GETTING` });
    }

    if (method === "POST") {
      return res.status(200).json({});
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
