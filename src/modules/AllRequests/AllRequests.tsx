/* eslint-disable @typescript-eslint/no-unused-vars */

import { Table, Tooltip } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";

/* import { Container } from "./styles"; */

const AllRequests: React.FC = (): JSX.Element => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const getAllRequests = useCallback(async () => {
    const request = await axios.get("/api/getAllRequests");
    console.log(request);
    return request.data;
  }, [router.query]);
  const allColumns = [
    "id",
    "route",
    "source",
    "request",
    "body",
    "params",
    "header",
    "response",
    "status",
    "method",
    "createdAt",
    "updatedAt",
  ];
  const viewableColumns = [
    "status",
    "route",
    "source",
    "request",
    "body",
    "params",
    "header",
    "response",
    "method",
    "createdAt",
    "updatedAt",
  ];
  const {
    data: allRequests,
    isLoading,
    isSuccess,
  } = useQuery("requests", getAllRequests, { refetchInterval: 1000 });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const parseString = (str: string | Record<string, unknown>): string => {
    let newString = typeof str === "string" ? str : JSON.stringify(str);
    const maxLength = 20;
    if (newString.length > maxLength) {
      newString = newString.substring(0, maxLength) + "...";
    }
    return newString;
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <h1> Hello, AllRequests!</h1>
      <div style={{ overflowX: "auto" }}>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              {viewableColumns.map(column => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allRequests.map(request => (
              <tr key={request.id}>
                {viewableColumns.map(column => (
                  <td key={column}>
                    {JSON.stringify(request[column]).length > 20 ? (
                      <Tooltip label={JSON.stringify(request[column])}>
                        {parseString(request[column])}
                      </Tooltip>
                    ) : (
                      parseString(request[column])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllRequests;
