import type { NextApiRequest, NextApiResponse } from "next";
import initializeDatabase, { RequestEntity } from "../../data";
import "reflect-metadata";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const dataSource = await initializeDatabase();
  const columns = await dataSource
    .getMetadata(RequestEntity)
    .ownColumns.map(c => ({
      name: c.propertyName,
      type: c.type || "not found",
    }));
  res.status(200).json(columns);
};
