import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestRepo, RequestEntity } from "../../data";
import "reflect-metadata";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RequestEntity[]>,
): Promise<void> => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  if (!req.query.field) {
    return res.status(400).end();
  }
  const requestRepo = await getRequestRepo();
  console.log(`request.${req.query.field}`);
  const requests = (
    await requestRepo
      .createQueryBuilder("request")
      .distinctOn([`request.${req.query.field}`])
      .getMany()
  ).map(r => r[req.query.field as string]);
  res.status(200).json(requests);
};
