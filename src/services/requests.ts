import axios from "axios";
import { RequestEntity } from "../data";
import { DatabaseColumn } from "../data/interfaces";

export const getAllRequests = async (): Promise<RequestEntity[]> => {
  const request = await axios.get<RequestEntity[]>("/api/getRequests");
  return request.data;
};

export const getAllColumns = async (): Promise<
  Omit<DatabaseColumn, "viewable">[]
> => {
  const request = await axios.get<
    {
      name: string;
      type: string;
    }[]
  >("/api/getColumns");
  return request.data;
};
