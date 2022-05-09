/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import Table from "../../common/components/Table";
import LeftFilterMenu from "./components/LeftFilterMenu";

import { Container, TableDiv } from "./styles";

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
  const [filteredColumns, setFilteredColumns] = useState(
    allColumns.map(c => ({ label: c, viewable: true })),
  );
  const {
    data: allRequests,
    isLoading,
    isSuccess,
  } = useQuery("requests", getAllRequests, { refetchInterval: 10000 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateColumnIndex = (label: string, move: number): void => {
    const index = filteredColumns.findIndex(c => c.label === label);
    if (
      index === -1 ||
      (index === 0 && move === -1) ||
      (index === filteredColumns.length - 1 && move === 1)
    ) {
      return;
    }
    const newFilteredColumns = [...filteredColumns];
    newFilteredColumns.splice(index, 1);
    newFilteredColumns.splice(
      index + move,
      0,
      filteredColumns.find(c => c.label === label),
    );
    setFilteredColumns(newFilteredColumns);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <h1> Hello, AllRequests!</h1>
      <Container>
        <LeftFilterMenu
          columns={filteredColumns}
          reorderColumns={updateColumnIndex}
          toggleColumnsCallback={data => {
            setFilteredColumns(
              filteredColumns.map(c => {
                if (c.label === data) {
                  return { ...c, viewable: !c.viewable };
                }
                return c;
              }),
            );
          }}
        />
        <TableDiv>
          <Table
            columns={filteredColumns.filter(c => c.viewable).map(c => c.label)}
            data={allRequests}
          />
        </TableDiv>
      </Container>
    </div>
  );
};

export default AllRequests;
