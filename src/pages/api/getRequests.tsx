import type { NextApiRequest, NextApiResponse } from "next";
import { getRequestRepo, RequestEntity } from "../../data";
import "reflect-metadata";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RequestEntity[]>,
): Promise<void> => {
  const requestRepo = await getRequestRepo();
  const requests = await requestRepo.find();
  res.status(200).json(requests);
};
