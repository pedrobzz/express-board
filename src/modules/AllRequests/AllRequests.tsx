/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Table from "../../common/components/Table";
import { DatabaseColumn } from "../../data/interfaces";
import { getAllColumns, getAllRequests } from "../../services/requests";
import LeftFilterMenu from "./components/LeftFilterMenu";

import { Container, TableDiv } from "./styles";

const AllRequests: React.FC = (): JSX.Element => {
  const {
    data: allRequests,
    isLoading,
    isSuccess,
  } = useQuery("requests", getAllRequests, { refetchInterval: 10000 });
  const {
    data: allColumnsObject,
    isLoading: columnsLoading,
    isSuccess: columnsSuccess,
  } = useQuery("allColumns", getAllColumns);
  const [filteredColumns, setFilteredColumns] =
    useState<DatabaseColumn[]>(null);
  useEffect(() => {
    if (!columnsLoading && columnsSuccess && !filteredColumns) {
      setFilteredColumns(
        allColumnsObject.map(c => {
          return {
            ...c,
            viewable: true,
          };
        }),
      );
    }
  }, [allColumnsObject]);

  if (isLoading || columnsLoading || !filteredColumns) {
    return <div>Loading...</div>;
  }

  if (!isSuccess || !columnsSuccess) {
    return <div>Cannot connect with Database</div>;
  }

  const updateColumnIndex = (name: string, move: number): void => {
    const index = filteredColumns.findIndex(c => c.name === name);
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
      filteredColumns.find(c => c.name === name),
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
                if (c.name === data) {
                  return { ...c, viewable: !c.viewable };
                }
                return c;
              }),
            );
          }}
        />
        <TableDiv>
          <Table
            columns={filteredColumns.filter(c => c.viewable).map(c => c.name)}
            data={allRequests}
          />
        </TableDiv>
      </Container>
    </div>
  );
};

export default AllRequests;
