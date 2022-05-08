/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useQuery } from "react-query";
import Table from "../../common/components/Table";

/* import { Container } from "./styles"; */

const AllRequests: React.FC = (): JSX.Element => {
  const router = useRouter();
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
  const {
    data: allRequests,
    isLoading,
    isSuccess,
  } = useQuery("requests", getAllRequests, { refetchInterval: 10000 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <h1> Hello, AllRequests!</h1>
      <div style={{ overflowX: "auto" }}>
        <Table columns={allColumns} data={allRequests} />
      </div>
    </div>
  );
};

export default AllRequests;
